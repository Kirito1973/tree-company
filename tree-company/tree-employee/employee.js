// =========================================================
// СИСТЕМА ЖЕСТКОГО АВТООБНОВЛЕНИЯ PWA (Версия 6.3)
// =========================================================
const APP_VERSION = '6.3';

if (localStorage.getItem('tree_emp_version') !== APP_VERSION) {
    console.log('Обнаружена новая версия! Очистка старого кэша...');
    
    if ('caches' in window) {
        caches.keys().then((names) => {
            names.forEach(name => caches.delete(name));
        });
    }
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach(registration => registration.unregister());
        });
    }
    
    localStorage.setItem('tree_emp_version', APP_VERSION);
    window.location.reload(true);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = './sw.js?v=' + APP_VERSION;
        navigator.serviceWorker.register(swUrl).then(reg => {
            reg.update();
        }).catch(err => console.error('Ошибка SW:', err));
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            window.location.reload();
        }
    });
}

// ================= ВРЕМЯ И ФОРМАТИРОВАНИЕ =================
function getNowString() {
    const now = new Date();
    return String(now.getDate()).padStart(2, '0') + '.' +
           String(now.getMonth() + 1).padStart(2, '0') + '.' +
           now.getFullYear() + ' ' +
           String(now.getHours()).padStart(2, '0') + ':' +
           String(now.getMinutes()).padStart(2, '0');
}

const COMPANY_FEE_PERCENT = 0.20; 

function switchEmpTab(screenId, btnElement) {
    document.querySelectorAll('.emp-screen').forEach(scr => scr.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(btn => btn.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) targetScreen.classList.add('active');
    
    if (btnElement) btnElement.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20); 
}

