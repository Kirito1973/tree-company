import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // ... (заголовки CORS)
    
    if (req.method === 'POST') {
        const pin = req.body.pin ? String(req.body.pin).trim() : '';
        
        // 1. Берем пароли из переменных окружения Vercel
        const superAdminPin = process.env.SUPER_ADMIN_PIN; // Пароль для 100% доступа
        const managerPin = process.env.MANAGER_PIN;       // Пароль для 50% доступа

        let roleLevel = null;

        // 2. Проверяем, кто именно входит
        if (superAdminPin && pin === superAdminPin) {
            roleLevel = 'superadmin'; // 100% права
        } else if (managerPin && pin === managerPin) {
            roleLevel = 'manager';    // 50% права (например, только заказы)
        }

        // 3. Если пароль подошел к одной из ролей
        if (roleLevel) {
            const token = 'sk_admin_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
            
            // В базу записываем не просто "admin", а конкретный уровень прав
            await kv.set(`admin_session_${token}`, { role: roleLevel }, { ex: 86400 }); 
            
            // Выдаем УНИКАЛЬНУЮ печеньку только для админки
            res.setHeader('Set-Cookie', `tree_admin_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);
            
            return res.status(200).json({ success: true, role: roleLevel });
        }

        // 4. Если пароль не подошел никуда
        return res.status(401).json({ success: false, error: 'Отказано в доступе' });
    }
}
