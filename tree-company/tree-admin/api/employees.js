
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');

    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    try {
        if (request.method === 'GET') {
            let employees = await kv.get('tree_employees');
            if (!employees) {
                employees = [];
                await kv.set('tree_employees', employees);
            }
            return response.status(200).json(employees);
        }

        if (request.method === 'POST') {
            const { employees } = request.body;
            if (!employees || !Array.isArray(employees)) {
                return response.status(400).json({ error: 'Неверный формат данных' });
            }
            await kv.set('tree_employees', employees);
            return response.status(200).json({ success: true, employees });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Employees Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
