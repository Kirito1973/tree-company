window.dashViewedState = { orders: 0, masters: 0, partners: 0 };

window.updateDashDots = function() {
    const incOrders = window.ordersData.filter(o => o.status === 'incoming').length;
    const incMasters = window.employeesData.filter(e => e.status === 'pending').length;
    const incPartners = window.cooperationRequestsData.filter(c => c.status === 'pending').length;
    const incReviews = window.reviewsData.filter(r => r.isNew).length;

    document.getElementById('dash-dot-orders').style.display = (incOrders > window.dashViewedState.orders) ? 'block' : 'none';
    document.getElementById('dash-dot-masters').style.display = (incMasters > window.dashViewedState.masters) ? 'block' : 'none';
    document.getElementById('dash-dot-partners').style.display = (incPartners > window.dashViewedState.partners) ? 'block' : 'none';
    document.getElementById('dash-dot-overview').style.display = (incReviews > 0) ? 'block' : 'none';
}

window.switchDashboardView = function(viewName) {
    document.querySelectorAll('.dash-view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-dash-view="${viewName}"]`).classList.add('active');
    
    document.querySelectorAll('.dash-view-content').forEach(el => el.style.display = 'none');
    document.getElementById('dash-' + viewName).style.display = 'block';

    if (viewName === 'orders') window.dashViewedState.orders = window.ordersData.filter(o => o.status === 'incoming').length;
    if (viewName === 'masters') window.dashViewedState.masters = window.employeesData.filter(e => e.status === 'pending').length;
    if (viewName === 'partners') window.dashViewedState.partners = window.cooperationRequestsData.filter(c => c.status === 'pending').length;

    window.updateDashDots();

    if(viewName === 'overview') window.renderDashboardOverview();
    if(viewName === 'orders') window.renderDashboardOrders();
    if(viewName === 'masters') window.renderDashboardMasters();
    if(viewName === 'partners') window.renderDashboardPartnerRequests();
    if (navigator.vibrate) navigator.vibrate(10);
}

window.renderDashboardOverview = function() {
    let totalRating = 0; window.reviewsData.forEach(r => totalRating += r.rating);
    const avgRating = window.reviewsData.length > 0 ? (totalRating / window.reviewsData.length).toFixed(1) : '0.0';
    document.getElementById('dash-avg-rating-hero').innerText = `★ ${avgRating}`;

    const revList = document.getElementById('dash-reviews-list'); revList.innerHTML = '';
    window.reviewsData.slice().reverse().forEach(rev => {
        const stars = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : '');
        let newDotHtml = rev.isNew ? `<div class="notif-dot-card"></div>` : '';
        revList.innerHTML += `<div class="entity-card" style="cursor:pointer; position:relative;" onclick="openReviewModal('${rev.id}')">${newDotHtml}<div class="entity-header"><span class="entity-id" style="color:var(--text); font-size: 12px;">${rev.clientName}</span><span style="color:#FFB347; font-size:12px; font-weight:900;">${stars}</span></div><div class="entity-meta" style="margin-top:4px;">Master: <b style="color:var(--tree-light);">${rev.masterName}</b></div><div class="truncate-text" style="font-size: 11px; font-weight: 600; font-style: italic; color: var(--text-sec); margin-top: 8px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 8px;">"${rev.text}"</div><div style="font-size: 9px; color: var(--text-sec); text-align: right; margin-top: 6px;">${rev.date}</div></div>`;
    });
};

window.renderDashboardOrders = function() {
    const list = document.getElementById('dash-orders-list'); list.innerHTML = '';
    window.ordersData.filter(o => o.status === 'incoming').forEach(order => {
        list.innerHTML += `<div class="entity-card"><div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status incoming">New Req</span></div><div class="entity-meta">${order.clientName} | ${order.clientPhone}</div></div>`;
    });
};

window.renderDashboardMasters = function() {
    const list = document.getElementById('dash-masters-list'); list.innerHTML = '';
    window.employeesData.filter(e => e.status === 'pending').forEach(emp => {
        list.innerHTML += `<div class="entity-card"><div class="entity-header"><span class="entity-id">${emp.name}</span><span class="entity-status pending">Check</span></div><div class="entity-meta">${emp.phone}</div></div>`;
    });
};

window.renderDashboardPartnerRequests = function() {
    const list = document.getElementById('dash-partners-requests-list'); list.innerHTML = '';
    window.cooperationRequestsData.filter(c => c.status === 'pending').forEach(coop => {
        list.innerHTML += `<div class="entity-card"><div class="entity-header"><span class="entity-id">${coop.company}</span><span class="entity-status new">B2B</span></div><div class="entity-meta">${coop.phone}</div></div>`;
    });
};

document.addEventListener('DOMContentLoaded', () => { window.updateDashDots(); window.switchDashboardView('overview'); });
