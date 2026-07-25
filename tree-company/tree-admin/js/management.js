window.switchManagementTab = function(tabName, btnElement) {
    document.querySelectorAll('#screen-management > div[id^="mng-view-"]').forEach(el => el.style.display = 'none');
    document.getElementById('mng-view-' + tabName).style.display = 'block';
    document.querySelectorAll('#screen-management .view-switch-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    if(tabName === 'services' && window.renderAdminServices) window.renderAdminServices();
    if (navigator.vibrate) navigator.vibrate(10);
}

window.renderAdminServices = function() {
    const list = document.getElementById('admin-services-list'); if (!list) return; list.innerHTML = '';
    window.servicesData.forEach(s => {
        list.innerHTML += `<div class="entity-card" style="flex-direction: row; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(31,150,81,0.1); color: var(--tree-light); display: flex; justify-content: center; align-items: center;">${s.icon}</div><div><div style="font-size: 13px; font-weight: 800; color: var(--text);">${s.name}</div><div style="font-size: 10px; color: var(--text-sec); font-weight: 700;">${s.price} ֏</div></div></div><button class="serv-del-btn" onclick="deleteService('${s.id}')">X</button></div>`;
    });
};