// ================= СЛОВАРЬ (TREE COMPANY И НОВЫЕ ПОЛЯ) =================
const translations = {
    "tab_emp_news": { "AM": "Գլխավոր", "RU": "Главная", "EN": "Home" },
    "tab_emp_orders": { "AM": "Պատվերներ", "RU": "Заказы", "EN": "Orders" },
    "tab_emp_finance": { "AM": "Ֆինանսներ", "RU": "Финансы", "EN": "Finance" },
    "tab_emp_profile": { "AM": "Իմ էջը", "RU": "Профиль", "EN": "Profile" },
    "title_emp_news": { "AM": "Տեղեկատվություն", "RU": "Уведомления", "EN": "Info & News" },
    "title_emp_finance": { "AM": "Իմ <span>Ֆինանսները</span>", "RU": "Мои <span>Финансы</span>", "EN": "My <span>Finance</span>" },
    "title_emp_profile": { "AM": "Անձնական <span>տվյալներ</span>", "RU": "Личные <span>Данные</span>", "EN": "Personal <span>Profile</span>" },
    
    "login_title": { "AM": "Մուտք", "RU": "Вход", "EN": "Login" },
    "login_desc": { "AM": "Մուտքագրեք 6-նիշանոց PIN կոդը", "RU": "Введите 6-значный ключ доступа", "EN": "Enter 6-digit PIN code" },
    
    "welcome_title": { "AM": "Բարի գալուստ TREE COMPANY!", "RU": "Добро пожаловать в TREE COMPANY!", "EN": "Welcome to TREE COMPANY!" },
    "welcome_desc": { "AM": "Այստեղ կհայտնվեն կարևոր ծանուցումները և նորությունները։", "RU": "Здесь будут появляться важные уведомления и новости.", "EN": "Important notifications and news will appear here." },
    
    "filter_new": { "AM": "Նոր", "RU": "Новые", "EN": "New" },
    "filter_progress": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "In Progress" },
    "filter_completed": { "AM": "Ավարտված", "RU": "Завершенные", "EN": "Completed" },
    "no_orders": { "AM": "Այս պահին պատվերներ չկան", "RU": "Нет заказов в этой категории", "EN": "No orders currently" },
    
    "status_new": { "AM": "Նոր", "RU": "Новый", "EN": "New" },
    "status_pending": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "Pending" },
    "status_success": { "AM": "Ավարտված", "RU": "Завершен", "EN": "Success" },

    "card_client": { "AM": "Հաճախորդ:", "RU": "Клиент:", "EN": "Client:" },
    "card_address": { "AM": "<b>Հասցե:</b>", "RU": "<b>Адрес:</b>", "EN": "<b>Address:</b>" },

    "stats_all_time": { "AM": "Ընդհանուր եկամուտ", "RU": "За все время", "EN": "All Time Total" },
    "click_to_view": { "AM": "⬇ Սեղմեք՝ ըստ ամիսների տեսնելու համար ⬇", "RU": "⬇ Нажмите, чтобы посмотреть по месяцам ⬇", "EN": "⬇ Click to view by months ⬇" },
    "stats_month": { "AM": "Այս ամիս", "RU": "В этом месяце", "EN": "This month" },
    "stats_uncompleted": { "AM": "Ընթացիկ պատվերներ", "RU": "Незавершенные", "EN": "In Progress" },
    "stats_debt": { "AM": "Պարտք ընկերությանը", "RU": "Долг компании", "EN": "Company Debt" },

    "logout_btn": { "AM": "Ելք", "RU": "Выйти", "EN": "Logout" },
    "prof_name": { "AM": "Անուն:", "RU": "Имя:", "EN": "Name:" },
    "prof_type": { "AM": "Մասնագիտություն:", "RU": "Профессия:", "EN": "Profession:" },
    "prof_birth": { "AM": "Ծննդյան օր:", "RU": "Дата рожд.:", "EN": "Birth Date:" },
    "prof_phone": { "AM": "Հեռախոս:", "RU": "Телефон:", "EN": "Phone:" },
    "prof_address": { "AM": "Հասցե:", "RU": "Адрес:", "EN": "Address:" },
    "prof_edit_btn": { "AM": "<span>Խմբագրել</span>", "RU": "<span>Редактировать</span>", "EN": "<span>Edit</span>" },

    "modal_client_title": { "AM": "Հաճախորդ", "RU": "Клиент", "EN": "Client" },
    "modal_fin_title": { "AM": "Ֆինանսներ", "RU": "Финансы", "EN": "Finance" },
    "modal_fin_total": { "AM": "Ընդհանուր:", "RU": "Сумма:", "EN": "Total:" },
    "modal_fin_company": { "AM": "Ընկերության %:", "RU": "Комиссия:", "EN": "Company %:" },
    "modal_fin_master": { "AM": "Ձեր եկամուտը:", "RU": "Ваш доход:", "EN": "Your Income:" },
    "modal_services_title": { "AM": "Ծառայություններ (Նշեք ավարտվածները)", "RU": "Услуги (Отметьте выполненное)", "EN": "Services (Check completed)" },
    "btn_accept_order": { "AM": "Ընդունել պատվերը", "RU": "Принять заказ", "EN": "Accept Order" },
    "btn_finish_order": { "AM": "Ավարտել պատվերը", "RU": "Завершить заказ", "EN": "Finish Order" },
    "btn_close": { "AM": "Փակել", "RU": "Закрыть", "EN": "Close" },

    "edit_profile_title": { "AM": "Խմբագրել պրոֆիլը", "RU": "Редактировать профиль", "EN": "Edit Profile" },
    "edit_name_label": { "AM": "Անուն Ազգանուն", "RU": "Имя Фамилия", "EN": "Full Name" },
    "edit_phone_label": { "AM": "Հեռախոս", "RU": "Телефон", "EN": "Phone" },
    "edit_birth_label": { "AM": "Ծննդյան օր", "RU": "Дата рождения", "EN": "Birth Date" },
    "edit_address_label": { "AM": "Հասցե", "RU": "Адрес", "EN": "Address" },
    "btn_save": { "AM": "<span>Պահպանել</span>", "RU": "<span>Сохранить</span>", "EN": "<span>Save</span>" },
    "btn_cancel": { "AM": "Չեղարկել", "RU": "Отмена", "EN": "Cancel" },

    "date_created": { "AM": "Ստեղծվել է:", "RU": "Создан:", "EN": "Created:" },
    "date_accepted": { "AM": "Ընդունվել է:", "RU": "Принят:", "EN": "Accepted:" },
    "date_completed": { "AM": "Ավարտվել է:", "RU": "Завершен:", "EN": "Completed:" },
    "contact_admin": { "AM": "Կապ ադմինիստրատորի հետ", "RU": "Связь с администратором", "EN": "Contact Admin" },
    
    // Новые строки для рейтинга и отзывов
    "your_rating": { "AM": "Ձեր վարկանիշը", "RU": "Ваш рейтинг", "EN": "Your Rating" },
    "based_on_reviews": { "AM": "հիմնված է հաճախորդների կարծիքների վրա", "RU": "основано на отзывах клиентов", "EN": "based on client reviews" },
    "client_reviews": { "AM": "Հաճախորդների կարծիքները", "RU": "Отзывы клиентов", "EN": "Client Reviews" },
    "no_reviews": { "AM": "Դեռ կարծիքներ չկան", "RU": "Пока нет отзывов", "EN": "No reviews yet" }
};

let currentLang = localStorage.getItem('emp_app_lang') || 'AM';

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][currentLang]) {
            el.innerHTML = translations[key][currentLang];
        }
    });

    document.querySelectorAll('.lang-tab').forEach(tab => {
        if (tab.getAttribute('data-lang') === currentLang) {
            tab.classList.add('active');
            const btnMain = document.getElementById('current-lang-btn');
            if(btnMain) btnMain.innerHTML = tab.innerHTML;
        } else {
            tab.classList.remove('active');
        }
    });
    
    const birthInput = document.getElementById('self-edit-birth');
    if(birthInput) {
        if(currentLang === 'AM') birthInput.placeholder = "ՕՕ.ԱԱ.ՏՏՏՏ";
        else if(currentLang === 'RU') birthInput.placeholder = "ДД.ММ.ГГГГ";
        else birthInput.placeholder = "DD.MM.YYYY";
    }
}

