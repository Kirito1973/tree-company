// PWA Setup
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => console.error('Ошибка SW:', err));
    });
}

// ================= НАСТРОЙКИ КОМПАНИИ =================
const COMPANY_FEE_PERCENT = 0.20; 

// ================= ТЕМА И НАВИГАЦИЯ =================
function switchEmpTab(screenId, btnElement) {
    document.querySelectorAll('.emp-screen').forEach(scr => scr.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(btn => btn.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) targetScreen.classList.add('active');
    
    if (btnElement) btnElement.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20); 
}

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
    
    "welcome_title": { "AM": "Բարի գալուստ TREE!", "RU": "Добро пожаловать в TREE!", "EN": "Welcome to TREE!" },
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

    "stats_week": { "AM": "Այս շաբաթ", "RU": "На этой неделе", "EN": "This week" },
    "stats_month": { "AM": "Այս ամիս", "RU": "В этом месяце", "EN": "This month" },

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
    "btn_cancel": { "AM": "Չեղարկել", "RU": "Отмена", "EN": "Cancel" }
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
    {
        id: 'ORD-003', status: 'new', createdAt: '15.07.2026 10:00',
        clientName: 'Գոռ Վարդանյան', clientPhone: '+374 95 188 038', address: 'Երևան, Աբովյան 12',
        worker: 'Արմեն Սարգսյան',
        services: [{ name: 'Դռների տեղադրում (MDF)', qty: 2, price: 15000, done: false }]
    },
    {
        id: 'ORD-002', status: 'progress', createdAt: '14.07.2026 15:30',
        clientName: 'Աննա Հովհաննիսյան', clientPhone: '+374 91 555 444', address: 'Երևան, Մաշտոցի 4',
        worker: 'Արմեն Սարգսյան',
        services: [
            { name: 'Պլաստիկ պլինտուս', qty: 45, price: 600, done: true }, 
            { name: 'Անկյունակների տեղադրում', qty: 10, price: 200, done: false }
        ]
    },
    {
        id: 'ORD-001', status: 'completed', createdAt: '10.07.2026 09:00',
        clientName: 'Մարիամ Պողոսյան', clientPhone: '+374 77 123 456', address: 'Երևան, Բաղրամյան 1',
        worker: 'Արմեն Սարգսյան',
        services: [{ name: 'Փայտե դռան տեղադրում', qty: 1, price: 20000, done: true }]
    }
];

