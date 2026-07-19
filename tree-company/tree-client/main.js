// PWA Setup с жестким обходом кэша
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            reg.update(); 
        }).catch(err => console.error('Ошибка SW:', err));
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            window.location.reload();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. БАЗОВЫЕ ПЕРЕМЕННЫЕ
    let currentClientId = localStorage.getItem('tree_client_id');
    let currentLang = localStorage.getItem('app_lang') || 'AM';
    let rotationDegrees = 0;
    
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('app_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 2. СЛОВАРЬ ПЕРЕВОДОВ
    const translations = {
        "btn_main": { "AM": "Գլխավոր<br><span>Էջ</span>", "RU": "Главная<br><span>Страница</span>", "EN": "Main<br><span>Page</span>" },
        "contact_title": { "AM": "Կապվեք մեզ հետ Ձեզ հարմար եղանակով", "RU": "Свяжитесь с нами удобным способом", "EN": "Contact us conveniently" },
        "btn_job": { "AM": "Դառնալ<br><span>Աշխատակից</span>", "RU": "Стать<br><span>Сотрудником</span>", "EN": "Become<br><span>Employee</span>" },
        "promo_sub": { "AM": "ՄԵՆՔ ԳՆԱՀԱՏՈՒՄ ԵՆՔ ՁԵԶ", "RU": "МЫ ЦЕНИМ ВАС", "EN": "WE VALUE YOU" },
        "promo_title": { "AM": "Պատվիրեք հավելվածով և ստացեք <span class=\"promo-highlight\">10% զեղչ</span> հենց հիմա", "RU": "Закажите в приложении и получите <span class=\"promo-highlight\">скидку 10%</span>", "EN": "Order in the app and get a <span class=\"promo-highlight\">10% discount</span> now" },
        "title_services": { "AM": "Ծառայություններ", "RU": "Услуги", "EN": "Services" },
        "door_install": { "AM": "Դռների<br>տեղադրում", "RU": "Установка<br>дверей", "EN": "Door<br>Installation" },
        "baseboard_install": { "AM": "Պլինտուսների<br>տեղադրում", "RU": "Установка<br>плинтусов", "EN": "Baseboard<br>Installation" },
        "order_master": { "AM": "→ Պատվիրել վարպետ", "RU": "→ Вызвать мастера", "EN": "→ Order master" },
        "coming_soon": { "AM": "Շուտով<br>մեր էջում", "RU": "Скоро<br>на странице", "EN": "Coming<br>soon" },
        "wait": { "AM": "Սպասեք", "RU": "Ожидайте", "EN": "Wait" },
        "title_why": { "AM": "Ինչու՞ ընտրել մեզ", "RU": "Почему выбирают нас?", "EN": "Why choose us?" },
        "salary": { "AM": "Բարձր<br>վարձատրություն", "RU": "Высокая<br>оплата", "EN": "High<br>salary" },
        "schedule": { "AM": "Ճկուն<br>գրաֆիկ", "RU": "Гибкий<br>график", "EN": "Flexible<br>schedule" },
        "orders": { "AM": "Կայուն<br>պատվերներ", "RU": "Стабильные<br>заказы", "EN": "Stable<br>orders" },
        "title_vacancies": { "AM": "Թափուր հաստիքներ", "RU": "Вакансии", "EN": "Vacancies" },
        "your_prof": { "AM": "Ձեր<br>մասնագիտությունը", "RU": "Ваша<br>профессия", "EN": "Your<br>Profession" },
        "your_offer": { "AM": "Ձեր<br>առաջարկը", "RU": "Ваше<br>предложение", "EN": "Your<br>Offer" },
        "apply": { "AM": "→ Դիմել", "RU": "→ Подать заявку", "EN": "→ Apply" },
        "door_master": { "AM": "Դռան վարպետ", "RU": "Мастер по дверям", "EN": "Door Master" },
        "baseboard_master": { "AM": "Պլինտուսի վարպետ", "RU": "Мастер по плинтусам", "EN": "Baseboard Master" },
        "universal_master": { "AM": "Ունիվերսալ վարպետ", "RU": "Универсальный мастер", "EN": "Universal Master" },
        "assistant": { "AM": "Վարպետի օգնական", "RU": "Помощник мастера", "EN": "Master's Assistant" },
        "page_title": { "AM": "Պատվերի<br><span>ձևակերպում</span>", "RU": "Оформление<br><span>Заказа</span>", "EN": "Order<br><span>Placement</span>" },
        "lbl_service": { "AM": "Ընտրեք ծառայությունները՝", "RU": "Выберите услуги:", "EN": "Select services:" },
        "s1_name": { "AM": "Միջսենյակային դռների տեղադրում", "RU": "Установка межкомнатных дверей", "EN": "Interior door installation" },
        "s1_price": { "AM": "13,000 ֏ / հատ", "RU": "13,000 ֏ / шт", "EN": "13,000 ֏ / pc" },
        "s2_name": { "AM": "Ապամոնտաժում", "RU": "Демонтаж", "EN": "Dismantling" },
        "s2_price": { "AM": "3,500 ֏ / հատ", "RU": "3,500 ֏ / шт", "EN": "3,500 ֏ / pc" },
        "s3_name": { "AM": "Պետլիների փորում", "RU": "Врезка петель", "EN": "Hinge routing" },
        "s3_price": { "AM": "2,000 ֏ / հատ", "RU": "2,000 ֏ / шт", "EN": "2,000 ֏ / pc" },
        "s4_name": { "AM": "Փականի փորում", "RU": "Врезка замка", "EN": "Lock routing" },
        "s4_price": { "AM": "5,000 ֏ / հատ", "RU": "5,000 ֏ / шт", "EN": "5,000 ֏ / pc" },
        "s5_name": { "AM": "Երեսկալի և ավելացուցիչի տեղադրում", "RU": "Установка наличников и доборов", "EN": "Casing and extension installation" },
        "s5_price": { "AM": "7,500 ֏ / հատ", "RU": "7,500 ֏ / шт", "EN": "7,500 ֏ / pc" },
        "s6_name": { "AM": "Ջրից և խոնավությունից պաշտպանող մշակում", "RU": "Влагозащитная обработка", "EN": "Waterproofing treatment" },
        "s6_price": { "AM": "6,000 ֏ / հատ", "RU": "6,000 ֏ / шт", "EN": "6,000 ֏ / pc" },
        "s7_name": { "AM": "Այլ աշխատանք", "RU": "Другое (указать детали)", "EN": "Other (specify details)" },
        "s7_price": { "AM": "0 ֏", "RU": "0 ֏", "EN": "0 ֏" },
        "pl_other": { "AM": "Մանրամասնեք այստեղ...", "RU": "Опишите, что нужно сделать...", "EN": "Describe what needs to be done..." },
        "qty_item": { "AM": "Քանակ (հատ)", "RU": "Кол-во (шт)", "EN": "Qty (pcs)" },
        "qty_meter": { "AM": "Քանակ (մետր)", "RU": "Кол-во (м)", "EN": "Qty (m)" },
        "b1_name": { "AM": "ՄԴՖ պլինտուսի տեղադրում", "RU": "Установка МДФ плинтуса", "EN": "MDF baseboard installation" },
        "b1_price": { "AM": "1,700 ֏ / մ", "RU": "1,700 ֏ / м", "EN": "1,700 ֏ / m" },
        "b2_name": { "AM": "Պլաստիկ պլինտուսի տեղադրում", "RU": "Установка пластикового плинтуса", "EN": "Plastic baseboard installation" },
        "b2_price": { "AM": "1,000 ֏ / մ", "RU": "1,000 ֏ / м", "EN": "1,000 ֏ / m" },
        "b3_name": { "AM": "Դյուրոպոլիմեր պլինտուսի տեղադրում", "RU": "Установка дюрополимерного плинтуса", "EN": "Duropolymer baseboard installation" },
        "b3_price": { "AM": "2,000 ֏ / մ", "RU": "2,000 ֏ / м", "EN": "2,000 ֏ / m" },
        "b4_name": { "AM": "Հին պլինտուսի ապամոնտաժում", "RU": "Демонтаж старого плинтуса", "EN": "Old baseboard dismantling" },
        "b4_price": { "AM": "300 ֏ / մ", "RU": "300 ֏ / м", "EN": "300 ֏ / m" },
        "total_title": { "AM": "Ընդհանուր արժեքը՝", "RU": "Итоговая стоимость:", "EN": "Total Cost:" },
        "total_sub": { "AM": "* մոտավոր գին դետալների ճշգրտումից առաջ", "RU": "* это приблизительная сумма за услуги", "EN": "* approximate cost for services" },
        "lbl_address": { "AM": "Հասցե (Քաղաք, փողոց) *", "RU": "Адрес (Город, улица) *", "EN": "Address (City, street) *" },
        "pl_address": { "AM": "Օրինակ՝ Երևան, Աբովյան 1", "RU": "Например: Ереван, Абовяна 1", "EN": "Example: Yerevan, Abovyan 1" },
        "alert_error": { "AM": "Խնդրում ենք ընտրել գոնե մեկ ծառայություն:", "RU": "Пожалуйста, выберите хотя бы одну услугу.", "EN": "Please select at least one service." },
        "modal_msg": { "AM": "Մեր աշխատակիցները կկապվեն Ձեզ հետ", "RU": "Наши сотрудники свяжутся с вами", "EN": "Our staff will contact you" },
        "modal_close": { "AM": "Լավ", "RU": "ОК", "EN": "OK" },
        "lbl_name": { "AM": "Անուն Ազգանուն *", "RU": "Имя Фамилия *", "EN": "Full Name *" },
        "pl_name": { "AM": "Օրինակ՝ Արմեն Արմենյան", "RU": "Например: Армен Арменян", "EN": "Example: Armen Armenyan" },
        "lbl_year": { "AM": "Ծննդյան տարեթիվ *", "RU": "Год рождения *", "EN": "Birth Year *" },
        "pl_year": { "AM": "Օր.՝ 1990", "RU": "Напр.: 1990", "EN": "Ex: 1990" },
        "lbl_exp": { "AM": "Փորձ (տարի) *", "RU": "Опыт (лет) *", "EN": "Experience (years) *" },
        "pl_exp": { "AM": "Օր.՝ 3", "RU": "Напр.: 3", "EN": "Ex: 3" },
        "lbl_phone": { "AM": "Հեռախոսահամար *", "RU": "Номер телефона *", "EN": "Phone Number *" },
        "pl_phone": { "AM": "+374 00 000 000", "RU": "+374 00 000 000", "EN": "+374 00 000 000" },
        "lbl_prof": { "AM": "Ի՞նչ մասնագետ եք (կատարվող աշխատանքը) *", "RU": "Какой вы специалист? *", "EN": "What specialist are you? *" },
        "pl_prof": { "AM": "Օրինակ՝ Դռան և լամինատի վարպետ", "RU": "Например: Мастер по дверям", "EN": "Example: Door/laminate master" },
        "lbl_price": { "AM": "Ծառայությունների արժեքը (գներ) *", "RU": "Стоимость услуг (цены) *", "EN": "Service costs (prices) *" },
        "pl_price": { "AM": "Օրինակ՝ 5000-15000֏...", "RU": "Например: 5000-15000 драм...", "EN": "Example: 5000-15000 AMD..." },
        "lbl_schedule": { "AM": "Աշխատանքային գրաֆիկ *", "RU": "График работы *", "EN": "Work Schedule *" },
        "pl_schedule": { "AM": "Օրինակ՝ Ամեն օր 10:00-19:00...", "RU": "Например: Каждый день 10:00-19:00...", "EN": "Example: Every day 10:00-19:00..." },
        "lbl_emp": { "AM": "Զբաղվածություն և պայմաններ *", "RU": "Занятость и условия *", "EN": "Employment conditions *" },
        "opt_1": { "AM": "Ընտրեք տարբերակը...", "RU": "Выберите вариант...", "EN": "Select an option..." },
        "opt_2": { "AM": "Դիտարկում եմ որպես հիմնական աշխատանք (լրիվ դրույք)", "RU": "Как основная работа (полная занятость)", "EN": "As main job (full-time)" },
        "opt_3": { "AM": "Ունեմ այլ աշխատանք (համատեղություն / կես դրույք)", "RU": "У меня есть другая работа (по совместительству)", "EN": "I have another job (part-time)" },
        "opt_4": { "AM": "Այլ տարբերակ (կմանրամասնեմ ներքևում)", "RU": "Другой вариант (подробности ниже)", "EN": "Other option (details below)" },
        "lbl_msg": { "AM": "Այլ լրացուցիչ տեղեկություններ", "RU": "Дополнительная информация", "EN": "Additional info" },
        "pl_msg": { "AM": "...", "RU": "...", "EN": "..." },
        "submit": { "AM": "Ուղարկել հայտը", "RU": "Отправить", "EN": "Submit" },
        "alert_success": { "AM": "Շնորհակալություն: Ձեր հայտը հաջողությամբ ուղարկվեց:", "RU": "Спасибо! Ваша заявка успешно отправлена.", "EN": "Thank you! Your application was sent successfully." },
        
        "already_id": { "AM": "Արդեն ունե՞ք ID:", "RU": "Уже есть ID?", "EN": "Already have an ID?" },
        "modal_success_id": { "AM": "Ձեր անձնական ID-ն՝ (Պահպանեք այն)", "RU": "Ваш личный ID:", "EN": "Your personal ID:" },
        "cab_title": { "AM": "Իմ պատվերները", "RU": "Мои заказы", "EN": "My Orders" },
        "cab_empty": { "AM": "Այստեղ կցուցադրվեն Ձեր պատվերները", "RU": "Здесь будут отображаться ваши заказы", "EN": "Your orders will be displayed here" },
        "enter_id_title": { "AM": "Մուտքագրեք ID", "RU": "Введите ID", "EN": "Enter ID" },
        "enter_id_pl": { "AM": "Օր.՝ TR-1234", "RU": "Напр.: TR-1234", "EN": "Ex: TR-1234" },
        "btn_login": { "AM": "Մուտք", "RU": "Войти", "EN": "Login" },
        "logout_btn": { "AM": "Ելք", "RU": "Выйти", "EN": "Logout" },
        "acc_title": { "AM": "Անձնական<br><span>Էջ</span>", "RU": "Личный<br><span>Кабинет</span>", "EN": "Personal<br><span>Account</span>" },
        "acc_login_desc": { "AM": "Մուտքագրեք Ձեր ID-ն պատվերները տեսնելու համար", "RU": "Введите ваш ID, чтобы увидеть заказы", "EN": "Enter your ID to view orders" },
        "how_to_get_id": { "AM": "Ինչպե՞ս գրանցվել:", "RU": "Как зарегистрироваться?", "EN": "How to register?" },
        "no_reg_needed": { 
            "AM": "Գրանցվելու կարիք չկա: Ուղղակի ձևակերպեք Ձեր առաջին պատվերը, և համակարգը ավտոմատ կստեղծի Ձեր անձնական էջն ու կտրամադրի եզակի ID:", 
            "RU": "Вам не нужно регистрироваться! Просто оформите свой первый заказ, и система автоматически создаст ваш личный кабинет и выдаст уникальный ID для входа.", 
            "EN": "No need to register! Just place your first order, and the system will automatically create your personal account and provide a unique ID." 
        },
        
        "status_new": { "AM": "Նոր", "RU": "Новый", "EN": "New" },
        "status_progress": { "AM": "Ընթացքի մեջ", "RU": "В процессе", "EN": "In Progress" },
        "status_completed": { "AM": "Ավարտված", "RU": "Завершен", "EN": "Completed" },
        "rate_master": { "AM": "Գնահատեք վարպետի աշխատանքը:", "RU": "Оцените работу мастера:", "EN": "Rate the master's work:" },
        "thanks_rating": { "AM": "Շնորհակալություն գնահատականի համար:", "RU": "Спасибо за оценку!", "EN": "Thank you for rating!" },

        "nav_home": { "AM": "Գլխավոր", "RU": "Главная", "EN": "Home" },
        "nav_jobs": { "AM": "Աշխատանք", "RU": "Вакансии", "EN": "Jobs" },
        "nav_account": { "AM": "Իմ էջը", "RU": "Профиль", "EN": "Profile" }
    };

    // 3. ФУНКЦИИ ЛОГИКИ (Объявлены заранее во избежание ошибок)
    function renderCabinetOrders() {
        const list = document.getElementById('cabinet-orders-list');
        if (!list) return;

        let orders = JSON.parse(localStorage.getItem('tree_client_orders_' + currentClientId));
        
        // Добавляем тестовые заказы, если история пуста
        if (!orders || orders.length === 0) {
            orders = [
                { id: 'ORD-982', date: '10.07.2026', total: '15,000 ֏', status: 'completed', rating: 0 },
                { id: 'ORD-995', date: '18.07.2026', total: '8,500 ֏', status: 'progress', rating: 0 }
            ];
            if(currentClientId) {
                localStorage.setItem('tree_client_orders_' + currentClientId, JSON.stringify(orders));
            }
        }

        list.innerHTML = '';
        const sortedOrders = [...orders].reverse();

        sortedOrders.forEach((o) => {
            const realIndex = orders.findIndex(order => order.id === o.id);

            let statusColor = '#00A3FF'; 
            let statusKey = 'status_new';
            if (o.status === 'progress') { statusColor = '#FFB347'; statusKey = 'status_progress'; }
            if (o.status === 'completed') { statusColor = 'var(--tree-light)'; statusKey = 'status_completed'; }

            const statusText = translations[statusKey][currentLang] || o.status;

            let html = `
                <div class="cab-order-card">
                    <div class="cab-order-header">
                        <span class="cab-order-id">#${o.id}</span>
                        <span class="cab-order-date">${o.date}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                        <span style="font-weight: 900; font-size: 16px; color: var(--text);">${o.total}</span>
                        <span class="cab-order-status" style="color: ${statusColor}; background: ${statusColor}15; border-color: ${statusColor}40;">${statusText}</span>
                    </div>
            `;

            if (o.status === 'completed') {
                html += `<div class="cab-rating-block">`;
                
                if (o.rating > 0) {
                    const ratedText = currentLang === 'AM' ? 'Ձեր գնահատականը՝' : (currentLang === 'RU' ? 'Ваша оценка:' : 'Your rating:');
                    html += `<div style="font-size: 10px; color: var(--text-sec); margin-bottom: 6px; font-weight: 800;">${ratedText}</div>
                             <div class="star-rating rated">`;
                    for(let i=1; i<=5; i++) { html += `<span class="star ${i <= o.rating ? 'filled' : ''}">★</span>`; }
                    html += `</div>`;
                } else {
                    html += `<div style="font-size: 10px; font-weight: 800; color: var(--tree-light); margin-bottom: 6px;">${translations['rate_master'][currentLang]}</div>
                             <div class="star-rating interactive">`;
                    for(let i=5; i>=1; i--) { html += `<span class="star" onclick="rateOrder(${realIndex}, ${i})">★</span>`; }
                    html += `</div>`;
                }
                html += `</div>`;
            }

            html += `</div>`;
            list.innerHTML += html;
        });
    }

    function checkClientAuth() {
        const loginView = document.getElementById('account-login-view');
        const profileView = document.getElementById('account-profile-view');
        const idDisplay = document.getElementById('cabinet-id-display');

        const loginLinks = document.querySelectorAll('.id-login-link');
        if (currentClientId) {
            loginLinks.forEach(link => link.style.display = 'none');
        } else {
            loginLinks.forEach(link => link.style.display = 'inline-block');
        }

        if (loginView && profileView) {
            if (currentClientId) {
                loginView.style.display = 'none';
                profileView.style.display = 'block';
                if (idDisplay) idDisplay.innerText = currentClientId;
                renderCabinetOrders();
            } else {
                loginView.style.display = 'block';
                profileView.style.display = 'none';
            }
        }
    }

    function applyLanguage() {
        document.querySelectorAll('.lang-tab').forEach(tab => {
            if (tab.getAttribute('data-lang') === currentLang) {
                tab.classList.add('active');
                if(currentLangBtn) {
                    currentLangBtn.innerHTML = tab.innerHTML;
                }
            } else {
                tab.classList.remove('active');
            }
        });
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][currentLang]) {
                el.innerHTML = translations[key][currentLang];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key] && translations[key][currentLang]) {
                el.placeholder = translations[key][currentLang];
            }
        });

        const applyForm = document.getElementById('apply-form');
        if (applyForm) {
            const urlParams = new URLSearchParams(window.location.search);
            const profKey = urlParams.get('prof'); 
            const profInput = document.getElementById('profession');
            if (profKey && translations[profKey] && translations[profKey][currentLang] && profInput) {
                profInput.value = translations[profKey][currentLang];
            }
        }
        
        if (document.getElementById('account-page-marker')) {
            renderCabinetOrders();
        }
    }

    // 4. ПУБЛИЧНЫЕ ФУНКЦИИ (Для onClick в HTML)
    window.rateOrder = function(index, rating) {
        let orders = JSON.parse(localStorage.getItem('tree_client_orders_' + currentClientId));
        if(orders && orders[index]) {
            orders[index].rating = rating;
            localStorage.setItem('tree_client_orders_' + currentClientId, JSON.stringify(orders));
            renderCabinetOrders(); 
            if (navigator.vibrate) navigator.vibrate(50);
            setTimeout(() => { alert(translations['thanks_rating'][currentLang]); }, 50);
        }
    }

    window.loginClient = function() {
        const inputVal = document.getElementById('login-id-input').value.trim().toUpperCase();
        if (inputVal.startsWith('TR-') && inputVal.length >= 6) {
            localStorage.setItem('tree_client_id', inputVal);
            currentClientId = inputVal;
            checkClientAuth();
            if (navigator.vibrate) navigator.vibrate(50);
            
            if (!document.getElementById('account-page-marker')) {
                window.location.href = 'account.html';
            }
        } else {
            alert(currentLang === 'RU' ? 'Неверный формат ID' : 'Սխալ ID ձևաչափ (Неверный формат ID)');
        }
    };

    window.openLoginModal = function(e) {
        e.preventDefault();
        window.location.href = 'account.html';
    };

    window.logoutClient = function() {
        localStorage.removeItem('tree_client_id');
        currentClientId = null;
        checkClientAuth();
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const sunIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    function updateThemeIcon() {
        if (!themeIcon) return;
        const isDark = body.classList.contains('force-dark') || (!body.classList.contains('force-light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
    }

    // 5. ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ СОБЫТИЙ
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('force-dark');
    } else if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        body.classList.add('force-light');
    }
    
    updateThemeIcon();
    applyLanguage();
    checkClientAuth(); 

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            rotationDegrees += 360;
            themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
            let newTheme = 'light';
            if (body.classList.contains('force-dark')) {
                body.classList.remove('force-dark'); body.classList.add('force-light');
            } else if (body.classList.contains('force-light')) {
                body.classList.remove('force-light'); body.classList.add('force-dark'); newTheme = 'dark';
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    body.classList.add('force-light');
                } else {
                    body.classList.add('force-dark'); newTheme = 'dark';
                }
            }
            localStorage.setItem('app_theme', newTheme);
            setTimeout(updateThemeIcon, 150); 
        });
    }

    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentLang = tab.getAttribute('data-lang');
            localStorage.setItem('app_lang', currentLang);
            applyLanguage();
            if(langSwitcher) {
                langSwitcher.classList.remove('open');
            }
        });
    });

    // Обработчики форм
    const applyForm = document.getElementById('apply-form');
    if (applyForm) {
        applyForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                alert(translations['alert_success'][currentLang]);
                applyForm.reset();
            } catch (error) {
                alert('Տեղի է ունեցել սխալ: / Произошла ошибка.');
            }
        });
    }

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        function formatNumber(num) { return num.toLocaleString('en-US') + ' ֏'; }

        function calculateGrandTotal() {
            let grandTotal = 0;
            const items = document.querySelectorAll('.calc-item');
            
            items.forEach(item => {
                const checkbox = item.querySelector('.service-check');
                const subtotalEl = item.querySelector('.calc-subtotal');
                if (checkbox.checked) {
                    let price = parseInt(item.getAttribute('data-price'));
                    const qtyInput = item.querySelector('.qty-input');
                    const qty = qtyInput ? (qtyInput.value === '' ? 0 : parseInt(qtyInput.value)) : 1;
                    const subtotal = price * qty;
                    if (subtotalEl) subtotalEl.textContent = formatNumber(subtotal);
                    grandTotal += subtotal;
                } else {
                    if (subtotalEl) subtotalEl.textContent = '0 ֏';
                }
            });
            const gtEl = document.getElementById('grandTotal');
            if(gtEl) gtEl.textContent = formatNumber(grandTotal);
        }

        document.querySelectorAll('.calc-item').forEach(item => {
            const checkbox = item.querySelector('.service-check');
            const qtyInput = item.querySelector('.qty-input');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    item.classList.add('active');
                    if (qtyInput && qtyInput.value === '') qtyInput.value = 1;
                } else {
                    item.classList.remove('active');
                }
                calculateGrandTotal();
            });
            if (qtyInput) {
                qtyInput.addEventListener('input', () => {
                    if(qtyInput.value !== '' && qtyInput.value < 1) qtyInput.value = 1;
                    calculateGrandTotal();
                });
            }
        });

        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                let val = this.value;
                if (!val.startsWith('+374 ')) { this.value = '+374 '; } else {
                    let restOfNumber = val.substring(5).replace(/[^\d\s]/g, '');
                    this.value = '+374 ' + restOfNumber;
                }
            });
            phoneInput.addEventListener('focus', function() {
                if (this.value === '' || this.value === '+374' || this.value === '+374 ') this.value = '+374 ';
            });
        }

        const modal = document.getElementById('success-modal');
        const closeModalBtn = document.getElementById('modal-close-btn');

        orderForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const checkedServices = document.querySelectorAll('.service-check:checked');
            if(checkedServices.length === 0) {
                alert(translations['alert_error'][currentLang]);
                return;
            }

            if (!currentClientId) {
                currentClientId = 'TR-' + Math.floor(1000 + Math.random() * 9000);
                localStorage.setItem('tree_client_id', currentClientId);
                checkClientAuth();
            }

            const now = new Date();
            const dateStr = String(now.getDate()).padStart(2, '0') + '.' + 
                            String(now.getMonth() + 1).padStart(2, '0') + '.' + 
                            now.getFullYear();
            const grandTotal = document.getElementById('grandTotal') ? document.getElementById('grandTotal').textContent : '0 ֏';

            let orders = JSON.parse(localStorage.getItem('tree_client_orders_' + currentClientId)) || [];
            orders.push({
                id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
                date: dateStr,
                total: grandTotal,
                status: 'new',
                rating: 0
            });
            localStorage.setItem('tree_client_orders_' + currentClientId, JSON.stringify(orders));

            const idContainer = document.getElementById('success-id-container');
            const idDisplay = document.getElementById('success-id-display');
            if (idContainer && idDisplay) {
                idDisplay.innerText = currentClientId;
                idContainer.style.display = 'block';
            }

            if(modal) modal.classList.add('open');
            if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
            
            orderForm.reset();
            document.querySelectorAll('.calc-item.active').forEach(item => {
                item.classList.remove('active');
                const subtotalEl = item.querySelector('.calc-subtotal');
                if (subtotalEl) subtotalEl.textContent = '0 ֏';
            });
            if(phoneInput) phoneInput.value = '+374 ';
            calculateGrandTotal();

            if(closeModalBtn) {
                closeModalBtn.onclick = () => {
                    modal.classList.remove('open');
                };
            }
        });
    }
});
