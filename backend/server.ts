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
                Authorization: `Bearer ${CLASH_API_KEY}`,
                Accept: 'application/json',
            }
        });
        
        res.json(response.data);
    } catch (error: any) {
        console.error("Clash API Error Status:", error.response?.status);
        res.status(500).json({ error: 'Failed to fetch Clash data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));