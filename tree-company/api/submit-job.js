import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Метод не разрешен' });

    try {
        const jobData = req.body;
        const uniqueId = 'emp_' + Math.random().toString(36).substr(2, 9);
        
        // Форматируем заявку так, как админка ожидает видеть сотрудника
        const newEmp = {
            id: uniqueId,
            status: 'pending', // Статус "Ожидает проверки"
            name: jobData.name || 'Неизвестно',
            phone: jobData.phone || '',
            type: jobData.type || ['universal'], // Специальность
            exp: jobData.exp || '0',
            address: jobData.address || '',
            date: new Date().toISOString()
        };

        // Записываем в общую базу сотрудников
        await kv.hset('tree_employees', { [uniqueId]: newEmp });

        return res.status(200).json({ success: true, message: 'Резюме успешно принято и направлено администрации!' });
    } catch (error) {
        console.error('Ошибка сервера при обработке резюме:', error);
        return res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
}
