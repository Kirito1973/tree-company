window.currentActiveEmpId = null;
window.currentEditingEmpId = null;

window.availableProfessions = ['doors', 'electro', 'universal'];

// Функция генерации сложного 10-значного пароля для сотрудников
window.generateComplexPassword = function() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let pass = '';
    for(let i = 0; i < 10; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
};

window.fetchEmployees = async function() {
    try {
        const res = await fetch('/api/employees');
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                window.employeesData = data;
            }
            window.renderEmployees();
            if(window.renderDashboardMasters) window.renderDashboardMasters();
            if(window.updateDashDots) window.updateDashDots();
        }
    } catch (err) {
        console.error('Ошибка загрузки сотрудников:', err);
    }
};

window.syncEmployeesToServer = async function() {
    try {
        await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employees: window.employeesData })
        });
    } catch (err) {
        console.error('Ошибка синхронизации сотрудников:', err);
    }
};

window.setEmpFilter = function(filterValue) { 
    document.querySelectorAll('#screen-employees .filter-tab').forEach(t => { if (t.getAttribute('data-emp-filter') === filterValue) t.classList.add('active'); else t.classList.remove('active'); }); 
    window.renderEmployees(); 
};

window.filterEmployees = function() { window.renderEmployees(); };

document.addEventListener('DOMContentLoaded', () => { 
    if (document.getElementById('employee-search')) document.getElementById('employee-search').addEventListener('input', window.filterEmployees); 
    window.fetchEmployees();
});

window.previewEmpPhoto = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 250; 
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const base64 = canvas.toDataURL('image/jpeg', 0.8);
            document.getElementById('form-emp-photo-base64').value = base64;
            document.getElementById('form-emp-photo-preview').style.backgroundImage = `url(${base64})`;
            
            document.getElementById('photo-placeholder-icon').style.display = 'none';
            document.getElementById('photo-placeholder-text').style.display = 'none';
        }
    };
};

window.renderEmployees = function() {
    const list = document.getElementById('employees-list'); if (!list) return; list.innerHTML = '';
    const activeTab = document.querySelector('#screen-employees .filter-tab.active'); const activeFilter = activeTab ? activeTab.getAttribute('data-emp-filter') : 'all';
    const empSearchInput = document.getElementById('employee-search'); const empSearchTerm = empSearchInput ? empSearchInput.value.toLowerCase() : '';
    const bdayEmployees = [];
    
    if(!window.employeesData) return;

    window.employeesData.filter(e => e.status === 'active').forEach(emp => {
        const textToSearch = (emp.name + " " + emp.phone).toLowerCase(); const matchesSearch = textToSearch.includes(empSearchTerm);
        
        let matchesFilter = false;
        if (activeFilter === 'all') {
            matchesFilter = true;
        } else {
            if (Array.isArray(emp.type)) {
                matchesFilter = emp.type.includes(activeFilter);
            } else {
                matchesFilter = (emp.type === activeFilter);
            }
        }
        
        if (!matchesFilter || !matchesSearch) return;
        
        const bdayInfo = window.getBirthdayInfo(emp.birthDate); if (bdayInfo && bdayInfo.isToday) bdayEmployees.push(emp.name);
        let bdayHtml = ''; if (bdayInfo) { if (bdayInfo.isToday) bdayHtml = `<div style="color: #FFB347; font-weight: 800; font-size: 10px; margin-top: 6px; display: flex; align-items: center; gap: 4px;">🎉 Happy Birthday!</div>`; else bdayHtml = `<div style="color: var(--text-sec); font-weight: 600; font-size: 9px; margin-top: 6px;">🎂 ${bdayInfo.daysLeft} days left</div>`; }
        
        const photoHtml = emp.photo ? 
            `<div style="width: 46px; height: 46px; border-radius: 50%; background-image: url(${emp.photo}); background-size: cover; background-position: center; border: 2px solid var(--tree-light); flex-shrink: 0;"></div>` : 
            `<div style="width: 46px; height: 46px; border-radius: 50%; background: rgba(128,128,128,0.1); display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: 900; color: var(--text-sec); flex-shrink: 0;">${emp.name.charAt(0)}</div>`;

        const card = document.createElement('div'); card.className = 'entity-card'; card.onclick = () => window.openEmployeeModal(emp.id); 
        card.innerHTML = `
            <div style="display: flex; gap: 14px; align-items: center;">
                ${photoHtml}
                <div style="flex: 1;">
                    <div class="entity-header"><span class="entity-id">${emp.id}</span><div class="rating-badge">★ ${(emp.rating || 0).toFixed(1)}</div></div>
                    <div class="entity-title" style="margin-top:2px;">${emp.name}</div>
                    <div class="entity-meta"><span>${window.getEmpTypeLabel(emp.type)}</span></div>
                </div>
            </div>
            <div class="entity-meta" style="margin-top: 8px;"><span>${window.adminTranslations['lbl_debt'][window.currentAdminLang] || 'Debt:'} <b style="color:${(emp.companyDebt||0) < 0 ? '#1F9651' : '#ff4444'}">${(emp.companyDebt||0).toLocaleString()} ֏</b></span></div>
            ${bdayHtml}
            <div class="entity-meta" style="margin-top: 4px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 6px;"><span style="font-size: 11px; font-weight: 700; color: var(--text);">${emp.phone}</span><button class="call-btn" style="width: 26px; height: 26px; border-radius: 50%;" onclick="event.stopPropagation(); window.location.href='tel:${emp.phone.replace(/[^\d+]/g, '')}'"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button></div>`;
        list.appendChild(card);
    });
    
    const bannerContainer = document.getElementById('bday-banner-container');
    if (bannerContainer) { if (bdayEmployees.length > 0) { bannerContainer.innerHTML = `<div class="glass-panel" style="background: rgba(255, 179, 71, 0.15); border: 1px solid #FFB347; margin-bottom: 12px; padding: 12px; display: flex; align-items: center; gap: 12px;"><span style="font-size: 28px; line-height: 1;">🎉</span><div><div style="font-weight: 900; font-size: 13px; color: #FFB347; margin-bottom: 2px;">HAPPY BIRTHDAY!</div><div style="font-size: 11px; font-weight: 600; color: var(--text);"><b>${bdayEmployees.join(', ')}</b></div></div></div>`; bannerContainer.style.display = 'block'; } else bannerContainer.style.display = 'none'; }
    window.applyAdminLanguage();
};

