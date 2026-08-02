/* GLOBAL VARIABLES & CONFIG & TRANSLATIONS */
window.currentAdminLang = localStorage.getItem('tree_admin_lang') || 'AM';

window.adminTranslations = {
    'welcome': { 'AM': 'Բարի գալուստ', 'RU': 'Добро пожаловать', 'EN': 'Welcome' },
    'welcome_admin': { 'AM': 'Բարի գալուստ, Ադմինիստրատոր', 'RU': 'Добро пожаловать, Администратор', 'EN': 'Welcome, Administrator' },
    'password_placeholder': { 'AM': 'Գաղտնաբառ', 'RU': 'Пароль', 'EN': 'Password' },
    'login_btn': { 'AM': 'Մուտք', 'RU': 'Войти', 'EN': 'Login' },
    'logout_btn': { 'AM': 'Ելք', 'RU': 'Выйти', 'EN': 'Logout' },
    'or_text': { 'AM': 'ԿԱՄ', 'RU': 'ИЛИ', 'EN': 'OR' },
    'touch_id': { 'AM': 'Touch ID', 'RU': 'Touch ID', 'EN': 'Touch ID' },
    'tab_dashboard': { 'AM': 'Գլխավոր', 'RU': 'Главная', 'EN': 'Dashboard' },
    'tab_orders': { 'AM': 'Պատվերներ', 'RU': 'Заказы', 'EN': 'Orders' },
    'tab_finance': { 'AM': 'Ֆինանսներ', 'RU': 'Финансы', 'EN': 'Finance' },
    'tab_employees': { 'AM': 'Կադրեր', 'RU': 'Кадры', 'EN': 'Staff' },
    'tab_partners': { 'AM': 'Գործընկ.', 'RU': 'Партнеры', 'EN': 'Partners' },
    'tab_clients': { 'AM': 'Հաճախորդ', 'RU': 'Клиенты', 'EN': 'Clients' },
    'tab_management': { 'AM': 'Կառավար.', 'RU': 'Управление', 'EN': 'Manage' },
    'lbl_recent_reviews': { 'AM': 'Վերջին կարծիքները', 'RU': 'Последние отзывы', 'EN': 'Recent reviews' },
    'lbl_new_requests': { 'AM': 'Նոր հայտեր', 'RU': 'Новые заявки', 'EN': 'New requests' },
    'sw_inc_masters': { 'AM': 'Նոր աշխատակիցներ', 'RU': 'Новые сотрудники', 'EN': 'New staff' },
    'lbl_new_partners': { 'AM': 'Նոր գործընկերներ', 'RU': 'Новые партнеры', 'EN': 'New partners' },
    'lbl_name': { 'AM': 'Անուն:', 'RU': 'Имя:', 'EN': 'Name:' },
    'lbl_phone': { 'AM': 'Հեռ:', 'RU': 'Тел:', 'EN': 'Phone:' },
    'lbl_address': { 'AM': 'Հասցե:', 'RU': 'Адрес:', 'EN': 'Address:' },
    'date': { 'AM': 'Ամսաթիվ:', 'RU': 'Дата:', 'EN': 'Date:' },
    'client': { 'AM': 'Հաճախորդ', 'RU': 'Клиент', 'EN': 'Client' },
    'address': { 'AM': 'Հասցե', 'RU': 'Адрес', 'EN': 'Address' },
    'in_development': { 'AM': 'Մշակման փուլում է', 'RU': 'В разработке', 'EN': 'In development' },
    'no_reviews': { 'AM': 'Կարծիքներ չկան', 'RU': 'Нет отзывов', 'EN': 'No reviews' },
    'no_orders': { 'AM': 'Պատվերներ չկան', 'RU': 'Нет заказов', 'EN': 'No orders' },
    'filter_all': { 'AM': 'Բոլորը', 'RU': 'Все', 'EN': 'All' },
    'filter_doors': { 'AM': 'Դռներ', 'RU': 'Двери', 'EN': 'Doors' },
    'filter_electro': { 'AM': 'Էլեկտրական', 'RU': 'Электрика', 'EN': 'Electrical' },
    'filter_universal': { 'AM': 'Ունիվերսալ', 'RU': 'Универсал', 'EN': 'Universal' },
    'search_employee': { 'AM': 'Աշխատակցի որոնում...', 'RU': 'Поиск сотрудника...', 'EN': 'Search employee...' },
    'add_employee': { 'AM': '+ Ավելացնել աշխատակից', 'RU': '+ Добавить сотрудника', 'EN': '+ Add employee' },
    'add_partner': { 'AM': '+ Ավելացնել գործընկեր', 'RU': '+ Добавить партнера', 'EN': '+ Add partner' },
    'add_order': { 'AM': '+ Ավելացնել պատվեր', 'RU': '+ Добавить заказ', 'EN': '+ Add order' },
    'search_client': { 'AM': 'Հաճախորդի որոնում...', 'RU': 'Поиск клиента...', 'EN': 'Search client...' },
    'total_clients': { 'AM': 'Ընդհանուր հաճախորդներ', 'RU': 'Всего клиентов', 'EN': 'Total clients' },
    'tab_mng_services': { 'AM': 'Ծառայություններ', 'RU': 'Услуги', 'EN': 'Services' },
    'tab_mng_translations': { 'AM': 'Թարգմանություններ', 'RU': 'Переводы', 'EN': 'Translations' },
    'tab_mng_promo': { 'AM': 'Պրոմո', 'RU': 'Промо', 'EN': 'Promo' },
    'add_service': { 'AM': '+ Ավելացնել ծառայություն', 'RU': '+ Добавить услугу', 'EN': '+ Add service' },
    'save_translations': { 'AM': 'Պահպանել թարգմանությունները', 'RU': 'Сохранить переводы', 'EN': 'Save translations' },
    'save_promo': { 'AM': 'Պահպանել պրոմոն', 'RU': 'Сохранить промо', 'EN': 'Save promo' },
    'discount_percent': { 'AM': 'Զեղչ %', 'RU': 'Скидка %', 'EN': 'Discount %' },
    'contact': { 'AM': 'Կոնտակտ', 'RU': 'Контакт', 'EN': 'Contact' },
    'phone': { 'AM': 'Հեռախոս', 'RU': 'Телефон', 'EN': 'Phone' },
    'message': { 'AM': 'Հաղորդագրություն', 'RU': 'Сообщение', 'EN': 'Message' },
    'accept': { 'AM': 'Ընդունել', 'RU': 'Принять', 'EN': 'Accept' },
    'reject': { 'AM': 'Մերժել', 'RU': 'Отклонить', 'EN': 'Reject' },
    'emp_pin': { 'AM': 'PIN-կոդ', 'RU': 'PIN-код', 'EN': 'PIN code' },
    'emp_address': { 'AM': 'Հասցե', 'RU': 'Адрес', 'EN': 'Address' },
    'emp_exp': { 'AM': 'Փորձ', 'RU': 'Опыт', 'EN': 'Experience' },
    'rating': { 'AM': 'Վարկանիշ', 'RU': 'Рейтинг', 'EN': 'Rating' },
    'birthday': { 'AM': 'Ծննդյան օր', 'RU': 'День рождения', 'EN': 'Birthday' },
    'company_debt': { 'AM': 'Ընկերության պարտքը', 'RU': 'Долг компании', 'EN': 'Company debt' },
    'schedule': { 'AM': 'Գրաֆիկ:', 'RU': 'График:', 'EN': 'Schedule:' },
    'amount': { 'AM': 'Գումար (֏)', 'RU': 'Сумма (֏)', 'EN': 'Amount (֏)' },
    'debt': { 'AM': 'Պարտք', 'RU': 'Долг', 'EN': 'Debt' },
    'bonus': { 'AM': 'Բոնուս', 'RU': 'Бонус', 'EN': 'Bonus' },
    'orders': { 'AM': 'Պատվերներ', 'RU': 'Заказы', 'EN': 'Orders' },
    'edit': { 'AM': 'Փոփոխել', 'RU': 'Изменить', 'EN': 'Edit' },
    'fire': { 'AM': 'Հեռացնել', 'RU': 'Уволить', 'EN': 'Fire' },
    'employee': { 'AM': 'Աշխատակից', 'RU': 'Сотрудник', 'EN': 'Employee' },
    'emp_name': { 'AM': 'Անուն', 'RU': 'Имя', 'EN': 'Name' },
    'emp_phone': { 'AM': 'Հեռախոս', 'RU': 'Телефон', 'EN': 'Phone' },
    'emp_birth': { 'AM': 'Ծննդյան ամսաթիվ', 'RU': 'Дата рождения', 'EN': 'Birth date' },
    'specialties': { 'AM': 'Մասնագիտություններ', 'RU': 'Специальности', 'EN': 'Specialties' },
    'add_specialty': { 'AM': '+ Ավելացնել մասնագիտություն', 'RU': '+ Добавить специальность', 'EN': '+ Add specialty' },
    'save': { 'AM': 'Պահպանել', 'RU': 'Сохранить', 'EN': 'Save' },
    'service': { 'AM': 'Ծառայություն', 'RU': 'Услуга', 'EN': 'Service' },
    'name': { 'AM': 'Անվանում', 'RU': 'Название', 'EN': 'Name' },
    'price': { 'AM': 'Գին (֏)', 'RU': 'Цена (֏)', 'EN': 'Price (֏)' },
    'svg_icon': { 'AM': 'SVG Իկոնկա', 'RU': 'SVG Иконка', 'EN': 'SVG Icon' },
    'active': { 'AM': 'Ակտիվ է', 'RU': 'Активна', 'EN': 'Active' },
    'disabled': { 'AM': 'Անջատված է', 'RU': 'Отключена', 'EN': 'Disabled' },
    'partner': { 'AM': 'Գործընկեր', 'RU': 'Партнер', 'EN': 'Partner' },
    'company_name': { 'AM': 'Ընկերության անվանումը', 'RU': 'Название компании', 'EN': 'Company name' },
    'svg_logo': { 'AM': 'SVG Լոգոտիպ', 'RU': 'SVG Логотип', 'EN': 'SVG Logo' },
    'lbl_master': { 'AM': 'Վարպետ:', 'RU': 'Мастер:', 'EN': 'Master:' },
    'status_incoming': { 'AM': 'ՆՈՐ ՀԱՅՏ', 'RU': 'ВХОДЯЩИЙ', 'EN': 'INCOMING' },
    'status_new': { 'AM': 'ՆՈՐ', 'RU': 'НОВЫЙ', 'EN': 'NEW' },
    'status_pending': { 'AM': 'ԸՆԹԱՑՔՈՒՄ Է', 'RU': 'В ПРОЦЕССЕ', 'EN': 'PENDING' },
    'status_success': { 'AM': 'ԱՎԱՐՏՎԱԾ', 'RU': 'ЗАВЕРШЕН', 'EN': 'SUCCESS' },
    'status_check': { 'AM': 'ՍՏՈՒԳՈՒՄ', 'RU': 'НА ПРОВЕРКЕ', 'EN': 'CHECKING' }
};

