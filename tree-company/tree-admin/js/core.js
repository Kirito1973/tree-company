window.currentAdminLang = localStorage.getItem('tree_admin_lang') || 'AM';
window.adminTranslations = {
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
    'status_incoming': { 'AM': 'ՆՈՐ ՀԱՅՏ', 'RU': 'ВХОДЯЩИЙ', 'EN': 'INCOMING' },
    'status_new': { 'AM': 'ՆՈՐ', 'RU': 'НОВЫЙ', 'EN': 'NEW' },
    'status_pending': { 'AM': 'ԸՆԹԱՑՔՈՒՄ Է', 'RU': 'В ПРОЦЕССЕ', 'EN': 'PENDING' },
    'status_success': { 'AM': 'ԱՎԱՐՏՎԱԾ', 'RU': 'ЗАВЕРШЕН', 'EN': 'SUCCESS' },
    'status_check': { 'AM': 'ՍՏՈՒԳՈՒՄ', 'RU': 'НА ПРОВЕРКЕ', 'EN': 'CHECKING' },
    'lbl_name': { 'AM': 'Անուն:', 'RU': 'Имя:', 'EN': 'Name:' },
    'lbl_phone': { 'AM': 'Հեռ:', 'RU': 'Тел:', 'EN': 'Phone:' },
    'lbl_address': { 'AM': 'Հասցե:', 'RU': 'Адрес:', 'EN': 'Address:' },
    'lbl_type': { 'AM': 'Մասնագիտություն', 'RU': 'Специальность', 'EN': 'Profession' },
    'lbl_exp': { 'AM': 'Փորձ', 'RU': 'Опыт', 'EN': 'Experience' },
    'lbl_master': { 'AM': 'Վարպետ:', 'RU': 'Мастер:', 'EN': 'Master:' }
};

window.applyAdminLanguage = function() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) {
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = window.adminTranslations[key][window.currentAdminLang];
            } else {
                el.innerText = window.adminTranslations[key][window.currentAdminLang];
            }
        }
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
    if (typeof window.renderDashboardOverview === 'function') window.renderDashboardOverview();
    if (typeof window.renderDashboardOrders === 'function') window.renderDashboardOrders();
    if (typeof window.renderDashboardMasters === 'function') window.renderDashboardMasters();
    if (typeof window.renderEmployees === 'function') window.renderEmployees();
};

window.toggleLangMenu = function(event) {
    event.stopPropagation();
    document.getElementById('lang-switcher').classList.toggle('open');
};

document.addEventListener('click', function() {
    const switcher = document.getElementById('lang-switcher');
    if (switcher && switcher.classList.contains('open')) switcher.classList.remove('open');
});

window.toggleTheme = function(event) {
    const body = document.documentElement;
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('admin_theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('admin_theme', 'dark');
    }
    updateThemeIcon();
};

window.updateThemeIcon = function() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        icon.innerText = '🌙';
    } else {
        icon.innerText = '☀️';
    }
};

window.switchTab = function(tabId, btnElement) {
    document.querySelectorAll('.admin-screen').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.bottom-nav .tab-item').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(10);
};

window.finishLogin = function() {
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) authScreen.style.display = 'none';
    if (typeof window.fetchOrders === 'function') window.fetchOrders();
    if (typeof window.fetchEmployees === 'function') window.fetchEmployees();
};

window.registerBiometric = async function() {
    try {
        const publicKeyCredentialCreationOptions = {
            challenge: Uint8Array.from(Math.random().toString(36).substring(2), c => c.charCodeAt(0)),
            rp: { name: "TREE Admin" },
            user: {
                id: Uint8Array.from("admin", c => c.charCodeAt(0)),
                name: "admin",
                displayName: "Administrator"
            },
            pubKeyCredParams: [{alg: -7, type: "public-key"}],
            authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
            timeout: 60000,
            attestation: "direct"
        };
        const credential = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
        localStorage.setItem('tree_biometric_id', credential.id);
        alert("Touch ID հաջողությամբ պահպանվեց! (Touch ID успешно сохранен!)");
    } catch (err) {
        console.error(err);
    }
};

