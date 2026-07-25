const APP_VERSION = '5.3.0';

if (localStorage.getItem('tree_admin_version') !== APP_VERSION) {
    if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(regs => { for (let reg of regs) reg.unregister(); });
    if ('caches' in window) caches.keys().then(names => { for (let name of names) caches.delete(name); });
    localStorage.setItem('tree_admin_version', APP_VERSION);
    window.location.reload(true);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js?v=' + APP_VERSION).then(reg => reg.update()); });
}

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
    "filter_new": { "AM": "Նոր (Առանց վարպետի)", "RU": "Новые", "EN": "New" },
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
    "lbl_all_clients": { "AM": "Բոլորը", "RU": "Все клиенты", "EN": "All clients" },
    "lbl_name": { "AM": "Անուն:", "RU": "Имя:", "EN": "Name:" },
    "lbl_phone": { "AM": "Հեռ.:", "RU": "Тел.:", "EN": "Phone:" },
    "lbl_address": { "AM": "Հասցե:", "RU": "Адрес:", "EN": "Address:" },
    "lbl_master": { "AM": "Գլխավոր:", "RU": "Мастер:", "EN": "Master:" }
};

window.currentAdminLang = localStorage.getItem('admin_app_lang') || 'AM';
let rotationDegrees = 0;

window.toggleTheme = function(e) {
    e.stopPropagation(); rotationDegrees += 360; 
    const themeIcon = document.getElementById('theme-icon'); if (themeIcon) themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
    const body = document.body;
    if (body.classList.contains('force-dark')) { body.classList.remove('force-dark'); body.classList.add('force-light'); localStorage.setItem('admin_theme', 'light'); } 
    else { body.classList.remove('force-light'); body.classList.add('force-dark'); localStorage.setItem('admin_theme', 'dark'); }
    setTimeout(() => { if(themeIcon) themeIcon.innerHTML = body.classList.contains('force-dark') ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`; }, 150); 
};

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

window.getEmpTypeLabel = function(type) { const key = 'cat_' + type; if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) return window.adminTranslations[key][window.currentAdminLang]; return type; };

window.applyAdminLanguage = function() {
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) el.innerHTML = window.adminTranslations[key][window.currentAdminLang]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.getAttribute('data-i18n-placeholder'); if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) el.placeholder = window.adminTranslations[key][window.currentAdminLang]; });
}

// === БАЗА ДАННЫХ ===
window.ordersData = [ { id: 'ORD-004', status: 'incoming', createdAt: '25.07.2026', completedAt: null, clientName: 'Արամ', clientPhone: '+374 98 123 789', address: 'Տերյան 50', worker: 'Չկա', workerPhone: '', services: [{ name: 'Էլեկտրիկ', qty: 1, price: 5000, done: false }], profit: 500 }, { id: 'ORD-003', status: 'new', createdAt: '15.07.2026', completedAt: null, clientName: 'Գոռ Վարդանյան', clientPhone: '+374 95 188 038', address: 'Աբովյան 12', worker: 'Չկա', workerPhone: '', services: [{ name: 'Դռների տեղադրում (MDF)', qty: 2, price: 15000, done: false }], profit: 3000 } ];
window.employeesData = [ { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', type: 'doors', phone: '+374 77 999 888', exp: '6', rating: 4.8, birthDate: '12.05.1990', address: 'Կոմիտաս 45', accessKey: '123456', companyDebt: -2500, workingDates: [] }, { id: 'EMP-005', status: 'pending', name: 'Արամ Գևորգյան', type: 'electro', phone: '+374 98 000 111', exp: '2', rating: 0.0, birthDate: '05.08.1998', address: 'Րաֆֆու 10', accessKey: '', companyDebt: 0, workingDates: [] } ];
window.clientsData = [ { id: 'TR-1234', name: 'Արամ', phone: '+374 98 123 789', address: 'Տերյան 50', discount: 0 } ];
window.servicesData = [ { id: 'srv1', name: 'Դռներ', price: 15000, icon: '<svg></svg>', status: 'active' } ];
window.partnersData = [ { id: 'p1', name: 'BuildingCorp', logo: '<svg></svg>' } ];
window.reviewsData = [ { id: 'REV-001', isNew: true, clientName: 'Աննա', masterName: 'Արմեն', rating: 5, text: 'Շատ գոհ եմ:', date: '22.07.2026' } ];
window.cooperationRequestsData = [ { id: 'COOP-REQ-01', company: 'BuildMaster LLC', contact: 'Արմեն', phone: '+374 99 112 233', text: 'Առաջարկում ենք 20% զեղչ:', date: '24.07.2026', status: 'pending' } ];

window.generateOrderId = function() { return 'ORD-' + Math.floor(Math.random() * 1000); };
window.generateEmpId = function() { return 'EMP-' + Math.floor(Math.random() * 1000); };
window.getCurrentDateString = function() { const d = new Date(); return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear(); };

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
}

document.addEventListener('DOMContentLoaded', () => {
    window.applyAdminLanguage();
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.innerHTML = document.body.classList.contains('force-dark') ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`; 

    // === ПРОВЕРКА ПАРОЛЯ ПРИ СТАРТЕ ===
    const authScreen = document.getElementById('auth-screen');
    const pinInput = document.getElementById('pin-input');
    const authError = document.getElementById('auth-error');

    if (sessionStorage.getItem('tree_authenticated') === 'true') {
        authScreen.classList.add('hidden');
    } else {
        authScreen.classList.remove('hidden');
        setTimeout(() => pinInput.focus(), 300);
    }

    pinInput.addEventListener('input', (e) => {
        authError.style.opacity = '0';
        let val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val;
        
        if (val.length === 6) {
            if (val === '000000') {
                sessionStorage.setItem('tree_authenticated', 'true');
                authScreen.classList.add('hidden');
                pinInput.blur();
                if (navigator.vibrate) navigator.vibrate(20);
            } else {
                if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
                authError.style.opacity = '1';
                pinInput.value = ''; 
            }
        }
    });

    // === ЗАЩИТА В МНОГОЗАДАЧНОСТИ ===
    const privacyScreen = document.getElementById('privacy-overlay');
    document.addEventListener("visibilitychange", () => {
        if (document.hidden || document.visibilityState === 'hidden') {
            privacyScreen.style.opacity = '1'; // Экран чернеет, когда свернули
        } else {
            privacyScreen.style.opacity = '0'; // Экран открывается, когда вернулись
        }
    });

    if(window.updateDashDots) window.updateDashDots();
});
