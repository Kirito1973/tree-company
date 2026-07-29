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
                    setTimeout(() => { if (confirm("Включить вход по FaceID / Отпечатку пальца?")) window.registerBiometric(); }, 500);
                }
                
                finishLogin();
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
        finishLogin();
    } else {
        authScreen.classList.remove('hidden');
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => { checkPinCode(pinInput.value); });
    }

    if (pinInput) {
        pinInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPinCode(pinInput.value); });
        pinInput.addEventListener('input', () => { authError.style.opacity = '0'; });
    }

    const privacyScreen = document.getElementById('privacy-overlay');
    document.addEventListener("visibilitychange", () => {
        if (document.hidden || document.visibilityState === 'hidden') { privacyScreen.style.opacity = '1'; } 
        else { privacyScreen.style.opacity = '0'; }
    });
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initApp); } 
else { initApp(); }