window.openEmployeeModal = function(empId) {
    window.currentActiveEmpId = empId; const emp = window.employeesData.find(e => e.id === empId); if (!emp) return;
    const isPending = (emp.status === 'pending');
    document.getElementById('modal-emp-id').innerText = emp.id; document.getElementById('modal-emp-type').innerText = window.getEmpTypeLabel(emp.type); 
    const typeBadge = document.getElementById('modal-emp-type');
    if (isPending) { typeBadge.style.background = 'rgba(255, 179, 71, 0.15)'; typeBadge.style.color = '#FFB347'; } else { typeBadge.style.background = 'rgba(31, 150, 81, 0.15)'; typeBadge.style.color = 'var(--tree-light)'; }
    
    const photoEl = document.getElementById('modal-emp-photo');
    if (emp.photo) {
        photoEl.style.backgroundImage = `url(${emp.photo})`;
        photoEl.style.display = 'block';
    } else {
        photoEl.style.display = 'none';
    }

    document.getElementById('modal-emp-name').innerText = emp.name; document.getElementById('modal-emp-access-key').innerText = emp.accessKey || '------'; document.getElementById('modal-emp-birth').innerText = emp.birthDate || '---';
    const debtEl = document.getElementById('modal-emp-debt'); if (emp.companyDebt === undefined) emp.companyDebt = 0; debtEl.innerText = emp.companyDebt.toLocaleString() + ' ֏'; debtEl.style.color = emp.companyDebt < 0 ? '#1F9651' : '#ff4444';
    
    const scheduleContainer = document.getElementById('modal-emp-schedule-list');
    if (emp.workingDates && emp.workingDates.length > 0) scheduleContainer.innerHTML = emp.workingDates.map(d => `<span style="display:inline-block; background:rgba(35,169,91,0.1); color:var(--tree-light); border: 1px solid rgba(35,169,91,0.2); padding:4px 8px; border-radius:8px; font-size:10px; font-weight:800; margin-bottom:4px;">${d}</span>`).join('');
    else scheduleContainer.innerHTML = '<span style="font-size:10px; color:var(--text-sec);">---</span>';
    
    const bdayInfo = window.getBirthdayInfo(emp.birthDate); const bdayRow = document.getElementById('modal-emp-bday-row'); const bdayCountdown = document.getElementById('modal-emp-bday-countdown');
    if (bdayInfo) { bdayRow.style.display = 'flex'; if (bdayInfo.isToday) bdayCountdown.innerHTML = `<span style="color: #FFB347; font-weight: 900; font-size: 14px;">🎉!</span>`; else bdayCountdown.innerText = `(${bdayInfo.daysLeft} d)`; } else bdayRow.style.display = 'none';
    
    document.getElementById('modal-emp-phone-text').innerText = emp.phone; const phoneLink = document.getElementById('modal-emp-phone-link');
    if (emp.phone) { phoneLink.style.display = 'flex'; phoneLink.href = `tel:${emp.phone.replace(/[^\d+]/g, '')}`; } else phoneLink.style.display = 'none';
    document.getElementById('modal-emp-address').innerText = emp.address || '---'; document.getElementById('modal-emp-exp').innerText = emp.exp ? emp.exp.split('/')[0].trim() : '0'; document.getElementById('modal-emp-rating').innerText = `★ ${(emp.rating || 0).toFixed(1)}`;
    
    const empOrders = window.ordersData ? window.ordersData.filter(o => o.worker && o.worker.includes(emp.name) && o.status !== 'cancelled') : []; 
    document.getElementById('modal-emp-orders-count').innerText = empOrders.length;
    const ordersListDiv = document.getElementById('modal-emp-orders-list'); 
    ordersListDiv.innerHTML = ''; 
    ordersListDiv.classList.remove('open'); 
    
    if (empOrders.length > 0) { 
        empOrders.forEach(o => { 
            let statColor = '#9BAA9E'; 
            let statKey = o.status;
            if(o.status === 'completed') { statColor = 'var(--tree-light)'; statKey = 'success'; } 
            else if(o.status === 'progress') { statColor = '#FFB347'; statKey = 'pending'; }
            else if(o.status === 'new') { statColor = '#00C8FF'; statKey = 'new'; } 
            
            const statusText = (window.adminTranslations['status_'+statKey] && window.adminTranslations['status_'+statKey][window.currentAdminLang]) ? window.adminTranslations['status_'+statKey][window.currentAdminLang] : o.status;
            
            ordersListDiv.innerHTML += `<div class="emp-order-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(128,128,128,0.1); border-radius:12px; margin-bottom:6px; cursor:pointer; transition: background 0.2s;" onclick="closeEmployeeModal(); openOrderModal('${o.id}');"><span class="emp-order-id" style="font-weight:900; font-size:12px; color:var(--text);">${o.id}</span><span class="emp-order-stat" style="color: ${statColor}; font-size:9px; font-weight:900; text-transform:uppercase; padding:4px 8px; background: ${statColor}15; border-radius:8px;">${statusText}</span></div>`; 
        }); 
    } else { 
        ordersListDiv.innerHTML = `<div style="text-align:center; font-size: 11px; color: var(--text-sec); padding: 10px;">Չկան պատվերներ (Нет заказов)</div>`; 
    }
    
    const btnAccept = document.getElementById('modal-emp-accept-btn'); 
    const btnReject = document.getElementById('modal-emp-reject-btn'); 
    const btnEdit = document.getElementById('modal-emp-edit-btn');
    const btnFire = document.getElementById('modal-emp-fire-btn');

    if (isPending) { 
        btnAccept.style.display = 'flex'; btnReject.style.display = 'flex'; btnEdit.style.display = 'none'; 
        if(btnFire) btnFire.style.display = 'none';
    } else { 
        btnAccept.style.display = 'none'; btnReject.style.display = 'none'; btnEdit.style.display = 'flex'; 
        if(btnFire) btnFire.style.display = 'flex';
    }
    document.getElementById('emp-pin-row').style.display = isPending ? 'none' : 'flex'; document.getElementById('emp-schedule-block').style.display = isPending ? 'none' : 'block'; document.getElementById('emp-finance-block').style.display = isPending ? 'none' : 'block'; document.getElementById('emp-orders-block').style.display = isPending ? 'none' : 'block';
    if (isPending) bdayRow.style.display = 'none';

    document.getElementById('employee-modal').classList.add('active'); if (navigator.vibrate) navigator.vibrate(15);
};

