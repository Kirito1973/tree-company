import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'POST') {
            const rawPin = req.body.pin;
            const pin = rawPin ? String(rawPin).trim() : '';

            if (!pin) return res.status(400).json({ error: 'PIN-կոդը մուտքագրված չէ (Пароль не указан)' });

            const employeesDict = await kv.hgetall('tree_employees') || {};
            const employees = Object.values(employeesDict);

            // Ищем сотрудника с совпадающим паролем и активным статусом
            const emp = employees.find(e => e.accessKey === pin && e.status === 'active');

            if (emp) {
                const token = 'sk_emp_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                await kv.set(`session_${token}`, `employee_${emp.id}`, { ex: 86400 }); // Сессия на 24 часа
                res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);

                return res.status(200).json({
                    success: true,
                    employee: { id: emp.id, name: emp.name, type: emp.type }
                });
            }
            return res.status(401).json({ success: false, error: 'Սխալ գաղտնաբառ (Неверный пароль или аккаунт неактивен)' });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Employee API Auth Error:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}
