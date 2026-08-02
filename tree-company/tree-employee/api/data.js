import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
    const sessionData = token ? await kv.get(`session_${token}`) : null;

    if (!token || !sessionData || !sessionData.startsWith('employee_')) {
        return res.status(401).json({ error: 'Не авторизован' });
    }

    try {
        if (req.method === 'GET') {
            // Безопасное извлечение заказов
            let ordersDict;
            try {
                ordersDict = await kv.hgetall('tree_orders') || {};
            } catch (e) {
                const oldArray = await kv.get('tree_orders') || [];
                ordersDict = {};
                oldArray.forEach(o => ordersDict[o.id] = o);
            }

            // Безопасное извлечение сотрудников
            let employeesDict;
            try {
                employeesDict = await kv.hgetall('tree_employees') || {};
            } catch (e) {
                const oldArray = await kv.get('tree_employees') || [];
                employeesDict = {};
                oldArray.forEach(emp => employeesDict[emp.id] = emp);
            }
            
            // Безопасное извлечение отзывов
            let reviewsDict;
            try {
                reviewsDict = await kv.hgetall('tree_reviews') || {};
            } catch (e) {
                const oldArray = await kv.get('tree_reviews') || [];
                reviewsDict = {};
                oldArray.forEach(r => reviewsDict[r.id] = r);
            }
            
            return res.status(200).json({
                orders: Object.values(ordersDict),
                employees: Object.values(employeesDict),
                reviews: Object.values(reviewsDict)
            });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Data Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
