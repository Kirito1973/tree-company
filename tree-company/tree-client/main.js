// Регистрация Service Worker для PWA (УСИЛЕННОЕ ОБНОВЛЕНИЕ)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js?v=6.0')
            .then(reg => {
                reg.update();
            })
            .catch(err => console.error('Ошибка регистрации SW:', err));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ТЕМА ---
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElem = document.documentElement; 
    let rotationDegrees = 0;

    const sunIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    function updateThemeIcon() {
        if (!themeIcon) return;
        const isDark = htmlElem.classList.contains('force-dark') || 
                       (!htmlElem.classList.contains('force-light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
    }
    updateThemeIcon();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            rotationDegrees += 360;
            themeIcon.style.transform = `rotate(${rotationDegrees}deg)`;
            let newTheme = 'light';
            if (htmlElem.classList.contains('force-dark')) {
                htmlElem.classList.remove('force-dark');
                htmlElem.classList.add('force-light');
            } else if (htmlElem.classList.contains('force-light')) {
                htmlElem.classList.remove('force-light');
                htmlElem.classList.add('force-dark');
                newTheme = 'dark';
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    htmlElem.classList.add('force-light');
                } else {
                    htmlElem.classList.add('force-dark');
                    newTheme = 'dark';
                }
            }
            localStorage.setItem('app_theme', newTheme);
            setTimeout(updateThemeIcon, 150); 
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('app_theme')) updateThemeIcon();
    });

    // --- 2. МУЛЬТИЯЗЫЧНОСТЬ ---
    let currentLang = localStorage.getItem('app_lang') || 'AM';
    const langSwitcher = document.getElementById('lang-switcher');
    const currentLangBtn = document.getElementById('current-lang-btn');

    if (currentLangBtn && langSwitcher) {
        currentLangBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('open');
        });
    }
    document.addEventListener('click', (e) => {
        if (langSwitcher && !langSwitcher.contains(e.target)) langSwitcher.classList.remove('open');
    });

    const translations = {
        "contact_title": { "AM": "Կապվեք մեզ հետ Ձեզ հարմար եղանակով", "RU": "Свяжитесь с нами удобным способом", "EN": "Contact us conveniently" },
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
        "b4_name": { "AM": "Հին պլինտուսի ապամոնտաժում", "RU": "Демонтаж ста старого плинтуса", "EN": "Old baseboard dismantling" },
        "b4_price": { "AM": "300 ֏ / մ", "RU": "300 ֏ / м", "EN": "300 ֏ / m" },
        "total_title": { "AM": "Ընդհանուր արժեքը՝", "RU": "Итоговая стоимость:", "EN": "Total Cost:" },
        "total_sub": { "AM": "* մոտավոր գին դետալների ճշգրտումից առաջ", "RU": "* это приблизительная сумма за услуги", "EN": "* this is an approximate cost for services" },
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
        
        "lbl_prof": { "AM": "Ի՞նչ մասնագետ եք *", "RU": "Какой вы специалист? *", "EN": "What specialist are you? *" },
        "opt_prof_other": { "AM": "Այլ (նշել)", "RU": "Другое (указать)", "EN": "Other (specify)" },
        "pl_custom_prof": { "AM": "Նշեք մասնագիտությունը...", "RU": "Напишите вашу профессию...", "EN": "Specify your profession..." },
        "page_jobs_title": { "AM": "Համագործակցություն", "RU": "Сотрудничество", "EN": "Cooperation" },
        "btn_become_employee": { "AM": "Դառնալ աշխատակից", "RU": "Стать сотрудником", "EN": "Become an employee" },
        "desc_employee": { "AM": "Լրացրեք հայտը մեր թիմին միանալու համար", "RU": "Заполните анкету для присоединения к команде", "EN": "Fill out the form to join our team" },
        "btn_become_partner": { "AM": "Սկսել համագործակցություն", "RU": "Сотрудничать с нами", "EN": "Cooperate with us" },
        "desc_partner": { "AM": "Բիզնես առաջարկներ և B2B համագործակցություն", "RU": "Бизнес-предложения и B2B сотрудничество", "EN": "Business offers and B2B cooperation" },

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
        "submit": { "AM": "Ուղարկել", "RU": "Отправить", "EN": "Submit" },
        "alert_success": { "AM": "Շնորհակալություն: Ձեր հայտը հաջողությամբ ուղարկվեց:", "RU": "Спасибо! Ваша заявка успешно отправлена.", "EN": "Thank you! Your application was sent successfully." },
        
        "auth_title": { "AM": "Մուտքագրեք Ձեր ID-ն", "RU": "Введите ваш ID", "EN": "Enter your ID" },
        "auth_placeholder": { "AM": "Օր.՝ TR-1234", "RU": "Напр.: TR-1234", "EN": "Ex: TR-1234" },
        "auth_btn": { "AM": "Մուտք", "RU": "Войти", "EN": "Login" },
        "auth_err": { "AM": "Սխալ ID", "RU": "Неверный ID", "EN": "Invalid ID" },
        "order_success_id": { "AM": "Ձեր մուտքանունը (ID)՝ պահպանեք այն", "RU": "Ваш ключ входа (ID): сохраните его", "EN": "Your login key (ID): save it" },

        "nav_home": { "AM": "Գլխավոր", "RU": "Главная", "EN": "Home" },
        "nav_orders": { "AM": "Պատվերներ", "RU": "Заказы", "EN": "Orders" },
        "nav_jobs": { "AM": "Համագործ.", "RU": "Сотрудн-во", "EN": "Cooperate" },
        "nav_cabinet": { "AM": "Անձն. էջ", "RU": "Кабинет", "EN": "Cabinet" },

        "rating_title": { "AM": "Մեր վարկանիշը", "RU": "Наш рейтинг", "EN": "Our Rating" },
        "rating_sub": { "AM": "հիմնված 124 կարծիքի վրա", "RU": "на основе 124 отзывов", "EN": "based on 124 reviews" },
        "reviews_title": { "AM": "Կարծիքներ", "RU": "Отзывы", "EN": "Reviews" },
        "coop_title": { "AM": "Համագործակցություն", "RU": "Сотрудничество", "EN": "Cooperation" },
        "coop_banner_sub": { "AM": "ԲԻԶՆԵՍԻ ՀԱՄԱՐ", "RU": "ДЛЯ БИЗНЕСА", "EN": "FOR BUSINESS" },
        "coop_banner_title": { "AM": "Դարձեք մեր գործընկերը", "RU": "Стать нашим бизнес-партнером", "EN": "Become our business partner" },
        "coop_name": { "AM": "Ընկերության կամ անձի անուն *", "RU": "Название компании или имя *", "EN": "Company or Person Name *" },
        "coop_desc": { "AM": "Համագործակցության նկարագրություն *", "RU": "Описание сотрудничества *", "EN": "Cooperation description *" },

        "cab_title": { "AM": "Անձնական<br><span>Էջ</span>", "RU": "Личный<br><span>Кабинет</span>", "EN": "Personal<br><span>Dashboard</span>" },
        "cab_greeting": { "AM": "Բարև,", "RU": "Здравствуйте,", "EN": "Hello," },
        "cab_id": { "AM": "Ձեր բանալին (ID)՝", "RU": "Ваш ключ входа (ID):", "EN": "Your login key (ID):" },
        "cab_new_order": { "AM": "Նոր պատվեր ստեղծել", "RU": "Создать новый заказ", "EN": "Create New Order" },
        "cab_history_title": { "AM": "Պատվերների պատմություն", "RU": "История заказов", "EN": "Order History" },
        "btn_accept_work": { "AM": "Ընդունել աշխատանքը", "RU": "Принять работу", "EN": "Accept Work" },
        "cab_rate": { "AM": "Գնահատել որակը", "RU": "Оценить качество", "EN": "Rate Quality" },
        "cab_logout": { "AM": "Դուրս գալ", "RU": "Выйти из аккаунта", "EN": "Log Out" },
        "status_in_progress": { "AM": "<span style=\"display:block; width:8px; height:8px; background:#FFB347; border-radius:50%; animation: pulse-dot 2s infinite;\"></span> Ընթացքի մեջ է", "RU": "<span style=\"display:block; width:8px; height:8px; background:#FFB347; border-radius:50%; animation: pulse-dot 2s infinite;\"></span> В процессе", "EN": "<span style=\"display:block; width:8px; height:8px; background:#FFB347; border-radius:50%; animation: pulse-dot 2s infinite;\"></span> In progress" },
        "status_completed": { "AM": "Ավարտված է", "RU": "Завершено", "EN": "Completed" },
        "master_name_1": { "AM": "Արամ Խաչատրյան", "RU": "Арам Хачатрян", "EN": "Aram Khachatryan" },
        "master_prof_1": { "AM": "Դռների վարպետ", "RU": "Мастер по дверям", "EN": "Door Master" },
        "s1_qty": { "AM": "Միջսենյակային դռների տեղադրում (2 հատ)", "RU": "Установка межкомнатных дверей (2 шт)", "EN": "Interior door installation (2 pcs)" },
        "s2_qty": { "AM": "Ապամոնտաժում (1 հատ)", "RU": "Демонтаж (1 шт)", "EN": "Dismantling (1 pc)" },
        "s5_qty": { "AM": "Երեսկալի և ավելացուցիչի տեղադրում", "RU": "Установка наличников и доборов", "EN": "Casing and extension installation" },
        "cab_total_paid": { "AM": "Ընդհանուր գումարը՝", "RU": "Итоговая сумма:", "EN": "Total amount:" },
        "cab_rate_master": { "AM": "Գնահատեք վարպետի աշխատանքը", "RU": "Оцените работу мастера", "EN": "Rate the master's work" },
        "cab_review_pl": { "AM": "Թողեք Ձեր կարծիքը...", "RU": "Оставьте ваш отзыв...", "EN": "Leave your review..." },
        "cab_review_btn": { "AM": "Ուղարկել կարծիքը", "RU": "Отправить отзыв", "EN": "Submit review" },
        "review_thanks": { "AM": "Շնորհակալություն գնահատականի համար:", "RU": "Спасибо за вашу оценку!", "EN": "Thank you for your rating!" },
        "fallback_name": { "AM": "Հարգելի հաճախորդ", "RU": "Уважаемый клиент", "EN": "Dear customer" }
    };
    
    function applyLanguage() {
        document.querySelectorAll('.lang-tab').forEach(tab => {
            if (tab.getAttribute('data-lang') === currentLang) {
                tab.classList.add('active');
                if(currentLangBtn) currentLangBtn.innerHTML = tab.innerHTML;
            } else {
                tab.classList.remove('active');
            }
        });
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][currentLang]) el.innerHTML = translations[key][currentLang];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key] && translations[key][currentLang]) el.placeholder = translations[key][currentLang];
        });
    }

    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentLang = tab.getAttribute('data-lang');
            localStorage.setItem('app_lang', currentLang);
            applyLanguage();
            if(langSwitcher) langSwitcher.classList.remove('open');
        });
    });

    applyLanguage();

    // --- 3. НИЖНЕЕ МЕНЮ И ЛОГИКА АВТОРИЗАЦИИ ---
    const currentPath = window.location.pathname;
    if (currentPath.includes('jobs.html') || currentPath.includes('form.html') || currentPath.includes('cooperation.html')) {
        document.getElementById('nav-jobs')?.classList.add('active');
    } else if (currentPath.includes('cabinet.html')) {
        document.getElementById('nav-cabinet')?.classList.add('active');
    } else if (currentPath.includes('orders.html') || currentPath.includes('order-')) {
        document.getElementById('nav-orders')?.classList.add('active');
    } else {
        document.getElementById('nav-home')?.classList.add('active');
    }

    const navCabinetBtn = document.getElementById('nav-cabinet');
    if(navCabinetBtn) {
        navCabinetBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            if(localStorage.getItem('tree_client_id')) window.location.href = 'cabinet.html';
            else {
                const authModal = document.getElementById('auth-modal');
                if(authModal) authModal.classList.add('open');
            }
        });
    }

    if(!document.getElementById('auth-modal')) {
        const authModalHTML = `
        <div class="modal-overlay" id="auth-modal">
            <div class="modal-content">
                <span class="modal-icon"><svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
                <div class="modal-text" data-i18n="auth_title">Մուտքագրեք Ձեր ID-ն</div>
                <div class="input-group" style="margin: 20px 0;">
                    <input type="text" id="auth-id-input" class="glass-input" data-i18n-placeholder="auth_placeholder" placeholder="Օր.՝ TR-1234" style="text-align: center; text-transform: uppercase;">
                </div>
                <button type="button" class="submit-btn" id="auth-submit-btn" data-i18n="auth_btn">Մուտք</button>
                <button type="button" class="submit-btn modal-close-btn" id="auth-close-btn" style="background: transparent; color: var(--text-sec); box-shadow: none; margin-top: 10px; padding: 12px;" data-i18n="modal_close">Փակել</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', authModalHTML);
        applyLanguage(); 
        
        document.getElementById('auth-close-btn').addEventListener('click', () => { document.getElementById('auth-modal').classList.remove('open'); });

        document.getElementById('auth-submit-btn').addEventListener('click', () => {
            const val = document.getElementById('auth-id-input').value.trim().toUpperCase();
            if(val.length > 3) {
                localStorage.setItem('tree_client_id', val);
                document.getElementById('auth-modal').classList.remove('open');
                window.location.href = 'cabinet.html';
            } else {
                alert(translations['auth_err'][currentLang]);
            }
        });
    }

    // --- 4. ЛОГИКА КАБИНЕТА (ОЦЕНКА И ПРИНЯТИЕ РАБОТЫ) ---
    if (window.location.pathname.includes('cabinet.html')) {
        const savedId = localStorage.getItem('tree_client_id');
        if (!savedId) { window.location.replace('index.html'); } 
        else {
            const displayId = document.getElementById('client-id-display');
            if (displayId) displayId.textContent = savedId;
            const displayName = document.getElementById('client-name-display');
            if (displayName) {
                const savedName = localStorage.getItem('tree_client_name');
                displayName.textContent = savedName ? savedName : translations['fallback_name'][currentLang];
            }
        }

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('tree_client_id');
                localStorage.removeItem('tree_client_name');
                localStorage.removeItem('tree_client_phone');
                localStorage.removeItem('tree_client_address');
                window.location.replace('index.html');     
            });
        }

        const acceptBtns = document.querySelectorAll('.accept-work-btn');
        acceptBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.form-card');
                this.style.display = 'none'; 
                
                const statusEl = card.querySelector('.order-status');
                if(statusEl) {
                    statusEl.innerHTML = `<span style="display:block; width:8px; height:8px; background:var(--tree-light); border-radius:50%;"></span> ${translations['status_completed'][currentLang]}`;
                    statusEl.style.color = 'var(--tree-light)';
                }

                const reviewBox = card.querySelector('.review-box');
                if (reviewBox) reviewBox.style.display = 'flex';
            });
        });

        document.querySelectorAll('.star-rating').forEach(ratingContainer => {
            const stars = ratingContainer.querySelectorAll('.star');
            const reviewInput = ratingContainer.parentElement.querySelector('.review-input');
            const reviewSubmit = ratingContainer.parentElement.querySelector('.review-submit');

            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const val = parseInt(this.getAttribute('data-value'));
                    stars.forEach(s => {
                        if(parseInt(s.getAttribute('data-value')) <= val) {
                            s.classList.add('active');
                            s.style.color = '#FFB347';
                        } else {
                            s.classList.remove('active');
                            s.style.color = 'rgba(128,128,128,0.3)';
                        }
                    });
                    if(reviewInput) reviewInput.style.display = 'block';
                    if(reviewSubmit) reviewSubmit.style.display = 'block';
                });
            });

            if(reviewSubmit) {
                reviewSubmit.addEventListener('click', () => {
                    ratingContainer.parentElement.innerHTML = `<div style="color: var(--tree-light); font-size: 12px; font-weight: 800; text-align: center; padding: 20px 0;">${translations['review_thanks'][currentLang]}</div>`;
                });
            }
        });
    }

    // --- 5. ФОРМЫ (ПРЕДЗАПОЛНЕНИЕ, КАЛЬКУЛЯТОР, ОТПРАВКА) ---
    if(localStorage.getItem('tree_client_id')) {
        const nameInput = document.getElementById('client_name');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        if (nameInput && localStorage.getItem('tree_client_name')) nameInput.value = localStorage.getItem('tree_client_name');
        if (phoneInput && localStorage.getItem('tree_client_phone')) phoneInput.value = localStorage.getItem('tree_client_phone');
        if (addressInput && localStorage.getItem('tree_client_address')) addressInput.value = localStorage.getItem('tree_client_address');
    }

    const profSelect = document.getElementById('profession');
    const customProfInput = document.getElementById('custom_profession');
    if (profSelect && customProfInput) {
        profSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                customProfInput.style.display = 'block';
                customProfInput.required = true;
            } else {
                customProfInput.style.display = 'none';
                customProfInput.required = false;
                customProfInput.value = '';
            }
        });
    }

    const applyForm = document.getElementById('apply-form');
    if (applyForm) {
        applyForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            alert(translations['alert_success'][currentLang]);
            applyForm.reset();
            if (customProfInput) customProfInput.style.display = 'none';
        });
    }

    const coopForm = document.getElementById('coop-form');
    if (coopForm) {
        coopForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            alert(translations['alert_success'][currentLang]);
            coopForm.reset();
        });
    }

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        function formatNumber(num) { return num.toLocaleString('en-US') + ' ֏'; }

        function calculateGrandTotal() {
            let grandTotal = 0;
            document.querySelectorAll('.calc-item').forEach(item => {
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
                if (!val.startsWith('+374 ')) this.value = '+374 ';
                else this.value = '+374 ' + val.substring(5).replace(/[^\d\s]/g, '');
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
            if(checkedServices.length === 0) { alert(translations['alert_error'][currentLang]); return; }

            const grandTotal = document.getElementById('grandTotal') ? document.getElementById('grandTotal').textContent : '0 ֏';
            let savedClientId = localStorage.getItem('tree_client_id');
            const clientNameVal = document.getElementById('client_name') ? document.getElementById('client_name').value : '';
            const phoneVal = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const addressVal = document.getElementById('address') ? document.getElementById('address').value : '';

            if(!savedClientId) {
                savedClientId = 'TR-' + Math.random().toString(36).substr(2, 4).toUpperCase();
                localStorage.setItem('tree_client_id', savedClientId);
                localStorage.setItem('tree_client_name', clientNameVal);
                localStorage.setItem('tree_client_phone', phoneVal);
                localStorage.setItem('tree_client_address', addressVal);
            }
            
            const msgEl = document.getElementById('modal-id-msg');
            if(msgEl) msgEl.innerHTML = `<div style="margin-top:16px; font-size:10px; color:var(--text-sec);" data-i18n="order_success_id">${translations['order_success_id'][currentLang]}</div><div class="modal-id-highlight">${savedClientId}</div>`;
            
            if(modal) modal.classList.add('open');
            orderForm.reset();
            document.querySelectorAll('.calc-item.active').forEach(item => {
                item.classList.remove('active');
                if (item.querySelector('.calc-subtotal')) item.querySelector('.calc-subtotal').textContent = '0 ֏';
            });
            
            if(localStorage.getItem('tree_client_id')) {
                if (document.getElementById('client_name')) document.getElementById('client_name').value = localStorage.getItem('tree_client_name');
                if (document.getElementById('phone')) document.getElementById('phone').value = localStorage.getItem('tree_client_phone');
                if (document.getElementById('address')) document.getElementById('address').value = localStorage.getItem('tree_client_address');
            }
            calculateGrandTotal();
            
            if(closeModalBtn) closeModalBtn.onclick = () => { modal.classList.remove('open'); };
        });
    }
});