window.dashViewedState = { orders: 0, masters: 0, partners: 0 };
window.availableProfessions = ['doors', 'electro', 'universal'];
window.currentActiveEmpId = null;
window.currentEditingEmpId = null;
window.currentEditingPartnerId = null;
window.serverTranslations = {};

window.reviewsData = [];
window.ordersData = [];
window.employeesData = [];
window.cooperationRequestsData = [];
window.servicesData = [];
window.partnersData = [];
window.clientsData = [];

function escapeHTML(str) {
    if(!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

function getTrans(key) {
    if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) {
        return window.adminTranslations[key][window.currentAdminLang];
    }
    return key;
}

window.getBirthdayInfo = function(dateStr) {
    if (!dateStr) return null;
    const today = new Date(); const bdate = new Date(dateStr); if (isNaN(bdate)) return null;
    bdate.setFullYear(today.getFullYear());
    if (bdate < today && (today - bdate) > 86400000) { bdate.setFullYear(today.getFullYear() + 1); }
    const diffTime = bdate - today; const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { isToday: diffDays === 0 || (bdate.getDate() === today.getDate() && bdate.getMonth() === today.getMonth()), daysLeft: diffDays };
};

window.getEmpTypeLabel = function(typeArray) {
    if (!typeArray) return '---';
    const t = Array.isArray(typeArray) ? typeArray : [typeArray];
    return t.map(v => {
        if(v === 'doors') return getTrans('filter_doors');
        if(v === 'electro') return getTrans('filter_electro');
        if(v === 'universal') return getTrans('filter_universal');
        return v;
    }).join(', ');
};

window.generateEmpId = function() { return 'emp_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5); };
window.generateComplexPassword = function() { return Math.floor(100000 + Math.random() * 900000).toString(); };

window.applyAdminLanguage = function() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = getTrans(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = getTrans(key);
    });

    const flagImg = document.querySelector('#current-lang-btn .lang-flag');
    if (flagImg) {
        if (window.currentAdminLang === 'AM') flagImg.src = 'assets/free-icon-armenia-197516.png';
        if (window.currentAdminLang === 'RU') flagImg.src = 'assets/free-icon-russia-9994030.png';
        if (window.currentAdminLang === 'EN') flagImg.src = 'assets/united-kingdom.png';
    }
};

window.setAdminLang = function(lang, event) {
    if(event) event.stopPropagation();
    window.currentAdminLang = lang;
    localStorage.setItem('tree_admin_lang', lang);
    document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
    if(event && event.currentTarget) event.currentTarget.classList.add('active');
    window.applyAdminLanguage();
    document.getElementById('lang-switcher').classList.remove('open');
    window.renderDashboardOverview(); window.renderDashboardOrders(); window.renderDashboardMasters(); window.renderDashboardPartnerRequests(); window.renderEmployees(); window.renderOrders();
};

window.toggleLangMenu = function(event) { event.stopPropagation(); document.getElementById('lang-switcher').classList.toggle('open'); };
document.addEventListener('click', function() { const switcher = document.getElementById('lang-switcher'); if (switcher && switcher.classList.contains('open')) switcher.classList.remove('open'); });

window.toggleTheme = function(event) {
    const body = document.documentElement;
    if (body.getAttribute('data-theme') === 'dark') { body.setAttribute('data-theme', 'light'); localStorage.setItem('admin_theme', 'light'); } 
    else { body.setAttribute('data-theme', 'dark'); localStorage.setItem('admin_theme', 'dark'); }
    window.updateThemeIcon();
};