// ================= БАЗА ДАННЫХ (MOCK) =================
let ordersData = [
    { id: 'ORD-003', status: 'new', createdAt: '15.07.2026 10:00', acceptedAt: null, completedAt: null, clientName: 'Գոռ Վարդանյան', clientPhone: '+374 95 188 038', address: 'Երևան, Աբովյան 12', worker: 'Արմեն Սարգսյան', services: [{ name: 'Դռների տեղադրում (MDF)', qty: 2, price: 15000, done: false, doneAt: null }] },
    { id: 'ORD-002', status: 'progress', createdAt: '14.07.2026 15:30', acceptedAt: '14.07.2026 16:00', completedAt: null, clientName: 'Աննա Հովհաննիսյան', clientPhone: '+374 91 555 444', address: 'Երևան, Մաշտոցի 4', worker: 'Արմեն Սարգսյան', services: [{ name: 'Պլաստիկ պլինտուս', qty: 45, price: 600, done: true, doneAt: '15.07.2026 11:30' }, { name: 'Անկյունակների տեղադրում', qty: 10, price: 200, done: false, doneAt: null }] },
    { id: 'ORD-001', status: 'completed', isCommissionPaid: false, createdAt: '10.07.2026 09:00', acceptedAt: '10.07.2026 09:30', completedAt: '11.07.2026 14:00', clientName: 'Մարիամ Պողոսյան', clientPhone: '+374 77 123 456', address: 'Երևան, Բաղրամյան 1', worker: 'Արմեն Սարգսյան', services: [{ name: 'Փայտե դռան տեղադրում', qty: 1, price: 20000, done: true, doneAt: '11.07.2026 13:50' }] }
];

