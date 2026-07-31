import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') {
        try {
            const data = await kv.get('site_translations');
            return res.status(200).json(data || {});
        } catch (error) {
            return res.status(500).json({ error: 'Database read error' });
        }
    } 
    
    if (req.method === 'POST') {
        const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
        if (!token || !(await kv.get(`session_${token}`))) {
            return res.status(401).json({ error: 'Отказано в доступе' });
        }

        try {
            const newData = req.body;
            await kv.set('site_translations', newData);
            return res.status(200).json({ success: true, message: 'Data saved successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Database write error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
