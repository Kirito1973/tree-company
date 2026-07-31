import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

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
            const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
            if (!token || !(await kv.get(`session_${token}`))) {
                return res.status(401).json({ error: 'Отказано в доступе' });
            }

            const { employees } = req.body;
            if (employees && Array.isArray(employees)) {
                const updateDict = {};
                employees.forEach(emp => updateDict[emp.id] = emp);
                await kv.del('tree_employees');
                if (Object.keys(updateDict).length > 0) await kv.hset('tree_employees', updateDict);
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({ error: 'Неверный формат данных' });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Employees Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
