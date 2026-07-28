import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*'); 
    response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        if (request.method === 'POST') {
            const { pin } = request.body;
            
            if (!pin) {
                return response.status(400).json({ error: 'Գաղտնաբառը մուտքագրված չէ (Пароль не указан)' });
            }

            // Берем пароль администратора ТОЛЬКО из скрытых настроек Vercel
            const trueAdminPin = process.env.ADMIN_PIN;

            // Проверяем админа
            if (trueAdminPin && pin === trueAdminPin) {
                const token = 'sk_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                await kv.set(`session_${token}`, 'admin', { ex: 86400 });
                return response.status(200).json({ success: true, role: 'admin', token: token });
            }

            // Проверяем по базе сотрудников (мастеров)
            const employees = await kv.get('tree_employees') || [];
            const emp = employees.find(e => e.accessKey === pin && e.status === 'active');
            
            if (emp) {
                const token = 'sk_emp_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                await kv.set(`session_${token}`, `employee_${emp.id}`, { ex: 86400 });
                return response.status(200).json({ success: true, role: 'employee', name: emp.name, token: token });
            }

            // Если совпадений нет
            return response.status(401).json({ success: false, error: 'Սխալ գաղտնաբառ (Неверный пароль)' });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Auth Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
