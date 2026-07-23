const APP_VERSION = '7.4';

// ================= ВРЕМЯ И ФОРМАТИРОВАНИЕ =================
function getNowString() {
    const now = new Date();
    return String(now.getDate()).padStart(2, '0') + '.' +
           String(now.getMonth() + 1).padStart(2, '0') + '.' +
           now.getFullYear() + ' ' +
           String(now.getHours()).padStart(2, '0') + ':' +
           String(now.getMinutes()).padStart(2, '0');
}

const COMPANY_FEE_PERCENT = 0.20; 

function switchEmpTab(screenId, btnElement) {
    document.querySelectorAll('.emp-screen').forEach(scr => scr.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(btn => btn.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) targetScreen.classList.add('active');
    if (btnElement) btnElement.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(20); 
}

// Добавляем новые переводы для окна распределения прибыли
const translations = {
    // ... [Оставляем все ваши старые переводы без изменений] ...
    "tab_emp_news": { "AM": "Գլխավոր", "RU": "Главная", "EN": "Home" },
    "tab_emp_orders": { "AM": "Պատվերներ", "RU": "Заказы", "EN": "Orders" },
    "tab_emp_finance": { "AM": "Ֆինանսներ", "RU": "Финансы", "EN": "Finance" },
    "tab_emp_profile": { "AM": "Իմ էջը", "RU": "Профиль", "EN": "Profile" },
    "title_emp_finance": { "AM": "Իմ <span>Ֆինանսները</span>", "RU": "Мои <span>Финансы</span>", "EN": "My <span>Finance</span>" },
    "title_emp_profile": { "AM": "Անձնական <span>տվյալներ</span>", "RU": "Личные <span>Данные</span>", "EN": "Personal <span>Profile</span>" },
    "login_title": { "AM": "Մուտք", "RU": "Вход", "EN": "Login" },
    "login_desc": { "AM": "Մուտքագրեք 6-նիշանոց PIN կոդը", "RU": "Введите 6-значный ключ доступа", "EN": "Enter 6-digit PIN code" },
    "filter_new": { "AM": "Նոր", "RU": "Новые", "EN": "New" },
    "filter_progress": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "In Progress" },
    "filter_completed": { "AM": "Ավարտված", "RU": "Завершенные", "EN": "Completed" },
    "status_new": { "AM": "Նոր", "RU": "Новый", "EN": "New" },
    "status_pending": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "Pending" },
    "status_success": { "AM": "Ավարտված", "RU": "Завершен", "EN": "Success" },
    "modal_client_title": { "AM": "Հաճախորդ", "RU": "Клиент", "EN": "Client" },
    "modal_fin_title": { "AM": "Ֆինանսներ", "RU": "Финансы", "EN": "Finance" },
    "modal_fin_total": { "AM": "Ընդհանուր:", "RU": "Общая сумма:", "EN": "Total:" },
    "modal_fin_company": { "AM": "Ընկերության %:", "RU": "Комиссия (20%):", "EN": "Company %:" },
    "modal_services_title": { "AM": "Ծառայություններ", "RU": "Услуги", "EN": "Services" },
    "btn_accept_order": { "AM": "Ընդունել պատվերը", "RU": "Принять заказ", "EN": "Accept Order" },
    "btn_finish_order": { "AM": "Ավարտել պատվերը", "RU": "Завершить заказ", "EN": "Finish Order" },
    "btn_close": { "AM": "Փակել", "RU": "Закрыть", "EN": "Close" },
    "btn_save": { "AM": "<span>Պահպանել</span>", "RU": "<span>Сохранить</span>", "EN": "<span>Save</span>" },
    "btn_cancel": { "AM": "Չեղարկել", "RU": "Отмена", "EN": "Cancel" },
    
    // НОВЫЕ СТРОКИ:
    "msg_assistant_wait": { "AM": "Սպասում է ավարտին", "RU": "Ожидание завершения", "EN": "Waiting for Lead" },
    "modal_split_title": { "AM": "Շահույթի բաշխում", "RU": "Распределение прибыли", "EN": "Profit Split" },
    "split_net_total": { "AM": "Բրիգադի մնացորդ:", "RU": "Остаток бригады:", "EN": "Crew Net:" },
    "split_your_share": { "AM": "Ձեր մնացորդը:", "RU": "Ваш остаток:", "EN": "Your Share:" },
    "split_ast_share": { "AM": "Օգնականի բաժինը", "RU": "Доля помощника", "EN": "Assistant Share" },
    "btn_confirm_finish": { "AM": "Հաստատել և ավարտել", "RU": "Подтвердить", "EN": "Confirm & Finish" },
    "prof_name": { "AM": "Անուն:", "RU": "Имя:", "EN": "Name:" },
    "prof_type": { "AM": "Մասնագիտություն:", "RU": "Профессия:", "EN": "Profession:" },
    "prof_birth": { "AM": "Ծննդյան օր:", "RU": "Дата рожд.:", "EN": "Birth Date:" },
    "prof_phone": { "AM": "Հեռախոս:", "RU": "Телефон:", "EN": "Phone:" },
    "prof_address": { "AM": "Հասցե:", "RU": "Адрес:", "EN": "Address:" }
};

