window.setEmpFilter = function(filterValue) { 
    document.querySelectorAll('#screen-employees .filter-tab').forEach(t => { if (t.getAttribute('data-emp-filter') === filterValue) t.classList.add('active'); else t.classList.remove('active'); }); 
    window.renderEmployees(); 
};

window.filterEmployees = function() { window.renderEmployees(); };
if (document.getElementById('employee-search')) document.getElementById('employee-search').addEventListener('input', window.filterEmployees);

window.renderEmployees = function() {
    const list = document.getElementById('employees-list'); if (!list) return; list.innerHTML = '';
    const activeTab = document.querySelector('#screen-employees .filter-tab.active'); const activeFilter = activeTab ? activeTab.getAttribute('data-emp-filter') : 'all';
    
    window.employeesData.filter(e => e.status === 'active').forEach(emp => {
        const matchesFilter = activeFilter === 'all' || emp.type === activeFilter;
        if (!matchesFilter) return;
        const card = document.createElement('div'); card.className = 'entity-card'; 
        card.innerHTML = `<div class="entity-header"><span class="entity-id">${emp.id}</span><div class="rating-badge">★ ${emp.rating.toFixed(1)}</div></div><div class="entity-title">${emp.name}</div><div class="entity-meta"><span>${window.getEmpTypeLabel(emp.type)}</span></div><div class="entity-meta"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${emp.phone}</span></div>`;
        list.appendChild(card);
    });
    window.applyAdminLanguage();
}
// Здесь будет openEmployeeModal, saveEmployeeForm и т.д.
