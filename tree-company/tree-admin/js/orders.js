window.currentDashOrdFilter = 'all';
window.currentActiveOrderId = null;
window.currentEditingOrderId = null;

// Получение заказов с сервера при старте
window.fetchOrders = async function() {
    try {
        const res = await fetch('/api/orders');
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                window.ordersData = data;
            }
            window.renderOrders();
            if(window.renderDashboardOrders) window.renderDashboardOrders();
            if(window.updateDashDots) window.updateDashDots();
        }
    } catch (err) {
        console.error('Ошибка загрузки заказов:', err);
    }
};

// Тихая синхронизация с сервером
window.syncOrdersToServer = async function() {
    try {
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orders: window.ordersData })
        });
    } catch (err) {
        console.error('Ошибка синхронизации заказов:', err);
    }
};

window.setOrderFilter = function(filterValue) {
    window.currentDashOrdFilter = filterValue;
    document.querySelectorAll('#screen-orders .filter-tab').forEach(t => {
        if (t.getAttribute('data-filter') === filterValue) t.classList.add('active'); else t.classList.remove('active');
    });
    window.filterOrders();
};

window.filterOrders = function() {
    const searchInput = document.getElementById('order-search');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const activeTab = document.querySelector('#screen-orders .filter-tab.active');
    const activeFilter = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    
    document.querySelectorAll('#orders-list .entity-card').forEach(card => {
        const text = card.innerText.toLowerCase(); const status = card.getAttribute('data-status');
        const matchesSearch = text.includes(searchTerm); const matchesFilter = activeFilter === 'all' || status === activeFilter;
        if (status === 'cancelled' && activeFilter !== 'all' && searchTerm === '') card.style.display = 'none'; else card.style.display = (matchesSearch && matchesFilter) ? 'flex' : 'none';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('order-search')) document.getElementById('order-search').addEventListener('input', window.filterOrders);
    
    // Запускаем скачивание заказов при открытии админки
    window.fetchOrders();
});

window.renderOrders = function() {
    const list = document.getElementById('orders-list'); if (!list) return; list.innerHTML = '';
    let counts = { new: 0, progress: 0, completed: 0 };
    const activeOrders = window.ordersData.filter(o => o.status !== 'incoming');
    
    activeOrders.forEach(order => {
        if (counts[order.status] !== undefined) counts[order.status]++;
        let mainTitle = order.services.length > 0 ? order.services[0].name : "---";
        if(order.services.length > 1) mainTitle += ` (+${order.services.length - 1})`;
        let statusClass = '', statusI18n = '';
        if (order.status === 'new') { statusClass = 'new'; statusI18n = 'status_new'; } else if (order.status === 'progress') { statusClass = 'pending'; statusI18n = 'status_pending'; } else if (order.status === 'completed') { statusI18n = 'status_success'; } else if (order.status === 'cancelled') { statusClass = 'cancelled'; statusI18n = 'status_cancelled'; }
        
        const card = document.createElement('div'); card.className = 'entity-card'; card.setAttribute('data-status', order.status); card.onclick = () => window.openOrderModal(order.id);
        card.innerHTML = `<div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status ${statusClass}" data-i18n="${statusI18n}"></span></div><div class="entity-title">${mainTitle}</div><div class="entity-meta">${window.adminTranslations['lbl_name'][window.currentAdminLang]} ${order.clientName || '---'}</div><div class="entity-meta">${window.adminTranslations['lbl_phone'][window.currentAdminLang]} ${order.clientPhone}</div><div class="entity-meta">${window.adminTranslations['lbl_address'][window.currentAdminLang]} ${order.address}</div>`;
        list.appendChild(card);
    });
    
    document.getElementById('count-new').innerText = counts.new; document.getElementById('count-progress').innerText = counts.progress; document.getElementById('count-completed').innerText = counts.completed;
    window.applyAdminLanguage(); window.filterOrders();
};