let currentLang = localStorage.getItem('emp_app_lang') || 'AM';

function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][currentLang]) {
            el.innerHTML = translations[key][currentLang];
        }
    });
}

// ================= БАЗА ДАННЫХ =================
// ВНИМАНИЕ: Изменена структура. Теперь массив 'crew', где есть 'lead' и 'assistant'.
let ordersData = [
    { 
        id: 'ORD-003', status: 'new', createdAt: '15.07.2026 10:00', acceptedAt: null, completedAt: null, 
        clientName: 'Գոռ Վարդանյան', clientPhone: '+374 95 188 038', address: 'Երևան, Աբովյան 12', 
        crew: [
            { empId: 'EMP-001', name: 'Արմեն Սարգսյան', role: 'lead', earnings: 0 },
            { empId: 'EMP-004', name: 'Գոռ Վարդանյան', role: 'assistant', earnings: 0 }
        ],
        services: [{ name: 'Դռների տեղադրում (MDF)', qty: 2, price: 15000, done: false, doneAt: null }] 
    },
    { 
        id: 'ORD-002', status: 'progress', createdAt: '14.07.2026 15:30', acceptedAt: '14.07.2026 16:00', completedAt: null, 
        clientName: 'Աննա Հովհաննիսյան', clientPhone: '+374 91 555 444', address: 'Երևան, Մաշտոցի 4', 
        crew: [
            { empId: 'EMP-001', name: 'Արմեն Սարգսյան', role: 'lead', earnings: 0 } // Один мастер
        ],
        services: [{ name: 'Պլաստիկ պլինտուս', qty: 45, price: 600, done: true, doneAt: '15.07.2026 11:30' }, { name: 'Անկյունակների տեղադրում', qty: 10, price: 200, done: false, doneAt: null }] 
    },
    { 
        id: 'ORD-001', status: 'completed', isCommissionPaid: false, createdAt: '10.07.2026 09:00', acceptedAt: '10.07.2026 09:30', completedAt: '11.07.2026 14:00', 
        clientName: 'Մարիամ Պողոսյան', clientPhone: '+374 77 123 456', address: 'Երևան, Բաղրամյան 1', 
        crew: [
            { empId: 'EMP-001', name: 'Արմեն Սարգսյան', role: 'lead', earnings: 16000 } // Сумма уже зафиксирована
        ],
        services: [{ name: 'Փայտե դռան տեղադրում', qty: 1, price: 20000, done: true, doneAt: '11.07.2026 13:50' }] 
    }
];