let employeesData = [
    { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', type: 'doors', typeLabel: 'Դռներ / Двери', phone: '+374 77 999 888', exp: '6 տարի / 6 лет', rating: 4.8, birthDate: '12.05.1990', address: 'Երևան, Կոմիտաս 45', accessKey: '123456' },
    { id: 'EMP-004', status: 'active', name: 'Գոռ Վարդանյան', type: 'universal', typeLabel: 'Ունիվերսալ / Универсал', phone: '+374 77 111 555', exp: '5 տարի / 5 лет', rating: 4.9, birthDate: '15.07.1992', address: 'Երևան, Տերյան 50', accessKey: '000000' }
];

// ================= ЛОГИКА =================
let loggedInEmpId = null;
let currentActiveOrderId = null;
let currentOrderFilter = 'new'; 

document.addEventListener('DOMContentLoaded', () => {
    
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    let rotationDegrees = 0;
    const savedTheme = localStorage.getItem('emp_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) { body.classList.add('force-dark'); } else { body.classList.add('force-light'); }

    const sunIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    function updateThemeIcon() {
        if (!themeIcon) return;
        themeIcon.innerHTML = body.classList.contains('force-dark') ? sunIcon : moonIcon;
    }
    updateThemeIcon();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            rotationDegrees += 360;
            themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
            if (body.classList.contains('force-dark')) {
                body.classList.remove('force-dark'); body.classList.add('force-light'); localStorage.setItem('emp_theme', 'dark');
            } else {
                body.classList.remove('force-light'); body.classList.add('force-dark'); localStorage.setItem('emp_theme', 'light');
            }
            setTimeout(updateThemeIcon, 150); 
        });
    }

    const langSwitcher = document.getElementById('lang-switcher');
    const currentLangBtn = document.getElementById('current-lang-btn');
    if (currentLangBtn && langSwitcher) {
        currentLangBtn.addEventListener('click', (e) => { e.stopPropagation(); langSwitcher.classList.toggle('open'); });
    }
    document.addEventListener('click', () => { if(langSwitcher) langSwitcher.classList.remove('open'); });
    
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            currentLang = tab.getAttribute('data-lang');
            localStorage.setItem('emp_app_lang', currentLang);
            
            applyLanguage();
            
            if (loggedInEmpId) {
                renderEmployeeOrders();
                renderEmployeeProfile(employeesData.find(emp => emp.id === loggedInEmpId));
                
                const emp = employeesData.find(emp => emp.id === loggedInEmpId);
                const firstName = emp.name.split(' ')[0];
                const greetings = { "AM": "Բարև", "RU": "Привет", "EN": "Hello" };
                document.querySelectorAll('#emp-greeting').forEach(el => el.innerHTML = `${greetings[currentLang]}, <b>${firstName}</b>!`);

                if (document.getElementById('order-modal').classList.contains('active') && currentActiveOrderId) {
                    openOrderModal(currentActiveOrderId);
                }
            }
            langSwitcher.classList.remove('open');
        });
    });

    window.showEmployeeDashboard = function(empId) {
        const emp = employeesData.find(e => e.id === empId);
        if (!emp) {
            logoutEmployee();
            return;
        }
        
        document.getElementById('screen-login').classList.remove('active');
        document.getElementById('screen-emp-news').classList.add('active');
        document.getElementById('emp-bottom-nav').style.display = 'flex';
        
        const firstName = emp.name.split(' ')[0];
        const greetings = { "AM": "Բարև", "RU": "Привет", "EN": "Hello" };
        document.querySelectorAll('#emp-greeting').forEach(el => el.innerHTML = `${greetings[currentLang]}, <b>${firstName}</b>!`);
        
        renderEmployeeOrders();
        renderEmployeeProfile(emp);
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

    window.renderEmployeeOrders = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        const list = document.getElementById('emp-personal-orders-list');
        if (!list || !emp) return;
        list.innerHTML = '';
        
        const empOrders = ordersData.filter(o => 
            o.worker && o.worker.includes(emp.name) && o.status === currentOrderFilter
        );
        
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
                </div>
            `;
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
        document.getElementById('modal-client-name').innerText = order.clientName || '---';
        document.getElementById('modal-client-phone-text').innerText = order.clientPhone || '---';
        document.getElementById('modal-client-phone-link').href = `tel:${order.clientPhone.replace(/[^\d+]/g, '')}`;
        
        // ИЗМЕНЕНИЕ ЗДЕСЬ: Логика Яндекс-карт
        document.getElementById('modal-client-address-text').innerText = order.address || '---';
        const mapLink = document.getElementById('modal-client-map-link');
        if (order.address) {
            mapLink.style.display = 'flex';
            // rtext=~ означает, что начальная точка - это текущая геопозиция устройства
            mapLink.href = `https://yandex.ru/maps/?mode=routes&rtext=~${encodeURIComponent(order.address)}`;
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

            servList.innerHTML += `
                <label class="service-item-static ${doneClass}">
                    <input type="checkbox" class="service-checkbox" ${checkedAttr} ${isLocked} onchange="toggleServiceStatus('${order.id}', ${index}, this)">
                    <span class="serv-name-static">${s.name}</span>
                    <span class="serv-qty-static">${s.qty} հատ</span>
                </label>
            `;
        });

        let companyFee = totalPrice * COMPANY_FEE_PERCENT;
        let masterNet = totalPrice - companyFee;
        
        document.getElementById('modal-fin-total').innerText = `${totalPrice.toLocaleString()} ֏`;
        document.getElementById('modal-fin-company').innerText = `- ${companyFee.toLocaleString()} ֏`;
        document.getElementById('modal-fin-master').innerText = `${masterNet.toLocaleString()} ֏`;

        const btnContainer = document.getElementById('modal-action-buttons');
        btnContainer.innerHTML = ''; 

        if (order.status === 'new') {
            btnContainer.innerHTML = `
                <button type="button" class="submit-btn success" style="width: 100%; border-radius: 16px;" onclick="acceptOrder('${order.id}')" data-i18n="btn_accept_order">
                    Ընդունել պատվերը
                </button>
            `;
        } else if (order.status === 'progress') {
            btnContainer.innerHTML = `
                <button type="button" id="btn-finish-order" class="submit-btn" style="width: 100%; border-radius: 16px;" onclick="finishOrder('${order.id}')" data-i18n="btn_finish_order">
                    Ավարտել պատվերը
                </button>
            `;
            checkIfOrderCanBeFinished(order.id); 
        }

        btnContainer.innerHTML += `
            <button type="button" class="submit-btn" style="width: 100%; border-radius: 16px; background: transparent; border: 1px solid var(--text-sec); color: var(--text);" onclick="closeOrderModal()" data-i18n="btn_close">
                Փակել
            </button>
        `;

        applyLanguage();
        document.getElementById('order-modal').classList.add('active');
    };

    window.closeOrderModal = function() {
        document.getElementById('order-modal').classList.remove('active');
    };

    window.toggleServiceStatus = function(orderId, serviceIndex, checkboxElem) {
        const order = ordersData.find(o => o.id === orderId);
        if (order && order.services[serviceIndex] && order.status === 'progress') {
            order.services[serviceIndex].done = checkboxElem.checked;
            const label = checkboxElem.closest('.service-item-static');
            if (checkboxElem.checked) { label.classList.add('done'); } else { label.classList.remove('done'); }
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
            if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
            closeOrderModal();
            filterEmpOrders('progress', document.getElementById('tab-progress')); 
        }
    };

    window.finishOrder = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        if(order) {
            order.status = 'completed';
            if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
            closeOrderModal();
            filterEmpOrders('completed', document.getElementById('tab-completed')); 
        }
    };

    window.renderEmployeeProfile = function(emp) {
        document.getElementById('profile-name').innerText = emp.name;
        
        let pType = emp.typeLabel.split(' / ');
        if(currentLang === 'AM') {
            document.getElementById('profile-type').innerText = pType[0];
        } else {
            document.getElementById('profile-type').innerText = pType[1] || pType[0];
        }

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

    if (loggedInEmpId) {
        showEmployeeDashboard(loggedInEmpId);
    }

    applyLanguage();
});
