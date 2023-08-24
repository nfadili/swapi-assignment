import express from 'express';
import { getAggregateCosts } from '../controllers/costs';

const costsRouter = express.Router();
costsRouter.get('/aggregate', getAggregateCosts);

export { costsRouter };
