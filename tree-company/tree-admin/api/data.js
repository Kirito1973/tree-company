const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
    // Enable CORS for cross-domain requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET: Retrieve site data
    if (req.method === 'GET') {
        try {
            const data = await kv.get('site_translations');
            return res.status(200).json(data || {});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database read error' });
        }
    } 
    
    // POST: Save updated site data
    if (req.method === 'POST') {
        try {
            const newData = req.body;
            await kv.set('site_translations', newData);
            return res.status(200).json({ success: true, message: 'Data saved successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Database write error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};