import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173','https://jakelanglois.com']
}));

const CLASH_API_KEY = process.env.CLASH_API_KEY;

app.get('/api/clash/:tag', async (req: Request, res: Response) => {
    try {
        let tag = req.params.tag;

        if (!tag.startsWith('#')) {
            tag = `#${tag}`;
        }

        const encodedTag = encodeURIComponent(tag);
        
        const response = await axios.get(`https://api.clashofclans.com/v1/players/${encodedTag}`, {
            headers: {
                'Authorization': `Bearer ${CLASH_API_KEY}`,
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        res.json(response.data);
    } catch (error: any) {

        console.error("FULL ERROR DATA:", error.response?.data);
        res.status(500).json({ 
            error: 'Failed to fetch Clash data', 
            debug: error.response?.data?.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));