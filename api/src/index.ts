import express, { Express } from 'express';
import dotenv from 'dotenv';

import { costsRouter } from './routes/costs';

dotenv.config();

const port = process.env.PORT ?? 3001;
const app: Express = express();

app.use('/api/costs', costsRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