window.closeEmployeeModal = function() { document.getElementById('employee-modal').classList.remove('active'); window.currentActiveEmpId = null; };
window.toggleEmpOrders = function() { document.getElementById('modal-emp-orders-list').classList.toggle('open'); };

window.acceptEmployee = async function() { 
    if (!window.currentActiveEmpId) return; 
    const emp = window.employeesData.find(e => e.id === window.currentActiveEmpId); 
    if (emp) { 
        emp.status = 'active'; 
        if (!emp.accessKey) {
            // Генерируем 10-значный сложный пароль
            emp.accessKey = window.generateComplexPassword(); 
        }
        await window.syncEmployeesToServer();
        if(window.renderDashboardMasters) window.renderDashboardMasters(); 
        window.renderEmployees(); 
        if(window.updateDashDots) window.updateDashDots(); 
        window.openEmployeeModal(emp.id); 
        if (navigator.vibrate) navigator.vibrate(20); 
    } 
};

window.rejectEmployee = async function() { 
    if (!window.currentActiveEmpId) return; 
    if (confirm("Reject?")) { 
        window.employeesData = window.employeesData.filter(e => e.id !== window.currentActiveEmpId); 
        await window.syncEmployeesToServer();
        if(window.renderDashboardMasters) window.renderDashboardMasters(); 
        window.closeEmployeeModal(); 
        if(window.updateDashDots) window.updateDashDots(); 
    } 
};

