// =========================================================
// ЯДРО СИСТЕМЫ И ИНИЦИАЛИЗАЦИЯ (Автообновляемая версия)
// =========================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('./sw.js').then(reg => {
            reg.update(); 
        }); 
    });
}

window.currentAdminLang = localStorage.getItem('admin_app_lang') || 'AM';

window.adminTranslations = {
    "tab_dashboard": { "AM": "Գլխավոր", "RU": "Главная", "EN": "Dashboard" },
    "tab_orders": { "AM": "Պատվերներ", "RU": "Заказы", "EN": "Orders" },
    "tab_finance": { "AM": "Ֆինանսներ", "RU": "Финансы", "EN": "Finance" },
    "tab_employees": { "AM": "Աշխատակիցներ", "RU": "Работники", "EN": "Staff" },
    "tab_partners": { "AM": "Գործընկ.", "RU": "Партнеры", "EN": "Partners" },
    "tab_clients": { "AM": "Հաճախորդ", "RU": "Клиенты", "EN": "Clients" },
    "tab_management": { "AM": "Կառավար.", "RU": "Управл.", "EN": "Manage" },
    "lbl_new_requests": { "AM": "Նոր հայտեր", "RU": "Входящие запросы", "EN": "New Requests" },
    "sw_inc_masters": { "AM": "Նոր աշխատակիցներ", "RU": "Новые работники", "EN": "New Staff" },
    "lbl_new_partners": { "AM": "Նոր գործընկերներ", "RU": "Новые партнеры", "EN": "New Partners" },
    "lbl_active_partners": { "AM": "Ակտիվ ընկերություններ", "RU": "Активные компании", "EN": "Active Partners" },
    "lbl_recent_reviews": { "AM": "Վերջին կարծիքները", "RU": "Последние отзывы", "EN": "Recent Reviews" },
    "title_orders": { "AM": "Ակտիվ <span>պատվերներ</span>", "RU": "Активные <span>заказы</span>", "EN": "Active <span>Orders</span>" },
    "btn_accept_order": { "AM": "Ընդունել", "RU": "Принять", "EN": "Accept" },
    "btn_reject_order": { "AM": "Մերժել", "RU": "Отказать", "EN": "Reject" },
    "filter_all": { "AM": "Բոլորը", "RU": "Все", "EN": "All" },
    "filter_new": { "AM": "Նոր", "RU": "Новые", "EN": "New" },
    "filter_progress": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "In Progress" },
    "filter_completed": { "AM": "Ավարտված", "RU": "Завершенные", "EN": "Completed" },
    "status_incoming": { "AM": "Սպասում է", "RU": "Ожидает", "EN": "Pending" },
    "status_new": { "AM": "Նոր", "RU": "Новый", "EN": "New" },
    "status_pending": { "AM": "Ընթացքի մեջ", "RU": "В обработке", "EN": "Pending" },
    "status_success": { "AM": "Ավարտված է", "RU": "Успешно", "EN": "Success" },
    "status_cancelled": { "AM": "Չեղարկված է", "RU": "Отменен", "EN": "Cancelled" },
    "btn_edit_order": { "AM": "Խմբագրել", "RU": "Изменить", "EN": "Edit" },
    "btn_cancel_order": { "AM": "Չեղարկել", "RU": "Отменить", "EN": "Cancel" },
    "lbl_client_details": { "AM": "Հաճախորդ", "RU": "Клиент", "EN": "Client" },
    "lbl_worker_details": { "AM": "Աշխատող", "RU": "Сотрудник", "EN": "Worker" },
    "lbl_client_name": { "AM": "Անուն Ազգանուն", "RU": "Имя Фамилия", "EN": "Full Name" },
    "lbl_services": { "AM": "Ծառայություններ", "RU": "Услуги", "EN": "Services" },
    "lbl_total": { "AM": "Ընդհանուր", "RU": "Итого", "EN": "Total" },
    "lbl_profit": { "AM": "Շահույթ", "RU": "Прибыль", "EN": "Profit" },
    "lbl_date_created": { "AM": "Ստեղծման ամսաթիվ", "RU": "Оформлен", "EN": "Created At" },
    "lbl_date_completed": { "AM": "Ավարտման ամսաթիվ", "RU": "Завершен", "EN": "Completed At" },
    "lbl_active_emps": { "AM": "Ակտիվ աշխատողներ", "RU": "Активные сотрудники", "EN": "Active Employees" },
    "cat_all": { "AM": "Բոլորը", "RU": "Все", "EN": "All" },
    "cat_doors": { "AM": "Դռներ", "RU": "Двери", "EN": "Doors" },
    "cat_electro": { "AM": "Էլեկտրիկներ", "RU": "Электрики", "EN": "Electricians" },
    "cat_universal": { "AM": "Ունիվերսալ", "RU": "Универсалы", "EN": "Universal" },
    "status_check": { "AM": "Ստուգում", "RU": "Проверка", "EN": "Checking" },
    "lbl_turnover": { "AM": "Շրջանառություն", "RU": "Оборот", "EN": "Turnover" },
    "lbl_income": { "AM": "Եկամուտ", "RU": "Доход", "EN": "Income" },
    "lbl_history": { "AM": "Պատմություն", "RU": "История", "EN": "History" },
    "lbl_manage_promo": { "AM": "Կառավարում", "RU": "Управление", "EN": "Manage" },
    "btn_save": { "AM": "Պահպանել", "RU": "Сохранить", "EN": "Save" },
    "btn_cancel": { "AM": "Չեղարկել", "RU": "Отмена", "EN": "Cancel" },
    "btn_close": { "AM": "Փակել", "RU": "Закрыть", "EN": "Close" },
    "btn_add": { "AM": "+ Ավելացնել", "RU": "+ Добавить", "EN": "+ Add" },
    "lbl_all_clients": { "AM": "Բոլորը", "RU": "Все клиенты", "EN": "All clients" },
    "lbl_name": { "AM": "Անուն:", "RU": "Имя:", "EN": "Name:" },
    "lbl_phone": { "AM": "Հեռ.:", "RU": "Тел.:", "EN": "Phone:" },
    "lbl_address": { "AM": "Հասցե:", "RU": "Адрес:", "EN": "Address:" },
    "lbl_pin": { "AM": "PIN կոդ:", "RU": "PIN код:", "EN": "PIN code:" },
    "lbl_bday": { "AM": "Ծննդ.:", "RU": "Дата рожд.:", "EN": "Birth:" },
    "lbl_exp": { "AM": "Փորձ", "RU": "Опыт", "EN": "Experience" },
    "lbl_debt": { "AM": "Պարտք:", "RU": "Долг:", "EN": "Debt:" },
    "lbl_schedule": { "AM": "Աշխատանքային գրաֆիկ", "RU": "График работы", "EN": "Work Schedule" },
    "btn_add_debt": { "AM": "+ Պարտք", "RU": "+ Долг", "EN": "+ Debt" },
    "btn_add_bonus": { "AM": "- Բոնուս", "RU": "- Бонус", "EN": "- Bonus" },
    "lbl_add_partner": { "AM": "Ավելացնել գործընկեր", "RU": "Добавить партнера", "EN": "Add Partner" },
    "lbl_add_service": { "AM": "Ավելացնել ծառայություն", "RU": "Добавить услугу", "EN": "Add Service" },
    "lbl_price_base": { "AM": "Գինը (֏)", "RU": "Базовая цена (֏)", "EN": "Base Price (֏)" },
    "lbl_icon": { "AM": "SVG Պատկեր", "RU": "SVG Иконка", "EN": "SVG Icon" },
    "lbl_logo": { "AM": "Լոգո (URL կամ SVG)", "RU": "Лого (URL/SVG)", "EN": "Logo (URL/SVG)" }
};

