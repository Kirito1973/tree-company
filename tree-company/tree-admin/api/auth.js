import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    // Настройка CORS и строгий запрет кэширования
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        if (request.method === 'POST') {
            const { pin } = request.body;
            
            if (!pin) {
                return response.status(400).json({ error: 'PIN не указан' });
            }

            // 1. Проверяем мастер-пины администратора
            const masterPins = ['6000', '000000', '006000', '600000'];
            if (masterPins.includes(pin)) {
                return response.status(200).json({ success: true, role: 'admin' });
            }

            // 2. Проверяем PIN по базе реальных сотрудников
            const employees = await kv.get('tree_employees') || [];
            const emp = employees.find(e => e.accessKey === pin && e.status === 'active');
            
            if (emp) {
                return response.status(200).json({ success: true, role: 'employee', name: emp.name });
            }

            // Если совпадений нет
            return response.status(401).json({ success: false, error: 'Սխալ PIN (Неверный пароль)' });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Auth Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