window.fireEmployee = async function() {
    if (!window.currentActiveEmpId) return; 
    if (confirm("Вы уверены, что хотите уволить этого сотрудника? Он будет удален из активного списка.")) { 
        const emp = window.employeesData.find(e => e.id === window.currentActiveEmpId); 
        if (emp) {
            emp.status = 'dismissed'; 
            await window.syncEmployeesToServer();
            if(window.renderDashboardMasters) window.renderDashboardMasters(); 
            window.renderEmployees(); 
            window.closeEmployeeModal(); 
            if(window.updateDashDots) window.updateDashDots(); 
        }
    } 
};

window.adjustEmpDebt = async function(action) {
    if (!window.currentActiveEmpId) return; 
    const emp = window.employeesData.find(e => e.id === window.currentActiveEmpId); 
    if (!emp) return;
    
    const inputEl = document.getElementById('emp-finance-input');
    const val = parseInt(inputEl.value, 10); 
    
    if (isNaN(val) || val <= 0) {
        alert("Укажите корректную сумму!");
        return;
    }
    
    if (emp.companyDebt === undefined || isNaN(emp.companyDebt)) {
        emp.companyDebt = 0;
    }
    
    if (action === 'add') emp.companyDebt += val; 
    else if (action === 'bonus') emp.companyDebt -= val; 
    
    await window.syncEmployeesToServer();
    
    const debtEl = document.getElementById('modal-emp-debt'); 
    debtEl.innerText = emp.companyDebt.toLocaleString() + ' ֏'; 
    debtEl.style.color = emp.companyDebt < 0 ? '#1F9651' : '#ff4444';
    inputEl.value = ''; 
    window.renderEmployees(); 
    if (navigator.vibrate) navigator.vibrate(20);
};

window.renderProfessionsForm = function(selected = []) {
    const container = document.getElementById('form-emp-professions-container');
    container.innerHTML = '';
    
    let allProfs = new Set([...window.availableProfessions]);
    if (window.employeesData) {
        window.employeesData.forEach(e => {
            if(e.status !== 'dismissed') {
                if (Array.isArray(e.type)) e.type.forEach(t => allProfs.add(t));
                else if (e.type) allProfs.add(e.type);
            }
        });
    }
    selected.forEach(s => allProfs.add(s));
    
    allProfs.forEach(prof => {
        const isActive = selected.includes(prof) ? 'active' : '';
        const label = window.getEmpTypeLabel([prof]);
        const isCustom = !window.availableProfessions.includes(prof);
        
        const delBtn = isCustom ? `<span class="del-chip" style="margin-left:6px; color:#ff4444; font-weight:900; font-size:14px;">&times;</span>` : '';
        
        container.innerHTML += `<div class="prof-chip ${isActive}" data-val="${prof}" onclick="if(event.target.classList.contains('del-chip')) { this.remove(); } else { this.classList.toggle('active'); if(navigator.vibrate) navigator.vibrate(10); }">${label}${delBtn}</div>`;
    });
};

window.addNewProfession = function() {
    const newProf = prompt('Введите название новой профессии (например, Установщик плинтусов):');
    if (newProf && newProf.trim() !== '') {
        const val = newProf.trim();
        const container = document.getElementById('form-emp-professions-container');
        container.innerHTML += `<div class="prof-chip active" data-val="${val}" onclick="if(event.target.classList.contains('del-chip')) { this.remove(); } else { this.classList.toggle('active'); if(navigator.vibrate) navigator.vibrate(10); }">${val} <span class="del-chip" style="margin-left:6px; color:#ff4444; font-weight:900; font-size:14px;">&times;</span></div>`;
    }
};