window.updateThemeIcon = function() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const sunIcon = `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    if (document.documentElement.getAttribute('data-theme') === 'dark') { icon.innerHTML = moonIcon; } else { icon.innerHTML = sunIcon; }
};

window.switchTab = function(tabId, btnElement) {
    document.querySelectorAll('.admin-screen').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.bottom-nav .tab-item').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    
    sessionStorage.setItem('current_admin_tab', tabId);
    if (navigator.vibrate) navigator.vibrate(10);
};

window.finishLogin = function() {
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) {
        authScreen.classList.add('hidden');
        setTimeout(() => { authScreen.style.display = 'none'; }, 300);
    }
    window.fetchOrders(); window.fetchEmployees(); window.fetchServices(); window.fetchAppDatabase();
};

window.logoutAdmin = function() {
    if (confirm(getTrans('logout_btn') + "?")) {
        document.cookie = "tree_admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('tree_secure_token');
        window.location.reload(true);
    }
};

// ИСПРАВЛЕНИЕ: Прямой вызов регистрации при клике по кнопке в модалке
window.registerBiometric = async function() {
    try {
        const publicKeyCredentialCreationOptions = {
            challenge: Uint8Array.from(Math.random().toString(36).substring(2), c => c.charCodeAt(0)),
            rp: { name: "TREE Admin" },
            user: { id: Uint8Array.from("admin", c => c.charCodeAt(0)), name: "admin", displayName: "Administrator" },
            pubKeyCredParams: [{alg: -7, type: "public-key"}, {alg: -257, type: "public-key"}], // Добавлен RS256 для поддержки старых устройств
            authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
            timeout: 60000,
            attestation: "direct"
        };
        const credential = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
        localStorage.setItem('tree_biometric_id', credential.id);
        document.getElementById('bio-prompt-modal').classList.remove('active');
        alert("Touch ID հաջողությամբ պահպանվեց! (Touch ID успешно сохранен!)");
    } catch (err) { 
        console.error(err); 
        alert("Ошибка регистрации: " + err.message);
    }
};

// ИСПРАВЛЕНИЕ: Правильное декодирование Base64url ключа для входа
window.authenticateBiometric = async function(auto = false) {
    const bioId = localStorage.getItem('tree_biometric_id');
    const secureToken = localStorage.getItem('tree_secure_token'); 
    
    if (!bioId) { 
        if(!auto) alert("Դուք դեռ չեք պահպանել Touch ID (Вы еще не сохранили Touch ID)."); 
        return; 
    }
    
    try {
        // Добавляем выравнивание Base64 для безопасного декодирования
        let b64 = bioId.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';
        const credentialIdArray = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

        const publicKeyCredentialRequestOptions = {
            challenge: Uint8Array.from(Math.random().toString(36).substring(2), c => c.charCodeAt(0)),
            allowCredentials: [{ id: credentialIdArray, type: 'public-key', transports: ['internal'] }],
            userVerification: "required", 
            timeout: 60000
        };
        
        const assertion = await navigator.credentials.get({ publicKey: publicKeyCredentialRequestOptions });
        
        if (assertion) {
            // Отпечаток совпал! Проверяем сессию на сервере
            const res = await fetch('/api/orders', { method: 'GET', credentials: 'include' });
            if(res.ok) { 
                window.finishLogin(); 
            } else { 
                alert("Сессия на сервере истекла. Войдите по паролю."); 
                localStorage.removeItem('tree_secure_token');
                document.getElementById('auth-screen').classList.remove('hidden');
            }
        }
    } catch (err) { 
        console.error(err); 
        if(!auto) alert("Touch ID սխալ (Ошибка или отмена Touch ID)"); 
    }
};

window.updateDashDots = function() {
    const incOrders = window.ordersData ? window.ordersData.filter(o => o.status === 'incoming' || (o.status === 'new' && (!o.worker || o.worker === '---' || o.worker === 'Չկա'))).length : 0;
    const incMasters = window.employeesData ? window.employeesData.filter(e => e.status === 'pending').length : 0;
    const incPartners = window.cooperationRequestsData ? window.cooperationRequestsData.filter(c => c.status === 'pending').length : 0;
    const incReviews = window.reviewsData ? window.reviewsData.filter(r => r.isNew).length : 0;

    const updateDot = (id, count) => { const dot = document.getElementById(id); if (!dot) return; if (count > 0) { dot.style.display = 'block'; } else { dot.style.display = 'none'; } };
    updateDot('dash-dot-orders', incOrders); updateDot('dash-dot-masters', incMasters); updateDot('dash-dot-partners', incPartners); updateDot('dash-dot-overview', incReviews);
};

window.switchDashboardView = function(viewName) {
    document.querySelectorAll('.dash-view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-dash-view="${viewName}"]`).classList.add('active');
    document.querySelectorAll('.dash-view-content').forEach(el => el.style.display = 'none');
    document.getElementById('dash-' + viewName).style.display = 'block';

    window.updateDashDots();
    if(viewName === 'overview') window.renderDashboardOverview();
    if(viewName === 'orders') window.renderDashboardOrders();
    if(viewName === 'masters') window.renderDashboardMasters();
    if(viewName === 'partners') window.renderDashboardPartnerRequests();
    if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) { navigator.vibrate(10); }
};

window.renderDashboardOverview = function() {
    let totalRating = 0;
    if(window.reviewsData && window.reviewsData.length > 0) { window.reviewsData.forEach(r => totalRating += r.rating); }
    const avgRating = (window.reviewsData && window.reviewsData.length > 0) ? (totalRating / window.reviewsData.length).toFixed(1) : '0.0';
    document.getElementById('dash-avg-rating-hero').innerText = `★ ${avgRating}`;

    const revList = document.getElementById('dash-reviews-list'); revList.innerHTML = '';
    const masterLabel = getTrans('lbl_master');

    if(window.reviewsData && window.reviewsData.length > 0) {
        window.reviewsData.slice().forEach(rev => {
            const stars = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : '');
            let newDotHtml = rev.isNew ? `<div class="notif-dot-card"></div>` : '';
            const opacityStyle = rev.isNew ? 'opacity: 1;' : 'opacity: 0.65;';
            const safeText = escapeHTML(rev.text);

            revList.innerHTML += `
                <div class="entity-card" style="cursor:pointer; position:relative; ${opacityStyle}" onclick="openReviewModal('${rev.id}')">
                    ${newDotHtml}
                    <div class="entity-header">
                        <span class="entity-id" style="color:var(--text); font-size: 12px;">${escapeHTML(rev.clientName)}</span>
                        <span style="color:var(--warning); font-size:12px; font-weight:900;">${stars}</span>
                    </div>
                    <div class="entity-meta" style="margin-top:4px;">${masterLabel} <b style="color:var(--tree-light);">${escapeHTML(rev.masterName)}</b></div>
                    <div class="truncate-text" style="font-size: 11px; font-weight: 600; font-style: italic; color: var(--text-sec); margin-top: 8px; border-top: 1px dashed var(--card-border); padding-top: 8px;">"${safeText}"</div>
                    <div style="font-size: 9px; color: var(--text-sec); text-align: right; margin-top: 6px;">${escapeHTML(rev.date)}</div>
                </div>
            `;
        });
    } else { revList.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">${getTrans('no_reviews')}</div>`; }
};

window.openReviewModal = function(id) {
    if(!window.reviewsData) return; const rev = window.reviewsData.find(r => r.id === id); if(!rev) return;
    if (rev.isNew) { rev.isNew = false; window.renderDashboardOverview(); window.updateDashDots(); }
    document.getElementById('modal-rev-client').innerText = rev.clientName; document.getElementById('modal-rev-stars').innerText = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : ''); document.getElementById('modal-rev-text').innerText = rev.text; document.getElementById('modal-rev-date').innerText = rev.date; document.getElementById('review-modal').classList.add('active');
    if (navigator.vibrate) navigator.vibrate(10);
};

window.closeReviewModal = function() { document.getElementById('review-modal').classList.remove('active'); };

window.renderDashboardOrders = function() {
    const list = document.getElementById('dash-orders-list'); list.innerHTML = '';
    if(!window.ordersData || window.ordersData.length === 0) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">${getTrans('no_orders')}</div>`; return; }
    
    let filtered = window.ordersData.filter(o => o.status === 'incoming' || (o.status === 'new' && (!o.worker || o.worker === '---' || o.worker === 'Չկա')));
    if(filtered.length > 0) {
        filtered.forEach(order => {
            let mainTitle = order.services && order.services.length > 0 ? order.services[0].name : "---";
            if(order.services && order.services.length > 1) mainTitle += ` (+${order.services.length - 1})`;
            
            let statClass = order.status === 'incoming' ? 'incoming' : 'new';
            let statText = order.status === 'incoming' ? getTrans('status_incoming') : getTrans('status_new');
            
            const card = document.createElement('div'); card.className = 'entity-card'; 
            card.onclick = () => { if(window.openOrderModal) window.openOrderModal(order.id); };
            card.innerHTML = `
                <div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status ${statClass}">${statText}</span></div>
                <div class="entity-title" style="margin-bottom: 6px;">${escapeHTML(mainTitle)}</div>
                <div class="entity-meta"><span>${getTrans('lbl_name')}</span> <b style="color:var(--text);">${escapeHTML(order.clientName || '---')}</b></div>
                <div class="entity-meta"><span>${getTrans('lbl_phone')}</span> <b style="color:var(--text);">${escapeHTML(order.clientPhone)}</b></div>
                <div class="entity-meta"><span>${getTrans('lbl_address')}</span> <span style="text-align:right;">${escapeHTML(order.address)}</span></div>
            `;
            list.appendChild(card);
        });
    } else { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">${getTrans('no_orders')}</div>`; }
};

window.renderDashboardMasters = function() {
    const list = document.getElementById('dash-masters-list'); list.innerHTML = '';
    if(!window.employeesData) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; return; }
    
    const pendingMasters = window.employeesData.filter(e => e.status === 'pending');
    if(pendingMasters.length > 0) {
        pendingMasters.forEach(emp => {
            const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => window.openEmployeeModal(emp.id);
            card.innerHTML = `<div class="entity-header"><span class="entity-id">${emp.id}</span><span class="entity-status pending">${getTrans('status_check')}</span></div><div class="entity-title">${escapeHTML(emp.name)}</div><div class="entity-meta"><span>${getTrans('specialties')}: ${window.getEmpTypeLabel(emp.type)}</span></div><div class="entity-meta"><span>${getTrans('emp_exp')}: ${emp.exp ? escapeHTML(emp.exp.split('/')[0].trim()) : '0'}</span></div><div class="entity-meta" style="margin-top: 4px; border-top: 1px dashed var(--card-border); padding-top: 6px;"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${escapeHTML(emp.phone)}</span></div>`;
            list.appendChild(card);
        });
    } else { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; }
};

