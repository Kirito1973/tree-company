window.switchManagementTab = function(tabName, btnElement) {
    document.querySelectorAll('#screen-management > div[id^="mng-view-"]').forEach(el => el.style.display = 'none');
    document.getElementById('mng-view-' + tabName).style.display = 'block';
    document.querySelectorAll('#screen-management .view-switch-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    if(tabName === 'services' && window.renderAdminServices) window.renderAdminServices();
    if (navigator.vibrate) navigator.vibrate(10);
};

window.renderAdminServices = function() {
    const list = document.getElementById('admin-services-list'); if (!list) return; list.innerHTML = '';
    window.servicesData.forEach(s => {
        list.innerHTML += `<div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(31,150,81,0.1); color: var(--tree-light); display: flex; justify-content: center; align-items: center;">${s.icon}</div><div><div style="font-size: 13px; font-weight: 800; color: var(--text);">${s.name}</div><div style="font-size: 10px; color: var(--text-sec); font-weight: 700;">${s.price} ֏</div></div></div><button class="serv-del-btn" onclick="deleteService('${s.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div>`;
    });
};

window.openServiceForm = function() { document.getElementById('form-cat-name').value = ''; document.getElementById('form-cat-price').value = ''; document.getElementById('form-cat-icon').value = ''; document.getElementById('service-form-modal').classList.add('active'); };
window.closeServiceForm = function() { document.getElementById('service-form-modal').classList.remove('active'); };
window.saveServiceForm = function(e) { 
    e.preventDefault(); 
    window.servicesData.push({ id: 's' + Math.random(), name: document.getElementById('form-cat-name').value, price: parseInt(document.getElementById('form-cat-price').value) || 0, icon: document.getElementById('form-cat-icon').value || '<svg></svg>', status: document.getElementById('form-cat-status').value }); 
    window.renderAdminServices(); window.closeServiceForm(); if(navigator.vibrate)navigator.vibrate(20);
};
window.deleteService = function(id) { if(confirm('Delete?')) { window.servicesData = window.servicesData.filter(s => s.id !== id); window.renderAdminServices(); } };

// Настройки переводов и промо (Имитация работы с Vercel)
window.serverTranslations = {};
window.fetchAppDatabase = async function() {
    try {
        const res = await fetch('/api/data'); const data = await res.json(); window.serverTranslations = data || {};
        const loader = document.getElementById('loader-wrap'); if(loader) loader.style.display = 'none';
        window.renderTranslationsEditor(); window.loadPromoAndNewsValues();
    } catch (err) { const loader = document.getElementById('loader-wrap'); if(loader) loader.innerHTML = '<span style="font-size:10px; color:red; font-weight:bold;">Error (Vercel KV)</span>'; }
};

window.loadPromoAndNewsValues = function() {
    if(window.serverTranslations['promo_title']) { if(window.serverTranslations['promo_title']['AM']) document.getElementById('promo-text-am').value = window.serverTranslations['promo_title']['AM']; if(window.serverTranslations['promo_title']['RU']) document.getElementById('promo-text-ru').value = window.serverTranslations['promo_title']['RU']; if(window.serverTranslations['promo_title']['EN']) document.getElementById('promo-text-en').value = window.serverTranslations['promo_title']['EN']; }
    if(window.serverTranslations['global_discount']) { document.getElementById('promo-discount-input').value = window.serverTranslations['global_discount']; }
};

window.savePromo = async function(event) {
    event.preventDefault(); const btn = document.getElementById('promo-submit-btn'); const span = btn.querySelector('span'); const origText = span.innerHTML; span.innerHTML = '...';
    if (!window.serverTranslations['promo_title']) window.serverTranslations['promo_title'] = {}; window.serverTranslations['promo_title']['AM'] = document.getElementById('promo-text-am').value; window.serverTranslations['promo_title']['RU'] = document.getElementById('promo-text-ru').value; window.serverTranslations['promo_title']['EN'] = document.getElementById('promo-text-en').value;
    window.serverTranslations['global_discount'] = document.getElementById('promo-discount-input').value;
    await window.uploadToServer(btn, origText, span);
};

window.renderTranslationsEditor = function() {
    const list = document.getElementById('translations-list'); if(!list) return; list.innerHTML = ''; const keyPrefix = window.adminTranslations['admin_key_title']?.[window.currentAdminLang] || "Key:";
    for (const key in window.serverTranslations) {
        if(typeof window.serverTranslations[key] !== 'object' || key === 'promo_title' || key === 'employee_news' || key === 'partners' || key === 'services') continue;
        const div = document.createElement('div'); div.className = 'translation-card';
        div.innerHTML = `<div class="translation-key" data-key-name="${key}">${keyPrefix} ${key}</div><div class="lang-row"><img src="assets/free-icon-armenia-197516.png" alt="AM"><input type="text" value="${(window.serverTranslations[key]['AM'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'AM', this.value)"></div><div class="lang-row"><img src="assets/free-icon-russia-9994030.png" alt="RU"><input type="text" value="${(window.serverTranslations[key]['RU'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'RU', this.value)"></div><div class="lang-row"><img src="assets/united-kingdom.png" alt="EN"><input type="text" value="${(window.serverTranslations[key]['EN'] || '').replace(/"/g, '&quot;')}" onchange="updateLiveValue('${key}', 'EN', this.value)"></div>`;
        list.appendChild(div);
    }
};

window.updateLiveValue = function(key, lang, val) { if(!window.serverTranslations[key]) window.serverTranslations[key] = {}; window.serverTranslations[key][lang] = val; };
window.saveTranslations = async function() { const btn = document.getElementById('trans-save-btn'); const span = btn.querySelector('span'); const origText = span.innerHTML; span.innerHTML = '...'; await window.uploadToServer(btn, origText, span); };
window.uploadToServer = async function(buttonElement, originalText, spanElement) {
    try { const response = await fetch('/api/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(window.serverTranslations) }); const resData = await response.json();
        if(resData.success) { buttonElement.classList.add('success'); spanElement.innerHTML = '✅'; if (navigator.vibrate) navigator.vibrate(50); setTimeout(() => { buttonElement.classList.remove('success'); spanElement.innerHTML = originalText; }, 2500); }
    } catch(e) { console.error('API Err'); spanElement.innerHTML = originalText; }
};

document.addEventListener('DOMContentLoaded', () => { window.fetchAppDatabase(); });
