
window.dashViewedState = { orders: 0, masters: 0, partners: 0 };

window.updateDashDots = function() {
    // ОБНОВЛЕНО: Отлавливаем не только входящие с сайта, но и новые без работника
    const incOrders = window.ordersData ? window.ordersData.filter(o => 
        o.status === 'incoming' || 
        (o.status === 'new' && (!o.worker || o.worker === '---' || o.worker === 'Չկա'))
    ).length : 0;
    
    const incMasters = window.employeesData ? window.employeesData.filter(e => e.status === 'pending').length : 0;
    const incPartners = window.cooperationRequestsData ? window.cooperationRequestsData.filter(c => c.status === 'pending').length : 0;
    const incReviews = window.reviewsData ? window.reviewsData.filter(r => r.isNew).length : 0;

    const updateDot = (id, count) => {
        const dot = document.getElementById(id);
        if (!dot) return;
        if (count > 0) {
            dot.style.display = 'block'; 
            dot.innerText = ''; 
            dot.style.minWidth = '12px';
            dot.style.height = '12px';
            dot.style.padding = '0';
            dot.style.top = '2px';
            dot.style.right = '2px';
        } else {
            dot.style.display = 'none'; 
            dot.innerText = '';
        }
    };

    updateDot('dash-dot-orders', incOrders);
    updateDot('dash-dot-masters', incMasters);
    updateDot('dash-dot-partners', incPartners);
    updateDot('dash-dot-overview', incReviews);
};

window.switchDashboardView = function(viewName) {
    document.querySelectorAll('.dash-view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-dash-view="${viewName}"]`).classList.add('active');
    
    document.querySelectorAll('.dash-view-content').forEach(el => el.style.display = 'none');
    document.getElementById('dash-' + viewName).style.display = 'block';

    window.updateDashDots();

    if(viewName === 'overview') window.renderDashboardOverview();
    if(viewName === 'orders') window.renderDashboardOrders();
    if(viewName === 'masters') window.renderDashboardMasters();
    if(viewName === 'partners') window.renderDashboardPartnerRequests();
    
    if (navigator.vibrate) {
        if (!navigator.userActivation || navigator.userActivation.hasBeenActive) {
            navigator.vibrate(10);
        }
    }
};

window.renderDashboardOverview = function() {
    let totalRating = 0;
    if(window.reviewsData && window.reviewsData.length > 0) {
        window.reviewsData.forEach(r => totalRating += r.rating);
    }
    const avgRating = (window.reviewsData && window.reviewsData.length > 0) ? (totalRating / window.reviewsData.length).toFixed(1) : '0.0';

    document.getElementById('dash-avg-rating-hero').innerText = `★ ${avgRating}`;

    const revList = document.getElementById('dash-reviews-list');
    revList.innerHTML = '';
    
    const masterLabel = (window.adminTranslations && window.adminTranslations['lbl_master'] && window.adminTranslations['lbl_master'][window.currentAdminLang]) ? window.adminTranslations['lbl_master'][window.currentAdminLang] : 'Мастер:';

    if(window.reviewsData && window.reviewsData.length > 0) {
        window.reviewsData.slice().forEach(rev => {
            const stars = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : '');
            let newDotHtml = rev.isNew ? `<div class="notif-dot-card"></div>` : '';
            
            const opacityStyle = rev.isNew ? 'opacity: 1;' : 'opacity: 0.65;';

            revList.innerHTML += `
                <div class="entity-card" style="cursor:pointer; position:relative; ${opacityStyle}" onclick="openReviewModal('${rev.id}')">
                    ${newDotHtml}
                    <div class="entity-header">
                        <span class="entity-id" style="color:var(--text); font-size: 12px;">${rev.clientName}</span>
                        <span style="color:#FFB347; font-size:12px; font-weight:900;">${stars}</span>
                    </div>
                    <div class="entity-meta" style="margin-top:4px;">${masterLabel} <b style="color:var(--tree-light);">${rev.masterName}</b></div>
                    <div class="truncate-text" style="font-size: 11px; font-weight: 600; font-style: italic; color: var(--text-sec); margin-top: 8px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 8px;">"${rev.text}"</div>
                    <div style="font-size: 9px; color: var(--text-sec); text-align: right; margin-top: 6px;">${rev.date}</div>
                </div>
            `;
        });
    } else {
        revList.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">Нет отзывов</div>`;
    }
};

window.openReviewModal = function(id) {
    if(!window.reviewsData) return;
    const rev = window.reviewsData.find(r => r.id === id);
    if(!rev) return;
    
    if (rev.isNew) { 
        rev.isNew = false; 
        window.renderDashboardOverview(); 
        window.updateDashDots(); 
    }
    
    document.getElementById('modal-rev-client').innerText = rev.clientName;
    document.getElementById('modal-rev-stars').innerText = '★'.repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? '½' : '');
    document.getElementById('modal-rev-text').innerText = rev.text;
    document.getElementById('modal-rev-date').innerText = rev.date;
    document.getElementById('review-modal').classList.add('active');
    
    if (navigator.vibrate) navigator.vibrate(10);
};

window.closeReviewModal = function() { document.getElementById('review-modal').classList.remove('active'); };