window.openEmployeeForm = function(empId = null) {
    window.currentEditingEmpId = empId; const form = document.getElementById('employee-form'); form.reset();
    
    const photoPreview = document.getElementById('form-emp-photo-preview');
    const photoBase64 = document.getElementById('form-emp-photo-base64');
    let empTypes = [];
    
    if (empId) { 
        const emp = window.employeesData.find(e => e.id === empId); 
        if (emp) { 
            document.getElementById('form-emp-name').value = emp.name; 
            document.getElementById('form-emp-phone').value = emp.phone; 
            document.getElementById('form-emp-address').value = emp.address || ''; 
            document.getElementById('form-emp-birth').value = emp.birthDate || ''; 
            document.getElementById('form-emp-exp').value = emp.exp ? emp.exp.split('/')[0].trim() : ''; 
            document.getElementById('form-emp-access-key').value = emp.accessKey || ''; 
            
            if (emp.photo) {
                photoPreview.style.backgroundImage = `url(${emp.photo})`;
                document.getElementById('photo-placeholder-icon').style.display = 'none';
                document.getElementById('photo-placeholder-text').style.display = 'none';
                photoBase64.value = emp.photo;
            } else {
                photoPreview.style.backgroundImage = 'none';
                document.getElementById('photo-placeholder-icon').style.display = 'block';
                document.getElementById('photo-placeholder-text').style.display = 'block';
                photoBase64.value = '';
            }
            
            empTypes = Array.isArray(emp.type) ? emp.type : [emp.type];
        } 
        window.closeEmployeeModal(); 
    } else { 
        // Генерируем 10-значный сложный пароль
        document.getElementById('form-emp-access-key').value = window.generateComplexPassword(); 
        photoPreview.style.backgroundImage = 'none';
        document.getElementById('photo-placeholder-icon').style.display = 'block';
        document.getElementById('photo-placeholder-text').style.display = 'block';
        photoBase64.value = '';
    }
    
    window.renderProfessionsForm(empTypes);
    
    document.getElementById('form-emp-photo').value = '';
    document.getElementById('employee-form-modal').classList.add('active');
};

window.closeEmployeeFormModal = function() { document.getElementById('employee-form-modal').classList.remove('active'); window.currentEditingEmpId = null; };

window.saveEmployeeForm = async function(event) {
    event.preventDefault();
    
    const selectedProfChips = document.querySelectorAll('#form-emp-professions-container .prof-chip.active');
    const finalTypes = Array.from(selectedProfChips).map(c => c.getAttribute('data-val'));
    
    if (finalTypes.length === 0) {
        alert('Выберите хотя бы одну профессию!');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText = submitBtn.innerText;
    submitBtn.innerText = '...';
    submitBtn.disabled = true;

    const name = document.getElementById('form-emp-name').value; const phone = document.getElementById('form-emp-phone').value; const address = document.getElementById('form-emp-address').value; const birthDate = document.getElementById('form-emp-birth').value; const exp = document.getElementById('form-emp-exp').value; const accessKey = document.getElementById('form-emp-access-key').value;
    const photo = document.getElementById('form-emp-photo-base64').value; 
    
    if (window.currentEditingEmpId) { 
        const emp = window.employeesData.find(e => e.id === window.currentEditingEmpId); 
        if (emp) { 
            emp.name = name; emp.phone = phone; emp.address = address; emp.birthDate = birthDate; emp.type = finalTypes; emp.exp = exp; emp.accessKey = accessKey; emp.photo = photo; 
        } 
    } else { 
        window.employeesData.push({ id: window.generateEmpId(), status: 'active', name: name, type: finalTypes, phone: phone, exp: exp || '0', rating: 0.0, birthDate: birthDate, address: address, accessKey: accessKey, companyDebt: 0, workingDates: [], photo: photo }); 
    }
    
    await window.syncEmployeesToServer();
    
    window.renderEmployees(); if(window.renderDashboardMasters) window.renderDashboardMasters(); window.closeEmployeeFormModal(); if(window.updateDashDots) window.updateDashDots(); if (navigator.vibrate) navigator.vibrate(50);
    
    submitBtn.innerText = origText;
    submitBtn.disabled = false;
};