window.openOrderModal = function(orderId) {
    window.currentActiveOrderId = orderId; const order = window.ordersData.find(o => o.id === orderId); if (!order) return;
    document.getElementById('modal-order-id').innerText = order.id; const statusEl = document.getElementById('modal-order-status'); statusEl.className = 'entity-status';
    
    if (order.status === 'incoming') { statusEl.classList.add('incoming'); statusEl.setAttribute('data-i18n', 'status_incoming'); } 
    else if (order.status === 'new') { statusEl.classList.add('new'); statusEl.setAttribute('data-i18n', 'status_new'); } 
    else if (order.status === 'progress') { statusEl.classList.add('pending'); statusEl.setAttribute('data-i18n', 'status_pending'); } 
    else if (order.status === 'completed') { statusEl.setAttribute('data-i18n', 'status_success'); } 
    else if (order.status === 'cancelled') { statusEl.classList.add('cancelled'); statusEl.setAttribute('data-i18n', 'status_cancelled'); }
    
    const btnEdit = document.getElementById('modal-edit-btn'); const btnCancel = document.getElementById('modal-cancel-btn'); const btnAccept = document.getElementById('modal-accept-btn'); const btnReject = document.getElementById('modal-reject-btn');
    if (order.status === 'incoming') { btnEdit.style.display = 'none'; btnCancel.style.display = 'none'; btnAccept.style.display = 'flex'; btnReject.style.display = 'flex'; } 
    else if (order.status === 'new') { btnEdit.style.display = 'flex'; btnCancel.style.display = 'flex'; btnAccept.style.display = 'none'; btnReject.style.display = 'none'; } 
    else if (order.status === 'progress') { btnEdit.style.display = 'flex'; btnCancel.style.display = 'flex'; btnAccept.style.display = 'none'; btnReject.style.display = 'none'; } 
    else { btnEdit.style.display = 'flex'; btnCancel.style.display = 'none'; btnAccept.style.display = 'none'; btnReject.style.display = 'none'; }
    
    document.getElementById('modal-date-created').innerText = order.createdAt || '---'; const completedWrapper = document.getElementById('modal-date-completed-wrapper');
    if (order.status === 'completed' && order.completedAt) { completedWrapper.style.display = 'flex'; document.getElementById('modal-date-completed').innerText = order.completedAt; } else completedWrapper.style.display = 'none';
    document.getElementById('modal-client-name').innerText = order.clientName || '---'; document.getElementById('modal-client-phone-text').innerText = order.clientPhone || '---';
    const clientCallBtn = document.getElementById('modal-client-phone-link'); if (order.clientPhone) { clientCallBtn.style.display = 'flex'; clientCallBtn.href = `tel:${order.clientPhone.replace(/[^\d+]/g, '')}`; } else clientCallBtn.style.display = 'none';
    document.getElementById('modal-client-address').innerText = order.address || '---';
    
    let wName = order.worker || '---'; if (order.worker && order.worker.includes('(')) { const parts = order.worker.split('('); wName = parts[0].trim(); }
    document.getElementById('modal-worker-name').innerText = wName; document.getElementById('modal-worker-phone-text').innerText = order.workerPhone || '---';
    const workerCallBtn = document.getElementById('modal-worker-phone-link'); if (order.workerPhone) { workerCallBtn.style.display = 'flex'; workerCallBtn.href = `tel:${order.workerPhone.replace(/[^\d+]/g, '')}`; } else workerCallBtn.style.display = 'none';
    
    const servList = document.getElementById('modal-services-list'); servList.innerHTML = ''; let totalSum = 0;
    
    // ОБНОВЛЕНО: Новый тумблер iOS/Android. Он навсегда ЗАБЛОКИРОВАН (disabled) для администратора.
    order.services.forEach((s, index) => { 
        const rowSum = s.qty * s.price; 
        totalSum += rowSum; 
        const checkedAttr = s.done ? 'checked' : ''; 
        const doneClass = s.done ? 'done' : ''; 
        
        servList.innerHTML += `
            <label class="service-item-static ${doneClass}" style="cursor: default;">
                <div class="ios-toggle-wrap" style="margin-right: 10px;">
                    <input type="checkbox" ${checkedAttr} disabled>
                    <span class="ios-toggle-slider"></span>
                </div>
                <span class="serv-name-static">${s.name}</span>
                <span class="serv-qty-static">${s.qty} x ${s.price} ֏</span>
                <span class="serv-price-static">${rowSum} ֏</span>
            </label>
        `; 
    });
    
    const profit = order.profit !== undefined ? order.profit : (totalSum * 0.10);
    document.getElementById('modal-total-price').innerText = totalSum.toLocaleString() + ' ֏'; document.getElementById('modal-company-profit').innerText = profit.toLocaleString() + ' ֏';
    
    window.applyAdminLanguage(); document.getElementById('order-modal').classList.add('active'); if (navigator.vibrate) navigator.vibrate(15);
};

