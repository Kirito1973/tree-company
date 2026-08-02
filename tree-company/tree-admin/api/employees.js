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
            let employeesDict;
            try {
                employeesDict = await kv.hgetall('tree_employees');
            } catch (e) {
                const oldArray = await kv.get('tree_employees') || [];
                employeesDict = {};
                oldArray.forEach(emp => employeesDict[emp.id] = emp);
                await kv.del('tree_employees');
                if (Object.keys(employeesDict).length > 0) await kv.hset('tree_employees', employeesDict);
            }
            return res.status(200).json(employeesDict ? Object.values(employeesDict) : []);
        }

        if (req.method === 'POST') {
            const { action, employee, empId } = req.body;
            
            if (action === 'delete') {
                if (sessionData.role !== 'superadmin') return res.status(403).json({ error: 'Нет прав на удаление.' });
                if (empId) {
                    await kv.hdel('tree_employees', empId);
                    return res.status(200).json({ success: true });
                }
            }
            
            if (action === 'update' && employee && employee.id) {
                await kv.hset('tree_employees', { [employee.id]: employee });
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({ error: 'Неверный формат данных или отсутствует action' });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Employees Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