window.renderDashboardPartnerRequests = function() {
    const list = document.getElementById('dash-partners-requests-list'); list.innerHTML = '';
    if(!window.cooperationRequestsData) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; return; }
    
    const pendingPartners = window.cooperationRequestsData.filter(c => c.status === 'pending');
    if(pendingPartners.length > 0) {
        pendingPartners.forEach(coop => {
            const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => openCoopModal(coop.id);
            card.innerHTML = `
                <div class="entity-header"><span class="entity-id">${escapeHTML(coop.company)}</span><span class="entity-status new">B2B</span></div>
                <div class="entity-title">${escapeHTML(coop.contact)}</div>
                <div class="entity-meta"><span>${getTrans('phone')}:</span> <b style="color:var(--text);">${escapeHTML(coop.phone)}</b></div>
                <div class="entity-meta" style="margin-top:4px;"><span>${getTrans('date')}</span> <span>${escapeHTML(coop.date)}</span></div>
                <div class="truncate-text" style="font-size: 11px; font-weight: 600; font-style: italic; color: var(--text-sec); margin-top: 8px; border-top: 1px dashed var(--card-border); padding-top: 8px;">"${escapeHTML(coop.text)}"</div>
            `;
            list.appendChild(card);
        });
    } else { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; }
};

let currentActiveCoopId = null;
window.openCoopModal = function(id) {
    currentActiveCoopId = id; const coop = window.cooperationRequestsData.find(c => c.id === id); if(!coop) return;
    document.getElementById('modal-coop-company').innerText = coop.company; 
    document.getElementById('modal-coop-contact').innerText = coop.contact; 
    document.getElementById('modal-coop-phone').innerText = coop.phone; 
    document.getElementById('modal-coop-phone-link').href = `tel:${coop.phone.replace(/[^\d+]/g, '')}`; 
    document.getElementById('modal-coop-date').innerText = coop.date;
    document.getElementById('modal-coop-text').innerText = coop.text; 
    document.getElementById('coop-modal').classList.add('active');
};
window.closeCoopModal = function() { document.getElementById('coop-modal').classList.remove('active'); currentActiveCoopId = null; };
window.acceptCoop = function() {
    if(!currentActiveCoopId) return; const coop = window.cooperationRequestsData.find(c => c.id === currentActiveCoopId);
    if(coop) {
        coop.status = 'accepted'; const newPartnerId = 'p_'+Math.random(); window.partnersData.push({ id: newPartnerId, name: coop.company, logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>' }); window.cooperationRequestsData = window.cooperationRequestsData.filter(c => c.id !== currentActiveCoopId); window.renderDashboardPartnerRequests(); window.renderAdminPartners(); window.updateDashDots(); window.closeCoopModal(); if(navigator.vibrate) navigator.vibrate(20); 
    }
};
window.rejectCoop = function() { if(!currentActiveCoopId) return; if(confirm(getTrans('reject') + "?")) { window.cooperationRequestsData = window.cooperationRequestsData.filter(c => c.id !== currentActiveCoopId); window.renderDashboardPartnerRequests(); window.updateDashDots(); window.closeCoopModal(); } };

window.fetchOrders = async function() {
    try {
        const res = await fetch('/api/orders', { credentials: 'include' });
        if (res.status === 401) { sessionStorage.removeItem('tree_authenticated'); document.getElementById('auth-screen').style.display = 'flex'; return; }
        if (res.ok) { 
            const data = await res.json(); 
            if (data && data.length > 0) window.ordersData = data; 
            if(window.renderOrders) window.renderOrders(); window.renderDashboardOrders(); window.updateDashDots(); 
        }
    } catch (err) { console.error('Ошибка загрузки заказов:', err); }
};

window.syncSingleOrder = async function(order, action = 'update') {
    try { const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ action: action, order: order, orderId: order ? order.id : null }) }); if (res.status === 401) { sessionStorage.removeItem('tree_authenticated'); document.getElementById('auth-screen').style.display = 'flex'; } } catch (err) { console.error('Ошибка синхронизации заказа:', err); }
};

window.renderOrders = function() {
    const list = document.getElementById('orders-list'); if(!list) return; list.innerHTML = '';
    if(window.ordersData.length === 0) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">${getTrans('no_orders')}</div>`; return; }
    window.ordersData.forEach(order => {
        let mainTitle = order.services && order.services.length > 0 ? order.services[0].name : "---";
        const card = document.createElement('div'); card.className = 'entity-card';
        card.onclick = () => { if(window.openOrderModal) window.openOrderModal(order.id); };
        card.innerHTML = `<div class="entity-header"><span class="entity-id">${order.id}</span></div><div class="entity-title">${escapeHTML(mainTitle)}</div><div class="entity-meta">${escapeHTML(order.clientName || '---')} - ${escapeHTML(order.clientPhone)}</div>`;
        list.appendChild(card);
    });
};

window.openOrderModal = function(id) {
    const order = window.ordersData.find(o => o.id === id);
    if(!order) return;
    document.getElementById('modal-order-id').innerText = order.id;
    document.getElementById('modal-order-client').innerText = order.clientName || '---';
    document.getElementById('modal-order-phone').innerText = order.clientPhone || '---';
    const phoneLink = document.getElementById('modal-order-phone-link');
    if (order.clientPhone) { phoneLink.style.display = 'flex'; phoneLink.href = `tel:${order.clientPhone.replace(/[^\d+]/g, '')}`; } else phoneLink.style.display = 'none';
    
    const address = order.address || '';
    document.getElementById('modal-order-address').innerText = address || '---';
    const mapLink = document.getElementById('modal-order-address-link');
    if (address) {
        mapLink.style.display = 'flex';
        mapLink.href = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
    } else {
        mapLink.style.display = 'none';
    }
    
    let mainTitle = order.services && order.services.length > 0 ? order.services[0].name : "---";
    if(order.services && order.services.length > 1) mainTitle += ` (+${order.services.length - 1})`;
    document.getElementById('modal-order-service').innerText = mainTitle;
    
    document.getElementById('order-modal').classList.add('active');
    if (navigator.vibrate) navigator.vibrate(10);
};

window.closeOrderModal = function() {
    document.getElementById('order-modal').classList.remove('active');
};

window.openOrderForm = function() {
    alert(getTrans('in_development'));
};

window.fetchEmployees = async function() {
    try { 
        const res = await fetch('/api/employees', { credentials: 'include' }); 
        if (res.ok) { 
            const data = await res.json(); 
            if (data && data.length > 0) window.employeesData = data; 
            window.renderEmployees(); window.renderDashboardMasters(); window.updateDashDots(); 
        } 
    } catch (err) { console.error('Ошибка загрузки сотрудников:', err); }
};

window.syncSingleEmployee = async function(employee, action = 'update') {
    try {
        const res = await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ action: action, employee: employee, empId: employee ? employee.id : null })
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            alert(`Ошибка сохранения в базу: ${errorData.error || 'Сбой на сервере'}`);
            console.error('Сбой БД:', errorData);
            return false;
        }
        return true;
    } catch (err) { 
        console.error('Ошибка сети при синхронизации сотрудника:', err); 
        alert('Ошибка сети: не удалось связаться с базой данных!');
        return false;
    }
};

window.setEmpFilter = function(filterValue) { document.querySelectorAll('#screen-employees .filter-tab').forEach(t => { if (t.getAttribute('data-emp-filter') === filterValue) t.classList.add('active'); else t.classList.remove('active'); }); window.renderEmployees(); };

window.previewEmpPhoto = function(event) {
    const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.readAsDataURL(file);
    reader.onload = e => {
        const img = new Image(); img.src = e.target.result;
        img.onload = () => { const canvas = document.createElement('canvas'); const scaleSize = 250 / img.width; canvas.width = 250; canvas.height = img.height * scaleSize; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, canvas.width, canvas.height); const base64 = canvas.toDataURL('image/jpeg', 0.8); document.getElementById('form-emp-photo-base64').value = base64; document.getElementById('form-emp-photo-preview').style.backgroundImage = `url(${base64})`; document.getElementById('photo-placeholder-icon').style.display = 'none'; }
    };
};

