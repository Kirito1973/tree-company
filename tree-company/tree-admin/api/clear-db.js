import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    try {
        // Удаляем базу сотрудников
        await kv.del('tree_employees');
        
        // Заодно можем удалить заказы, чтобы начать с абсолютно чистого листа (раскомментируй, если нужно)
        // await kv.del('tree_orders'); 

        return res.status(200).json({ success: true, message: 'База данных успешно очищена!' });
    } catch (error) {
        return res.status(500).json({ error: 'Ошибка при очистке базы данных', details: error.message });
    }
}
