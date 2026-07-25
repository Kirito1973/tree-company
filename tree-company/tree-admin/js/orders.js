window.setOrderFilter = function(filterValue) {
    document.querySelectorAll('#screen-orders .filter-tab').forEach(t => { if (t.getAttribute('data-filter') === filterValue) t.classList.add('active'); else t.classList.remove('active'); });
    window.filterOrders();
};

window.filterOrders = function() {
    const searchInput = document.getElementById('order-search'); const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const activeTab = document.querySelector('#screen-orders .filter-tab.active'); const activeFilter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    document.querySelectorAll('#orders-list .entity-card').forEach(card => {
        const text = card.innerText.toLowerCase(); const status = card.getAttribute('data-status');
        const matchesSearch = text.includes(searchTerm); const matchesFilter = activeFilter === 'all' || status === activeFilter;
        if (status === 'cancelled' && activeFilter !== 'all' && searchTerm === '') card.style.display = 'none'; else card.style.display = (matchesSearch && matchesFilter) ? 'flex' : 'none';
    });
}

window.renderOrders = function() {
    const list = document.getElementById('orders-list'); if (!list) return; list.innerHTML = '';
    let counts = { new: 0, progress: 0, completed: 0 };
    const activeOrders = window.ordersData.filter(o => o.status !== 'incoming');
    
    activeOrders.forEach(order => {
        if (counts[order.status] !== undefined) counts[order.status]++;
        let statusClass = ''; if (order.status === 'new') statusClass = 'new'; else if (order.status === 'progress') statusClass = 'pending';
        const card = document.createElement('div'); card.className = 'entity-card'; card.setAttribute('data-status', order.status); 
        card.innerHTML = `<div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status ${statusClass}">${order.status}</span></div><div class="entity-title">${order.services[0]?order.services[0].name:'---'}</div><div class="entity-meta">${order.clientName} | ${order.clientPhone}</div>`;
        list.appendChild(card);
    });
    document.getElementById('count-new').innerText = counts.new; document.getElementById('count-progress').innerText = counts.progress; document.getElementById('count-completed').innerText = counts.completed;
    window.applyAdminLanguage(); window.filterOrders();
};
// Здесь в будущем разместишь openOrderModal, saveOrderForm и т.д.
