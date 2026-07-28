import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    // Строгий CORS. Берем домен, откуда пришел запрос
    const origin = request.headers.origin || '*';
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', origin !== '*' ? origin : ''); 
    response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Cache-Control', 'no-store, max-age=0');
    
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        if (request.method === 'POST') {
            // ОПРЕДЕЛЯЕМ IP ДЛЯ ЗАЩИТЫ ОТ БРУТФОРСА
            const ip = request.headers['x-forwarded-for'] || 'unknown_ip';
            const rateLimitKey = `rate_limit_${ip}`;
            
            // Проверяем, не заблокирован ли IP
            const attempts = await kv.get(rateLimitKey) || 0;
            if (attempts >= 5) {
                return response.status(429).json({ success: false, error: 'Արգելափակված է 15 րոպեով (Слишком много попыток. Ждите 15 минут)' });
            }

            const { pin } = request.body;
            if (!pin) {
                return response.status(400).json({ error: 'Գաղտնաբառը մուտքագրված չէ (Пароль не указан)' });
            }

            // Берем пароль администратора ТОЛЬКО из скрытых настроек Vercel
            const trueAdminPin = process.env.ADMIN_PIN;

            // Проверка Админа
            if (trueAdminPin && pin === trueAdminPin) {
                await kv.del(rateLimitKey); // Сбрасываем попытки при успехе
                
                const token = 'sk_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                await kv.set(`session_${token}`, 'admin', { ex: 86400 }); // Сессия на 24 часа
                
                // ВЫДАЕМ СЕКРЕТНУЮ HTTP-ONLY КУКУ (ЕЕ НЕЛЬЗЯ УКРАСТЬ ЧЕРЕЗ СКРИПТЫ)
                response.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);
                
                return response.status(200).json({ success: true, role: 'admin' });
            }

            // Проверка Сотрудника
            const employees = await kv.get('tree_employees') || [];
            const emp = employees.find(e => e.accessKey === pin && e.status === 'active');
            
            if (emp) {
                await kv.del(rateLimitKey);
                const token = 'sk_emp_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                await kv.set(`session_${token}`, `employee_${emp.id}`, { ex: 86400 });
                
                response.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);
                
                return response.status(200).json({ success: true, role: 'employee', name: emp.name });
            }

            // ЕСЛИ ПАРОЛЬ НЕВЕРНЫЙ - Увеличиваем счетчик попыток (Бан на 15 минут)
            await kv.set(rateLimitKey, attempts + 1, { ex: 900 });
            return response.status(401).json({ success: false, error: 'Սխալ գաղտնաբառ (Неверный пароль)' });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Auth Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