window.renderEmployees = function() {
    const list = document.getElementById('employees-list'); if (!list) return; list.innerHTML = '';
    const activeTab = document.querySelector('#screen-employees .filter-tab.active'); const activeFilter = activeTab ? activeTab.getAttribute('data-emp-filter') : 'all';
    const empSearchInput = document.getElementById('employee-search'); const empSearchTerm = empSearchInput ? empSearchInput.value.toLowerCase() : '';
    const bdayEmployees = [];
    
    if(!window.employeesData) return;

    window.employeesData.filter(e => e.status === 'active').forEach(emp => {
        const textToSearch = (emp.name + " " + emp.phone).toLowerCase(); const matchesSearch = textToSearch.includes(empSearchTerm);
        let matchesFilter = false; if (activeFilter === 'all') { matchesFilter = true; } else { matchesFilter = Array.isArray(emp.type) ? emp.type.includes(activeFilter) : (emp.type === activeFilter); }
        if (!matchesFilter || !matchesSearch) return;
        
        const bdayInfo = window.getBirthdayInfo(emp.birthDate); if (bdayInfo && bdayInfo.isToday) bdayEmployees.push(emp.name);
        let bdayHtml = ''; if (bdayInfo) { if (bdayInfo.isToday) bdayHtml = `<div style="color: var(--warning); font-weight: 800; font-size: 10px; margin-top: 6px; display: flex; align-items: center; gap: 4px;">🎉 Happy Birthday!</div>`; else bdayHtml = `<div style="color: var(--text-sec); font-weight: 600; font-size: 9px; margin-top: 6px;">🎂 ${bdayInfo.daysLeft} days left</div>`; }
        
        const photoHtml = emp.photo ? `<div style="width: 46px; height: 46px; border-radius: 50%; background-image: url(${emp.photo}); background-size: cover; background-position: center; flex-shrink: 0;"></div>` : `<div style="width: 46px; height: 46px; border-radius: 50%; background: var(--card-border); display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: 900; color: var(--text-sec); flex-shrink: 0;">${emp.name.charAt(0)}</div>`;

        const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => window.openEmployeeModal(emp.id); 
        card.innerHTML = `
            <div style="display: flex; gap: 14px; align-items: center;">
                ${photoHtml}
                <div style="flex: 1;">
                    <div class="entity-header"><span class="entity-id">${emp.id}</span><div class="rating-badge" style="font-size:10px; font-weight:900; color:var(--warning);">★ ${(emp.rating || 0).toFixed(1)}</div></div>
                    <div class="entity-title" style="margin-top:2px;">${escapeHTML(emp.name)}</div>
                    <div class="entity-meta"><span>${window.getEmpTypeLabel(emp.type)}</span></div>
                </div>
            </div>
            <div class="entity-meta" style="margin-top: 8px;"><span>${getTrans('debt')}: <b style="color:${(emp.companyDebt||0) < 0 ? 'var(--tree-light)' : 'var(--danger)'}">${(emp.companyDebt||0).toLocaleString()} ֏</b></span></div>
            ${bdayHtml}
            <div class="entity-meta" style="margin-top: 4px; border-top: 1px dashed var(--card-border); padding-top: 6px;"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${escapeHTML(emp.phone)}</span><button class="call-btn" style="width: 26px; height: 26px; border-radius: 50%;" onclick="event.stopPropagation(); window.location.href='tel:${emp.phone.replace(/[^\d+]/g, '')}'"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button></div>`;
        list.appendChild(card);
    });
    
    const bannerContainer = document.getElementById('bday-banner-container');
    if (bannerContainer) { if (bdayEmployees.length > 0) { bannerContainer.innerHTML = `<div class="glass-panel" style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--warning); margin-bottom: 12px; padding: 12px; display: flex; align-items: center; gap: 12px;"><span style="font-size: 28px; line-height: 1;">🎉</span><div><div style="font-weight: 900; font-size: 13px; color: var(--warning); margin-bottom: 2px;">HAPPY BIRTHDAY!</div><div style="font-size: 11px; font-weight: 600; color: var(--text);"><b>${bdayEmployees.join(', ')}</b></div></div></div>`; bannerContainer.style.display = 'block'; } else bannerContainer.style.display = 'none'; }
};

window.openEmployeeModal = function(empId) {
    window.currentActiveEmpId = empId; const emp = window.employeesData.find(e => e.id === empId); if (!emp) return;
    const isPending = (emp.status === 'pending');
    document.getElementById('modal-emp-id').innerText = emp.id; document.getElementById('modal-emp-type').innerText = window.getEmpTypeLabel(emp.type); 
    const typeBadge = document.getElementById('modal-emp-type');
    if (isPending) { typeBadge.style.background = 'rgba(245, 158, 11, 0.15)'; typeBadge.style.color = 'var(--warning)'; } else { typeBadge.style.background = 'var(--btn-shadow)'; typeBadge.style.color = 'var(--tree-light)'; }
    
    const photoEl = document.getElementById('modal-emp-photo');
    if (emp.photo) { photoEl.style.backgroundImage = `url(${emp.photo})`; photoEl.style.display = 'block'; } else { photoEl.style.display = 'none'; }

    document.getElementById('modal-emp-name').innerText = emp.name; document.getElementById('modal-emp-access-key').innerText = emp.accessKey || '------'; document.getElementById('modal-emp-birth').innerText = emp.birthDate || '---';
    const debtEl = document.getElementById('modal-emp-debt'); if (emp.companyDebt === undefined) emp.companyDebt = 0; debtEl.innerText = emp.companyDebt.toLocaleString() + ' ֏'; debtEl.style.color = emp.companyDebt < 0 ? 'var(--tree-light)' : 'var(--danger)';
    
    const scheduleContainer = document.getElementById('modal-emp-schedule-list');
    if (emp.workingDates && emp.workingDates.length > 0) scheduleContainer.innerHTML = emp.workingDates.map(d => `<span style="display:inline-block; background:var(--btn-shadow); color:var(--tree-light); padding:4px 8px; border-radius:8px; font-size:10px; font-weight:800; margin-bottom:4px;">${d}</span>`).join('');
    else scheduleContainer.innerHTML = '<span style="font-size:10px; color:var(--text-sec);">---</span>';
    
    const bdayInfo = window.getBirthdayInfo(emp.birthDate); const bdayRow = document.getElementById('modal-emp-bday-row'); const bdayCountdown = document.getElementById('modal-emp-bday-countdown');
    if (bdayInfo) { bdayRow.style.display = 'flex'; if (bdayInfo.isToday) bdayCountdown.innerHTML = `<span style="color: var(--warning); font-weight: 900; font-size: 14px;">🎉!</span>`; else bdayCountdown.innerText = `(${bdayInfo.daysLeft} d)`; } else bdayRow.style.display = 'none';
    
    document.getElementById('modal-emp-phone-text').innerText = emp.phone; const phoneLink = document.getElementById('modal-emp-phone-link');
    if (emp.phone) { phoneLink.style.display = 'flex'; phoneLink.href = `tel:${emp.phone.replace(/[^\d+]/g, '')}`; } else phoneLink.style.display = 'none';
    document.getElementById('modal-emp-address').innerText = emp.address || '---'; document.getElementById('modal-emp-exp').innerText = emp.exp ? emp.exp.split('/')[0].trim() : '0'; document.getElementById('modal-emp-rating').innerText = `★ ${(emp.rating || 0).toFixed(1)}`;
    
    const btnAccept = document.getElementById('modal-emp-accept-btn'); const btnReject = document.getElementById('modal-emp-reject-btn'); const btnEdit = document.getElementById('modal-emp-edit-btn'); const btnFire = document.getElementById('modal-emp-fire-btn');

    if (isPending) { btnAccept.style.display = 'flex'; btnReject.style.display = 'flex'; btnEdit.style.display = 'none'; if(btnFire) btnFire.style.display = 'none'; } 
    else { btnAccept.style.display = 'none'; btnReject.style.display = 'none'; btnEdit.style.display = 'flex'; if(btnFire) btnFire.style.display = 'flex'; }
    
    document.getElementById('emp-pin-row').style.display = isPending ? 'none' : 'flex'; document.getElementById('emp-schedule-block').style.display = isPending ? 'none' : 'block'; document.getElementById('emp-finance-block').style.display = isPending ? 'none' : 'block'; document.getElementById('emp-orders-block').style.display = isPending ? 'none' : 'block';
    if (isPending) bdayRow.style.display = 'none';

    document.getElementById('employee-modal').classList.add('active'); if (navigator.vibrate) navigator.vibrate(15);
};

