import { state } from './store.js';

const APP_VERSION = '5.3.0';

export function initCore() {
    if (localStorage.getItem('tree_admin_version') !== APP_VERSION) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => { for (let reg of regs) reg.unregister(); });
        }
        if ('caches' in window) {
            caches.keys().then(names => { for (let name of names) caches.delete(name); });
        }
        localStorage.setItem('tree_admin_version', APP_VERSION);
        window.location.reload(true);
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => { 
            navigator.serviceWorker.register('./sw.js?v=' + APP_VERSION).then(reg => reg.update()); 
        });
    }

    applyAdminLanguage();
    setupAuth();
    setupVisibilityCheck();
}

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
    setTimeout(() => { 
        if(themeIcon) {
            themeIcon.innerHTML = body.classList.contains('force-dark') 
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` 
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`; 
        }
    }, 150); 
};

window.toggleLangMenu = function(e) { 
    e.stopPropagation(); 
    document.getElementById('lang-switcher').classList.toggle('open'); 
};

window.setAdminLang = function(lang, e) {
    e.stopPropagation(); 
    state.currentLang = lang; 
    localStorage.setItem('admin_app_lang', state.currentLang);
    
    document.querySelectorAll('.lang-tab').forEach(tab => { 
        if (tab.getAttribute('data-lang') === lang) tab.classList.add('active'); 
        else tab.classList.remove('active'); 
    });
    
    const activeTab = document.querySelector(`.lang-tab[data-lang="${lang}"]`); 
    if(activeTab) document.getElementById('current-lang-btn').innerHTML = activeTab.innerHTML;
    
    applyAdminLanguage(); 
    
    if(window.renderDashboardOrders) window.renderDashboardOrders();
    if(window.renderOrders) window.renderOrders(); 
    if(window.renderEmployees) window.renderEmployees(); 
    if(window.renderClients) window.renderClients(); 
    
    document.getElementById('lang-switcher').classList.remove('open');
};

document.addEventListener('click', () => { 
    const switcher = document.getElementById('lang-switcher'); 
    if(switcher) switcher.classList.remove('open'); 
});

export function applyAdminLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => { 
        const key = el.getAttribute('data-i18n'); 
        if (state.adminTranslations[key] && state.adminTranslations[key][state.currentLang]) {
            el.innerHTML = state.adminTranslations[key][state.currentLang]; 
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { 
        const key = el.getAttribute('data-i18n-placeholder'); 
        if (state.adminTranslations[key] && state.adminTranslations[key][state.currentLang]) {
            el.placeholder = state.adminTranslations[key][state.currentLang]; 
        }
    });
}
window.applyAdminLanguage = applyAdminLanguage;

function setupAuth() {
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
}

function setupVisibilityCheck() {
    const privacyScreen = document.getElementById('privacy-overlay');
    document.addEventListener("visibilitychange", () => {
        if (document.hidden || document.visibilityState === 'hidden') {
            privacyScreen.style.opacity = '1'; 
        } else {
            privacyScreen.style.opacity = '0'; 
        }
    });
}