// ТЕСТОВЫЕ ДАННЫЕ 
window.ordersData = [
    { id: 'ORD-004', status: 'incoming', createdAt: '25.07.2026', completedAt: null, clientName: 'Արամ Խաչատրյան', clientPhone: '+374 98 123 789', address: 'Երևան, Տերյան 50', worker: 'Չկա', workerPhone: '', services: [{ name: 'Էլեկտրիկի ծառայություն', qty: 1, price: 5000, done: false }], profit: 500 },
    { id: 'ORD-005', status: 'incoming', createdAt: '26.07.2026', completedAt: null, clientName: 'Լևոն Սարգսյան', clientPhone: '+374 91 112 233', address: 'Երևան, Կիևյան 15', worker: 'Չկա', workerPhone: '', services: [{ name: 'Խողովակների փոխարինում', qty: 1, price: 12000, done: false }], profit: 1200 },
    { id: 'ORD-006', status: 'incoming', createdAt: '26.07.2026', completedAt: null, clientName: 'Մարիամ Գրիգորյան', clientPhone: '+374 99 445 566', address: 'Երևան, Բաղրամյան 2', worker: 'Չկա', workerPhone: '', services: [{ name: 'Լամինատի տեղադրում', qty: 20, price: 2000, done: false }], profit: 4000 }
];