window.closeEmployeeModal = function() { document.getElementById('employee-modal').classList.remove('active'); window.currentActiveEmpId = null; };
window.toggleEmpOrders = function() { document.getElementById('modal-emp-orders-list').classList.toggle('open'); };

window.acceptEmployee = async function() { 
    if (!window.currentActiveEmpId) return; 
    const emp = window.employeesData.find(e => e.id === window.currentActiveEmpId); 
    if (emp) { 
        const oldStatus = emp.status;
        const oldKey = emp.accessKey;
        
        emp.status = 'active'; 
        if (!emp.accessKey) emp.accessKey = window.generateComplexPassword(); 
        
        const success = await window.syncSingleEmployee(emp); 
        if (success) {
            window.renderDashboardMasters(); window.renderEmployees(); window.updateDashDots(); window.openEmployeeModal(emp.id); if (navigator.vibrate) navigator.vibrate(20); 
        } else {
            emp.status = oldStatus;
            emp.accessKey = oldKey;
        }
    } 
};

window.rejectEmployee = async function() { 
    if (!window.currentActiveEmpId) return; 
    if (confirm(getTrans('reject')+"?")) { 
        const success = await window.syncSingleEmployee({id: window.currentActiveEmpId}, 'delete');
        if (success) {
            window.employeesData = window.employeesData.filter(e => e.id !== window.currentActiveEmpId); 
            window.renderDashboardMasters(); window.closeEmployeeModal(); window.updateDashDots(); 
        }
    } 
};

window.fireEmployee = async function() { 
    if (!window.currentActiveEmpId) return; 
    if (confirm(getTrans('fire')+"?")) { 
        const emp = window.employeesData.find(e => e.id === window.currentActiveEmpId); 
        if (emp) { 
            const oldStatus = emp.status;
            emp.status = 'dismissed'; 
            
            const success = await window.syncSingleEmployee(emp); 
            if (success) {
                window.renderDashboardMasters(); window.renderEmployees(); window.closeEmployeeModal(); window.updateDashDots(); 
            } else {
                emp.status = oldStatus;
            }
        } 
    } 
};

window.adjustEmpDebt = async function(action) {
    if (!window.currentActiveEmpId) return; const emp = window.employeesData.find(e => e.id === window.currentActiveEmpId); if (!emp) return;
    const inputEl = document.getElementById('emp-finance-input'); const val = parseInt(inputEl.value, 10); 
    if (isNaN(val) || val <= 0) return alert("Err");
    
    if (emp.companyDebt === undefined || isNaN(emp.companyDebt)) emp.companyDebt = 0;
    const oldDebt = emp.companyDebt;
    
    if (action === 'add') emp.companyDebt += val; else if (action === 'bonus') emp.companyDebt -= val; 
    
    const success = await window.syncSingleEmployee(emp);
    if (success) {
        const debtEl = document.getElementById('modal-emp-debt'); debtEl.innerText = emp.companyDebt.toLocaleString() + ' ֏'; debtEl.style.color = emp.companyDebt < 0 ? 'var(--tree-light)' : 'var(--danger)';
        inputEl.value = ''; window.renderEmployees(); if (navigator.vibrate) navigator.vibrate(20);
    } else {
        emp.companyDebt = oldDebt;
    }
};

window.renderProfessionsForm = function(selected = []) {
    const container = document.getElementById('form-emp-professions-container'); container.innerHTML = '';
    let allProfs = new Set([...window.availableProfessions]);
    if (window.employeesData) { window.employeesData.forEach(e => { if(e.status !== 'dismissed') { if (Array.isArray(e.type)) e.type.forEach(t => allProfs.add(t)); else if (e.type) allProfs.add(e.type); } }); }
    selected.forEach(s => allProfs.add(s));
    allProfs.forEach(prof => {
        const isActive = selected.includes(prof) ? 'active' : ''; const label = window.getEmpTypeLabel([prof]); const isCustom = !window.availableProfessions.includes(prof);
        const delBtn = isCustom ? `<span class="del-chip" style="margin-left:6px; color:var(--danger); font-weight:900; font-size:14px;">&times;</span>` : '';
        container.innerHTML += `<div class="prof-chip ${isActive}" data-val="${prof}" onclick="if(event.target.classList.contains('del-chip')) { this.remove(); } else { this.classList.toggle('active'); if(navigator.vibrate) navigator.vibrate(10); }">${label}${delBtn}</div>`;
    });
};
window.addNewProfession = function() { const newProf = prompt('New:'); if (newProf && newProf.trim() !== '') { const val = escapeHTML(newProf.trim()); const container = document.getElementById('form-emp-professions-container'); container.innerHTML += `<div class="prof-chip active" data-val="${val}" onclick="if(event.target.classList.contains('del-chip')) { this.remove(); } else { this.classList.toggle('active'); if(navigator.vibrate) navigator.vibrate(10); }">${val} <span class="del-chip" style="margin-left:6px; color:var(--danger); font-weight:900; font-size:14px;">&times;</span></div>`; } };

window.openEmployeeForm = function(empId = null) {
    window.currentEditingEmpId = empId; const form = document.getElementById('employee-form'); form.reset();
    const photoPreview = document.getElementById('form-emp-photo-preview'); const photoBase64 = document.getElementById('form-emp-photo-base64');
    let empTypes = [];
    if (empId) { 
        const emp = window.employeesData.find(e => e.id === empId); 
        if (emp) { 
            document.getElementById('form-emp-name').value = emp.name; document.getElementById('form-emp-phone').value = emp.phone; document.getElementById('form-emp-address').value = emp.address || ''; document.getElementById('form-emp-birth').value = emp.birthDate || ''; document.getElementById('form-emp-exp').value = emp.exp ? emp.exp.split('/')[0].trim() : ''; document.getElementById('form-emp-access-key').value = emp.accessKey || ''; 
            if (emp.photo) { photoPreview.style.backgroundImage = `url(${emp.photo})`; document.getElementById('photo-placeholder-icon').style.display = 'none'; photoBase64.value = emp.photo; } else { photoPreview.style.backgroundImage = 'none'; document.getElementById('photo-placeholder-icon').style.display = 'block'; photoBase64.value = ''; }
            empTypes = Array.isArray(emp.type) ? emp.type : [emp.type];
        } 
        window.closeEmployeeModal(); 
    } else { document.getElementById('form-emp-access-key').value = window.generateComplexPassword(); photoPreview.style.backgroundImage = 'none'; document.getElementById('photo-placeholder-icon').style.display = 'block'; photoBase64.value = ''; }
    window.renderProfessionsForm(empTypes); document.getElementById('form-emp-photo').value = ''; document.getElementById('employee-form-modal').classList.add('active');
};
window.closeEmployeeFormModal = function() { document.getElementById('employee-form-modal').classList.remove('active'); window.currentEditingEmpId = null; };

