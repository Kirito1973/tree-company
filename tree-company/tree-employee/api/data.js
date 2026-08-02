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
            const ordersDict = await kv.hgetall('tree_orders') || {};
            const employeesDict = await kv.hgetall('tree_employees') || {};
            
            return res.status(200).json({
                orders: Object.values(ordersDict),
                employees: Object.values(employeesDict)
            });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Data Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
