import { Router } from 'express';

import {
    getAllTokenPrice,
    // placeBuyOrder,
    // placeSellOrder,
    // summary

} from '../controllers/trading.controller'

const TradingRouter = Router();

TradingRouter.get('/all-token', getAllTokenPrice);

// TradingRouter.post('/buy-order', placeBuyOrder);

// TradingRouter.post('/sell-order', placeSellOrder);

// TradingRouter.post('/summary', summary);

export default TradingRouter;