window.saveEmployeeForm = async function(event) {
    event.preventDefault();
    const selectedProfChips = document.querySelectorAll('#form-emp-professions-container .prof-chip.active');
    const finalTypes = Array.from(selectedProfChips).map(c => c.getAttribute('data-val'));
    if (finalTypes.length === 0) return alert('Err');

    const submitBtn = event.target.querySelector('button[type="submit"]'); const origText = submitBtn.innerText; submitBtn.innerText = '...'; submitBtn.disabled = true;
    const name = document.getElementById('form-emp-name').value; const phone = document.getElementById('form-emp-phone').value; const address = document.getElementById('form-emp-address').value; const birthDate = document.getElementById('form-emp-birth').value; const exp = document.getElementById('form-emp-exp').value; const accessKey = document.getElementById('form-emp-access-key').value; const photo = document.getElementById('form-emp-photo-base64').value; 
    
    let targetEmp;
    let isNew = false;
    let backupState = {};

    if (window.currentEditingEmpId) { 
        targetEmp = window.employeesData.find(e => e.id === window.currentEditingEmpId); 
        if (targetEmp) { 
            backupState = { ...targetEmp };
            targetEmp.name = name; targetEmp.phone = phone; targetEmp.address = address; targetEmp.birthDate = birthDate; targetEmp.type = finalTypes; targetEmp.exp = exp; targetEmp.accessKey = accessKey; targetEmp.photo = photo; 
        } 
    } else { 
        isNew = true;
        targetEmp = { id: window.generateEmpId(), status: 'active', name: name, type: finalTypes, phone: phone, exp: exp || '0', rating: 0.0, birthDate: birthDate, address: address, accessKey: accessKey, companyDebt: 0, workingDates: [], photo: photo };
    }
    
    const success = await window.syncSingleEmployee(targetEmp); 
    if (success) {
        if (isNew) window.employeesData.push(targetEmp); 
        window.renderEmployees(); window.renderDashboardMasters(); window.closeEmployeeFormModal(); window.updateDashDots(); if (navigator.vibrate) navigator.vibrate(50);
    } else {
        if (!isNew && targetEmp) {
            Object.assign(targetEmp, backupState);
        }
    }
    
    submitBtn.innerText = origText; submitBtn.disabled = false;
};

window.renderClients = function() {
    const list = document.getElementById('clients-list'); if (!list) return; list.innerHTML = '';
    const searchInput = document.getElementById('client-search'); const searchTerm = searchInput ? searchInput.value.toLowerCase() : ''; let count = 0;
    window.clientsData.forEach(c => {
        const textToSearch = (c.name + " " + c.phone + " " + c.id).toLowerCase(); if (searchTerm !== '' && !textToSearch.includes(searchTerm)) return; count++;
        list.innerHTML += `<div class="entity-card"><div class="entity-header"><span class="entity-id" style="font-size: 14px; font-weight: 900; color: var(--tree-light);">${c.id}</span><div class="rating-badge">% ${c.discount}</div></div><div class="entity-title" style="margin-top: 8px;">${escapeHTML(c.name)}</div><div class="entity-meta"><span style="font-weight: 700; color: var(--text);">${escapeHTML(c.phone)}</span></div><div style="display: flex; gap: 6px; margin-top: 12px; border-top: 1px dashed var(--card-border); padding-top: 12px; align-items: center;"><div style="display: flex; background: var(--bg-base); border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);"><button style="width: 36px; height: 36px; border: none; background: transparent; color: var(--text); font-size: 16px; cursor: pointer; border-right: 1px solid var(--card-border);" onclick="changeDiscount('${c.id}', -5)">-</button><input type="number" id="discount-input-${c.id}" value="${c.discount}" style="width: 40px; border: none; background: transparent; text-align: center; color: var(--tree-light); font-weight: 900; outline: none; -moz-appearance: textfield;"><button style="width: 36px; height: 36px; border: none; background: transparent; color: var(--text); font-size: 16px; cursor: pointer; border-left: 1px solid var(--card-border);" onclick="changeDiscount('${c.id}', 5)">+</button></div><button class="submit-btn success" style="padding: 0; height: 36px; margin: 0; flex: 1; font-size: 10px;" onclick="updateClientDiscount('${c.id}')">OK</button><button class="call-btn" style="width: 36px; height: 36px; border-radius: 50%;" onclick="window.location.href='tel:${c.phone.replace(/[^\d+]/g, '')}'"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button></div></div>`;
    });
    document.getElementById('clients-total-count').innerText = count;
};
document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('client-search')) document.getElementById('client-search').addEventListener('input', window.renderClients); });
window.changeDiscount = function(id, val) { const inp = document.getElementById(`discount-input-${id}`); let current = parseInt(inp.value) || 0; let next = current + val; if (next < 0) next = 0; if (next > 100) next = 100; inp.value = next; if (navigator.vibrate) navigator.vibrate(10); };
window.updateClientDiscount = function(id) { const c = window.clientsData.find(x => x.id === id); if (c) { const val = parseInt(document.getElementById(`discount-input-${id}`).value) || 0; c.discount = val; if (navigator.vibrate) navigator.vibrate([20, 50, 20]); window.renderClients(); } };

window.renderAdminPartners = function() {
    const list = document.getElementById('admin-partners-list'); if (!list) return; list.innerHTML = '';
    window.partnersData.forEach(p => { list.innerHTML += `<div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 50px; height: 50px; border-radius: 16px; border: 1px dashed var(--card-border); display: flex; justify-content: center; align-items: center; overflow: hidden;">${p.logo}</div><div style="font-size: 14px; font-weight: 800; color: var(--text);">${escapeHTML(p.name)}</div></div><div style="display: flex; gap: 4px;"><button class="serv-del-btn" style="color:var(--text); border-color:var(--text-sec); background:var(--bg-base);" onclick="openPartnerForm('${p.id}')"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button><button class="serv-del-btn" onclick="deletePartner('${p.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div>`; });
};
window.openPartnerForm = function(partnerId = null) { window.currentEditingPartnerId = partnerId; if(partnerId) { const p = window.partnersData.find(x => x.id === partnerId); if(p) { document.getElementById('form-partner-name').value = p.name; document.getElementById('form-partner-logo').value = p.logo; } } else { document.getElementById('form-partner-name').value = ''; document.getElementById('form-partner-logo').value = ''; } document.getElementById('partner-form-modal').classList.add('active'); };
window.closePartnerForm = function() { document.getElementById('partner-form-modal').classList.remove('active'); };
window.savePartnerForm = function(e) { e.preventDefault(); const name = document.getElementById('form-partner-name').value; const logo = document.getElementById('form-partner-logo').value; if(window.currentEditingPartnerId) { const p = window.partnersData.find(x => x.id === window.currentEditingPartnerId); if(p) { p.name = name; p.logo = logo; } } else { window.partnersData.push({ id: 'p' + Math.random(), name, logo }); } window.renderAdminPartners(); window.closePartnerForm(); if(navigator.vibrate)navigator.vibrate(20); };
window.deletePartner = function(id) { if(confirm('Delete?')) { window.partnersData = window.partnersData.filter(p => p.id !== id); window.renderAdminPartners(); } };

window.switchManagementTab = function(tabName, btnElement) { document.querySelectorAll('#screen-management > div[id^="mng-view-"]').forEach(el => el.style.display = 'none'); document.getElementById('mng-view-' + tabName).style.display = 'block'; document.querySelectorAll('#screen-management .view-switch-btn').forEach(btn => btn.classList.remove('active')); btnElement.classList.add('active'); if(tabName === 'services' && window.renderAdminServices) window.renderAdminServices(); if (navigator.vibrate) navigator.vibrate(10); };
window.renderAdminServices = function() { const list = document.getElementById('admin-services-list'); if (!list) return; list.innerHTML = ''; window.servicesData.forEach(s => { list.innerHTML += `<div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: var(--btn-shadow); color: var(--tree-light); display: flex; justify-content: center; align-items: center;">${s.icon}</div><div><div style="font-size: 13px; font-weight: 800; color: var(--text);">${escapeHTML(s.name)}</div><div style="font-size: 10px; color: var(--text-sec); font-weight: 700;">${s.price} ֏</div></div></div><button class="serv-del-btn" onclick="deleteService('${s.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div>`; }); };
window.fetchServices = async function() { try { const res = await fetch('/api/services', { credentials: 'include' }); if(res.ok) { const data = await res.json(); window.servicesData = data || []; window.renderAdminServices(); } } catch(err) { console.error('Error:', err); } };
window.openServiceForm = function() { document.getElementById('form-cat-name').value = ''; document.getElementById('form-cat-price').value = ''; document.getElementById('form-cat-icon').value = ''; document.getElementById('service-form-modal').classList.add('active'); };
window.closeServiceForm = function() { document.getElementById('service-form-modal').classList.remove('active'); };

