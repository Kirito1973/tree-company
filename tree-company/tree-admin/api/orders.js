import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
    const sessionData = token ? await kv.get(`session_${token}`) : null;

    // ИСПРАВЛЕНИЕ: Строгая проверка на то, что это именно администратор
    if (!token || sessionData !== 'admin') {
        return res.status(401).json({ error: 'Отказано в доступе. Требуются права администратора.' });
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
            if (action === 'delete' && orderId) {
                await kv.hdel('tree_orders', orderId);
                return res.status(200).json({ success: true });
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
