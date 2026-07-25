window.renderAdminPartners = function() {
    const list = document.getElementById('admin-partners-list'); if (!list) return; list.innerHTML = '';
    window.partnersData.forEach(p => {
        list.innerHTML += `<div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 50px; height: 50px; border-radius: 16px; border: 1px dashed rgba(128,128,128,0.3); display: flex; justify-content: center; align-items: center; overflow: hidden;">${p.logo}</div><div style="font-size: 14px; font-weight: 800; color: var(--text);">${p.name}</div></div><div style="display: flex; gap: 4px;"><button class="serv-del-btn" style="color:var(--text); border-color:var(--text-sec);" onclick="openPartnerForm('${p.id}')">E</button><button class="serv-del-btn" onclick="deletePartner('${p.id}')">X</button></div></div>`;
    });
};
// openPartnerForm, deletePartner...

