import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    // 1. Ищем ИМЕННО админскую печеньку
    const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('tree_admin_token='))?.split('=')[1];

    // 2. Достаем сессию из базы
    const sessionData = token ? await kv.get(`admin_session_${token}`) : null;

    // 3. Если сессии нет — блокируем намертво
    if (!token || !sessionData) {
        return res.status(401).json({ error: 'Доступ запрещен. Вы не авторизованы.' });
    }

    try {
        if (req.method === 'GET') {
            let ordersDict;
            try {
                ordersDict = await kv.hgetall('tree_orders');
            } catch (e) {
                const oldArray = await kv.get('tree_orders') || [];
                ordersDict = {};
                oldArray.forEach(o => ordersDict[o.id] = o);
                await kv.del('tree_orders'); 
                if (oldArray.length > 0) await kv.hset('tree_orders', ordersDict); 
            }
            return res.status(200).json(ordersDict ? Object.values(ordersDict) : []);
        }

        if (req.method === 'POST') {
            const { action, order, orderId } = req.body;
            
            // 4. Проверка прав (только superadmin может удалять заказы)
            if (action === 'delete') {
                if (sessionData.role !== 'superadmin') {
                    return res.status(403).json({ error: 'У вас нет прав на удаление заказов.' });
                }
                if (orderId) {
                    await kv.hdel('tree_orders', orderId);
                    return res.status(200).json({ success: true });
                }
            }
            
            if (action === 'update' && order && order.id) {
                await kv.hset('tree_orders', { [order.id]: order });
                return res.status(200).json({ success: true, orderId: order.id });
            }
            
            return res.status(400).json({ error: 'Неверный формат данных' });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Orders Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
