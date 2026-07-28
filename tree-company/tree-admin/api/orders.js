import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    // Настройка CORS и строгий запрет кэширования
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        // GET: Получить все заказы
        if (request.method === 'GET') {
            let ordersDict;
            
            try {
                // Пытаемся получить данные как Hash (Новый формат)
                ordersDict = await kv.hgetall('tree_orders');
            } catch (e) {
                // Если база ругается на WRONGTYPE, значит там лежит старый массив. Мигрируем!
                if (e.message.includes('WRONGTYPE')) {
                    const oldArray = await kv.get('tree_orders') || [];
                    ordersDict = {};
                    oldArray.forEach(o => ordersDict[o.id] = o);
                    
                    await kv.del('tree_orders'); // Удаляем старый ключ
                    if (oldArray.length > 0) {
                        await kv.hset('tree_orders', ordersDict); // Сохраняем в новом формате
                    }
                } else {
                    throw e;
                }
            }

            // Отдаем клиенту массив, чтобы не ломать логику фронтенда
            const orders = ordersDict ? Object.values(ordersDict) : [];
            return response.status(200).json(orders);
        }

        // POST: Точечное обновление одного заказа
        if (request.method === 'POST') {
            const { action, order, orderId } = request.body;

            // Удаление заказа
            if (action === 'delete' && orderId) {
                await kv.hdel('tree_orders', orderId);
                return response.status(200).json({ success: true });
            }

            // Создание или обновление одного заказа
            if (action === 'update' && order && order.id) {
                await kv.hset('tree_orders', { [order.id]: order });
                return response.status(200).json({ success: true, orderId: order.id });
            }

            return response.status(400).json({ error: 'Неверный формат данных (требуется action и order)' });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Orders Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
