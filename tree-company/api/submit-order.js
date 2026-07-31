import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Метод не разрешен' });

    try {
        const orderData = req.body;
        
        // Генерируем уникальный ID для заказа и ставим статус "Входящий"
        const uniqueId = 'ord_' + Math.random().toString(36).substr(2, 9);
        orderData.id = uniqueId;
        orderData.status = 'incoming';
        orderData.date = new Date().toISOString();

        // Записываем заказ в Redis (к другим заказам)
        await kv.hset('tree_orders', { [uniqueId]: orderData });

        return res.status(200).json({ success: true, message: 'Заказ успешно принят и сохранен!' });
    } catch (error) {
        console.error('Ошибка при сохранении заказа:', error);
        return res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
}
