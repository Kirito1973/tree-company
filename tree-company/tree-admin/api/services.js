
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    // 1. Настройка CORS и строгий запрет кэширования (No-Cache Policy)
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Гарантируем, что ответ никогда не осядет в кэше браузера или провайдера
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');

    // Быстрый ответ для предварительных запросов браузера (CORS Preflight)
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        // GET: Получение актуального списка услуг
        if (request.method === 'GET') {
            let services = await kv.get('tree_services');
            
            // Если таблица еще пустая, отдаем дефолтную услугу и сразу записываем её в базу
            if (!services) {
                services = [ 
                    { 
                        id: 'srv1', 
                        name: 'Դռների տեղադրում', 
                        price: 15000, 
                        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 22h12"/><path d="M4 22h16"/><path d="M14 12h.01"/></svg>', 
                        status: 'active' 
                    } 
                ];
                await kv.set('tree_services', services);
            }
            return response.status(200).json(services);
        }

        // POST: Перезапись списка услуг (добавление, редактирование, удаление)
        if (request.method === 'POST') {
            const { services } = request.body;
            
            if (!services || !Array.isArray(services)) {
                return response.status(400).json({ error: 'Неверный формат данных' });
            }
            
            await kv.set('tree_services', services);
            return response.status(200).json({ success: true, services });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Services Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