window.employeesData = [
    { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', type: 'doors', phone: '+374 77 999 888', exp: '6', rating: 4.8, birthDate: '12.05.1990', address: 'Երևան, Կոմիտաս 45', accessKey: '123456', companyDebt: -2500, workingDates: ['20.07.2026'] },
    { id: 'EMP-005', status: 'pending', name: 'Արամ Գևորգյան', type: 'electro', phone: '+374 98 000 111', exp: '2', rating: 0.0, birthDate: '05.08.1998', address: 'Երևան, Րաֆֆու 10', accessKey: '', companyDebt: 0, workingDates: [] },
    { id: 'EMP-006', status: 'pending', name: 'Կարեն Մինասյան', type: 'doors', phone: '+374 55 777 888', exp: '5', rating: 0.0, birthDate: '10.10.1995', address: 'Երևան, Շիրազի 5', accessKey: '', companyDebt: 0, workingDates: [] }
];

window.cooperationRequestsData = [
    { id: 'COOP-REQ-01', company: 'BuildMaster LLC', contact: 'Արմեն Հակոբյան', phone: '+374 99 112 233', text: 'Առաջարկում ենք շինանյութի մատակարարում 20% զեղչով:', date: '24.07.2026', status: 'pending' },
    { id: 'COOP-REQ-02', company: 'DoorTech', contact: 'Աննա', phone: '+374 98 555 666', text: 'Պատրաստ ենք տրամադրել MDF դռներ մեծածախ գներով:', date: '25.07.2026', status: 'pending' }
];

// 5 НОВЫХ И 3 СТАРЫХ ОТЗЫВА
window.reviewsData = [
    // --- НОВЫЕ (isNew: true) ---
    { id: 'REV-008', isNew: true, clientName: 'Մարիա Գրիգորյան', masterName: 'Արմեն Սարգսյան', rating: 5, text: 'Շատ արագ և որակով տեղադրեցին դռները: Վարպետն իր գործի գիտակն է, անպայման էլի կդիմեմ ձեզ:', date: '25.07.2026' },
    { id: 'REV-007', isNew: true, clientName: 'Տիգրան Հարությունյան', masterName: 'Կարեն Մինասյան', rating: 4.5, text: 'Ամեն ինչ նորմալ էր, շնորհակալություն վարպետին: Մի փոքր աղբ մնաց աշխատանքից հետո, դրա համար կես աստղ իջեցրեցի:', date: '25.07.2026' },
    { id: 'REV-006', isNew: true, clientName: 'Լուսինե', masterName: 'Կարեն (Universal)', rating: 5, text: 'Գերազանց սպասարկում: Խորհուրդ եմ տալիս բոլորին: Շատ բարեհամբույր և պրոֆեսիոնալ մոտեցում:', date: '24.07.2026' },
    { id: 'REV-005', isNew: true, clientName: 'Հայկ Պետրոսյան', masterName: 'Արմեն Սարգսյան', rating: 4, text: 'Լավ աշխատանք, բայց փոքր-ինչ ուշացան պայմանավորված ժամից: Արդյունքը գոհացնող է:', date: '24.07.2026' },
    { id: 'REV-004', isNew: true, clientName: 'Աննա Հովհաննիսյան', masterName: 'Արմեն Սարգսյան', rating: 5, text: 'Շատ գոհ եմ արդյունքից: Ամեն ինչ կատարվել է ժամանակին և որակով: Շնորհակալություն ամբողջ թիմին:', date: '23.07.2026' },
    // --- СТАРЫЕ (isNew: false) ---
    { id: 'REV-003', isNew: false, clientName: 'Արթուր', masterName: 'Արամ Գևորգյան', rating: 3.5, text: 'Միջին որակի աշխատանք, սպասում էի ավելին: Բայց գինը մատչելի էր, այնպես որ նորմալ է:', date: '20.07.2026' },
    { id: 'REV-002', isNew: false, clientName: 'Գոհար', masterName: 'Տիգրան Վարդանյան', rating: 5, text: 'Հիանալի աշխատանք: Շնորհակալություն արագ արձագանքելու համար:', date: '18.07.2026' },
    { id: 'REV-001', isNew: false, clientName: 'Վարդան', masterName: 'Կարեն Մինասյան', rating: 4, text: 'Լավ մաստեր էր, բայց նյութերի գները մի քիչ բարձր են շուկայականից:', date: '15.07.2026' }
];

window.clientsData = [ { id: 'TR-1234', name: 'Արամ Խաչատրյան', phone: '+374 98 123 789', address: 'Երևան, Տերյան 50', discount: 0 } ];
window.servicesData = [ { id: 'srv1', name: 'Դռների տեղադրում', price: 15000, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 22h12"/><path d="M4 22h16"/><path d="M14 12h.01"/></svg>', status: 'active' } ];
window.partnersData = [ { id: 'p1', name: 'BuildingCorp', logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>' } ];

// УТИЛИТЫ
window.generateOrderId = function() { return 'ORD-' + Math.floor(100 + Math.random() * 900); };
window.generateEmpId = function() { return 'EMP-' + Math.floor(100 + Math.random() * 900); };
window.getCurrentDateString = function() { const d = new Date(); return String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear(); };
window.getEmpTypeLabel = function(type) { const key = 'cat_' + type; return (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) ? window.adminTranslations[key][window.currentAdminLang] : type; };

window.getBirthdayInfo = function(dateStr) {
    if (!dateStr || !dateStr.includes('.')) return null;
    const parts = dateStr.split('.'); if (parts.length < 2) return null;
    const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; 
    const today = new Date(); today.setHours(0,0,0,0);
    const currentYear = today.getFullYear();
    let nextBday = new Date(currentYear, month, day);
    if (nextBday < today) nextBday.setFullYear(currentYear + 1);
    const diffTime = nextBday - today;
    return { isToday: (today.getDate() === day && today.getMonth() === month), daysLeft: Math.ceil(diffTime / (1000 * 60 * 60 * 24)) };
};

// ТЕМА И ЯЗЫК
let rotationDegrees = 0;
window.toggleTheme = function(e) {
    e.stopPropagation(); rotationDegrees += 360; 
    const themeIcon = document.getElementById('theme-icon'); if (themeIcon) themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
    const body = document.body;
    if (body.classList.contains('force-dark')) { body.classList.remove('force-dark'); body.classList.add('force-light'); localStorage.setItem('admin_theme', 'light'); } 
    else { body.classList.remove('force-light'); body.classList.add('force-dark'); localStorage.setItem('admin_theme', 'dark'); }
    setTimeout(updateThemeIcon, 150); 
};

function updateThemeIcon() { 
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.innerHTML = document.body.classList.contains('force-dark') ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`; 
}

window.toggleLangMenu = function(e) { e.stopPropagation(); document.getElementById('lang-switcher').classList.toggle('open'); };
window.setAdminLang = function(lang, e) {
    e.stopPropagation(); window.currentAdminLang = lang; localStorage.setItem('admin_app_lang', window.currentAdminLang);
    document.querySelectorAll('.lang-tab').forEach(tab => { if (tab.getAttribute('data-lang') === lang) tab.classList.add('active'); else tab.classList.remove('active'); });
    const activeTab = document.querySelector(`.lang-tab[data-lang="${lang}"]`); if(activeTab) document.getElementById('current-lang-btn').innerHTML = activeTab.innerHTML;
    window.applyAdminLanguage(); 
    if(window.renderDashboardOrders) window.renderDashboardOrders();
    if(window.renderOrders) window.renderOrders(); 
    if(window.renderEmployees) window.renderEmployees(); 
    if(window.renderClients) window.renderClients(); 
    document.getElementById('lang-switcher').classList.remove('open');
};
document.addEventListener('click', () => { const switcher = document.getElementById('lang-switcher'); if(switcher) switcher.classList.remove('open'); });

window.applyAdminLanguage = function() {
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) el.innerHTML = window.adminTranslations[key][window.currentAdminLang]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.getAttribute('data-i18n-placeholder'); if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) el.placeholder = window.adminTranslations[key][window.currentAdminLang]; });
};

// ГЛАВНАЯ НАВИГАЦИЯ
window.switchTab = function(screenId, btnElement) {
    document.querySelectorAll('.admin-screen').forEach(scr => scr.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(btn => btn.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    btnElement.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20); 

    if(screenId === 'screen-dashboard' && window.switchDashboardView) window.switchDashboardView('overview');
    if(screenId === 'screen-orders' && window.filterOrders) window.filterOrders();
    if(screenId === 'screen-employees' && window.renderEmployees) window.renderEmployees();
    if(screenId === 'screen-partners' && window.renderAdminPartners) window.renderAdminPartners();
    if(screenId === 'screen-clients' && window.renderClients) window.renderClients();
    if(screenId === 'screen-management' && window.switchManagementTab) {
        let activeMngTab = document.querySelector('#screen-management .view-switch-btn.active') || document.querySelector('#screen-management .view-switch-btn');
        window.switchManagementTab('promo', activeMngTab);
    }
};

// ИНИЦИАЛИЗАЦИЯ И ЛОГИКА АВТОРИЗАЦИИ
function initApp() {
    updateThemeIcon();
    window.applyAdminLanguage();
    
    const authScreen = document.getElementById('auth-screen');
    const pinInput = document.getElementById('pin-input');
    const authError = document.getElementById('auth-error');

    function checkPinCode(val) {
        const emp = window.employeesData.find(emp => emp.accessKey === val && emp.status === 'active');
        const isMaster = (val === '6000' || val === '000000' || val === '006000' || val === '600000');
        
        if (isMaster || emp) {
            sessionStorage.setItem('tree_authenticated', 'true');
            authScreen.classList.add('hidden');
            pinInput.blur();
            pinInput.value = ''; 
            if (navigator.vibrate) navigator.vibrate(20);
            if(window.updateDashDots) window.updateDashDots();
            if(window.switchDashboardView) window.switchDashboardView('overview');
        } else {
            if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
            authError.style.opacity = '1';
            pinInput.value = ''; 
        }
    }

    if (sessionStorage.getItem('tree_authenticated') === 'true') {
        authScreen.classList.add('hidden');
        if(window.updateDashDots) window.updateDashDots();
        if(window.switchDashboardView) window.switchDashboardView('overview');
        if(window.renderOrders) window.renderOrders();
        if(window.renderEmployees) window.renderEmployees();
    } else {
        authScreen.classList.remove('hidden');
        setTimeout(() => pinInput.focus(), 300);
    }

    pinInput.addEventListener('input', (e) => {
        authError.style.opacity = '0';
        const val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val;
        
        if (val === '6000') {
            checkPinCode(val);
        } else if (val.length >= 6) {
            checkPinCode(val.substring(0, 6)); 
        }
    });

    const privacyScreen = document.getElementById('privacy-overlay');
    document.addEventListener("visibilitychange", () => {
        if (document.hidden || document.visibilityState === 'hidden') { privacyScreen.style.opacity = '1'; } 
        else { privacyScreen.style.opacity = '0'; }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
