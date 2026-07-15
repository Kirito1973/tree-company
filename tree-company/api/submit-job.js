export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Метод не разрешен' });
    }

    try {
        const jobData = req.body;
        
        // Временно выводим данные в панель логов Vercel
        console.log('💼 НОВОЕ РЕЗЮМЕ СОТРУДНИКА:', JSON.stringify(jobData, null, 2));

        return res.status(200).json({ success: true, message: 'Резюме успешно принято сервером Vercel!' });
    } catch (error) {
        console.error('Ошибка сервера при обработке резюме:', error);
        return res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
}
