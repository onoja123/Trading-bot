import { Router } from 'express';

import {
    getAllTokenPrice,
    getATokenPrice
    // placeBuyOrder,
    // placeSellOrder,
    // summary

} from '../controllers/trading.controller'

const TradingRouter = Router();

TradingRouter.get('/all-token', getAllTokenPrice);
TradingRouter.get('/token/:token_name', getATokenPrice);

// TradingRouter.post('/buy-order', placeBuyOrder);

// TradingRouter.post('/sell-order', placeSellOrder);

// TradingRouter.post('/summary', summary);

export default TradingRouter;
