export const state = {
    currentLang: localStorage.getItem('admin_app_lang') || 'AM',
    adminTranslations: {
        "tab_dashboard": { "AM": "Գլխավոր", "RU": "Главная", "EN": "Dashboard" },
        "tab_orders": { "AM": "Պատվերներ", "RU": "Заказы", "EN": "Orders" },
        "tab_finance": { "AM": "Ֆինանսներ", "RU": "Финансы", "EN": "Finance" },
        "tab_employees": { "AM": "Աշխատակիցներ", "RU": "Работники", "EN": "Staff" },
        "tab_partners": { "AM": "Գործընկ.", "RU": "Партнеры", "EN": "Partners" },
        "tab_clients": { "AM": "Հաճախորդ", "RU": "Клиенты", "EN": "Clients" },
        "tab_management": { "AM": "Կառավար.", "RU": "Управл.", "EN": "Manage" },
        "lbl_new_requests": { "AM": "Նոր հայտեր", "RU": "Входящие запросы", "EN": "New Requests" },
        "sw_inc_masters": { "AM": "Նոր աշխատակիցներ", "RU": "Новые работники", "EN": "New Staff" },
        "lbl_new_partners": { "AM": "Նոր գործընկերներ", "RU": "Новые партнеры", "EN": "New Partners" },
        "lbl_active_partners": { "AM": "Ակտիվ ընկերություններ", "RU": "Активные компании", "EN": "Active Partners" },
        "lbl_recent_reviews": { "AM": "Վերջին կարծիքները", "RU": "Последние отзывы", "EN": "Recent Reviews" },
        "title_orders": { "AM": "Ակտիվ <span>պատվերներ</span>", "RU": "Активные <span>заказы</span>", "EN": "Active <span>Orders</span>" },
        "btn_accept_order": { "AM": "Ընդունել", "RU": "Принять", "EN": "Accept" },
        "btn_reject_order": { "AM": "Մերժել", "RU": "Отказать", "EN": "Reject" },
        "filter_all": { "AM": "Բոլորը", "RU": "Все", "EN": "All" },
        "filter_new": { "AM": "Նոր (Առանց վարպետի)", "RU": "Новые", "EN": "New" },
        "filter_progress": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "In Progress" },
        "filter_completed": { "AM": "Ավարտված", "RU": "Завершенные", "EN": "Completed" },
        "status_incoming": { "AM": "Սպասում է", "RU": "Ожидает", "EN": "Pending" },
        "status_new": { "AM": "Նոր", "RU": "Новый", "EN": "New" },
        "status_pending": { "AM": "Ընթացքի մեջ", "RU": "В обработке", "EN": "Pending" },
        "status_success": { "AM": "Ավարտված է", "RU": "Успешно", "EN": "Success" },
        "status_cancelled": { "AM": "Չեղարկված է", "RU": "Отменен", "EN": "Cancelled" },
        "btn_edit_order": { "AM": "Խմբագրել", "RU": "Изменить", "EN": "Edit" },
        "btn_cancel_order": { "AM": "Չեղարկել", "RU": "Отменить", "EN": "Cancel" },
        "lbl_client_details": { "AM": "Հաճախորդ", "RU": "Клиент", "EN": "Client" },
        "lbl_worker_details": { "AM": "Աշխատող", "RU": "Сотрудник", "EN": "Worker" },
        "lbl_client_name": { "AM": "Անուն Ազգանուն", "RU": "Имя Фамилия", "EN": "Full Name" },
        "lbl_services": { "AM": "Ծառայություններ", "RU": "Услуги", "EN": "Services" },
        "lbl_total": { "AM": "Ընդհանուր", "RU": "Итого", "EN": "Total" },
        "lbl_profit": { "AM": "Շահույթ", "RU": "Прибыль", "EN": "Profit" },
        "lbl_date_created": { "AM": "Ստեղծման ամսաթիվ", "RU": "Оформлен", "EN": "Created At" },
        "lbl_date_completed": { "AM": "Ավարտման ամսաթիվ", "RU": "Завершен", "EN": "Completed At" },
        "lbl_active_emps": { "AM": "Ակտիվ աշխատողներ", "RU": "Активные сотрудники", "EN": "Active Employees" },
        "cat_all": { "AM": "Բոլորը", "RU": "Все", "EN": "All" },
        "cat_doors": { "AM": "Դռներ", "RU": "Двери", "EN": "Doors" },
        "cat_electro": { "AM": "Էլեկտրիկներ", "RU": "Электрики", "EN": "Electricians" },
        "cat_universal": { "AM": "Ունիվերսալ", "RU": "Универсалы", "EN": "Universal" },
        "status_check": { "AM": "Ստուգում", "RU": "Проверка", "EN": "Checking" },
        "lbl_turnover": { "AM": "Շրջանառություն", "RU": "Оборот", "EN": "Turnover" },
        "lbl_income": { "AM": "Եկամուտ", "RU": "Доход", "EN": "Income" },
        "lbl_history": { "AM": "Պատմություն", "RU": "История", "EN": "History" },
        "lbl_manage_promo": { "AM": "Կառավարում", "RU": "Управление", "EN": "Manage" },
        "btn_save": { "AM": "Պահպանել", "RU": "Сохранить", "EN": "Save" },
        "lbl_all_clients": { "AM": "Բոլորը", "RU": "Все клиенты", "EN": "All clients" },
        "lbl_name": { "AM": "Անուն:", "RU": "Имя:", "EN": "Name:" },
        "lbl_phone": { "AM": "Հեռ.:", "RU": "Тел.:", "EN": "Phone:" },
        "lbl_address": { "AM": "Հասցե:", "RU": "Адрес:", "EN": "Address:" },
        "lbl_master": { "AM": "Գլխավոր:", "RU": "Мастер:", "EN": "Master:" }
    },
    orders: [
        { id: 'ORD-004', status: 'incoming', createdAt: '25.07.2026', completedAt: null, clientName: 'Արամ', clientPhone: '+374 98 123 789', address: 'Տերյան 50', worker: 'Չկա', workerPhone: '', services: [{ name: 'Էլեկտրիկ', qty: 1, price: 5000, done: false }], profit: 500 }, 
        { id: 'ORD-003', status: 'new', createdAt: '15.07.2026', completedAt: null, clientName: 'Գոռ Վարդանյան', clientPhone: '+374 95 188 038', address: 'Աբովյան 12', worker: 'Չկա', workerPhone: '', services: [{ name: 'Դռների տեղադրում (MDF)', qty: 2, price: 15000, done: false }], profit: 3000 }
    ],
    employees: [
        { id: 'EMP-001', status: 'active', name: 'Արմեն Սարգսյան', type: 'doors', phone: '+374 77 999 888', exp: '6', rating: 4.8, birthDate: '12.05.1990', address: 'Կոմիտաս 45', accessKey: '123456', companyDebt: -2500, workingDates: [] }, 
        { id: 'EMP-005', status: 'pending', name: 'Արամ Գևորգյան', type: 'electro', phone: '+374 98 000 111', exp: '2', rating: 0.0, birthDate: '05.08.1998', address: 'Րաֆֆու 10', accessKey: '', companyDebt: 0, workingDates: [] }
    ],
    clients: [
        { id: 'TR-1234', name: 'Արամ', phone: '+374 98 123 789', address: 'Տերյան 50', discount: 0 }
    ],
    services: [
        { id: 'srv1', name: 'Դռներ', price: 15000, icon: '<svg></svg>', status: 'active' }
    ],
    partners: [
        { id: 'p1', name: 'BuildingCorp', logo: '<svg></svg>' }
    ],
    reviews: [
        { id: 'REV-001', isNew: true, clientName: 'Աննա', masterName: 'Արմեն', rating: 5, text: 'Շատ գոհ եմ:', date: '22.07.2026' }
    ],
    cooperationRequests: [
        { id: 'COOP-REQ-01', company: 'BuildMaster LLC', contact: 'Արմեն', phone: '+374 99 112 233', text: 'Առաջարկում ենք 20% զեղչ:', date: '24.07.2026', status: 'pending' }
    ],
    dashViewedState: { orders: 0, masters: 0, partners: 0 }
};

export const utils = {
    generateOrderId: () => 'ORD-' + Math.floor(Math.random() * 1000),
    generateEmpId: () => 'EMP-' + Math.floor(Math.random() * 1000),
    getCurrentDateString: () => { 
        const d = new Date(); 
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`; 
    },
    getEmpTypeLabel: (type) => { 
        const key = 'cat_' + type; 
        if (state.adminTranslations[key] && state.adminTranslations[key][state.currentLang]) {
            return state.adminTranslations[key][state.currentLang]; 
        }
        return type; 
    }
};
