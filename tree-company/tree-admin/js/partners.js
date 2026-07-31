
window.renderAdminPartners = function() {
    const list = document.getElementById('admin-partners-list'); if (!list) return; list.innerHTML = '';
    window.partnersData.forEach(p => {
        list.innerHTML += `<div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 50px; height: 50px; border-radius: 16px; border: 1px dashed rgba(128,128,128,0.3); display: flex; justify-content: center; align-items: center; overflow: hidden;">${p.logo}</div><div style="font-size: 14px; font-weight: 800; color: var(--text);">${p.name}</div></div><div style="display: flex; gap: 4px;"><button class="serv-del-btn" style="color:var(--text); border-color:var(--text-sec);" onclick="openPartnerForm('${p.id}')"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button><button class="serv-del-btn" onclick="deletePartner('${p.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div>`;
    });
};

window.currentEditingPartnerId = null;

window.openPartnerForm = function(partnerId = null) { 
    window.currentEditingPartnerId = partnerId;
    if(partnerId) { const p = window.partnersData.find(x => x.id === partnerId); if(p) { document.getElementById('form-partner-name').value = p.name; document.getElementById('form-partner-logo').value = p.logo; } } 
    else { document.getElementById('form-partner-name').value = ''; document.getElementById('form-partner-logo').value = ''; }
    document.getElementById('partner-form-modal').classList.add('active'); 
};

window.closePartnerForm = function() { document.getElementById('partner-form-modal').classList.remove('active'); };

window.savePartnerForm = function(e) { 
    e.preventDefault(); 
    const name = document.getElementById('form-partner-name').value; const logo = document.getElementById('form-partner-logo').value;
    if(window.currentEditingPartnerId) { const p = window.partnersData.find(x => x.id === window.currentEditingPartnerId); if(p) { p.name = name; p.logo = logo; } } 
    else { window.partnersData.push({ id: 'p' + Math.random(), name, logo }); }
    window.renderAdminPartners(); window.closePartnerForm(); if(navigator.vibrate)navigator.vibrate(20);
};

window.deletePartner = function(id) { if(confirm('Delete?')) { window.partnersData = window.partnersData.filter(p => p.id !== id); window.renderAdminPartners(); } };