let employeesData = [
    { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', type: 'doors', typeLabel: 'Դռներ / Двери', phone: '+374 77 999 888', exp: '6 տարի / 6 лет', rating: 4.8, birthDate: '12.05.1990', address: 'Երևան, Կոմիտաս 45', accessKey: '123456' },
    { id: 'EMP-004', status: 'active', name: 'Գոռ Վարդանյան', type: 'universal', typeLabel: 'Ունիվերսալ / Универсал', phone: '+374 77 111 555', exp: '5 տարի / 5 лет', rating: 4.9, birthDate: '15.07.1992', address: 'Երևան, Տերյան 50', accessKey: '000000' }
];

let reviewsData = [
    { id: 1, empId: 'EMP-001', clientName: 'Մարիամ Պողոսյան', date: '11.07.2026', rating: 5, text: 'Շատ շնորհակալ եմ Արամին հիանալի աշխատանքի համար: Դռները տեղադրվեցին շատ արագ և որակով:' },
    { id: 2, empId: 'EMP-001', clientName: 'Աննա Հովհաննիսյան', date: '05.07.2026', rating: 4, text: 'Ամեն ինչ լավ էր, բայց մի փոքր ուշացումով մոտեցավ:' },
    { id: 3, empId: 'EMP-004', clientName: 'Դավիթ Սարգսյան', date: '12.07.2026', rating: 5, text: 'Պլինտուսների տեղադրումը կատարվեց անթերի: Խորհուրդ եմ տալիս:' }
];

let loggedInEmpId = null;
let currentActiveOrderId = null;
let currentOrderFilter = 'new'; 

window.updateOrderCounts = function() {
    const emp = employeesData.find(e => e.id === loggedInEmpId);
    if (!emp) return;

    const myOrders = ordersData.filter(o => o.worker && o.worker.includes(emp.name));
    const newCount = myOrders.filter(o => o.status === 'new').length;
    const progressCount = myOrders.filter(o => o.status === 'progress').length;
    const completedCount = myOrders.filter(o => o.status === 'completed').length;

    const elNew = document.getElementById('count-new');
    const elProg = document.getElementById('count-progress');
    const elComp = document.getElementById('count-completed');

    if (elNew) { elNew.innerText = newCount; elNew.style.display = newCount > 0 ? 'inline-flex' : 'none'; }
    if (elProg) { elProg.innerText = progressCount; elProg.style.display = progressCount > 0 ? 'inline-flex' : 'none'; }
    if (elComp) { elComp.innerText = completedCount; elComp.style.display = completedCount > 0 ? 'inline-flex' : 'none'; }
};

document.addEventListener('DOMContentLoaded', () => {
    
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElem = document.documentElement;
    let rotationDegrees = 0;

    const sunIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    function updateThemeIcon() {
        if (!themeIcon) return;
        themeIcon.innerHTML = htmlElem.getAttribute('data-theme') === 'dark' ? sunIcon : moonIcon;
    }
    updateThemeIcon();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            rotationDegrees += 360;
            themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
            let currentTheme = htmlElem.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('emp_theme', newTheme);
            setTimeout(updateThemeIcon, 150); 
        });
    }

    const langSwitcher = document.getElementById('lang-switcher');
    const currentLangBtn = document.getElementById('current-lang-btn');
    if (currentLangBtn && langSwitcher) {
        currentLangBtn.addEventListener('click', (e) => { e.stopPropagation(); langSwitcher.classList.toggle('open'); });
    }
    
    document.addEventListener('click', (e) => { 
        if(langSwitcher && !langSwitcher.contains(e.target)) {
            langSwitcher.classList.remove('open'); 
        }
        
        const fabWrapper = document.getElementById('contact-fab-wrapper');
        if (fabWrapper && fabWrapper.classList.contains('active') && !fabWrapper.contains(e.target)) {
            fabWrapper.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            currentLang = tab.getAttribute('data-lang');
            localStorage.setItem('emp_app_lang', currentLang);
            
            if (loggedInEmpId) {
                renderEmployeeNews();
                renderEmployeeOrders();
                renderEmployeeProfile(employeesData.find(emp => emp.id === loggedInEmpId));
                renderEmployeeFinance();
                
                const emp = employeesData.find(emp => emp.id === loggedInEmpId);
                const firstName = emp.name.split(' ')[0];
                const greetings = { "AM": "Բարև", "RU": "Привет", "EN": "Hello" };
                document.querySelectorAll('#emp-greeting').forEach(el => el.innerHTML = `${greetings[currentLang]}, <b>${firstName}</b>!`);

                if (document.getElementById('order-modal').classList.contains('active') && currentActiveOrderId) {
                    openOrderModal(currentActiveOrderId);
                }
            } else {
                applyLanguage();
            }
            langSwitcher.classList.remove('open');
        });
    });

    // ================= РЕНДЕР ГЛАВНОЙ СТРАНИЦЫ (НОВОСТИ, РЕЙТИНГ И ОТЗЫВЫ) =================
    window.renderEmployeeNews = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        const newsSection = document.getElementById('screen-emp-news');
        if (!emp || !newsSection) return;

        const empReviews = reviewsData.filter(r => r.empId === emp.id);
        
        let reviewsHtml = '';
        if (empReviews.length === 0) {
            reviewsHtml = `<div style="text-align:center; padding: 20px; font-size: 11px; color: var(--text-sec);" data-i18n="no_reviews">Դեռ կարծիքներ չկան</div>`;
        } else {
            empReviews.forEach(r => {
                let stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
                reviewsHtml += `
                    <div class="review-card">
                        <div class="review-header">
                            <div class="review-author">${r.clientName}</div>
                            <div class="review-date">${r.date}</div>
                        </div>
                        <div class="review-stars">${stars}</div>
                        <div class="review-text">${r.text}</div>
                    </div>
                `;
            });
        }

        newsSection.innerHTML = `
            <h2 class="screen-title" data-i18n="title_emp_news">Տեղեկատվություն</h2>
            
            <div class="glass-panel" style="margin-top: 10px;">
                <div class="entity-card" style="cursor: default;">
                    <div class="entity-title" style="color: var(--tree-light); margin-bottom: 6px;" data-i18n="welcome_title">Բարի գալուստ TREE COMPANY!</div>
                    <div class="entity-meta" style="font-size: 11px; line-height: 1.4;" data-i18n="welcome_desc">
                        Այստեղ կհայտնվեն կարևոր ծանուցումները և նորությունները։
                    </div>
                </div>
            </div>

            <div class="glass-panel" style="margin-top: 16px; text-align: center; padding: 16px;">
                <div style="font-size: 11px; font-weight: 800; color: var(--text-sec); text-transform: uppercase; margin-bottom: 8px;" data-i18n="your_rating">Ձեր վարկանիշը</div>
                <div style="font-size: 38px; font-weight: 900; color: var(--tree-light); line-height: 1;">${emp.rating.toFixed(1)}</div>
                <div style="font-size: 20px; color: #FFB347; margin: 4px 0; letter-spacing: 2px;">★★★★★</div>
                <div style="font-size: 9px; color: var(--text-sec); text-transform: uppercase;" data-i18n="based_on_reviews">հիմնված է հաճախորդների կարծիքների վրա</div>
            </div>

            <h3 class="screen-title" style="margin-top: 24px; font-size: 14px; text-align: left; padding-left: 8px;" data-i18n="client_reviews">Հաճախորդների կարծիքները</h3>
            <div id="emp-reviews-list" style="margin-top: 10px; display: flex; flex-direction: column; gap: 10px;">
                ${reviewsHtml}
            </div>
        `;

        applyLanguage();
    };

    window.showEmployeeDashboard = function(empId) {
        const emp = employeesData.find(e => e.id === empId);
        if (!emp) { logoutEmployee(); return; }
        
        document.getElementById('screen-login').classList.remove('active');
        document.getElementById('screen-emp-news').classList.add('active');
        document.getElementById('emp-bottom-nav').style.display = 'flex';
        
        const firstName = emp.name.split(' ')[0];
        const greetings = { "AM": "Բարև", "RU": "Привет", "EN": "Hello" };
        document.querySelectorAll('#emp-greeting').forEach(el => el.innerHTML = `${greetings[currentLang]}, <b>${firstName}</b>!`);
        
        renderEmployeeNews();
        renderEmployeeOrders();
        renderEmployeeProfile(emp);
        renderEmployeeFinance();
        updateOrderCounts(); 
    };

    window.logoutEmployee = function() {
        localStorage.removeItem('loggedInEmpId');
        loggedInEmpId = null;
        document.querySelectorAll('.emp-screen').forEach(scr => scr.classList.remove('active'));
        document.getElementById('screen-login').classList.add('active');
        document.getElementById('emp-bottom-nav').style.display = 'none';
    };

    window.filterEmpOrders = function(statusFilter, btnElement) {
        currentOrderFilter = statusFilter;
        document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
        if (navigator.vibrate) navigator.vibrate(15);
        renderEmployeeOrders();
    };

    window.renderEmployeeFinance = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        const financeSection = document.getElementById('screen-emp-finance');
        if (!emp || !financeSection) return;

        const empOrders = ordersData.filter(o => o.worker && o.worker.includes(emp.name));
        const now = new Date();
        const currMonthStr = String(now.getMonth() + 1).padStart(2, '0') + '.' + now.getFullYear();

        let totalAllTime = 0, currentMonthTotal = 0, uncompletedTotal = 0, companyDebt = 0;
        const monthlyData = {};

        empOrders.forEach(order => {
            let orderTotal = 0;
            order.services.forEach(s => {
                if (order.status === 'completed' && s.done) orderTotal += (s.price * s.qty);
                else if (order.status === 'progress') orderTotal += (s.price * s.qty);
            });

            let companyFee = orderTotal * COMPANY_FEE_PERCENT;
            let masterNet = orderTotal - companyFee;

            if (order.status === 'completed') {
                totalAllTime += masterNet;
                if (!order.isCommissionPaid) companyDebt += companyFee;

                const targetDate = order.completedAt || order.createdAt;
                if (targetDate) {
                    const dateParts = targetDate.split(' ')[0].split('.');
                    if (dateParts.length === 3) {
                        const monthYear = `${dateParts[1]}.${dateParts[2]}`;
                        if (!monthlyData[monthYear]) monthlyData[monthYear] = 0;
                        monthlyData[monthYear] += masterNet;
                        if (monthYear === currMonthStr) currentMonthTotal += masterNet;
                    }
                }
            } else if (order.status === 'progress') {
                uncompletedTotal += masterNet;
            }
        });

        financeSection.innerHTML = `
            <h2 class="screen-title" data-i18n="title_emp_finance">Իմ <span>Ֆինանսները</span></h2>
            
            <div class="glass-panel" style="margin-top: 10px; background: rgba(255, 50, 50, 0.1); border: 1px solid rgba(255, 50, 50, 0.3);">
                <div style="font-size: 11px; font-weight: 800; color: #ff4444; text-transform: uppercase; margin-bottom: 6px;" data-i18n="stats_debt">Долг компании</div>
                <div style="font-size: 28px; font-weight: 900; color: var(--text);">${companyDebt.toLocaleString()} ֏</div>
            </div>

            <div class="stats-grid" style="margin-top: 12px;">
                <div class="stat-box" style="background: rgba(35, 169, 91, 0.1); border-color: rgba(35, 169, 91, 0.3);">
                    <div class="stat-value" style="color: var(--tree-light); font-size: 20px;">${currentMonthTotal.toLocaleString()} ֏</div>
                    <div class="stat-label" data-i18n="stats_month">В этом месяце</div>
                </div>
                <div class="stat-box" style="background: rgba(255, 179, 71, 0.1); border-color: rgba(255, 179, 71, 0.3);">
                    <div class="stat-value" style="color: #FFB347; font-size: 20px;">${uncompletedTotal.toLocaleString()} ֏</div>
                    <div class="stat-label" data-i18n="stats_uncompleted">Незавершенные</div>
                </div>
            </div>

            <div class="glass-panel" style="margin-top: 12px; cursor: pointer; text-align: center; padding: 16px;" onclick="toggleMonthlyFinance()">
                <div style="font-size: 11px; font-weight: 800; color: var(--text-sec); text-transform: uppercase; margin-bottom: 6px;" data-i18n="stats_all_time">За все время</div>
                <div style="font-size: 24px; font-weight: 900; color: var(--text);">${totalAllTime.toLocaleString()} ֏</div>
                <div style="font-size: 9px; color: var(--text-sec); margin-top: 8px; opacity: 0.8;" data-i18n="click_to_view">⬇ Нажмите, чтобы посмотреть по месяцам ⬇</div>
            </div>

            <div id="monthly-finance-list" style="display: none; flex-direction: column; gap: 8px; margin-top: 12px; width: 100%;"></div>
        `;

        const listContainer = document.getElementById('monthly-finance-list');
        const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
            const [mA, yA] = a.split('.');
            const [mB, yB] = b.split('.');
            return new Date(yB, mB - 1) - new Date(yA, mA - 1);
        });

        if (sortedMonths.length === 0) {
            listContainer.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec); padding: 10px;">Տվյալներ չկան / Нет данных</div>`;
        } else {
            sortedMonths.forEach(mKey => {
                const [mm, yyyy] = mKey.split('.');
                const lastDay = new Date(yyyy, mm, 0).getDate();
                const periodStr = `01.${mm}.${yyyy} - ${lastDay}.${mm}.${yyyy}`;
                listContainer.innerHTML += `
                    <div class="detail-block" style="margin-top: 0; display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.4);">
                        <span style="font-size: 11px; font-weight: 700; color: var(--text-sec);">${periodStr}</span>
                        <span style="font-size: 14px; font-weight: 900; color: var(--text);">${monthlyData[mKey].toLocaleString()} ֏</span>
                    </div>`;
            });
        }
        applyLanguage();
    };

    window.toggleMonthlyFinance = function() {
        const list = document.getElementById('monthly-finance-list');
        list.style.display = list.style.display === 'none' ? 'flex' : 'none';
        if (navigator.vibrate) navigator.vibrate(10);
    };

    window.renderEmployeeOrders = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        const list = document.getElementById('emp-personal-orders-list');
        if (!list || !emp) return;
        list.innerHTML = '';
        
        const empOrders = ordersData.filter(o => o.worker && o.worker.includes(emp.name) && o.status === currentOrderFilter);
        
        if (empOrders.length === 0) {
            list.innerHTML = `<div style="text-align:center; padding: 20px; font-size: 11px; color: var(--text-sec);" data-i18n="no_orders">Այս պահին պատվերներ չկան</div>`;
            applyLanguage();
            return;
        }

        empOrders.forEach(order => {
            let statusClass = '', statusI18n = '';
            if (order.status === 'new') { statusClass = 'new'; statusI18n = 'status_new'; }
            else if (order.status === 'progress') { statusClass = 'pending'; statusI18n = 'status_pending'; }
            else if (order.status === 'completed') { statusI18n = 'status_success'; }

            let mainTitle = order.services.length > 0 ? order.services[0].name : "Услуга";

            list.innerHTML += `
                <div class="entity-card" onclick="openOrderModal('${order.id}')">
                    <div class="entity-header">
                        <span class="entity-id" style="font-size:13px; font-weight:900; color:var(--text);">${order.id}</span>
                        <span class="entity-status ${statusClass}" data-i18n="${statusI18n}"></span>
                    </div>
                    <div class="entity-title" style="margin-top: 4px; color: var(--tree-light);">${mainTitle}</div>
                    <div class="detail-block" style="background: rgba(255,255,255,0.4); margin-top: 10px; padding: 10px;">
                        <div style="font-size:10px; color:var(--text-sec); font-weight:800; margin-bottom:4px;" data-i18n="card_client">Հաճախորդ:</div>
                        <div style="font-size:12px; font-weight:700;">${order.clientName}</div>
                        <div style="font-size:11px; margin-top:8px;"><span data-i18n="card_address"><b>Հասցե:</b></span> ${order.address}</div>
                    </div>
                </div>`;
        });
        applyLanguage();
    };

    window.openOrderModal = function(orderId) {
        currentActiveOrderId = orderId;
        const order = ordersData.find(o => o.id === orderId);
        if (!order) return;

        let statusI18n = order.status === 'new' ? 'status_new' : (order.status === 'progress' ? 'status_pending' : 'status_success');
        let statusClass = order.status === 'new' ? 'new' : (order.status === 'progress' ? 'pending' : '');
        document.getElementById('modal-order-status').className = `entity-status ${statusClass}`;
        document.getElementById('modal-order-status').setAttribute('data-i18n', statusI18n);

        document.getElementById('modal-order-id').innerText = order.id;

        let timelineBlock = document.getElementById('modal-timeline-block');
        if (!timelineBlock) {
            timelineBlock = document.createElement('div');
            timelineBlock.id = 'modal-timeline-block';
            timelineBlock.className = 'detail-block';
            timelineBlock.style.background = 'rgba(0, 200, 255, 0.05)';
            timelineBlock.style.borderColor = 'rgba(0, 200, 255, 0.2)';
            const clientTitle = document.querySelector('[data-i18n="modal_client_title"]');
            clientTitle.parentNode.insertBefore(timelineBlock, clientTitle);
        }

        let timelineHtml = `<div class="detail-row"><span class="detail-label" data-i18n="date_created">Создан:</span><span class="detail-value" style="color: var(--text-sec); font-weight: 600;">${order.createdAt || '---'}</span></div>`;
        if (order.acceptedAt) timelineHtml += `<div class="detail-row"><span class="detail-label" data-i18n="date_accepted">Принят:</span><span class="detail-value" style="color: #FFB347;">${order.acceptedAt}</span></div>`;
        if (order.completedAt) timelineHtml += `<div class="detail-row"><span class="detail-label" data-i18n="date_completed">Завершен:</span><span class="detail-value" style="color: var(--tree-light);">${order.completedAt}</span></div>`;
        timelineBlock.innerHTML = timelineHtml;

        document.getElementById('modal-client-name').innerText = order.clientName || '---';
        document.getElementById('modal-client-phone-text').innerText = order.clientPhone || '---';
        document.getElementById('modal-client-phone-link').href = `tel:${order.clientPhone.replace(/[^\d+]/g, '')}`;
        document.getElementById('modal-client-address-text').innerText = order.address || '---';
        const mapLink = document.getElementById('modal-client-map-link');
        
        if (order.address) {
            mapLink.style.display = 'flex';
            mapLink.onclick = (e) => {
                e.preventDefault();
                window.open(`https://yandex.ru/maps/?text=${encodeURIComponent(order.address)}`, '_blank');
            };
        } else {
            mapLink.style.display = 'none';
        }

        let totalPrice = 0;
        const servList = document.getElementById('modal-services-list');
        servList.innerHTML = '';
        
        order.services.forEach((s, index) => {
            totalPrice += (s.price * s.qty);
            const isLocked = (order.status !== 'progress') ? 'disabled' : '';
            const checkedAttr = s.done ? 'checked' : '';
            const doneClass = s.done ? 'done' : '';
            const timeDisplayHtml = s.done && s.doneAt ? `<div class="serv-time-static" style="font-size: 9px; color: var(--tree-light); font-weight: 800; margin-top: 6px; display: flex; align-items: center; gap: 4px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${s.doneAt}</div>` : `<div class="serv-time-static" style="font-size: 9px; color: var(--tree-light); font-weight: 800; margin-top: 6px; display: none; align-items: center; gap: 4px;"></div>`;

            servList.innerHTML += `
                <label class="service-item-static ${doneClass}" style="flex-direction: column; align-items: flex-start;">
                    <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; flex: 1;">
                            <input type="checkbox" class="service-checkbox" ${checkedAttr} ${isLocked} onchange="toggleServiceStatus('${order.id}', ${index}, this)">
                            <span class="serv-name-static">${s.name}</span>
                        </div>
                        <span class="serv-qty-static">${s.qty} հատ</span>
                    </div>
                    ${timeDisplayHtml}
                </label>`;
        });

        let companyFee = totalPrice * COMPANY_FEE_PERCENT;
        let masterNet = totalPrice - companyFee;
        
        document.getElementById('modal-fin-total').innerText = `${totalPrice.toLocaleString()} ֏`;
        document.getElementById('modal-fin-company').innerText = `- ${companyFee.toLocaleString()} ֏`;
        document.getElementById('modal-fin-master').innerText = `${masterNet.toLocaleString()} ֏`;

        const btnContainer = document.getElementById('modal-action-buttons');
        btnContainer.innerHTML = ''; 

        if (order.status === 'new') {
            btnContainer.innerHTML = `<button type="button" class="submit-btn success" style="width: 100%; border-radius: 16px;" onclick="acceptOrder('${order.id}')" data-i18n="btn_accept_order">Ընդունել պատվերը</button>`;
        } else if (order.status === 'progress') {
            btnContainer.innerHTML = `<button type="button" id="btn-finish-order" class="submit-btn" style="width: 100%; border-radius: 16px;" onclick="finishOrder('${order.id}')" data-i18n="btn_finish_order">Ավարտել պատվերը</button>`;
            checkIfOrderCanBeFinished(order.id); 
        }

        btnContainer.innerHTML += `<button type="button" class="submit-btn" style="width: 100%; border-radius: 16px; background: transparent; border: 1px solid var(--text-sec); color: var(--text);" onclick="closeOrderModal()" data-i18n="btn_close">Փակել</button>`;

        applyLanguage();
        document.getElementById('order-modal').classList.add('active');
    };

    window.closeOrderModal = function() {
        document.getElementById('order-modal').classList.remove('active');
    };

    window.toggleServiceStatus = function(orderId, serviceIndex, checkboxElem) {
        const order = ordersData.find(o => o.id === orderId);
        if (order && order.services[serviceIndex] && order.status === 'progress') {
            const isDone = checkboxElem.checked;
            order.services[serviceIndex].done = isDone;
            order.services[serviceIndex].doneAt = isDone ? getNowString() : null;

            const label = checkboxElem.closest('.service-item-static');
            const timeSpan = label.querySelector('.serv-time-static');

            if (isDone) { 
                label.classList.add('done'); 
                if (timeSpan) {
                    timeSpan.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${order.services[serviceIndex].doneAt}`;
                    timeSpan.style.display = 'flex';
                }
            } else { 
                label.classList.remove('done'); 
                if (timeSpan) {
                    timeSpan.innerHTML = '';
                    timeSpan.style.display = 'none';
                }
            }
            if (navigator.vibrate) navigator.vibrate(10);
            checkIfOrderCanBeFinished(orderId);
        }
    };

    window.checkIfOrderCanBeFinished = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        const finishBtn = document.getElementById('btn-finish-order');
        if (order && finishBtn) {
            const allServicesDone = order.services.every(s => s.done);
            if (allServicesDone) {
                finishBtn.disabled = false;
                finishBtn.classList.remove('disabled');
            } else {
                finishBtn.disabled = true;
                finishBtn.classList.add('disabled');
            }
        }
    };

    window.acceptOrder = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        if(order) {
            order.status = 'progress';
            order.acceptedAt = getNowString(); 
            if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
            closeOrderModal();
            updateOrderCounts();
            filterEmpOrders('progress', document.getElementById('tab-progress')); 
        }
    };

    window.finishOrder = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        if(order) {
            order.status = 'completed';
            order.completedAt = getNowString();
            order.isCommissionPaid = false; 
            if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
            closeOrderModal();
            updateOrderCounts();
            filterEmpOrders('completed', document.getElementById('tab-completed')); 
            renderEmployeeFinance(); 
        }
    };

    window.renderEmployeeProfile = function(emp) {
        document.getElementById('profile-name').innerText = emp.name;
        let pType = emp.typeLabel.split(' / ');
        document.getElementById('profile-type').innerText = currentLang === 'AM' ? pType[0] : (pType[1] || pType[0]);
        document.getElementById('profile-birth').innerText = emp.birthDate || '---';
        document.getElementById('profile-phone').innerText = emp.phone;
        document.getElementById('profile-address').innerText = emp.address || '---';
    };

    window.openEmpSelfEdit = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        if(!emp) return;
        document.getElementById('self-edit-name').value = emp.name;
        document.getElementById('self-edit-phone').value = emp.phone;
        document.getElementById('self-edit-birth').value = emp.birthDate || '';
        document.getElementById('self-edit-address').value = emp.address || '';
        document.getElementById('emp-self-edit-modal').classList.add('active');
    };

    window.closeEmpSelfEdit = function() {
        document.getElementById('emp-self-edit-modal').classList.remove('active');
    };

    window.saveEmpSelfEdit = function(e) {
        e.preventDefault();
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        if(!emp) return;
        emp.name = document.getElementById('self-edit-name').value;
        emp.phone = document.getElementById('self-edit-phone').value;
        emp.birthDate = document.getElementById('self-edit-birth').value;
        emp.address = document.getElementById('self-edit-address').value;
        closeEmpSelfEdit();
        renderEmployeeProfile(emp);
        if (navigator.vibrate) navigator.vibrate(50);
    };

    window.toggleContactMenu = function() {
        const wrapper = document.getElementById('contact-fab-wrapper');
        if (wrapper) {
            wrapper.classList.toggle('active');
            if (navigator.vibrate) navigator.vibrate(15);
        }
    };

    loggedInEmpId = localStorage.getItem('loggedInEmpId');
    const pinInput = document.getElementById('emp-pin-input');
    
    if (pinInput) {
        pinInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            e.target.value = val;
            
            if (val.length === 6) {
                const emp = employeesData.find(emp => emp.accessKey === val && emp.status === 'active');
                if (emp) {
                    e.target.blur(); 
                    localStorage.setItem('loggedInEmpId', emp.id);
                    loggedInEmpId = emp.id;
                    e.target.value = '';
                    if (navigator.vibrate) navigator.vibrate(50);
                    showEmployeeDashboard(emp.id);
                } else {
                    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                    e.target.classList.add('error-shake');
                    setTimeout(() => {
                        e.target.value = '';
                        e.target.classList.remove('error-shake');
                        e.target.focus();
                    }, 500);
                }
            }
        });
    }

    if (loggedInEmpId) showEmployeeDashboard(loggedInEmpId);

    applyLanguage();
});
