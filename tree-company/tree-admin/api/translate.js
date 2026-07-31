export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Метод не разрешен.' });

    try {
        const { text, currentLang } = req.body;

        if (!text || !currentLang) {
            return res.status(400).json({ success: false, message: 'Не передан текст или исходный язык' });
        }

        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'Ключ API не найден на сервере' });
        }

        const allLangs = ['am', 'ru', 'en'];
        const targetLangs = allLangs.filter(lang => lang !== currentLang);
        const translations = { [currentLang]: text };

        for (const lang of targetLangs) {
            const googleApiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
            const response = await fetch(googleApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    q: text,
                    source: currentLang,
                    target: lang,
                    format: 'text'
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            translations[lang] = data.data.translations[0].translatedText;
        }

        return res.status(200).json({ success: true, translations });
    } catch (error) {
        console.error('Ошибка перевода:', error);
        return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
}
