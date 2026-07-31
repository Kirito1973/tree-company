// Функция переключения вкладок
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

function initApp() {
    if (typeof updateThemeIcon === 'function') updateThemeIcon();
    
    const authScreen = document.getElementById('auth-screen');
    const pinInput = document.getElementById('pin-input');
    const authError = document.getElementById('auth-error');
    const loginBtn = document.getElementById('login-submit-btn');
    const togglePwdBtn = document.getElementById('toggle-password-btn');
    const eyeIcon = document.getElementById('eye-icon');

    // Логика кнопки "Показать пароль"
    if (togglePwdBtn && pinInput && eyeIcon) {
        togglePwdBtn.addEventListener('click', () => {
            if (pinInput.type === 'password') {
                pinInput.type = 'text';
                eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                pinInput.type = 'password';
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
                authError.innerText = data.error || "Սխալ գաղտնաբառ";
                authError.style.opacity = '1';
            }
        } catch (e) {
            authError.innerText = "Սերվերի սխալ";
            authError.style.opacity = '1';
        }
        loginBtn.innerText = originalText;
    }

    if (sessionStorage.getItem('tree_authenticated') === 'true') {
        finishLogin();
    } else {
        authScreen.classList.remove('hidden');
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
    document.getElementById('auth-screen').classList.add('hidden');
    // Запускаем подгрузку данных с серверов
    if (typeof window.fetchOrders === 'function') window.fetchOrders();
    if (typeof window.fetchEmployees === 'function') window.fetchEmployees();
    if (typeof window.fetchServices === 'function') window.fetchServices();
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initApp); } 
else { initApp(); }
