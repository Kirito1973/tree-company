window.fetchOrders = async function() {
    try {
        const res = await fetch('/api/orders', { credentials: 'include' });
        
        if (res.status === 401) {
            sessionStorage.removeItem('tree_authenticated');
            document.getElementById('auth-screen').classList.remove('hidden');
            return;
        }

        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) window.ordersData = data;
            window.renderOrders();
            if(window.renderDashboardOrders) window.renderDashboardOrders();
            if(window.updateDashDots) window.updateDashDots();
        }
    } catch (err) { console.error('Ошибка загрузки заказов:', err); }
};

window.syncSingleOrder = async function(order, action = 'update') {
    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ action: action, order: order, orderId: order ? order.id : null })
        });

        if (res.status === 401) {
            sessionStorage.removeItem('tree_authenticated');
            document.getElementById('auth-screen').classList.remove('hidden');
            return;
        }
    } catch (err) { console.error('Ошибка синхронизации заказа:', err); }
};