window.closeOrderModal = function() { document.getElementById('order-modal').classList.remove('active'); window.currentActiveOrderId = null; };

window.acceptOrder = async function() { 
    if (!window.currentActiveOrderId) return; 
    const order = window.ordersData.find(o => o.id === window.currentActiveOrderId); 
    if (order && order.status === 'incoming') { 
        order.status = 'new'; 
        
        await window.syncOrdersToServer();
        
        if(window.renderDashboardOrders) window.renderDashboardOrders(); 
        window.renderOrders(); 
        if(window.updateDashDots) window.updateDashDots(); 
        window.closeOrderModal(); 
        setTimeout(() => window.openOrderForm(order.id), 300); 
    } 
};

window.rejectOrder = async function() { 
    if (!window.currentActiveOrderId) return; 
    const order = window.ordersData.find(o => o.id === window.currentActiveOrderId); 
    if (order && order.status === 'incoming') { 
        if (confirm("Reject?")) { 
            order.status = 'cancelled'; 
            
            await window.syncOrdersToServer();
            
            if(window.renderDashboardOrders) window.renderDashboardOrders(); 
            if(window.updateDashDots) window.updateDashDots(); 
            window.closeOrderModal(); 
        } 
    } 
};

window.cancelOrder = async function() { 
    if (!window.currentActiveOrderId) return; 
    const order = window.ordersData.find(o => o.id === window.currentActiveOrderId); 
    if (confirm("Cancel order?")) { 
        if(order) { 
            order.status = 'cancelled'; 
            await window.syncOrdersToServer();
            window.renderOrders(); 
        } 
        window.closeOrderModal(); 
    } 
};

window.openOrderForm = function(orderId = null) {
    window.currentEditingOrderId = orderId; const form = document.getElementById('order-form'); form.reset(); document.getElementById('form-services-container').innerHTML = '';
    const workerSelect = document.getElementById('form-worker'); workerSelect.innerHTML = '<option value="" data-phone="">---</option>';
    const assistantSelect = document.getElementById('form-assistant'); assistantSelect.innerHTML = '<option value="" data-phone="">---</option>';
    window.employeesData.filter(e => e.status === 'active').forEach(emp => { const opt = `<option value="${emp.name}" data-phone="${emp.phone}">${emp.name} - ${window.getEmpTypeLabel(emp.type)}</option>`; workerSelect.innerHTML += opt; assistantSelect.innerHTML += opt; });
    if (orderId) {
        const order = window.ordersData.find(o => o.id === orderId);
        if (order) { document.getElementById('form-client-name').value = order.clientName || ''; document.getElementById('form-phone').value = order.clientPhone; document.getElementById('form-address').value = order.address;
            let workersArr = (order.worker && order.worker !== '---' && order.worker !== 'Չկա') ? order.worker.split(',').map(w => w.trim()) : [];
            if (workersArr.length > 0) { workerSelect.value = workersArr[0]; if (workersArr.length > 1) assistantSelect.value = workersArr[1]; }
            order.services.forEach(s => window.addFormServiceRow(s.name, s.qty, s.price, s.done || false)); window.calculateOrderFormTotals();
            if (order.profit !== undefined) { document.getElementById('form-profit-sum').value = order.profit; window.updateFormProfitFromSum(); }
        } window.closeOrderModal(); 
    } else {
        document.getElementById('form-total-price').innerText = '0 ֏'; document.getElementById('form-profit-pct').value = '10'; document.getElementById('form-profit-sum').value = '0'; window.addFormServiceRow();
    } document.getElementById('order-form-modal').classList.add('active');
};

