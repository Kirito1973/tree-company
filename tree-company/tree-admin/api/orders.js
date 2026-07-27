import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    // 1. Настройка CORS и строгий запрет кэширования (No-Cache Policy)
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Запрет кэширования
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');

    // CORS Preflight
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        // GET: Получить все заказы
        if (request.method === 'GET') {
            let orders = await kv.get('tree_orders');
            
            // Если база пустая, возвращаем пустой массив
            if (!orders) {
                orders = [];
                await kv.set('tree_orders', orders);
            }
            return response.status(200).json(orders);
        }

        // POST: Обновить/Сохранить заказы
        if (request.method === 'POST') {
            const { orders } = request.body;
            
            if (!orders || !Array.isArray(orders)) {
                return response.status(400).json({ error: 'Неверный формат данных' });
            }
            
            await kv.set('tree_orders', orders);
            return response.status(200).json({ success: true, orders });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Orders Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
