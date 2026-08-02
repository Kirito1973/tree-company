import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
    const sessionData = token ? await kv.get(`session_${token}`) : null;

    if (!token || !sessionData || !sessionData.startsWith('employee_')) {
        return res.status(401).json({ error: 'Не авторизован' });
    }

    try {
        const { type, data } = req.body;
        
        if (type === 'order' && data && data.id) {
            await kv.hset('tree_orders', { [data.id]: data });
            return res.status(200).json({ success: true });
        }
        if (type === 'employee' && data && data.id) {
            await kv.hset('tree_employees', { [data.id]: data });
            return res.status(200).json({ success: true });
        }
        
        return res.status(400).json({ error: 'Неверные данные' });
    } catch (error) {
        console.error('API Sync Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