window.saveServiceForm = async function(e) { 
    e.preventDefault(); const submitBtn = e.target.querySelector('button[type="submit"]'); const origText = submitBtn.innerText; submitBtn.innerText = '...'; submitBtn.disabled = true; 
    const newService = { id: 's' + Date.now(), name: document.getElementById('form-cat-name').value, price: parseInt(document.getElementById('form-cat-price').value) || 0, icon: document.getElementById('form-cat-icon').value || '<svg></svg>', status: document.getElementById('form-cat-status').value }; 
    
    try { 
        const res = await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ action: 'update', service: newService }) }); 
        if(res.ok) { 
            window.servicesData.push(newService); 
            window.renderAdminServices(); window.closeServiceForm(); if(navigator.vibrate) navigator.vibrate(20); 
        } 
    } catch(err) { alert('Err'); } finally { submitBtn.innerText = origText; submitBtn.disabled = false; } 
};

window.deleteService = async function(id) { 
    if(confirm('Delete?')) { 
        try { 
            const res = await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ action: 'delete', serviceId: id }) }); 
            if(res.ok) { 
                window.servicesData = window.servicesData.filter(s => s.id !== id); 
                window.renderAdminServices(); if(navigator.vibrate) navigator.vibrate(20); 
            } 
        } catch(err) { alert('Err'); } 
    } 
};

window.fetchAppDatabase = async function() { try { const res = await fetch('/api/data', { credentials: 'include' }); const data = await res.json(); window.serverTranslations = data || {}; window.renderTranslationsEditor(); window.loadPromoAndNewsValues(); } catch (err) { console.error(err); } };
window.loadPromoAndNewsValues = function() { if(window.serverTranslations['promo_title']) { if(window.serverTranslations['promo_title']['AM']) document.getElementById('promo-text-am').value = window.serverTranslations['promo_title']['AM']; if(window.serverTranslations['promo_title']['RU']) document.getElementById('promo-text-ru').value = window.serverTranslations['promo_title']['RU']; if(window.serverTranslations['promo_title']['EN']) document.getElementById('promo-text-en').value = window.serverTranslations['promo_title']['EN']; } if(window.serverTranslations['global_discount']) { document.getElementById('promo-discount-input').value = window.serverTranslations['global_discount']; } };
window.savePromo = async function(event) { event.preventDefault(); const btn = document.getElementById('promo-submit-btn'); const span = btn.querySelector('span'); const origText = span.innerHTML; span.innerHTML = '...'; if (!window.serverTranslations['promo_title']) window.serverTranslations['promo_title'] = {}; window.serverTranslations['promo_title']['AM'] = document.getElementById('promo-text-am').value; window.serverTranslations['promo_title']['RU'] = document.getElementById('promo-text-ru').value; window.serverTranslations['promo_title']['EN'] = document.getElementById('promo-text-en').value; window.serverTranslations['global_discount'] = document.getElementById('promo-discount-input').value; await window.uploadToServer(btn, origText, span); };
window.renderTranslationsEditor = function() { const list = document.getElementById('translations-list'); if(!list) return; list.innerHTML = ''; const keyPrefix = "Key:"; for (const key in window.serverTranslations) { if(typeof window.serverTranslations[key] !== 'object' || key === 'promo_title' || key === 'employee_news' || key === 'partners' || key === 'services') continue; const div = document.createElement('div'); div.className = 'translation-card'; div.innerHTML = `<div class="translation-key" data-key-name="${key}">${keyPrefix} ${key}</div><div class="lang-row"><img src="assets/free-icon-armenia-197516.png" alt="AM"><input type="text" value="${(window.serverTranslations[key]['AM'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'AM', this.value)"></div><div class="lang-row"><img src="assets/free-icon-russia-9994030.png" alt="RU"><input type="text" value="${(window.serverTranslations[key]['RU'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'RU', this.value)"></div><div class="lang-row"><img src="assets/united-kingdom.png" alt="EN"><input type="text" value="${(window.serverTranslations[key]['EN'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'EN', this.value)"></div>`; list.appendChild(div); } };
window.updateLiveValue = function(key, lang, val) { if(!window.serverTranslations[key]) window.serverTranslations[key] = {}; window.serverTranslations[key][lang] = val; };
window.saveTranslations = async function() { const btn = document.getElementById('trans-save-btn'); const span = btn.querySelector('span'); const origText = span.innerHTML; span.innerHTML = '...'; await window.uploadToServer(btn, origText, span); };
window.uploadToServer = async function(buttonElement, originalText, spanElement) { try { const response = await fetch('/api/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(window.serverTranslations) }); const resData = await response.json(); if(resData.success) { buttonElement.classList.add('success'); spanElement.innerHTML = '✅'; if (navigator.vibrate) navigator.vibrate(50); setTimeout(() => { buttonElement.classList.remove('success'); spanElement.innerHTML = originalText; }, 2500); } } catch(e) { console.error('Err'); spanElement.innerHTML = originalText; } };

function initApp() {
    window.updateThemeIcon();
    window.applyAdminLanguage();
    
    const savedTab = sessionStorage.getItem('current_admin_tab') || 'screen-dashboard';
    const tabBtn = document.querySelector(`[onclick*="${savedTab}"]`);
    if (tabBtn) {
        window.switchTab(savedTab, tabBtn);
    }
    
    const authScreen = document.getElementById('auth-screen');
    const pinInput = document.getElementById('pin-input');
    const authError = document.getElementById('auth-error');
    const loginBtn = document.getElementById('login-submit-btn');
    const toggleBtn = document.getElementById('toggle-password-btn');
    const eyeClosed = document.getElementById('eye-icon-closed');
    const eyeOpen = document.getElementById('eye-icon-open');

    if (toggleBtn && pinInput) {
        toggleBtn.addEventListener('click', () => {
            if (pinInput.type === 'password') {
                pinInput.type = 'text';
                eyeClosed.style.display = 'none';
                eyeOpen.style.display = 'block';
            } else {
                pinInput.type = 'password';
                eyeClosed.style.display = 'block';
                eyeOpen.style.display = 'none';
            }
        });
    }

    async function checkPinCode(val) {
        if (!val) return;
        authError.style.opacity = '0';
        
        const originalText = loginBtn.innerText;
        loginBtn.innerHTML = '<svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>';
        loginBtn.style.pointerEvents = 'none';
        
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ pin: val })
            });
            const data = await res.json();
            
            if (data.success) {
                localStorage.setItem('tree_secure_token', 'valid'); 
                pinInput.blur();
                pinInput.value = ''; 
                
                window.finishLogin();
                
                // ИСПРАВЛЕНИЕ: Если Touch ID доступен, но не сохранен — показываем модальное окно регистрации
                if (window.PublicKeyCredential && !localStorage.getItem('tree_biometric_id')) {
                    setTimeout(() => { document.getElementById('bio-prompt-modal').classList.add('active'); }, 500);
                }
            } else {
                if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
                authError.innerText = data.error || "Սխալ գաղտնաբառ";
                authError.style.opacity = '1';
            }
        } catch (e) {
            authError.innerText = "Ошибка сервера";
            authError.style.opacity = '1';
        } finally {
            loginBtn.innerText = originalText;
            loginBtn.style.pointerEvents = 'auto';
        }
    }

    // ИСПРАВЛЕНИЕ: Логика защиты приложения (App Lock)
    async function checkSession() {
        try {
            const res = await fetch('/api/orders', { method: 'GET', credentials: 'include' });
            if (res.ok) { 
                window.finishLogin(); 
            } else { 
                if (authScreen) { authScreen.style.display = 'flex'; authScreen.classList.remove('hidden'); }
            }
        } catch(e) { 
            if (authScreen) { authScreen.style.display = 'flex'; authScreen.classList.remove('hidden'); }
        }
    }
    
    const secureToken = localStorage.getItem('tree_secure_token');
    const bioId = localStorage.getItem('tree_biometric_id');

    if (secureToken === 'valid') {
        if (bioId) {
            // Сессия жива, НО у пользователя включен Touch ID -> Блокируем экран и требуем палец!
            if (authScreen) { authScreen.style.display = 'flex'; authScreen.classList.remove('hidden'); }
            setTimeout(() => window.authenticateBiometric(true), 400); // Автоматически вызываем проверку отпечатка
        } else {
            // Touch ID нет, просто молча заходим
            checkSession();
        }
    } else {
        if (authScreen) { authScreen.style.display = 'flex'; authScreen.classList.remove('hidden'); }
    }

    if (loginBtn) loginBtn.addEventListener('click', () => { checkPinCode(pinInput.value); });
    if (pinInput) {
        pinInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPinCode(pinInput.value); });
        pinInput.addEventListener('input', () => { authError.style.opacity = '0'; });
    }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initApp); } else { initApp(); }