window.authenticateBiometric = async function() {
    const bioId = localStorage.getItem('tree_biometric_id');
    if (!bioId) {
        alert("Դուք դեռ չեք պահպանել Touch ID (Вы еще не сохранили Touch ID). Войдите по паролю.");
        return;
    }
    try {
        const publicKeyCredentialRequestOptions = {
            challenge: Uint8Array.from(Math.random().toString(36).substring(2), c => c.charCodeAt(0)),
            allowCredentials: [{
                id: Uint8Array.from(atob(bioId.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)),
                type: 'public-key',
                transports: ['internal']
            }],
            userVerification: "required",
            timeout: 60000
        };
        const assertion = await navigator.credentials.get({ publicKey: publicKeyCredentialRequestOptions });
        if (assertion) {
            sessionStorage.setItem('tree_authenticated', 'true');
            window.finishLogin();
        }
    } catch (err) {
        console.error(err);
        alert("Touch ID սխալ (Ошибка Touch ID)");
    }
};

window.getBirthdayInfo = function(dateStr) {
    if (!dateStr) return null;
    const today = new Date();
    const bdate = new Date(dateStr);
    if (isNaN(bdate)) return null;
    bdate.setFullYear(today.getFullYear());
    if (bdate < today && (today - bdate) > 86400000) {
        bdate.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = bdate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { isToday: diffDays === 0 || (bdate.getDate() === today.getDate() && bdate.getMonth() === today.getMonth()), daysLeft: diffDays };
};

window.getEmpTypeLabel = function(typeArray) {
    if (!typeArray) return '---';
    const t = Array.isArray(typeArray) ? typeArray : [typeArray];
    return t.map(v => {
        if(v === 'doors') return 'Դռներ (Двери)';
        if(v === 'electro') return 'Էլեկտրական (Электрика)';
        if(v === 'universal') return 'Ունիվերսալ (Универсал)';
        return v;
    }).join(', ');
};

window.generateEmpId = function() {
    return 'emp_' + Math.random().toString(36).substr(2, 9);
};

function initApp() {
    updateThemeIcon();
    window.applyAdminLanguage();
    
    const authScreen = document.getElementById('auth-screen');
    const pinInput = document.getElementById('pin-input');
    const authError = document.getElementById('auth-error');
    const loginBtn = document.getElementById('login-submit-btn');

    async function checkPinCode(val) {
        if (!val) return;
        authError.style.opacity = '0';
        
        const originalText = loginBtn.innerText;
        loginBtn.innerText = '...';
        
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ pin: val })
            });
            const data = await res.json();
            
            if (data.success) {
                sessionStorage.setItem('tree_authenticated', 'true');
                pinInput.blur();
                pinInput.value = ''; 
                
                if (window.PublicKeyCredential && !localStorage.getItem('tree_biometric_id')) {
                    setTimeout(() => { if (confirm("Включить вход по Touch ID?")) window.registerBiometric(); }, 500);
                }
                
                window.finishLogin();
            } else {
                if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
                authError.innerText = data.error || "Սխալ գաղտնաբառ (Неверный пароль)";
                authError.style.opacity = '1';
            }
        } catch (e) {
            authError.innerText = "Ошибка сервера";
            authError.style.opacity = '1';
        }
        loginBtn.innerText = originalText;
    }

    if (sessionStorage.getItem('tree_authenticated') === 'true') {
        window.finishLogin();
    } else {
        if (authScreen) authScreen.classList.remove('hidden');
        
        if (localStorage.getItem('tree_biometric_id')) {
            setTimeout(() => {
                if (typeof window.authenticateBiometric === 'function') {
                    window.authenticateBiometric();
                }
            }, 400);
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => { checkPinCode(pinInput.value); });
    }

    if (pinInput) {
        pinInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPinCode(pinInput.value); });
        pinInput.addEventListener('input', () => { authError.style.opacity = '0'; });
    }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initApp); } 
else { initApp(); }