let employeesData = [
    { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', typeLabel: 'Դռներ / Двери', phone: '+374 77 999 888', rating: 4.8, birthDate: '12.05.1990', address: 'Երևան, Կոմիտաս 45', accessKey: '123456', photo: '' },
    { id: 'EMP-004', status: 'active', name: 'Գոռ Վարդանյան', typeLabel: 'Ունիվերսալ / Универсал', phone: '+374 77 111 555', rating: 4.9, birthDate: '15.07.1992', address: 'Երևան, Տերյան 50', accessKey: '000000', photo: '' }
];

let loggedInEmpId = null;
let currentActiveOrderId = null;
let currentOrderFilter = 'new'; 
let currentNetToSplit = 0; // Временное хранение для калькулятора

// Обновленная функция подсчета
window.updateOrderCounts = function() {
    const emp = employeesData.find(e => e.id === loggedInEmpId);
    if (!emp) return;

    // Ищем заказы, где этот сотрудник числится в массиве crew
    const myOrders = ordersData.filter(o => o.crew && o.crew.some(c => c.empId === emp.id));
    
    const newCount = myOrders.filter(o => o.status === 'new').length;
    const progressCount = myOrders.filter(o => o.status === 'progress').length;
    const completedCount = myOrders.filter(o => o.status === 'completed').length;

    const elNew = document.getElementById('count-new');
    const elProg = document.getElementById('count-progress');
    const elComp = document.getElementById('count-completed');

    if (elNew) { elNew.innerText = newCount; elNew.style.display = newCount > 0 ? 'inline-flex' : 'none'; }
    if (elProg) { elProg.innerText = progressCount; elProg.style.display = progressCount > 0 ? 'inline-flex' : 'none'; }
    if (elComp) { elComp.innerText = completedCount; elComp.style.display = completedCount > 0 ? 'inline-flex' : 'none'; }
};

document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let htmlElem = document.documentElement;
            let currentTheme = htmlElem.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('emp_theme', newTheme);
        });
    }

    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            currentLang = tab.getAttribute('data-lang');
            localStorage.setItem('emp_app_lang', currentLang);
            applyLanguage();
            if (loggedInEmpId) window.showEmployeeDashboard(loggedInEmpId);
        });
    });

    window.showEmployeeDashboard = function(empId) {
        const emp = employeesData.find(e => e.id === empId);
        if (!emp) return;
        document.getElementById('screen-login').classList.remove('active');
        document.getElementById('screen-emp-orders').classList.add('active'); // Сразу на заказы для тестов
        document.getElementById('emp-bottom-nav').style.display = 'flex';
        
        window.renderEmployeeOrders();
        window.renderEmployeeProfile(emp);
        window.renderEmployeeFinance();
        window.updateOrderCounts(); 
    };

    window.logoutEmployee = function() {
        localStorage.removeItem('loggedInEmpId');
        loggedInEmpId = null;
        document.querySelectorAll('.emp-screen').forEach(scr => scr.classList.remove('active'));
        document.getElementById('screen-login').classList.add('active');
        document.getElementById('emp-bottom-nav').style.display = 'none';
    };

    window.filterEmpOrders = function(statusFilter, btnElement) {
        currentOrderFilter = statusFilter;
        document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
        window.renderEmployeeOrders();
    };

    window.renderEmployeeFinance = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        if (!emp) return;

        // Только те заказы, где мастер в бригаде
        const empOrders = ordersData.filter(o => o.crew && o.crew.some(c => c.empId === emp.id));
        let totalAllTime = 0, currentMonthTotal = 0, uncompletedTotal = 0, companyDebt = 0;

        empOrders.forEach(order => {
            let myRole = order.crew.find(c => c.empId === emp.id);
            let orderTotal = order.services.reduce((acc, s) => acc + (s.price * s.qty), 0);

            if (order.status === 'completed') {
                totalAllTime += myRole.earnings; // Берем готовую сумму из базы
                currentMonthTotal += myRole.earnings; // Упрощенно: считаем все за этот месяц

                // Долг компании висит только на Главном мастере
                if (!order.isCommissionPaid && myRole.role === 'lead') {
                    companyDebt += (orderTotal * COMPANY_FEE_PERCENT);
                }
            } else if (order.status === 'progress') {
                // Если процесс идет, показываем примерный потенциальный доход
                if (myRole.role === 'lead') {
                    uncompletedTotal += (orderTotal * (1 - COMPANY_FEE_PERCENT));
                }
            }
        });

        const financeSection = document.getElementById('screen-emp-finance');
        financeSection.innerHTML = `
            <h2 class="screen-title" data-i18n="title_emp_finance">Իմ <span>Ֆինանսները</span></h2>
            <div class="glass-panel" style="margin-top: 10px; background: rgba(255, 50, 50, 0.1); border: 1px solid rgba(255, 50, 50, 0.3);">
                <div style="font-size: 11px; font-weight: 800; color: #ff4444; text-transform: uppercase;">Долг компании (Только для Главных)</div>
                <div style="font-size: 28px; font-weight: 900; color: var(--text);">${companyDebt.toLocaleString()} ֏</div>
            </div>
            <div class="stats-grid" style="margin-top: 12px;">
                <div class="stat-box" style="background: rgba(35, 169, 91, 0.1);">
                    <div class="stat-value" style="color: var(--tree-light); font-size: 20px;">${currentMonthTotal.toLocaleString()} ֏</div>
                    <div class="stat-label">В этом месяце</div>
                </div>
                <div class="stat-box" style="background: rgba(255, 179, 71, 0.1);">
                    <div class="stat-value" style="color: #FFB347; font-size: 20px;">${uncompletedTotal.toLocaleString()} ֏</div>
                    <div class="stat-label">Ожидается</div>
                </div>
            </div>
            <div class="glass-panel" style="margin-top: 12px; text-align: center; padding: 16px;">
                <div style="font-size: 11px; font-weight: 800; color: var(--text-sec); text-transform: uppercase;">За все время</div>
                <div style="font-size: 24px; font-weight: 900; color: var(--text);">${totalAllTime.toLocaleString()} ֏</div>
            </div>
        `;
        applyLanguage();
    };

    window.renderEmployeeOrders = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        const list = document.getElementById('emp-personal-orders-list');
        if (!list || !emp) return;
        list.innerHTML = '';
        
        const empOrders = ordersData.filter(o => o.crew && o.crew.some(c => c.empId === emp.id) && o.status === currentOrderFilter);
        
        if (empOrders.length === 0) {
            list.innerHTML = `<div style="text-align:center; padding: 20px; font-size: 11px; color: var(--text-sec);">Заказов нет</div>`;
            return;
        }

        empOrders.forEach(order => {
            let statusClass = order.status === 'new' ? 'new' : (order.status === 'progress' ? 'pending' : '');
            let statusI18n = order.status === 'new' ? 'status_new' : (order.status === 'progress' ? 'status_pending' : 'status_success');
            let mainTitle = order.services.length > 0 ? order.services[0].name : "Услуга";
            
            // Если мы помощники, добавим небольшой бейдж для ясности
            let myRole = order.crew.find(c => c.empId === emp.id);
            let roleBadge = myRole.role === 'assistant' ? `<span style="font-size:9px; background:rgba(0,0,0,0.1); padding:2px 6px; border-radius:4px; margin-left:6px;">Помощник</span>` : '';

            list.innerHTML += `
                <div class="entity-card" onclick="openOrderModal('${order.id}')">
                    <div class="entity-header">
                        <span class="entity-id" style="font-size:13px; font-weight:900; color:var(--text);">${order.id} ${roleBadge}</span>
                        <span class="entity-status ${statusClass}" data-i18n="${statusI18n}"></span>
                    </div>
                    <div class="entity-title" style="margin-top: 4px; color: var(--tree-light);">${mainTitle}</div>
                    <div class="detail-block" style="background: rgba(255,255,255,0.4); margin-top: 10px; padding: 10px;">
                        <div style="font-size:12px; font-weight:700;">${order.clientName}</div>
                        <div style="font-size:11px; margin-top:8px;"><b>Адрес:</b> ${order.address}</div>
                    </div>
                </div>`;
        });
        applyLanguage();
    };

    window.openOrderModal = function(orderId) {
        currentActiveOrderId = orderId;
        const order = ordersData.find(o => o.id === orderId);
        if (!order) return;

        let myRoleObj = order.crew.find(c => c.empId === loggedInEmpId);
        let amILead = myRoleObj.role === 'lead';

        document.getElementById('modal-order-id').innerText = order.id;
        document.getElementById('modal-client-name').innerText = order.clientName;
        document.getElementById('modal-client-phone-text').innerText = order.clientPhone;
        document.getElementById('modal-client-address-text').innerText = order.address;

        let totalPrice = 0;
        const servList = document.getElementById('modal-services-list');
        servList.innerHTML = '';
        
        order.services.forEach((s, index) => {
            totalPrice += (s.price * s.qty);
            const isLocked = (order.status !== 'progress') ? 'disabled' : '';
            const checkedAttr = s.done ? 'checked' : '';
            const doneClass = s.done ? 'done' : '';

            servList.innerHTML += `
                <label class="service-item-static ${doneClass}">
                    <div style="display: flex; align-items: center; flex: 1;">
                        <input type="checkbox" class="service-checkbox" ${checkedAttr} ${isLocked} onchange="toggleServiceStatus('${order.id}', ${index}, this)">
                        <span class="serv-name-static">${s.name}</span>
                    </div>
                    <span class="serv-qty-static">${s.qty} հատ</span>
                </label>`;
        });

        document.getElementById('modal-fin-total').innerText = `${totalPrice.toLocaleString()} ֏`;

        const btnContainer = document.getElementById('modal-action-buttons');
        btnContainer.innerHTML = ''; 

        if (order.status === 'new') {
            if (amILead) {
                btnContainer.innerHTML = `<button type="button" class="submit-btn success" style="width: 100%; border-radius: 16px;" onclick="acceptOrder('${order.id}')" data-i18n="btn_accept_order">Принять</button>`;
            }
        } else if (order.status === 'progress') {
            if (amILead) {
                btnContainer.innerHTML = `<button type="button" id="btn-finish-order" class="submit-btn disabled" style="width: 100%; border-radius: 16px;" onclick="openSplitProfitModal('${order.id}')" data-i18n="btn_finish_order" disabled>Завершить заказ</button>`;
                window.checkIfOrderCanBeFinished(order.id); 
            } else {
                btnContainer.innerHTML = `<div style="text-align:center; font-size:11px; color:var(--text-sec); padding:10px;" data-i18n="msg_assistant_wait">Ожидание завершения главным мастером</div>`;
            }
        }

        btnContainer.innerHTML += `<button type="button" class="submit-btn" style="width: 100%; border-radius: 16px; background: transparent; border: 1px solid var(--text-sec); color: var(--text);" onclick="closeOrderModal()" data-i18n="btn_close">Закрыть</button>`;

        applyLanguage();
        document.getElementById('order-modal').classList.add('active');
    };

    window.closeOrderModal = function() {
        document.getElementById('order-modal').classList.remove('active');
    };

    window.toggleServiceStatus = function(orderId, serviceIndex, checkboxElem) {
        const order = ordersData.find(o => o.id === orderId);
        if (order && order.services[serviceIndex] && order.status === 'progress') {
            order.services[serviceIndex].done = checkboxElem.checked;
            const label = checkboxElem.closest('.service-item-static');
            checkboxElem.checked ? label.classList.add('done') : label.classList.remove('done');
            window.checkIfOrderCanBeFinished(orderId);
        }
    };

    window.checkIfOrderCanBeFinished = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        const finishBtn = document.getElementById('btn-finish-order');
        if (order && finishBtn) {
            const allServicesDone = order.services.every(s => s.done);
            if (allServicesDone) {
                finishBtn.disabled = false;
                finishBtn.classList.remove('disabled');
            } else {
                finishBtn.disabled = true;
                finishBtn.classList.add('disabled');
            }
        }
    };

    window.acceptOrder = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        if(order) {
            order.status = 'progress';
            closeOrderModal();
            window.updateOrderCounts();
            filterEmpOrders('progress', document.getElementById('tab-progress')); 
        }
    };

    // =========================================================================
    // НОВАЯ ЛОГИКА: КАЛЬКУЛЯТОР РАСПРЕДЕЛЕНИЯ ПРИБЫЛИ
    // =========================================================================
    
    window.openSplitProfitModal = function(orderId) {
        const order = ordersData.find(o => o.id === orderId);
        if(!order) return;

        let totalPrice = order.services.reduce((acc, s) => acc + (s.price * s.qty), 0);
        let companyFee = totalPrice * COMPANY_FEE_PERCENT;
        currentNetToSplit = totalPrice - companyFee;

        document.getElementById('split-total-amount').innerText = `${totalPrice.toLocaleString()} ֏`;
        document.getElementById('split-company-fee').innerText = `- ${companyFee.toLocaleString()} ֏`;
        document.getElementById('split-net-total').innerText = `${currentNetToSplit.toLocaleString()} ֏`;

        const astContainer = document.getElementById('split-assistants-container');
        astContainer.innerHTML = '';
        
        // Ищем всех помощников в этом заказе
        let assistants = order.crew.filter(c => c.role === 'assistant');

        if (assistants.length === 0) {
            // Главный работает один
            document.getElementById('split-lead-share').innerText = `${currentNetToSplit.toLocaleString()} ֏`;
        } else {
            // Генерируем инпуты для помощников
            assistants.forEach(ast => {
                let transLabel = translations['split_ast_share'][currentLang] || "Доля помощника";
                astContainer.innerHTML += `
                    <div class="input-group" style="margin-bottom:12px;">
                        <label class="input-label">${transLabel}: ${ast.name}</label>
                        <input type="number" class="glass-input ast-share-input" data-empid="${ast.empId}" value="0" min="0" max="${currentNetToSplit}" oninput="calcSplit()" style="font-size: 18px; text-align: center; color: #FFB347;">
                    </div>
                `;
            });
            window.calcSplit(); // Первичный расчет
        }

        applyLanguage();
        document.getElementById('split-profit-modal').classList.add('active');
    };

    window.calcSplit = function() {
        let inputs = document.querySelectorAll('.ast-share-input');
        let totalAstShare = 0;
        
        inputs.forEach(inp => {
            let val = Number(inp.value);
            if (val < 0) val = 0;
            totalAstShare += val;
        });

        let leadShare = currentNetToSplit - totalAstShare;
        
        // Защита от минуса
        const btnConfirm = document.getElementById('btn-confirm-split');
        if (leadShare < 0) {
            document.getElementById('split-lead-share').style.color = '#ff4444';
            btnConfirm.disabled = true;
            btnConfirm.classList.add('disabled');
        } else {
            document.getElementById('split-lead-share').style.color = '#00A3FF';
            btnConfirm.disabled = false;
            btnConfirm.classList.remove('disabled');
        }

        document.getElementById('split-lead-share').innerText = `${leadShare.toLocaleString()} ֏`;
    };

    window.closeSplitProfitModal = function() {
        document.getElementById('split-profit-modal').classList.remove('active');
    };

    // Финальное сохранение
    window.confirmFinishOrder = function() {
        const order = ordersData.find(o => o.id === currentActiveOrderId);
        if(!order) return;

        let inputs = document.querySelectorAll('.ast-share-input');
        let totalAstShare = 0;

        // Записываем долю каждому помощнику
        inputs.forEach(inp => {
            let empId = inp.getAttribute('data-empid');
            let share = Number(inp.value) || 0;
            let astRole = order.crew.find(c => c.empId === empId);
            if (astRole) astRole.earnings = share;
            totalAstShare += share;
        });

        // Записываем долю Главному
        let leadRole = order.crew.find(c => c.role === 'lead');
        if (leadRole) {
            leadRole.earnings = currentNetToSplit - totalAstShare;
        }

        // Меняем статус заказа
        order.status = 'completed';
        order.completedAt = getNowString();
        order.isCommissionPaid = false; 

        closeSplitProfitModal();
        closeOrderModal();
        
        if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
        
        window.updateOrderCounts();
        filterEmpOrders('completed', document.getElementById('tab-completed')); 
        window.renderEmployeeFinance(); 
    };

    // =========================================================================

    window.renderEmployeeProfile = function(emp) {
        const photoEl = document.getElementById('profile-photo-display');
        if(photoEl) photoEl.src = (emp.photo && emp.photo.trim() !== '') ? emp.photo : 'assets/tree.png';
        document.getElementById('profile-name').innerText = emp.name;
        document.getElementById('profile-phone').innerText = emp.phone;
    };

    window.previewProfilePhoto = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) { document.getElementById('edit-photo-preview').src = evt.target.result; }
            reader.readAsDataURL(file);
        }
    };

    window.openEmpSelfEdit = function() {
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        if(!emp) return;
        const editPhotoEl = document.getElementById('edit-photo-preview');
        if(editPhotoEl) editPhotoEl.src = (emp.photo && emp.photo.trim() !== '') ? emp.photo : 'assets/tree.png';
        document.getElementById('self-edit-name').value = emp.name;
        document.getElementById('self-edit-phone').value = emp.phone;
        document.getElementById('emp-self-edit-modal').classList.add('active');
    };

    window.closeEmpSelfEdit = function() { document.getElementById('emp-self-edit-modal').classList.remove('active'); };

    window.saveEmpSelfEdit = function(e) {
        e.preventDefault();
        const emp = employeesData.find(e => e.id === loggedInEmpId);
        if(!emp) return;
        
        const newPhotoSrc = document.getElementById('edit-photo-preview').src;
        if (newPhotoSrc && newPhotoSrc.startsWith('data:image')) emp.photo = newPhotoSrc;

        emp.name = document.getElementById('self-edit-name').value;
        emp.phone = document.getElementById('self-edit-phone').value;
        closeEmpSelfEdit();
        window.renderEmployeeProfile(emp);
    };

    // ВХОД
    loggedInEmpId = localStorage.getItem('loggedInEmpId');
    const pinInput = document.getElementById('emp-pin-input');
    
    if (pinInput) {
        pinInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            e.target.value = val;
            if (val.length === 6) {
                const emp = employeesData.find(emp => emp.accessKey === val && emp.status === 'active');
                if (emp) {
                    e.target.blur(); 
                    localStorage.setItem('loggedInEmpId', emp.id);
                    loggedInEmpId = emp.id;
                    e.target.value = '';
                    window.showEmployeeDashboard(emp.id);
                } else {
                    e.target.classList.add('error-shake');
                    setTimeout(() => { e.target.value = ''; e.target.classList.remove('error-shake'); e.target.focus(); }, 500);
                }
            }
        });
    }

    if (loggedInEmpId) window.showEmployeeDashboard(loggedInEmpId);
    applyLanguage();
});
