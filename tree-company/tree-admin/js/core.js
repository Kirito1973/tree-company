// === НАВИГАЦИЯ ===
window.switchTab = function(screenId, btnElement) {
    document.querySelectorAll('.admin-screen').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) {
        targetScreen.style.display = 'flex';
        targetScreen.classList.add('active');
    }
    
    document.querySelectorAll('.bottom-nav .tab-item').forEach(el => el.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    
    if (screenId === 'screen-finance' && typeof window.renderFinance === 'function') {
        window.renderFinance();
    }
    
    if (navigator.vibrate) navigator.vibrate(10);
};

// === ТЕМА (СВЕТЛАЯ / ТЕМНАЯ) ===
window.updateThemeIcon = function() {
    const icon = document.getElementById('theme-icon');
    const root = document.documentElement;
    let theme = root.getAttribute('data-theme');
    
    if(!theme) {
        theme = (localStorage.getItem('admin_theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
        root.setAttribute('data-theme', theme);
    }
    
    if (icon) {
        if (theme === 'dark') {
            icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        } else {
            icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
    }
};

window.toggleTheme = function(e) {
    if(e) e.preventDefault();
    const root = document.documentElement;
    let currentTheme = root.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('admin_theme', newTheme);
    window.updateThemeIcon();
    
    if(navigator.vibrate) navigator.vibrate(10);
};

// === МУЛЬТИЯЗЫЧНОСТЬ (AM / RU / EN) ===
window.currentAdminLang = localStorage.getItem('admin_lang') || 'AM'; // По умолчанию Армянский

window.toggleLangMenu = function(e) {
    if(e) e.stopPropagation();
    const switcher = document.getElementById('lang-switcher');
    if(switcher) switcher.classList.toggle('open');
};

window.setAdminLang = function(lang, e) {
    if(e) e.stopPropagation();
    window.currentAdminLang = lang;
    localStorage.setItem('admin_lang', lang);
    
    const switcher = document.getElementById('lang-switcher');
    if(switcher) switcher.classList.remove('open');
    
    const flags = { 'AM': 'assets/free-icon-armenia-197516.png', 'RU': 'assets/free-icon-russia-9994030.png', 'EN': 'assets/united-kingdom.png' };
    const mainBtn = document.getElementById('current-lang-btn');
    if (mainBtn && flags[lang]) mainBtn.innerHTML = `<img src="${flags[lang]}" class="lang-flag">`;
    
    document.querySelectorAll('.lang-tab').forEach(tab => {
        if (tab.getAttribute('data-lang') === lang) tab.classList.add('active');
        else tab.classList.remove('active');
    });
    
    window.applyAdminLanguage();
};

document.addEventListener('click', (e) => {
    const switcher = document.getElementById('lang-switcher');
    if (switcher && !switcher.contains(e.target)) {
        switcher.classList.remove('open');
    }
});

window.applyAdminLanguage = function() {
    if (typeof window.adminTranslations === 'object') {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.adminTranslations[key] && window.adminTranslations[key][window.currentAdminLang]) {
                el.innerText = window.adminTranslations[key][window.currentAdminLang];
            }
        });
        
        // Обновляем списки после смены языка
        if (typeof window.renderDashboardOrders === 'function') window.renderDashboardOrders();
        if (typeof window.renderDashboardMasters === 'function') window.renderDashboardMasters();
        if (typeof window.renderEmployees === 'function') window.renderEmployees();
    }
};

// === ИНИЦИАЛИЗАЦИЯ И АВТОРИЗАЦИЯ ===
function initApp() {
    window.updateThemeIcon();
    
    const flags = { 'AM': 'assets/free-icon-armenia-197516.png', 'RU': 'assets/free-icon-russia-9994030.png', 'EN': 'assets/united-kingdom.png' };
    const mainBtn = document.getElementById('current-lang-btn');
    if (mainBtn && flags[window.currentAdminLang]) mainBtn.innerHTML = `<img src="${flags[window.currentAdminLang]}" class="lang-flag">`;
    
    window.applyAdminLanguage();
    
    const authScreen = document.getElementById('auth-screen');
    const pinInput = document.getElementById('pin-input');
    const authError = document.getElementById('auth-error');
    const loginBtn = document.getElementById('login-submit-btn');
    const togglePwdBtn = document.getElementById('toggle-password-btn');
    const eyeIcon = document.getElementById('eye-icon');

    // Логика глазика (Исправлен отступ букв при показе)
    if (togglePwdBtn && pinInput && eyeIcon) {
        togglePwdBtn.addEventListener('click', () => {
            if (pinInput.type === 'password') {
                pinInput.type = 'text';
                pinInput.style.letterSpacing = 'normal'; // Пароль виден целиком
                eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                pinInput.type = 'password';
                pinInput.style.letterSpacing = '4px'; // Возвращаем стилизацию скрытых символов
                eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    }

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
                    setTimeout(() => { if (confirm("Միացնե՞լ Touch ID (մատնահետքով մուտքը):")) window.registerBiometric(); }, 500);
                }
                
                finishLogin();
            } else {
                if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
                authError.innerText = data.error || "Սխալ գաղտնաբառ (Неверный пароль)";
                authError.style.opacity = '1';
            }
        } catch (e) {
            authError.innerText = "Սերվերի սխալ (Ошибка сервера)";
            authError.style.opacity = '1';
        }
        loginBtn.innerText = originalText;
    }

    if (sessionStorage.getItem('tree_authenticated') === 'true') {
        finishLogin();
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

    const privacyScreen = document.getElementById('privacy-overlay');
    if (privacyScreen) {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden || document.visibilityState === 'hidden') { privacyScreen.style.opacity = '1'; } 
            else { privacyScreen.style.opacity = '0'; }
        });
    }
}

function finishLogin() {
    const authScreen = document.getElementById('auth-screen');
    if (authScreen) authScreen.classList.add('hidden');
    
    if (typeof window.fetchOrders === 'function') window.fetchOrders();
    if (typeof window.fetchEmployees === 'function') window.fetchEmployees();
    if (typeof window.fetchServices === 'function') window.fetchServices();
    if (typeof window.fetchAppDatabase === 'function') window.fetchAppDatabase();
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initApp); } 
else { initApp(); }
