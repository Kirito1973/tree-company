import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Защита: ищем новую админскую печеньку
    const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('tree_admin_token='))?.split('=')[1];
    const sessionData = token ? await kv.get(`admin_session_${token}`) : null;

    if (!token || !sessionData) {
        return res.status(401).json({ error: 'Отказано в доступе. Требуются права администратора.' });
    }

    try {
        if (req.method === 'GET') {
            let servicesDict;
            try {
                servicesDict = await kv.hgetall('tree_services');
            } catch(e) {
                const oldArray = await kv.get('tree_services');
                servicesDict = {};
                if (oldArray && Array.isArray(oldArray)) {
                    oldArray.forEach(s => servicesDict[s.id] = s);
                    await kv.del('tree_services');
                    await kv.hset('tree_services', servicesDict);
                } else {
                    const defaultService = { id: 'srv1', name: 'Դռների տեղադրում', price: 15000, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 22h12"/><path d="M4 22h16"/><path d="M14 12h.01"/></svg>', status: 'active' };
                    servicesDict = { 'srv1': defaultService };
                    await kv.hset('tree_services', servicesDict);
                }
            }
            return res.status(200).json(servicesDict ? Object.values(servicesDict) : []);
        }

        if (req.method === 'POST') {
            const { action, service, serviceId } = req.body;
            
            if (action === 'delete') {
                if (sessionData.role !== 'superadmin') return res.status(403).json({ error: 'Нет прав на удаление.' });
                if (serviceId) {
                    await kv.hdel('tree_services', serviceId);
                    return res.status(200).json({ success: true });
                }
            }
            
            if (action === 'update' && service && service.id) {
                await kv.hset('tree_services', { [service.id]: service });
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({ error: 'Неверный формат данных' });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Services Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
