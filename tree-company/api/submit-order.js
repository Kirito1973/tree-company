export default async function handler(req, res) {
    // Разрешаем только POST-запросы от вашей формы
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Метод не разрешен' });
    }

    try {
        const orderData = req.body;
        
        // Временно выводим данные в панель логов Vercel
        // Позже здесь будет код для отправки данных в вашу админ-панель
        console.log('🔥 НОВЫЙ ЗАКАЗ УСЛУГ:', JSON.stringify(orderData, null, 2));

        // Отвечаем вашему сайту (main.js), что всё прошло успешно
        return res.status(200).json({ success: true, message: 'Заказ успешно принят сервером Vercel!' });
    } catch (error) {
        console.error('Ошибка сервера при обработке заказа:', error);
        return res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
}
