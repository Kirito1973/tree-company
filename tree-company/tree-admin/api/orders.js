import { kv } from '@vercel/kv';

// Вспомогательная функция для чтения секретных Куки
function getCookie(request, name) {
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';').map(c => c.trim());
    for (const cookie of cookies) {
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export default async function handler(request, response) {
    const origin = request.headers.origin || '*';
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', origin !== '*' ? origin : '');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Cache-Control', 'no-store, max-age=0');
    
    if (request.method === 'OPTIONS') return response.status(200).end();

    // ==========================================
    // 🛡️ СИСТЕМА БЕЗОПАСНОСТИ (ПРОВЕРКА ТОКЕНА)
    // ==========================================
    const token = getCookie(request, 'auth_token');
    if (!token) {
        return response.status(401).json({ error: 'Отказано в доступе. Вы не авторизованы.' });
    }
    
    // Проверяем, существует ли сессия в базе
    const sessionRole = await kv.get(`session_${token}`);
    if (!sessionRole) {
        return response.status(401).json({ error: 'Сессия устарела. Войдите заново.' });
    }
    // ==========================================

    try {
        if (request.method === 'GET') {
            let ordersDict;
            try {
                ordersDict = await kv.hgetall('tree_orders');
            } catch (e) {
                if (e.message.includes('WRONGTYPE')) {
                    const oldArray = await kv.get('tree_orders') || [];
                    ordersDict = {};
                    oldArray.forEach(o => ordersDict[o.id] = o);
                    await kv.del('tree_orders'); 
                    if (oldArray.length > 0) await kv.hset('tree_orders', ordersDict); 
                } else {
                    throw e;
                }
            }
            const orders = ordersDict ? Object.values(ordersDict) : [];
            return response.status(200).json(orders);
        }

        if (request.method === 'POST') {
            const { action, order, orderId } = request.body;

            if (action === 'delete' && orderId) {
                await kv.hdel('tree_orders', orderId);
                return response.status(200).json({ success: true });
            }

            if (action === 'update' && order && order.id) {
                await kv.hset('tree_orders', { [order.id]: order });
                return response.status(200).json({ success: true, orderId: order.id });
            }

            return response.status(400).json({ error: 'Неверный формат данных' });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Orders Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