window.closeOrderFormModal = function() { document.getElementById('order-form-modal').classList.remove('active'); window.currentEditingOrderId = null; };
window.calculateOrderFormTotals = function() { let totalSum = 0; document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const qty = parseInt(row.querySelector('.serv-col-qty').value) || 0; const price = parseFloat(row.querySelector('.serv-col-price').value) || 0; totalSum += (qty * price); }); document.getElementById('form-total-price').innerText = totalSum.toLocaleString() + ' ֏'; const pct = parseFloat(document.getElementById('form-profit-pct').value) || 0; document.getElementById('form-profit-sum').value = Math.round(totalSum * (pct / 100)); };
window.updateFormProfitFromPct = function() { let totalSum = 0; document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const qty = parseInt(row.querySelector('.serv-col-qty').value) || 0; const price = parseFloat(row.querySelector('.serv-col-price').value) || 0; totalSum += (qty * price); }); const pct = parseFloat(document.getElementById('form-profit-pct').value) || 0; document.getElementById('form-profit-sum').value = Math.round(totalSum * (pct / 100)); };
window.updateFormProfitFromSum = function() { let totalSum = 0; document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const qty = parseInt(row.querySelector('.serv-col-qty').value) || 0; const price = parseFloat(row.querySelector('.serv-col-price').value) || 0; totalSum += (qty * price); }); const sum = parseFloat(document.getElementById('form-profit-sum').value) || 0; if (totalSum > 0) document.getElementById('form-profit-pct').value = ((sum / totalSum) * 100).toFixed(2); else document.getElementById('form-profit-pct').value = 0; };
window.addFormServiceRow = function(name = '', qty = 1, price = '', done = false) { const container = document.getElementById('form-services-container'); const row = document.createElement('div'); row.className = 'service-row-edit'; row.setAttribute('data-done', done); row.innerHTML = `<input type="text" class="glass-input serv-col-name" value="${name}" required><input type="number" class="glass-input serv-col-qty" min="1" value="${qty}" required oninput="calculateOrderFormTotals()"><input type="number" class="glass-input serv-col-price" min="0" value="${price}" required oninput="calculateOrderFormTotals()"><button type="button" class="serv-del-btn" onclick="removeFormServiceRow(this)">X</button>`; container.appendChild(row); };
window.removeFormServiceRow = function(btnElement) { const row = btnElement.closest('.service-row-edit'); if (row) { row.remove(); window.calculateOrderFormTotals(); } };

window.saveOrderForm = async function(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText = submitBtn.innerText;
    submitBtn.innerText = '...';
    submitBtn.disabled = true;

    const clientName = document.getElementById('form-client-name').value; const phone = document.getElementById('form-phone').value; const address = document.getElementById('form-address').value;
    const workerSelect = document.getElementById('form-worker'); const assistantSelect = document.getElementById('form-assistant');
    
    let leadWorker = workerSelect.value.trim(); let assistant = assistantSelect.value.trim();
    
    // ОБНОВЛЕНО: Проверка на совпадение мастера и помощника
    if (leadWorker && assistant && leadWorker === assistant) {
        alert('Ошибка: Главный мастер и помощник не могут быть одним и тем же человеком!');
        submitBtn.innerText = origText;
        submitBtn.disabled = false;
        return;
    }

    let workerPhone = ''; if (leadWorker) workerPhone = workerSelect.options[workerSelect.selectedIndex].getAttribute('data-phone') || '';
    let combinedWorkers = []; if (leadWorker) combinedWorkers.push(leadWorker); if (assistant) combinedWorkers.push(assistant);
    let finalWorkerString = combinedWorkers.length > 0 ? combinedWorkers.join(', ') : '---';
    const services = [];
    document.querySelectorAll('#form-services-container .service-row-edit').forEach(row => { const name = row.querySelector('.serv-col-name').value; const qty = parseInt(row.querySelector('.serv-col-qty').value); const price = parseFloat(row.querySelector('.serv-col-price').value); const done = row.getAttribute('data-done') === 'true'; if (name && qty > 0 && price >= 0) services.push({ name, qty, price, done }); });
    if (services.length === 0) { alert('Error: No services'); submitBtn.innerText = origText; submitBtn.disabled = false; return; }
    const customProfit = parseFloat(document.getElementById('form-profit-sum').value) || 0;
    
    if (window.currentEditingOrderId) { const order = window.ordersData.find(o => o.id === window.currentEditingOrderId); if (order) { order.clientName = clientName; order.clientPhone = phone; order.address = address; order.worker = finalWorkerString; order.workerPhone = workerPhone; order.services = services; order.profit = customProfit; } } 
    else { window.ordersData.unshift({ id: window.generateOrderId(), status: 'new', createdAt: window.getCurrentDateString(), completedAt: null, clientName: clientName, clientPhone: phone, address: address, worker: finalWorkerString, workerPhone: workerPhone, services: services, profit: customProfit }); }
    
    await window.syncOrdersToServer();

    window.renderOrders(); if(window.renderDashboardOrders) window.renderDashboardOrders(); if(window.updateDashDots) window.updateDashDots(); window.closeOrderFormModal(); if (navigator.vibrate) navigator.vibrate(50);
    
    submitBtn.innerText = origText;
    submitBtn.disabled = false;
};
