export default async function handler(req, res) {
    // 1. Разрешаем только POST-запросы (отправка данных на перевод)
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Метод не разрешен. Используйте POST.' });
    }

    try {
        // 2. Получаем текст из запроса (sourceLang по умолчанию 'am' - армянский)
        const { text, sourceLang = 'am' } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, message: 'Не передан текст для перевода' });
        }

        // 3. Получаем ключ API из скрытых настроек Vercel
        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
        if (!apiKey) {
            console.error('Ключ API не найден в настройках Vercel!');
            return res.status(500).json({ success: false, message: 'Ошибка конфигурации сервера' });
        }

        // Языки, на которые нужно перевести (английский и русский)
        const targetLangs = ['en', 'ru'];
        
        // Объект, в который мы сложим все три версии (сразу записываем оригинал)
        const translations = { 
            [sourceLang]: text 
        };

        // 4. Запускаем цикл перевода для каждого языка
        for (const lang of targetLangs) {
            const googleApiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
            
            const response = await fetch(googleApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: lang,
                    format: 'text' // Переводим как обычный текст, без HTML-тегов
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            // Добавляем готовый перевод в наш объект
            translations[lang] = data.data.translations[0].translatedText;
        }

        // 5. Возвращаем успешный ответ с готовым JSON на трех языках
        return res.status(200).json({ 
            success: true, 
            translations: translations 
        });

    } catch (error) {
        console.error('Ошибка при переводе текста:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Внутренняя ошибка сервера при переводе' 
        });
    }
}