window.renderDashboardOrders = function() {
    const list = document.getElementById('dash-orders-list'); list.innerHTML = '';
    if(!window.ordersData) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; return; }
    
    // ОБНОВЛЕНО: Фильтруем заказы, у которых статус "Новый" и при этом нет сотрудника
    let filtered = window.ordersData.filter(o => 
        o.status === 'incoming' || 
        (o.status === 'new' && (!o.worker || o.worker === '---' || o.worker === 'Չկա'))
    );
    
    if(filtered.length > 0) {
        filtered.forEach(order => {
            let mainTitle = order.services && order.services.length > 0 ? order.services[0].name : "---";
            if(order.services && order.services.length > 1) mainTitle += ` (+${order.services.length - 1})`;
            
            // Если заказ без мастера, подсвечиваем его как "Новый"
            let statClass = order.status === 'incoming' ? 'incoming' : 'new';
            let statI18n = order.status === 'incoming' ? 'status_incoming' : 'status_new';
            
            const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => window.openOrderModal(order.id);
            card.innerHTML = `<div class="entity-header"><span class="entity-id">${order.id}</span><span class="entity-status ${statClass}" data-i18n="${statI18n}"></span></div><div class="entity-title">${mainTitle}</div><div class="entity-meta">${window.adminTranslations['lbl_name'][window.currentAdminLang]} ${order.clientName || '---'}</div><div class="entity-meta">${window.adminTranslations['lbl_phone'][window.currentAdminLang]} ${order.clientPhone}</div><div class="entity-meta">${window.adminTranslations['lbl_address'][window.currentAdminLang]} ${order.address}</div>`;
            list.appendChild(card);
        });
        window.applyAdminLanguage();
    } else {
        list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
    }
};

window.renderDashboardMasters = function() {
    const list = document.getElementById('dash-masters-list'); list.innerHTML = '';
    if(!window.employeesData) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; return; }
    
    const pendingMasters = window.employeesData.filter(e => e.status === 'pending');
    if(pendingMasters.length > 0) {
        pendingMasters.forEach(emp => {
            const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => window.openEmployeeModal(emp.id);
            card.innerHTML = `<div class="entity-header"><span class="entity-id">${emp.id}</span><span class="entity-status pending" data-i18n="status_check"></span></div><div class="entity-title">${emp.name}</div><div class="entity-meta"><span>${window.adminTranslations['lbl_type'][window.currentAdminLang]}: ${window.getEmpTypeLabel(emp.type)}</span></div><div class="entity-meta"><span>${window.adminTranslations['lbl_exp'][window.currentAdminLang]}: ${emp.exp ? emp.exp.split('/')[0].trim() : '0'}</span></div><div class="entity-meta" style="margin-top: 4px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 6px;"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${emp.phone}</span></div>`;
            list.appendChild(card);
        });
        window.applyAdminLanguage();
    } else {
        list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
    }
};

window.renderDashboardPartnerRequests = function() {
    const list = document.getElementById('dash-partners-requests-list'); list.innerHTML = '';
    if(!window.cooperationRequestsData) { list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`; return; }
    
    const pendingPartners = window.cooperationRequestsData.filter(c => c.status === 'pending');
    if(pendingPartners.length > 0) {
        pendingPartners.forEach(coop => {
            const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => openCoopModal(coop.id);
            card.innerHTML = `<div class="entity-header"><span class="entity-id">${coop.company}</span><span class="entity-status new">B2B</span></div><div class="entity-title">${coop.contact}</div><div class="entity-meta">${window.adminTranslations['lbl_phone'][window.currentAdminLang]} ${coop.phone}</div><div class="entity-meta">${coop.date}</div>`;
            list.appendChild(card);
        });
    } else {
        list.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec);">---</div>`;
    }
};

let currentActiveCoopId = null;
window.openCoopModal = function(id) {
    currentActiveCoopId = id; const coop = window.cooperationRequestsData.find(c => c.id === id); if(!coop) return;
    document.getElementById('modal-coop-company').innerText = coop.company; document.getElementById('modal-coop-contact').innerText = coop.contact;
    document.getElementById('modal-coop-phone').innerText = coop.phone;
    const phoneLink = document.getElementById('modal-coop-phone-link'); phoneLink.href = `tel:${coop.phone.replace(/[^\d+]/g, '')}`;
    document.getElementById('modal-coop-text').innerText = coop.text;
    document.getElementById('coop-modal').classList.add('active');
};
window.closeCoopModal = function() { document.getElementById('coop-modal').classList.remove('active'); currentActiveCoopId = null; };

window.acceptCoop = function() {
    if(!currentActiveCoopId) return; const coop = window.cooperationRequestsData.find(c => c.id === currentActiveCoopId);
    if(coop) {
        coop.status = 'accepted'; const newPartnerId = 'p_'+Math.random();
        window.partnersData.push({ id: newPartnerId, name: coop.company, logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>' });
        window.cooperationRequestsData = window.cooperationRequestsData.filter(c => c.id !== currentActiveCoopId);
        window.renderDashboardPartnerRequests(); if(window.renderAdminPartners) window.renderAdminPartners(); window.updateDashDots(); window.closeCoopModal();
        if(navigator.vibrate) navigator.vibrate(20); if(window.openPartnerForm) window.openPartnerForm(newPartnerId);
    }
};
window.rejectCoop = function() {
    if(!currentActiveCoopId) return;
    if(confirm("Отклонить заявку компании?")) {
        window.cooperationRequestsData = window.cooperationRequestsData.filter(c => c.id !== currentActiveCoopId);
        window.renderDashboardPartnerRequests(); window.updateDashDots(); window.closeCoopModal();
    }
};
