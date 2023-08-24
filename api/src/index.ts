import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ?? 3001;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.json({ hello: 'world' });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
