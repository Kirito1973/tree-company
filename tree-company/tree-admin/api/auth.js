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
            
            if (!pin) {
                return res.status(400).json({ success: false, error: 'Գաղտնաբառը մուտքագրված չէ (Пароль не указан)' });
            }

            // Берем пароли из переменных окружения Vercel
            const superAdminPin = process.env.SUPER_ADMIN_PIN ? String(process.env.SUPER_ADMIN_PIN).trim() : null;
            const managerPin = process.env.MANAGER_PIN ? String(process.env.MANAGER_PIN).trim() : null;

            let roleLevel = null;

            // Распределяем роли
            if (superAdminPin && pin === superAdminPin) {
                roleLevel = 'superadmin'; // 100% доступ
            } else if (managerPin && pin === managerPin) {
                roleLevel = 'manager'; // 50% доступ
            }

            if (roleLevel) {
                const token = 'sk_admin_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                
                // Сохраняем сессию вместе с ролью
                await kv.set(`admin_session_${token}`, { role: roleLevel }, { ex: 86400 }); 
                
                // ВЫДАЕМ ИМЕННО АДМИНСКУЮ ПЕЧЕНЬКУ (tree_admin_token)
                res.setHeader('Set-Cookie', `tree_admin_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);
                
                return res.status(200).json({ success: true, role: roleLevel });
            }

            return res.status(401).json({ success: false, error: 'Սխալ գաղտնաբառ (Неверный пароль)' });
        }
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Auth Error:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}
