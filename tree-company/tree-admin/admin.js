// =========================================================
// СИСТЕМА ЖЕСТКОГО АВТООБНОВЛЕНИЯ PWA (Версия 4.8.0)
// =========================================================
const APP_VERSION = '4.8.0';

if (localStorage.getItem('tree_admin_version') !== APP_VERSION) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
            for (let reg of regs) reg.unregister();
        });
    }
    if ('caches' in window) {
        caches.keys().then(names => {
            for (let name of names) caches.delete(name);
        });
    }
    localStorage.setItem('tree_admin_version', APP_VERSION);
    if (!window.location.search.includes('v=')) {
        window.location.href = window.location.pathname + '?v=' + APP_VERSION;
    } else {
        window.location.reload(true);
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js?v=' + APP_VERSION).then(reg => reg.update());
    });
}

// ================= ГЛАВНАЯ НАВИГАЦИЯ =================
function switchTab(screenId, btnElement) {
    document.querySelectorAll('.admin-screen').forEach(scr => scr.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(btn => btn.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    btnElement.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20); 

    if(screenId === 'screen-dashboard') switchDashboardView('overview');
    if(screenId === 'screen-orders') filterOrders();
    if(screenId === 'screen-employees') renderEmployees();
    if(screenId === 'screen-partners') renderAdminPartners();
    if(screenId === 'screen-clients') renderClients();
    if(screenId === 'screen-management') {
        let activeMngTab = document.querySelector('#screen-management .view-switch-btn.active') || document.querySelector('#screen-management .view-switch-btn');
        switchManagementTab('promo', activeMngTab);
    }
}

let dashViewedState = { orders: 0, masters: 0, partners: 0 };

function updateDashDots() {
    const incOrders = ordersData.filter(o => o.status === 'incoming').length;
    const incMasters = employeesData.filter(e => e.status === 'pending').length;
    const incPartners = cooperationRequestsData.filter(c => c.status === 'pending').length;
    const incReviews = reviewsData.filter(r => r.isNew).length;

    document.getElementById('dash-dot-orders').style.display = (incOrders > dashViewedState.orders) ? 'block' : 'none';
    document.getElementById('dash-dot-masters').style.display = (incMasters > dashViewedState.masters) ? 'block' : 'none';
    document.getElementById('dash-dot-partners').style.display = (incPartners > dashViewedState.partners) ? 'block' : 'none';
    document.getElementById('dash-dot-overview').style.display = (incReviews > 0) ? 'block' : 'none';
}

function switchDashboardView(viewName) {
    document.querySelectorAll('.dash-view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-dash-view="${viewName}"]`).classList.add('active');
    
    document.querySelectorAll('.dash-view-content').forEach(el => el.style.display = 'none');
    document.getElementById('dash-' + viewName).style.display = 'block';

    if (viewName === 'orders') dashViewedState.orders = ordersData.filter(o => o.status === 'incoming').length;
    if (viewName === 'masters') dashViewedState.masters = employeesData.filter(e => e.status === 'pending').length;
    if (viewName === 'partners') dashViewedState.partners = cooperationRequestsData.filter(c => c.status === 'pending').length;

    updateDashDots();

    if(viewName === 'overview') renderDashboardOverview();
    if(viewName === 'orders') renderDashboardOrders();
    if(viewName === 'masters') renderDashboardMasters();
    if(viewName === 'partners') renderDashboardPartnerRequests();
    if (navigator.vibrate) navigator.vibrate(10);
}

function switchManagementTab(tabName, btnElement) {
    document.querySelectorAll('#screen-management > div[id^="mng-view-"]').forEach(el => el.style.display = 'none');
    document.getElementById('mng-view-' + tabName).style.display = 'block';
    
    document.querySelectorAll('#screen-management .view-switch-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    if(tabName === 'services') renderAdminServices();
    if (navigator.vibrate) navigator.vibrate(10);
}

let currentDashOrdFilter = 'all';
function setOrderFilter(filterValue) {
    currentDashOrdFilter = filterValue;
    document.querySelectorAll('#screen-orders .filter-tab').forEach(t => {
        if (t.getAttribute('data-filter') === filterValue) t.classList.add('active');
        else t.classList.remove('active');
    });
    filterOrders();
}

if(document.getElementById('order-search')) {
    document.getElementById('order-search').addEventListener('input', filterOrders);
}

// ================= ЛОКАЛИЗАЦИЯ И СЛОВАРЬ =================
const adminTranslations = {
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
    "cat_cleaning": { "AM": "Մաքրում", "RU": "Уборка", "EN": "Cleaning" },
    "status_check": { "AM": "Ստուգում", "RU": "Проверка", "EN": "Checking" },
    
    "lbl_turnover": { "AM": "Շրջանառություն (Ամիս)", "RU": "Оборот (Мес)", "EN": "Turnover (Mo)" },
    "lbl_income": { "AM": "Եկամուտ (15%)", "RU": "Доход (15%)", "EN": "Income (15%)" },
    "lbl_history": { "AM": "Վճարումների պատմություն", "RU": "История начислений", "EN": "Payment History" },
    "com_1": { "AM": "Միջնորդավճար #ORD-003", "RU": "Комиссия по #ORD-003", "EN": "Commission #ORD-003" },
    "com_paid_1": { "AM": "Վճարված է կատարողի կողմից • Այսօր 14:12", "RU": "Оплачено исполнителем • Сегодня 14:12", "EN": "Paid by contractor • Today 14:12" },
    
    "lbl_manage_promo": { "AM": "Զեղչի առաջարկի կառավարում", "RU": "Управление скидочным предложением", "EN": "Manage discount offer" },
    "lbl_discount_pct": { "AM": "Զեղչի տոկոս (%)", "RU": "Процент скидки (%)", "EN": "Discount percentage (%)" },
    "lbl_banner_am": { "AM": "Տեքստ բանների համար (Հայերեն)", "RU": "Текст баннера (Армянский)", "EN": "Banner text (Armenian)" },
    "lbl_banner_ru": { "AM": "Տեքստ բանների համար (Ռուսերեն)", "RU": "Текст баннера (Русский)", "EN": "Banner text (Russian)" },
    "lbl_banner_en": { "AM": "Տեքստ բանների համար (Անգլերեն)", "RU": "Текст баннера (Английский)", "EN": "Banner text (English)" },
    "btn_save_promo": { "AM": "Պահպանել", "RU": "Сохранить", "EN": "Save" },
    "lbl_localization": { "AM": "Հավելվածի լոկալիզացիա", "RU": "Локализация приложения", "EN": "App localization" },
    "lbl_loading": { "AM": "Բազայի բեռնում...", "RU": "Загрузка базы...", "EN": "Loading database..." },
    "btn_save_trans": { "AM": "Պահպանել թարգմանությունները", "RU": "Сохранить переводы", "EN": "Save translations" },
    
    "tab_promo": { "AM": "Ակցիաներ", "RU": "Акции", "EN": "Promo" },
    "admin_key_title": { "AM": "Բանալի:", "RU": "Ключ:", "EN": "Key:" },
    "lbl_all_clients": { "AM": "Բոլոր հաճախորդները", "RU": "Все клиенты", "EN": "All clients" },
    "lbl_name": { "AM": "Անուն:", "RU": "Имя:", "EN": "Name:" },
    "lbl_phone": { "AM": "Հեռ.:", "RU": "Тел.:", "EN": "Phone:" },
    "lbl_address": { "AM": "Հասցե:", "RU": "Адрес:", "EN": "Address:" },
    "lbl_master": { "AM": "Գլխավոր:", "RU": "Мастер:", "EN": "Master:" },
    "lbl_assistant": { "AM": "Օգնական:", "RU": "Помощник:", "EN": "Assistant:" },
    "btn_close": { "AM": "Փակել", "RU": "Закрыть", "EN": "Close" },
    "btn_save": { "AM": "Պահպանել", "RU": "Сохранить", "EN": "Save" },
    "btn_cancel": { "AM": "Չեղարկել", "RU": "Отмена", "EN": "Cancel" },
    "lbl_pin": { "AM": "PIN կոդ:", "RU": "PIN код:", "EN": "PIN code:" },
    "lbl_bday": { "AM": "Ծննդ.:", "RU": "Дата рожд.:", "EN": "Birth:" },
    "lbl_schedule": { "AM": "Աշխատանքային գրաֆիկ", "RU": "График работы", "EN": "Work Schedule" },
    "lbl_debt": { "AM": "Պարտք:", "RU": "Долг:", "EN": "Debt:" },
    "lbl_exp": { "AM": "Փորձ", "RU": "Опыт", "EN": "Experience" },
    "lbl_rating": { "AM": "Վարկանիշ", "RU": "Рейтинг", "EN": "Rating" },
    "btn_add_debt": { "AM": "+ Պարտք", "RU": "+ Долг", "EN": "+ Debt" },
    "btn_add_bonus": { "AM": "- Բոնուս", "RU": "- Бонус", "EN": "- Bonus" },
    "btn_reset": { "AM": "Զրոյացնել", "RU": "Сброс", "EN": "Reset" },
    "lbl_type": { "AM": "Մասնագիտություն", "RU": "Тип", "EN": "Type" },
    "lbl_add_service": { "AM": "Ավելացնել ծառայություն", "RU": "Добавить услугу", "EN": "Add Service" },
    "lbl_price_base": { "AM": "Գինը (֏)", "RU": "Базовая цена (֏)", "EN": "Base Price (֏)" },
    "lbl_icon": { "AM": "SVG Պատկեր", "RU": "SVG Иконка", "EN": "SVG Icon" },
    "lbl_status": { "AM": "Կարգավիճակ", "RU": "Статус", "EN": "Status" },
    "btn_add": { "AM": "+ Ավելացնել", "RU": "+ Добавить", "EN": "+ Add" },
    "lbl_add_partner": { "AM": "Ավելացնել գործընկեր", "RU": "Добавить партнера", "EN": "Add Partner" },
    "lbl_logo": { "AM": "Լոգո (URL կամ SVG)", "RU": "Лого (URL/SVG)", "EN": "Logo (URL/SVG)" },
    "lbl_offer": { "AM": "Առաջարկ:", "RU": "Предложение:", "EN": "Offer:" },
    "btn_add_emp": { "AM": "+ Նոր աշխատակից", "RU": "+ Новый сотрудник", "EN": "+ New Employee" },
    "pl_search_emp": { "AM": "Որոնել...", "RU": "Поиск мастера...", "EN": "Search..." },
    "lbl_emp_news": { "AM": "Նորություններ աշխատակիցների համար", "RU": "Новости для сотрудников", "EN": "News for employees" },
    "pl_amount": { "AM": "Գումար (֏)", "RU": "Сумма (֏)", "EN": "Amount (֏)" },
    "pl_search_order": { "AM": "Որոնել ID-ով...", "RU": "Поиск по ID, телефону...", "EN": "Search by ID, phone..." }
};

let currentAdminLang = localStorage.getItem('admin_app_lang') || 'AM';

let rotationDegrees = 0;
window.toggleTheme = function(e) {
    e.stopPropagation();
    rotationDegrees += 360; 
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
    const body = document.body;
    
    if (body.classList.contains('force-dark')) { 
        body.classList.remove('force-dark'); body.classList.add('force-light'); localStorage.setItem('admin_theme', 'light'); 
    } else { 
        body.classList.remove('force-light'); body.classList.add('force-dark'); localStorage.setItem('admin_theme', 'dark'); 
    }
    setTimeout(updateThemeIcon, 150); 
};

window.toggleLangMenu = function(e) {
    e.stopPropagation();
    document.getElementById('lang-switcher').classList.toggle('open');
};

window.setAdminLang = function(lang, e) {
    e.stopPropagation();
    currentAdminLang = lang; 
    localStorage.setItem('admin_app_lang', currentAdminLang);
    
    document.querySelectorAll('.lang-tab').forEach(tab => {
        if (tab.getAttribute('data-lang') === lang) tab.classList.add('active');
        else tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`.lang-tab[data-lang="${lang}"]`);
    if(activeTab) document.getElementById('current-lang-btn').innerHTML = activeTab.innerHTML;

    applyAdminLanguage(); 
    renderDashboardOrders();
    renderOrders(); 
    renderEmployees(); 
    renderClients(); 
    document.getElementById('lang-switcher').classList.remove('open');
};

document.addEventListener('click', () => { 
    const switcher = document.getElementById('lang-switcher');
    if(switcher) switcher.classList.remove('open'); 
});

window.getEmpTypeLabel = function(type) {
    const key = 'cat_' + type;
    if (adminTranslations[key] && adminTranslations[key][currentAdminLang]) {
        return adminTranslations[key][currentAdminLang];
    }
    return type;
};

function applyAdminLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (adminTranslations[key] && adminTranslations[key][currentAdminLang]) {
            el.innerHTML = adminTranslations[key][currentAdminLang];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (adminTranslations[key] && adminTranslations[key][currentAdminLang]) {
            el.placeholder = adminTranslations[key][currentAdminLang];
        }
    });
    document.querySelectorAll('.translation-key').forEach(el => {
        const keyName = el.getAttribute('data-key-name');
        if (keyName && adminTranslations['admin_key_title'][currentAdminLang]) {
            el.innerHTML = `${adminTranslations['admin_key_title'][currentAdminLang]} ${keyName}`;
        }
    });
}

// ================= ДАННЫЕ =================
let ordersData = [
    { id: 'ORD-004', status: 'incoming', createdAt: getCurrentDateString(), completedAt: null, clientName: 'Արամ Խաչատրյան', clientPhone: '+374 98 123 789', address: 'Երևան, Տերյան 50', worker: 'Չկա', workerPhone: '', services: [{ name: 'Էլեկտրիկի ծառայություն', qty: 1, price: 5000, done: false }], profit: 500 },
    { id: 'ORD-003', status: 'new', createdAt: '15.07.2026 10:00', completedAt: null, clientName: 'Գոռ Վարդանյան', clientPhone: '+374 95 188 038', address: 'Երևան, Աբովյան 12', worker: 'Չկա', workerPhone: '', services: [{ name: 'Դռների տեղադրում (MDF)', qty: 2, price: 15000, done: false }], profit: 3000 },
    { id: 'ORD-002', status: 'progress', createdAt: '14.07.2026 15:30', completedAt: null, clientName: 'Աննա Հովհաննիսյան', clientPhone: '+374 91 555 444', address: 'Երևան, Մաշտոցի 4', worker: 'Արմեն Սարգսյան', workerPhone: '+374 77 999 888', services: [{ name: 'Պլաստիկ պլինտուս', qty: 45, price: 600, done: true }, { name: 'Անկյունակների տեղադրում', qty: 10, price: 200, done: false }], profit: 2900 },
    { id: 'ORD-001', status: 'completed', createdAt: '10.07.2026 09:15', completedAt: '11.07.2026 18:20', clientName: 'Դավիթ Պետրոսյան', clientPhone: '+374 99 123 456', address: 'Երևան, Կոմիտաս 20', worker: 'Գոռ Վարդանյան', workerPhone: '+374 77 111 555', services: [{ name: 'Դռների տեղադրում (MDF)', qty: 3, price: 15000, done: true }], profit: 4500 }
];

let employeesData = [
    { id: 'EMP-005', status: 'pending', name: 'Արամ Գևորգյան', type: 'electro', phone: '+374 98 000 111', exp: '2', rating: 0.0, birthDate: '05.08.1998', address: 'Երևան, Րաֆֆու 10', accessKey: '', companyDebt: 0, workingDates: [] },
    { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', type: 'doors', phone: '+374 77 999 888', exp: '6', rating: 4.8, birthDate: '12.05.1990', address: 'Երևան, Կոմիտաս 45', accessKey: '123456', companyDebt: -2500, workingDates: ['20.07.2026', '23.07.2026', '24.07.2026'] },
    { id: 'EMP-002', status: 'active', name: 'Կարեն Մելքոնյան', type: 'universal', phone: '+374 55 444 333', exp: '3', rating: 4.5, birthDate: '02.12.1996', address: 'Երևան, Մաշտոցի 12', accessKey: '112233', companyDebt: 4500, workingDates: [] },
    { id: 'EMP-003', status: 'active', name: 'Վարդան Գրիգորյան', type: 'electro', phone: '+374 99 111 222', exp: '10', rating: 5.0, birthDate: '24.08.1985', address: 'Երևան, Աբովյան 20', accessKey: '998877', companyDebt: 0, workingDates: [] },
    { id: 'EMP-004', status: 'active', name: 'Գոռ Վարդանյան', type: 'universal', phone: '+374 77 111 555', exp: '5', rating: 4.9, birthDate: '15.07.1992', address: 'Երևան, Տերյան 50', accessKey: '000000', companyDebt: 12000, workingDates: [] }
];

let clientsData = [
    { id: 'TR-1234', name: 'Արամ Խաչատրյան', phone: '+374 98 123 789', address: 'Երևան, Տերյան 50', discount: 0 },
    { id: 'TR-8899', name: 'Աննա Հովհաննիսյան', phone: '+374 91 555 444', address: 'Երևան, Մաշտոցի 4', discount: 5 },
    { id: 'VIP', name: 'VIP Հաճախորդ', phone: '+374 55 000 111', address: 'Երևան, Աբովյան 1', discount: 15 }
];

let servicesData = [
    { id: 'srv1', name: 'Դռների տեղադրում', price: 15000, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 22h12"/><path d="M4 22h16"/><path d="M14 12h.01"/></svg>', status: 'active' },
    { id: 'srv2', name: 'Պլինտուսների տեղադրում', price: 1000, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21H3V3"/><path d="M21 17H7v4"/><path d="M11 17v4"/><path d="M15 17v4"/></svg>', status: 'active' }
];

let partnersData = [
    { id: 'p1', name: 'BuildingCorp', logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
];

let reviewsData = [
    { id: 'REV-001', isNew: true, clientName: 'Աննա Հովհաննիսյան', masterName: 'Արմեն Սարգսյան', rating: 5, text: 'Շատ գոհ եմ արդյունքից: Ամեն ինչ կատարվել է ժամանակին և որակով:', date: '22.07.2026' },
    { id: 'REV-002', isNew: false, clientName: 'Դավիթ Պետրոսյան', masterName: 'Գոռ Վարդանյան', rating: 4.5, text: 'Լավ աշխատանք, փոքր-ինչ ուշացան, բայց արդյունքը գերազանց է:', date: '20.07.2026' }
];

let cooperationRequestsData = [
    { id: 'COOP-REQ-01', company: 'BuildMaster LLC', contact: 'Արմեն Հակոբյան', phone: '+374 99 112 233', text: 'Առաջարկում ենք շինանյութի մատակարարում 20% զեղչով:', date: '24.07.2026', status: 'pending' }
];

function generateOrderId() { let max = 0; ordersData.forEach(o => { let n = parseInt(o.id.replace('ORD-','')); if(n>max)max=n; }); return 'ORD-'+(max+1).toString().padStart(3,'0'); }
function generateEmpId() { let max = 0; employeesData.forEach(o => { let n = parseInt(o.id.replace('EMP-','')); if(n>max)max=n; }); return 'EMP-'+(max+1).toString().padStart(3,'0'); }
function getCurrentDateString() { const d = new Date(); return String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }

function getBirthdayInfo(dateStr) {
    if (!dateStr || !dateStr.includes('.')) return null;
    const parts = dateStr.split('.'); if (parts.length < 2) return null;
    const day = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; 
    const today = new Date(); today.setHours(0,0,0,0);
    const currentYear = today.getFullYear();
    let nextBday = new Date(currentYear, month, day);
    if (nextBday < today) nextBday.setFullYear(currentYear + 1);
    const diffTime = nextBday - today;
    return { isToday: (today.getDate() === day && today.getMonth() === month), daysLeft: Math.ceil(diffTime / (1000 * 60 * 60 * 24)) };
}

// ================= ИНИЦИАЛИЗАЦИЯ =================
document.addEventListener('DOMContentLoaded', () => {
    
    function updateThemeIcon() { 
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) themeIcon.innerHTML = document.body.classList.contains('force-dark') ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`; 
    }
    updateThemeIcon();

    const isIos = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    if (isIos() && !isInStandaloneMode() && !localStorage.getItem('ios_admin_pwa_prompt_closed')) {
        document.body.insertAdjacentHTML('beforeend', `
        <div id="ios-pwa-prompt" style="position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 400px; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; padding: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 9999; display: flex; align-items: center; gap: 12px; color: #000;">
            <div style="font-size: 24px;">📲</div>
            <div style="flex: 1; font-size: 11px; font-weight: 700; line-height: 1.4;">Տեղադրեք հավելվածը:<br>Սեղմեք <b style="font-size: 14px;">«Поделиться»</b> ներքևում, ապա ընտրեք <b style="font-size: 12px;">«На экран "Домой"» ➕</b></div>
            <button id="close-ios-prompt" style="background: none; border: none; font-size: 20px; color: #999; padding: 0 5px; cursor: pointer;">&times;</button>
        </div>`);
        document.getElementById('close-ios-prompt').addEventListener('click', () => { document.getElementById('ios-pwa-prompt').style.display = 'none'; localStorage.setItem('ios_admin_pwa_prompt_closed', 'true'); });
    }

    // ================= ГЛАВНАЯ СТРАНИЦА (Только входящие) =================
    window.renderDashboardOverview = function() {
        let totalRating = 0;
        reviewsData.forEach(r => totalRating += r.rating);
        const avgRating = reviewsData.length > 0 ? (totalRating / reviewsData.length).toFixed(1) : '0.0';

        document.getElementById('dash-avg-rating-hero').innerText = `★ ${avgRating}`;

        const revList = document.getElementById('dash-reviews-list');
        revList.innerHTML = '';
        if(reviewsData.length > 0) {
            reviewsData.slice().reverse().forEach(rev => {
                const stars = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : '');
                let newDotHtml = rev.isNew ? `<div class="notif-dot-card"></div>` : '';
                revList.innerHTML += `
                    <div class="entity-card" style="cursor:pointer; position:relative;" onclick="openReviewModal('${rev.id}')">
                        ${newDotHtml}
                        <div class="entity-header">
                            <span class="entity-id" style="color:var(--text); font-size: 12px;">${rev.clientName}</span>
                            <span style="color:#FFB347; font-size:12px; font-weight:900;">${stars}</span>
                        </div>
                        <div class="entity-meta" style="margin-top:4px;">${adminTranslations['lbl_master'][currentAdminLang]} <b style="color:var(--tree-light);">${rev.masterName}</b></div>
                        <div class="truncate-text" style="font-size: 11px; font-weight: 600; font-style: italic; color: var(--text-sec); margin-top: 8px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 8px;">
                            "${rev.text}"
                        </div>
                        <div style="font-size: 9px; color: var(--text-sec); text-align: right; margin-top: 6px;">${rev.date}</div>
                    </div>
                `;
            });
        }
    };

    window.openReviewModal = function(id) {
        const rev = reviewsData.find(r => r.id === id);
        if(!rev) return;
        
        if (rev.isNew) {
            rev.isNew = false;
            renderDashboardOverview();
            updateDashDots();
        }

        document.getElementById('modal-rev-client').innerText = rev.clientName;
        document.getElementById('modal-rev-stars').innerText = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : '');
        document.getElementById('modal-rev-text').innerText = rev.text;
        document.getElementById('modal-rev-date').innerText = rev.date;
        document.getElementById('review-modal').classList.add('active');
        if (navigator.vibrate) navigator.vibrate(10);
    };
    window.closeReviewModal = function() {
        document.getElementById('review-modal').classList.remove('active');
    };

    window.renderDashboardOrders = function() {
        const list = document.getElementById('dash-orders-list');
        list.innerHTML = '';
        let filtered = ordersData.filter(o => o.status === 'incoming');

        if(filtered.length > 0) {
            filtered.forEach(order => {
                let mainTitle = order.services.length > 0 ? order.services[0].name : "---";
                if(order.services.length > 1) mainTitle += ` (+${order.services.length - 1})`;
                const card = document.createElement('div'); card.className = 'entity-card'; 
                card.onclick = () => openOrderModal(order.id);
                card.innerHTML = `<div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status incoming" data-i18n="status_incoming"></span></div><div class="entity-title">${mainTitle}</div><div class="entity-meta">${adminTranslations['lbl_name'][currentAdminLang]} ${order.clientName || '---'}</div><div class="entity-meta">${adminTranslations['lbl_phone'][currentAdminLang]} ${order.clientPhone}</div><div class="entity-meta">${adminTranslations['lbl_address'][currentAdminLang]} ${order.address}</div>`;
                list.appendChild(card);
            });
            applyAdminLanguage();
        } else {
            list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
        }
    };

    window.renderDashboardMasters = function() {
        const list = document.getElementById('dash-masters-list');
        list.innerHTML = '';
        const pendingMasters = employeesData.filter(e => e.status === 'pending');

        if(pendingMasters.length > 0) {
            pendingMasters.forEach(emp => {
                const card = document.createElement('div'); card.className = 'entity-card'; 
                card.onclick = () => openEmployeeModal(emp.id);
                card.innerHTML = `<div class="entity-header"><span class="entity-id">${emp.id}</span><span class="entity-status pending" data-i18n="status_check"></span></div><div class="entity-title">${emp.name}</div><div class="entity-meta"><span>${adminTranslations['lbl_type'][currentAdminLang]}: ${getEmpTypeLabel(emp.type)}</span></div><div class="entity-meta"><span>${adminTranslations['lbl_exp'][currentAdminLang]}: ${emp.exp.split('/')[0].trim()}</span></div><div class="entity-meta" style="margin-top: 4px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 6px;"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${emp.phone}</span></div>`;
                list.appendChild(card);
            });
            applyAdminLanguage();
        } else {
            list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
        }
    };

    window.renderDashboardPartnerRequests = function() {
        const list = document.getElementById('dash-partners-requests-list');
        list.innerHTML = '';
        const pendingPartners = cooperationRequestsData.filter(c => c.status === 'pending');

        if(pendingPartners.length > 0) {
            pendingPartners.forEach(coop => {
                const card = document.createElement('div'); card.className = 'entity-card';
                card.onclick = () => openCoopModal(coop.id);
                card.innerHTML = `<div class="entity-header"><span class="entity-id">${coop.company}</span><span class="entity-status new">B2B</span></div><div class="entity-title">${coop.contact}</div><div class="entity-meta">${adminTranslations['lbl_phone'][currentAdminLang]} ${coop.phone}</div><div class="entity-meta">${coop.date}</div>`;
                list.appendChild(card);
            });
        } else {
            list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
        }
    };

    // ================= СОТРУДНИЧЕСТВО (МОДАЛКА B2B) =================
    let currentActiveCoopId = null;
    window.openCoopModal = function(id) {
        currentActiveCoopId = id;
        const coop = cooperationRequestsData.find(c => c.id === id);
        if(!coop) return;
        document.getElementById('modal-coop-company').innerText = coop.company;
        document.getElementById('modal-coop-contact').innerText = coop.contact;
        document.getElementById('modal-coop-phone').innerText = coop.phone;
        const phoneLink = document.getElementById('modal-coop-phone-link');
        phoneLink.href = `tel:${coop.phone.replace(/[^\d+]/g, '')}`;
        document.getElementById('modal-coop-text').innerText = coop.text;
        document.getElementById('coop-modal').classList.add('active');
    };
    window.closeCoopModal = function() { document.getElementById('coop-modal').classList.remove('active'); currentActiveCoopId = null; };
    window.acceptCoop = function() {
        if(!currentActiveCoopId) return;
        const coop = cooperationRequestsData.find(c => c.id === currentActiveCoopId);
        if(coop) {
            coop.status = 'accepted';
            const newPartnerId = 'p_'+Math.random();
            partnersData.push({ id: newPartnerId, name: coop.company, logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>' });
            cooperationRequestsData = cooperationRequestsData.filter(c => c.id !== currentActiveCoopId);
            renderDashboardPartnerRequests();
            renderAdminPartners();
            updateDashDots();
            closeCoopModal();
            if(navigator.vibrate) navigator.vibrate(20);
            openPartnerForm(newPartnerId);
        }
    };
    window.rejectCoop = function() {
        if(!currentActiveCoopId) return;
        if(confirm("Отклонить заявку компании?")) {
            cooperationRequestsData = cooperationRequestsData.filter(c => c.id !== currentActiveCoopId);
            renderDashboardPartnerRequests();
            updateDashDots();
            closeCoopModal();
        }
    };

    // ================= ORDERS LOGIC =================
    window.filterOrders = function() {
        const searchInput = document.getElementById('order-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeTab = document.querySelector('#screen-orders .filter-tab.active');
        const activeFilter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
        
        document.querySelectorAll('#orders-list .entity-card').forEach(card => {
            const text = card.innerText.toLowerCase(); const status = card.getAttribute('data-status');
            const matchesSearch = text.includes(searchTerm); const matchesFilter = activeFilter === 'all' || status === activeFilter;
            if (status === 'cancelled' && activeFilter !== 'all' && searchTerm === '') card.style.display = 'none'; else card.style.display = (matchesSearch && matchesFilter) ? 'flex' : 'none';
        });
    }

    window.renderOrders = function() {
        const list = document.getElementById('orders-list'); if (!list) return; list.innerHTML = '';
        let counts = { new: 0, progress: 0, completed: 0 };
        const activeOrders = ordersData.filter(o => o.status !== 'incoming');
        
        activeOrders.forEach(order => {
            if (counts[order.status] !== undefined) counts[order.status]++;
            let mainTitle = order.services.length > 0 ? order.services[0].name : "---";
            if(order.services.length > 1) mainTitle += ` (+${order.services.length - 1})`;
            let statusClass = '', statusI18n = '';
            if (order.status === 'new') { statusClass = 'new'; statusI18n = 'status_new'; } else if (order.status === 'progress') { statusClass = 'pending'; statusI18n = 'status_pending'; } else if (order.status === 'completed') { statusI18n = 'status_success'; } else if (order.status === 'cancelled') { statusClass = 'cancelled'; statusI18n = 'status_cancelled'; }
            const card = document.createElement('div'); card.className = 'entity-card'; card.setAttribute('data-status', order.status); card.onclick = () => openOrderModal(order.id);
            card.innerHTML = `<div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status ${statusClass}" data-i18n="${statusI18n}"></span></div><div class="entity-title">${mainTitle}</div><div class="entity-meta">${adminTranslations['lbl_name'][currentAdminLang]} ${order.clientName || '---'}</div><div class="entity-meta">${adminTranslations['lbl_phone'][currentAdminLang]} ${order.clientPhone}</div><div class="entity-meta">${adminTranslations['lbl_address'][currentAdminLang]} ${order.address}</div>`;
            list.appendChild(card);
        });
        document.getElementById('count-new').innerText = counts.new; document.getElementById('count-progress').innerText = counts.progress; document.getElementById('count-completed').innerText = counts.completed;
        applyAdminLanguage(); filterOrders();
    };
    
    window.toggleServiceStatus = function(orderId, serviceIndex, checkboxElem) {
        const order = ordersData.find(o => o.id === orderId);
        if (order && order.services[serviceIndex]) { order.services[serviceIndex].done = checkboxElem.checked; checkboxElem.checked ? checkboxElem.closest('.service-item-static').classList.add('done') : checkboxElem.closest('.service-item-static').classList.remove('done'); if (navigator.vibrate) navigator.vibrate(10); }
    };

    // ================= EMPLOYEES LOGIC =================
    window.setEmpFilter = function(filterValue) { document.querySelectorAll('#screen-employees .filter-tab').forEach(t => { if (t.getAttribute('data-emp-filter') === filterValue) { t.classList.add('active'); t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); } else t.classList.remove('active'); }); renderEmployees(); };
    const empSearchInput = document.getElementById('employee-search');
    window.filterEmployees = function() { renderEmployees(); };
    if (empSearchInput) empSearchInput.addEventListener('input', filterEmployees);

    window.renderEmployees = function() {
        const list = document.getElementById('employees-list'); if (!list) return; list.innerHTML = '';
        const activeTab = document.querySelector('#screen-employees .filter-tab.active'); const activeFilter = activeTab ? activeTab.getAttribute('data-emp-filter') : 'all'; const empSearchTerm = empSearchInput ? empSearchInput.value.toLowerCase() : '';
        const bdayEmployees = [];
        employeesData.filter(e => e.status === 'active').forEach(emp => {
            const matchesFilter = activeFilter === 'all' || emp.type === activeFilter; const textToSearch = (emp.name + " " + emp.phone).toLowerCase(); const matchesSearch = textToSearch.includes(empSearchTerm);
            const bdayInfo = getBirthdayInfo(emp.birthDate); if (bdayInfo && bdayInfo.isToday) bdayEmployees.push(emp.name);
            if (!matchesFilter || !matchesSearch) return;
            let bdayHtml = ''; if (bdayInfo) { if (bdayInfo.isToday) bdayHtml = `<div style="color: #FFB347; font-weight: 800; font-size: 10px; margin-top: 6px; display: flex; align-items: center; gap: 4px;">🎉 Happy Birthday!</div>`; else bdayHtml = `<div style="color: var(--text-sec); font-weight: 600; font-size: 9px; margin-top: 6px;">🎂 ${bdayInfo.daysLeft} days left</div>`; }
            const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => openEmployeeModal(emp.id); 
            card.innerHTML = `<div class="entity-header"><span class="entity-id">${emp.id}</span><div class="rating-badge">★ ${emp.rating.toFixed(1)}</div></div><div class="entity-title">${emp.name}</div><div class="entity-meta"><span>${adminTranslations['lbl_type'][currentAdminLang]}: ${getEmpTypeLabel(emp.type)}</span></div><div class="entity-meta"><span>${adminTranslations['lbl_debt'][currentAdminLang]} <b style="color:${(emp.companyDebt||0) < 0 ? '#1F9651' : '#ff4444'}">${(emp.companyDebt||0).toLocaleString()} ֏</b></span></div>${bdayHtml}<div class="entity-meta" style="margin-top: 4px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 6px;"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${emp.phone}</span><button class="call-btn" style="width: 26px; height: 26px; border-radius: 50%;" onclick="event.stopPropagation(); window.location.href='tel:${emp.phone.replace(/[^\d+]/g, '')}'"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button></div>`;
            list.appendChild(card);
        });
        const bannerContainer = document.getElementById('bday-banner-container');
        if (bannerContainer) { if (bdayEmployees.length > 0) { bannerContainer.innerHTML = `<div class="glass-panel" style="background: rgba(255, 179, 71, 0.15); border: 1px solid #FFB347; margin-bottom: 12px; padding: 12px; display: flex; align-items: center; gap: 12px;"><span style="font-size: 28px; line-height: 1;">🎉</span><div><div style="font-weight: 900; font-size: 13px; color: #FFB347; margin-bottom: 2px;">HAPPY BIRTHDAY!</div><div style="font-size: 11px; font-weight: 600; color: var(--text);"><b>${bdayEmployees.join(', ')}</b></div></div></div>`; bannerContainer.style.display = 'block'; } else bannerContainer.style.display = 'none'; }
        applyAdminLanguage();
    }

    // ================= CLIENTS (CRM) LOGIC =================
    window.renderClients = function() {
        const list = document.getElementById('clients-list'); if (!list) return; list.innerHTML = '';
        const searchInput = document.getElementById('client-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        let count = 0;
        clientsData.forEach(c => {
            const textToSearch = (c.name + " " + c.phone + " " + c.id).toLowerCase();
            if (searchTerm !== '' && !textToSearch.includes(searchTerm)) return;
            count++;

            const card = document.createElement('div');
            card.className = 'entity-card';
            card.innerHTML = `
                <div class="entity-header">
                    <span class="entity-id" style="font-size: 14px; font-weight: 900; color: var(--tree-light);">${c.id}</span>
                    <div class="rating-badge" style="background: rgba(0, 163, 255, 0.15); color: #00A3FF;">% ${c.discount}</div>
                </div>
                <div class="entity-title" style="margin-top: 8px;">${c.name}</div>
                <div class="entity-meta">${adminTranslations['lbl_phone'][currentAdminLang]} <span style="font-weight: 700; color: var(--text);">${c.phone}</span></div>
                <div class="entity-meta">${adminTranslations['lbl_address'][currentAdminLang]} ${c.address}</div>
                <div style="display: flex; gap: 6px; margin-top: 12px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 12px; align-items: center;">
                    <div style="display: flex; background: rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; border: 1px solid rgba(128,128,128,0.2);">
                        <button style="width: 36px; height: 36px; border: none; background: transparent; color: var(--text); font-size: 16px; cursor: pointer; border-right: 1px solid rgba(128,128,128,0.2);" onclick="changeDiscount('${c.id}', -5)">-</button>
                        <input type="number" id="discount-input-${c.id}" value="${c.discount}" style="width: 40px; border: none; background: transparent; text-align: center; color: var(--tree-light); font-weight: 900; outline: none; -moz-appearance: textfield;">
                        <button style="width: 36px; height: 36px; border: none; background: transparent; color: var(--text); font-size: 16px; cursor: pointer; border-left: 1px solid rgba(128,128,128,0.2);" onclick="changeDiscount('${c.id}', 5)">+</button>
                    </div>
                    <button class="submit-btn success" style="padding: 0; height: 36px; margin: 0; flex: 1; font-size: 10px;" onclick="updateClientDiscount('${c.id}')">OK</button>
                    <button class="call-btn" style="width: 36px; height: 36px; border-radius: 50%;" onclick="window.location.href='tel:${c.phone.replace(/[^\d+]/g, '')}'"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                </div>
            `;
            list.appendChild(card);
        });
        document.getElementById('clients-total-count').innerText = count;
    };
    
    if (document.getElementById('client-search')) document.getElementById('client-search').addEventListener('input', renderClients);
    
    window.changeDiscount = function(id, val) {
        const inp = document.getElementById(`discount-input-${id}`);
        let current = parseInt(inp.value) || 0;
        let next = current + val;
        if (next < 0) next = 0; if (next > 100) next = 100;
        inp.value = next;
        if (navigator.vibrate) navigator.vibrate(10);
    };

    window.updateClientDiscount = function(id) {
        const c = clientsData.find(x => x.id === id);
        if (c) {
            const val = parseInt(document.getElementById(`discount-input-${id}`).value) || 0;
            c.discount = val;
            if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
            renderClients();
        }
    };

    // ================= ПАРТНЕРЫ =================
    window.renderAdminPartners = function() {
        const list = document.getElementById('admin-partners-list'); if (!list) return; list.innerHTML = '';
        partnersData.forEach(p => {
            list.innerHTML += `
                <div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 50px; height: 50px; border-radius: 16px; border: 1px dashed rgba(128,128,128,0.3); display: flex; justify-content: center; align-items: center; overflow: hidden;">${p.logo}</div>
                        <div style="font-size: 14px; font-weight: 800; color: var(--text);">${p.name}</div>
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <button class="serv-del-btn" style="color:var(--text); border-color:var(--text-sec);" onclick="openPartnerForm('${p.id}')"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>
                        <button class="serv-del-btn" onclick="deletePartner('${p.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                    </div>
                </div>
            `;
        });
    };

    let currentEditingPartnerId = null;
    window.openPartnerForm = function(partnerId = null) { 
        currentEditingPartnerId = partnerId;
        if(partnerId) {
            const p = partnersData.find(x => x.id === partnerId);
            if(p) {
                document.getElementById('form-partner-name').value = p.name; 
                document.getElementById('form-partner-logo').value = p.logo; 
            }
        } else {
            document.getElementById('form-partner-name').value = ''; 
            document.getElementById('form-partner-logo').value = ''; 
        }
        document.getElementById('partner-form-modal').classList.add('active'); 
    };
    window.closePartnerForm = function() { document.getElementById('partner-form-modal').classList.remove('active'); };
    window.savePartnerForm = function(e) { 
        e.preventDefault(); 
        const name = document.getElementById('form-partner-name').value;
        const logo = document.getElementById('form-partner-logo').value;
        if(currentEditingPartnerId) {
            const p = partnersData.find(x => x.id === currentEditingPartnerId);
            if(p) { p.name = name; p.logo = logo; }
        } else {
            partnersData.push({ id: 'p' + Math.random(), name, logo }); 
        }
        renderAdminPartners(); closePartnerForm(); if(navigator.vibrate)navigator.vibrate(20);
    };
    window.deletePartner = function(id) { if(confirm('Delete?')) { partnersData = partnersData.filter(p => p.id !== id); renderAdminPartners(); } };

    // ================= MANAGEMENT (УПРАВЛЕНИЕ) LOGIC =================
    window.renderAdminServices = function() {
        const list = document.getElementById('admin-services-list'); if (!list) return; list.innerHTML = '';
        servicesData.forEach(s => {
            list.innerHTML += `
                <div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(31,150,81,0.1); color: var(--tree-light); display: flex; justify-content: center; align-items: center;">${s.icon}</div>
                        <div>
                            <div style="font-size: 13px; font-weight: 800; color: var(--text);">${s.name}</div>
                            <div style="font-size: 10px; color: var(--text-sec); font-weight: 700;">${s.price} ֏</div>
                        </div>
                    </div>
                    <button class="serv-del-btn" onclick="deleteService('${s.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                </div>
            `;
        });
    };

    window.openServiceForm = function() { document.getElementById('form-cat-name').value = ''; document.getElementById('form-cat-price').value = ''; document.getElementById('form-cat-icon').value = ''; document.getElementById('service-form-modal').classList.add('active'); };
    window.closeServiceForm = function() { document.getElementById('service-form-modal').classList.remove('active'); };
    window.saveServiceForm = function(e) { 
        e.preventDefault(); 
        servicesData.push({ id: 's' + Math.random(), name: document.getElementById('form-cat-name').value, price: parseInt(document.getElementById('form-cat-price').value) || 0, icon: document.getElementById('form-cat-icon').value || '<svg></svg>', status: document.getElementById('form-cat-status').value }); 
        renderAdminServices(); closeServiceForm(); if(navigator.vibrate)navigator.vibrate(20);
    };
    window.deleteService = function(id) { if(confirm('Delete?')) { servicesData = servicesData.filter(s => s.id !== id); renderAdminServices(); } };

    // ================= MODALS AND FORMS (ORDERS/EMPLOYEES) =================
    window.adjustEmpDebt = function(action) {
        if (!currentActiveEmpId) return;
        const emp = employeesData.find(e => e.id === currentActiveEmpId); if (!emp) return;
        const val = parseInt(document.getElementById('emp-finance-input').value) || 0;
        if (emp.companyDebt === undefined) emp.companyDebt = 0;
        if (action === 'add') emp.companyDebt += val; else if (action === 'bonus') emp.companyDebt -= val; else if (action === 'reset') emp.companyDebt = 0;
        const debtEl = document.getElementById('modal-emp-debt'); debtEl.innerText = emp.companyDebt.toLocaleString() + ' ֏'; debtEl.style.color = emp.companyDebt < 0 ? '#1F9651' : '#ff4444';
        document.getElementById('emp-finance-input').value = ''; renderEmployees(); if (navigator.vibrate) navigator.vibrate(20);
    };

    let currentActiveEmpId = null;
    let currentEditingEmpId = null;
    let currentActiveOrderId = null;
    let currentEditingOrderId = null;

    window.openEmployeeModal = function(empId) {
        currentActiveEmpId = empId; const emp = employeesData.find(e => e.id === empId); if (!emp) return;
        const isPending = (emp.status === 'pending');

        document.getElementById('modal-emp-id').innerText = emp.id; document.getElementById('modal-emp-type').innerText = getEmpTypeLabel(emp.type); 
        const typeBadge = document.getElementById('modal-emp-type');
        if (isPending) { typeBadge.style.background = 'rgba(255, 179, 71, 0.15)'; typeBadge.style.color = '#FFB347'; } else { typeBadge.style.background = 'rgba(31, 150, 81, 0.15)'; typeBadge.style.color = 'var(--tree-light)'; }
        
        document.getElementById('modal-emp-name').innerText = emp.name; 
        document.getElementById('modal-emp-access-key').innerText = emp.accessKey || '------'; 
        document.getElementById('modal-emp-birth').innerText = emp.birthDate || '---';
        
        const debtEl = document.getElementById('modal-emp-debt'); if (emp.companyDebt === undefined) emp.companyDebt = 0; debtEl.innerText = emp.companyDebt.toLocaleString() + ' ֏'; debtEl.style.color = emp.companyDebt < 0 ? '#1F9651' : '#ff4444';
        
        const scheduleContainer = document.getElementById('modal-emp-schedule-list');
        if (emp.workingDates && emp.workingDates.length > 0) scheduleContainer.innerHTML = emp.workingDates.map(d => `<span style="display:inline-block; background:rgba(35,169,91,0.1); color:var(--tree-light); border: 1px solid rgba(35,169,91,0.2); padding:4px 8px; border-radius:8px; font-size:10px; font-weight:800; margin-bottom:4px;">${d}</span>`).join('');
        else scheduleContainer.innerHTML = '<span style="font-size:10px; color:var(--text-sec);">---</span>';
        
        const bdayInfo = getBirthdayInfo(emp.birthDate); const bdayRow = document.getElementById('modal-emp-bday-row'); const bdayCountdown = document.getElementById('modal-emp-bday-countdown');
        if (bdayInfo) { bdayRow.style.display = 'flex'; if (bdayInfo.isToday) bdayCountdown.innerHTML = `<span style="color: #FFB347; font-weight: 900; font-size: 14px;">🎉!</span>`; else bdayCountdown.innerText = `(${bdayInfo.daysLeft} d)`; } else bdayRow.style.display = 'none';
        
        document.getElementById('modal-emp-phone-text').innerText = emp.phone;
        const phoneLink = document.getElementById('modal-emp-phone-link');
        if (emp.phone) { phoneLink.style.display = 'flex'; phoneLink.href = `tel:${emp.phone.replace(/[^\d+]/g, '')}`; } else phoneLink.style.display = 'none';
        
        document.getElementById('modal-emp-address').innerText = emp.address || '---'; 
        document.getElementById('modal-emp-exp').innerText = emp.exp ? emp.exp.split('/')[0].trim() : '0'; 
        document.getElementById('modal-emp-rating').innerText = `★ ${(emp.rating || 0).toFixed(1)}`;
        
        const empOrders = ordersData.filter(o => o.worker && o.worker.includes(emp.name)); document.getElementById('modal-emp-orders-count').innerText = empOrders.length;
        const ordersListDiv = document.getElementById('modal-emp-orders-list'); ordersListDiv.innerHTML = ''; ordersListDiv.classList.remove('open'); 
        if (empOrders.length > 0) { empOrders.forEach(o => { let statColor = '#9BAA9E'; if(o.status === 'completed') statColor = 'var(--tree-light)'; if(o.status === 'progress') statColor = '#FFB347'; ordersListDiv.innerHTML += `<div class="emp-order-item" onclick="closeEmployeeModal(); openOrderModal('${o.id}');"><span class="emp-order-id">${o.id} - ${o.createdAt.split(' ')[0]}</span><span class="emp-order-stat" style="color: ${statColor}; border: 1px solid ${statColor}40;">${adminTranslations['status_'+(o.status==='progress'?'pending':o.status==='completed'?'success':o.status)][currentAdminLang]}</span></div>`; }); } else ordersListDiv.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
        
        const btnAccept = document.getElementById('modal-emp-accept-btn'); const btnReject = document.getElementById('modal-emp-reject-btn'); const btnEdit = document.getElementById('modal-emp-edit-btn');
        if (isPending) { btnAccept.style.display = 'flex'; btnReject.style.display = 'flex'; btnEdit.style.display = 'none'; } else { btnAccept.style.display = 'none'; btnReject.style.display = 'none'; btnEdit.style.display = 'flex'; }
        
        document.getElementById('emp-pin-row').style.display = isPending ? 'none' : 'flex';
        document.getElementById('emp-schedule-block').style.display = isPending ? 'none' : 'block';
        document.getElementById('emp-finance-block').style.display = isPending ? 'none' : 'block';
        document.getElementById('emp-orders-block').style.display = isPending ? 'none' : 'block';
        if (isPending) bdayRow.style.display = 'none';

        document.getElementById('employee-modal').classList.add('active'); if (navigator.vibrate) navigator.vibrate(15);
    };

    window.closeEmployeeModal = function() { document.getElementById('employee-modal').classList.remove('active'); currentActiveEmpId = null; };
    window.toggleEmpOrders = function() { document.getElementById('modal-emp-orders-list').classList.toggle('open'); };
    
    window.acceptEmployee = function() { 
        if (!currentActiveEmpId) return; 
        const emp = employeesData.find(e => e.id === currentActiveEmpId); 
        if (emp) { 
            emp.status = 'active';
            emp.accessKey = Math.floor(100000 + Math.random() * 900000).toString();
            
            renderDashboardMasters(); 
            renderEmployees(); 
            updateDashDots();
            
            openEmployeeModal(emp.id); 
            if (navigator.vibrate) navigator.vibrate(20); 
        } 
    };
    
    window.rejectEmployee = function() { 
        if (!currentActiveEmpId) return; 
        if (confirm("Reject?")) { 
            employeesData = employeesData.filter(e => e.id !== currentActiveEmpId); 
            renderDashboardMasters(); 
            closeEmployeeModal(); 
            updateDashDots();
        } 
    };

    window.openEmployeeForm = function(empId = null) {
        currentEditingEmpId = empId; const form = document.getElementById('employee-form'); form.reset();
        if (empId) {
            const emp = employeesData.find(e => e.id === empId);
            if (emp) { document.getElementById('form-emp-name').value = emp.name; document.getElementById('form-emp-phone').value = emp.phone; document.getElementById('form-emp-address').value = emp.address || ''; document.getElementById('form-emp-birth').value = emp.birthDate || ''; document.getElementById('form-emp-type').value = emp.type; document.getElementById('form-emp-exp').value = emp.exp ? emp.exp.split('/')[0].trim() : ''; document.getElementById('form-emp-access-key').value = emp.accessKey || ''; }
            closeEmployeeModal();
        } else { document.getElementById('form-emp-access-key').value = Math.floor(100000 + Math.random() * 900000).toString(); }
        document.getElementById('employee-form-modal').classList.add('active');
    };

    window.closeEmployeeFormModal = function() { document.getElementById('employee-form-modal').classList.remove('active'); currentEditingEmpId = null; };

    window.saveEmployeeForm = function(event) {
        event.preventDefault();
        const name = document.getElementById('form-emp-name').value; const phone = document.getElementById('form-emp-phone').value; const address = document.getElementById('form-emp-address').value; const birthDate = document.getElementById('form-emp-birth').value; const type = document.getElementById('form-emp-type').value; const exp = document.getElementById('form-emp-exp').value; const accessKey = document.getElementById('form-emp-access-key').value;
        if (currentEditingEmpId) { const emp = employeesData.find(e => e.id === currentEditingEmpId); if (emp) { emp.name = name; emp.phone = phone; emp.address = address; emp.birthDate = birthDate; emp.type = type; emp.exp = exp; emp.accessKey = accessKey; } } 
        else { employeesData.push({ id: generateEmpId(), status: 'active', name: name, type: type, phone: phone, exp: exp || '0', rating: 0.0, birthDate: birthDate, address: address, accessKey: accessKey, companyDebt: 0, workingDates: [] }); }
        renderEmployees(); renderDashboardMasters(); closeEmployeeFormModal(); updateDashDots(); if (navigator.vibrate) navigator.vibrate(50);
    };

    window.openOrderModal = function(orderId) {
        currentActiveOrderId = orderId; const order = ordersData.find(o => o.id === orderId); if (!order) return;
        document.getElementById('modal-order-id').innerText = order.id; const statusEl = document.getElementById('modal-order-status'); statusEl.className = 'entity-status';
        if (order.status === 'incoming') { statusEl.classList.add('incoming'); statusEl.setAttribute('data-i18n', 'status_incoming'); } else if (order.status === 'new') { statusEl.classList.add('new'); statusEl.setAttribute('data-i18n', 'status_new'); } else if (order.status === 'progress') { statusEl.classList.add('pending'); statusEl.setAttribute('data-i18n', 'status_pending'); } else if (order.status === 'completed') { statusEl.setAttribute('data-i18n', 'status_success'); } else if (order.status === 'cancelled') { statusEl.classList.add('cancelled'); statusEl.setAttribute('data-i18n', 'status_cancelled'); }
        
        const btnEdit = document.getElementById('modal-edit-btn');
        const btnCancel = document.getElementById('modal-cancel-btn');
        const btnAccept = document.getElementById('modal-accept-btn');
        const btnReject = document.getElementById('modal-reject-btn');

        if (order.status === 'incoming') { btnEdit.style.display = 'none'; btnCancel.style.display = 'none'; btnAccept.style.display = 'flex'; btnReject.style.display = 'flex'; } 
        else if (order.status === 'new') { btnEdit.style.display = 'flex'; btnCancel.style.display = 'flex'; btnAccept.style.display = 'none'; btnReject.style.display = 'none'; } 
        else if (order.status === 'progress') { btnEdit.style.display = 'flex'; btnCancel.style.display = 'flex'; btnAccept.style.display = 'none'; btnReject.style.display = 'none'; } 
        else { btnEdit.style.display = 'flex'; btnCancel.style.display = 'none'; btnAccept.style.display = 'none'; btnReject.style.display = 'none'; }
        
        document.getElementById('modal-date-created').innerText = order.createdAt || '---'; const completedWrapper = document.getElementById('modal-date-completed-wrapper');
        if (order.status === 'completed' && order.completedAt) { completedWrapper.style.display = 'flex'; document.getElementById('modal-date-completed').innerText = order.completedAt; } else completedWrapper.style.display = 'none';
        document.getElementById('modal-client-name').innerText = order.clientName || '---'; document.getElementById('modal-client-phone-text').innerText = order.clientPhone || '---';
        const clientCallBtn = document.getElementById('modal-client-phone-link'); if (order.clientPhone) { clientCallBtn.style.display = 'flex'; clientCallBtn.href = `tel:${order.clientPhone.replace(/[^\d+]/g, '')}`; } else clientCallBtn.style.display = 'none';
        document.getElementById('modal-client-address').innerText = order.address || '---';
        
        let wName = order.worker || '---';
        if (order.worker && order.worker.includes('(')) { const parts = order.worker.split('('); wName = parts[0].trim(); }
        document.getElementById('modal-worker-name').innerText = wName; document.getElementById('modal-worker-phone-text').innerText = order.workerPhone || '---';
        const workerCallBtn = document.getElementById('modal-worker-phone-link'); if (order.workerPhone) { workerCallBtn.style.display = 'flex'; workerCallBtn.href = `tel:${order.workerPhone.replace(/[^\d+]/g, '')}`; } else workerCallBtn.style.display = 'none';
        
        const servList = document.getElementById('modal-services-list'); servList.innerHTML = ''; let totalSum = 0;
        order.services.forEach((s, index) => { const rowSum = s.qty * s.price; totalSum += rowSum; const isLocked = (order.status === 'completed' || order.status === 'cancelled' || order.status === 'incoming') ? 'disabled' : ''; const checkedAttr = s.done ? 'checked' : ''; const doneClass = s.done ? 'done' : ''; servList.innerHTML += `<label class="service-item-static ${doneClass}"><input type="checkbox" class="service-checkbox" ${checkedAttr} ${isLocked} onchange="toggleServiceStatus('${order.id}', ${index}, this)"><span class="serv-name-static">${s.name}</span><span class="serv-qty-static">${s.qty} x ${s.price} ֏</span><span class="serv-price-static">${rowSum} ֏</span></label>`; });
        const profit = order.profit !== undefined ? order.profit : (totalSum * 0.10);
        document.getElementById('modal-total-price').innerText = totalSum.toLocaleString() + ' ֏'; document.getElementById('modal-company-profit').innerText = profit.toLocaleString() + ' ֏';
        
        applyAdminLanguage(); document.getElementById('order-modal').classList.add('active'); if (navigator.vibrate) navigator.vibrate(15);
    };

    window.closeOrderModal = function() { document.getElementById('order-modal').classList.remove('active'); currentActiveOrderId = null; };
    window.acceptOrder = function() { if (!currentActiveOrderId) return; const order = ordersData.find(o => o.id === currentActiveOrderId); if (order && order.status === 'incoming') { order.status = 'new'; renderDashboardOrders(); renderOrders(); updateDashDots(); closeOrderModal(); setTimeout(() => openOrderForm(order.id), 300); } };
    window.rejectOrder = function() { if (!currentActiveOrderId) return; const order = ordersData.find(o => o.id === currentActiveOrderId); if (order && order.status === 'incoming') { if (confirm("Reject?")) { order.status = 'cancelled'; renderDashboardOrders(); updateDashDots(); closeOrderModal(); } } };
    window.cancelOrder = function() { if (!currentActiveOrderId) return; const order = ordersData.find(o => o.id === currentActiveOrderId); if (confirm("Cancel order?")) { if(order) { order.status = 'cancelled'; renderOrders(); } closeOrderModal(); } };

    window.openOrderForm = function(orderId = null) {
        currentEditingOrderId = orderId; const form = document.getElementById('order-form'); form.reset(); document.getElementById('form-services-container').innerHTML = '';
        const workerSelect = document.getElementById('form-worker'); workerSelect.innerHTML = '<option value="" data-phone="">---</option>';
        const assistantSelect = document.getElementById('form-assistant'); assistantSelect.innerHTML = '<option value="" data-phone="">---</option>';
        employeesData.filter(e => e.status === 'active').forEach(emp => { const opt = `<option value="${emp.name}" data-phone="${emp.phone}">${emp.name} - ${getEmpTypeLabel(emp.type)}</option>`; workerSelect.innerHTML += opt; assistantSelect.innerHTML += opt; });
        if (orderId) {
            const order = ordersData.find(o => o.id === orderId);
            if (order) { document.getElementById('form-client-name').value = order.clientName || ''; document.getElementById('form-phone').value = order.clientPhone; document.getElementById('form-address').value = order.address;
                let workersArr = (order.worker && order.worker !== '---' && order.worker !== 'Չկա') ? order.worker.split(',').map(w => w.trim()) : [];
                if (workersArr.length > 0) { workerSelect.value = workersArr[0]; if (workersArr.length > 1) assistantSelect.value = workersArr[1]; }
                order.services.forEach(s => addFormServiceRow(s.name, s.qty, s.price, s.done || false)); calculateOrderFormTotals();
                if (order.profit !== undefined) { document.getElementById('form-profit-sum').value = order.profit; updateFormProfitFromSum(); }
            } closeOrderModal(); 
        } else {
            document.getElementById('form-total-price').innerText = '0 ֏'; document.getElementById('form-profit-pct').value = '10'; document.getElementById('form-profit-sum').value = '0'; addFormServiceRow();
        } document.getElementById('order-form-modal').classList.add('active');
    };

    window.closeOrderFormModal = function() { document.getElementById('order-form-modal').classList.remove('active'); currentEditingOrderId = null; };
    window.calculateOrderFormTotals = function() { let totalSum = 0; document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const qty = parseInt(row.querySelector('.serv-col-qty').value) || 0; const price = parseFloat(row.querySelector('.serv-col-price').value) || 0; totalSum += (qty * price); }); document.getElementById('form-total-price').innerText = totalSum.toLocaleString() + ' ֏'; const pct = parseFloat(document.getElementById('form-profit-pct').value) || 0; document.getElementById('form-profit-sum').value = Math.round(totalSum * (pct / 100)); };
    window.updateFormProfitFromPct = function() { let totalSum = 0; document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const qty = parseInt(row.querySelector('.serv-col-qty').value) || 0; const price = parseFloat(row.querySelector('.serv-col-price').value) || 0; totalSum += (qty * price); }); const pct = parseFloat(document.getElementById('form-profit-pct').value) || 0; document.getElementById('form-profit-sum').value = Math.round(totalSum * (pct / 100)); };
    window.updateFormProfitFromSum = function() { let totalSum = 0; document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const qty = parseInt(row.querySelector('.serv-col-qty').value) || 0; const price = parseFloat(row.querySelector('.serv-col-price').value) || 0; totalSum += (qty * price); }); const sum = parseFloat(document.getElementById('form-profit-sum').value) || 0; if (totalSum > 0) document.getElementById('form-profit-pct').value = ((sum / totalSum) * 100).toFixed(2); else document.getElementById('form-profit-pct').value = 0; };
    window.addFormServiceRow = function(name = '', qty = 1, price = '', done = false) { const container = document.getElementById('form-services-container'); const row = document.createElement('div'); row.className = 'service-row-edit'; row.setAttribute('data-done', done); row.innerHTML = `<input type="text" class="glass-input serv-col-name" value="${name}" required><input type="number" class="glass-input serv-col-qty" min="1" value="${qty}" required oninput="calculateOrderFormTotals()"><input type="number" class="glass-input serv-col-price" min="0" value="${price}" required oninput="calculateOrderFormTotals()"><button type="button" class="serv-del-btn" onclick="removeFormServiceRow(this)">X</button>`; container.appendChild(row); };
    window.removeFormServiceRow = function(btnElement) { const row = btnElement.closest('.service-row-edit'); if (row) { row.remove(); calculateOrderFormTotals(); } };

    window.saveOrderForm = function(event) {
        event.preventDefault();
        const clientName = document.getElementById('form-client-name').value; const phone = document.getElementById('form-phone').value; const address = document.getElementById('form-address').value;
        const workerSelect = document.getElementById('form-worker'); const assistantSelect = document.getElementById('form-assistant');
        let leadWorker = workerSelect.value.trim(); let assistant = assistantSelect.value.trim();
        let workerPhone = ''; if (leadWorker) workerPhone = workerSelect.options[workerSelect.selectedIndex].getAttribute('data-phone') || '';
        let combinedWorkers = []; if (leadWorker) combinedWorkers.push(leadWorker); if (assistant) combinedWorkers.push(assistant);
        let finalWorkerString = combinedWorkers.length > 0 ? combinedWorkers.join(', ') : '---';
        const services = [];
        document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const name = row.querySelector('.serv-col-name').value; const qty = parseInt(row.querySelector('.serv-col-qty').value); const price = parseFloat(row.querySelector('.serv-col-price').value); const done = row.getAttribute('data-done') === 'true'; if (name && qty > 0 && price >= 0) services.push({ name, qty, price, done }); });
        if (services.length === 0) { alert('Error: No services'); return; }
        const customProfit = parseFloat(document.getElementById('form-profit-sum').value) || 0;
        if (currentEditingOrderId) { const order = ordersData.find(o => o.id === currentEditingOrderId); if (order) { order.clientName = clientName; order.clientPhone = phone; order.address = address; order.worker = finalWorkerString; order.workerPhone = workerPhone; order.services = services; order.profit = customProfit; } } 
        else { ordersData.unshift({ id: generateOrderId(), status: 'new', createdAt: getCurrentDateString(), completedAt: null, clientName: clientName, clientPhone: phone, address: address, worker: finalWorkerString, workerPhone: workerPhone, services: services, profit: customProfit }); }
        renderOrders(); renderDashboardOrders(); updateDashDots(); closeOrderFormModal(); if (navigator.vibrate) navigator.vibrate(50);
    };

    applyAdminLanguage(); 
    renderOrders(); 
    renderEmployees(); 
    
    updateDashDots();
    switchDashboardView('overview');

    // ================= DB & CONTENT =================
    let serverTranslations = {};
    async function fetchAppDatabase() {
        try {
            const res = await fetch('/api/data'); const data = await res.json(); serverTranslations = data || {};
            document.getElementById('loader-wrap').style.display = 'none'; renderTranslationsEditor(); loadPromoAndNewsValues();
        } catch (err) { document.getElementById('loader-wrap').innerHTML = '<span style="font-size:10px; color:red; font-weight:bold;">Error (Vercel KV)</span>'; }
    }

    function loadPromoAndNewsValues() {
        if(serverTranslations['promo_title']) { if(serverTranslations['promo_title']['AM']) document.getElementById('promo-text-am').value = serverTranslations['promo_title']['AM']; if(serverTranslations['promo_title']['RU']) document.getElementById('promo-text-ru').value = serverTranslations['promo_title']['RU']; if(serverTranslations['promo_title']['EN']) document.getElementById('promo-text-en').value = serverTranslations['promo_title']['EN']; }
        if(serverTranslations['employee_news']) { if(serverTranslations['employee_news']['AM']) document.getElementById('emp-news-am').value = serverTranslations['employee_news']['AM']; if(serverTranslations['employee_news']['RU']) document.getElementById('emp-news-ru').value = serverTranslations['employee_news']['RU']; if(serverTranslations['employee_news']['EN']) document.getElementById('emp-news-en').value = serverTranslations['employee_news']['EN']; }
        if(serverTranslations['global_discount']) { document.getElementById('promo-discount-input').value = serverTranslations['global_discount']; }
    }

    window.savePromo = async function(event) {
        event.preventDefault(); const btn = document.getElementById('promo-submit-btn'); const span = btn.querySelector('span'); const origText = span.innerHTML; span.innerHTML = '...';
        if (!serverTranslations['promo_title']) serverTranslations['promo_title'] = {}; serverTranslations['promo_title']['AM'] = document.getElementById('promo-text-am').value; serverTranslations['promo_title']['RU'] = document.getElementById('promo-text-ru').value; serverTranslations['promo_title']['EN'] = document.getElementById('promo-text-en').value;
        if (!serverTranslations['employee_news']) serverTranslations['employee_news'] = {}; serverTranslations['employee_news']['AM'] = document.getElementById('emp-news-am').value; serverTranslations['employee_news']['RU'] = document.getElementById('emp-news-ru').value; serverTranslations['employee_news']['EN'] = document.getElementById('emp-news-en').value;
        serverTranslations['global_discount'] = document.getElementById('promo-discount-input').value;
        await uploadToServer(btn, origText, span);
    }

    function renderTranslationsEditor() {
        const list = document.getElementById('translations-list'); list.innerHTML = ''; const keyPrefix = adminTranslations['admin_key_title'][currentAdminLang] || "Key:";
        for (const key in serverTranslations) {
            if(typeof serverTranslations[key] !== 'object' || key === 'promo_title' || key === 'employee_news' || key === 'partners' || key === 'services') continue;
            const div = document.createElement('div'); div.className = 'translation-card';
            div.innerHTML = `<div class="translation-key" data-key-name="${key}">${keyPrefix} ${key}</div><div class="lang-row"><img src="assets/free-icon-armenia-197516.png" alt="AM"><input type="text" value="${(serverTranslations[key]['AM'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'AM', this.value)"></div><div class="lang-row"><img src="assets/free-icon-russia-9994030.png" alt="RU"><input type="text" value="${(serverTranslations[key]['RU'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'RU', this.value)"></div><div class="lang-row"><img src="assets/united-kingdom.png" alt="EN"><input type="text" value="${(serverTranslations[key]['EN'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'EN', this.value)"></div>`;
            list.appendChild(div);
        }
    }

    window.updateLiveValue = function(key, lang, val) { if(!serverTranslations[key]) serverTranslations[key] = {}; serverTranslations[key][lang] = val; }
    window.saveTranslations = async function() { const btn = document.getElementById('trans-save-btn'); const span = btn.querySelector('span'); const origText = span.innerHTML; span.innerHTML = '...'; await uploadToServer(btn, origText, span); }
    async function uploadToServer(buttonElement, originalText, spanElement) {
        try { const response = await fetch('/api/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(serverTranslations) }); const resData = await response.json();
            if(resData.success) { buttonElement.classList.add('success'); spanElement.innerHTML = '✅'; if (navigator.vibrate) navigator.vibrate(50); setTimeout(() => { buttonElement.classList.remove('success'); spanElement.innerHTML = originalText; }, 2500); }
        } catch(e) { alert('Error'); spanElement.innerHTML = originalText; }
    }

    fetchAppDatabase();
});
