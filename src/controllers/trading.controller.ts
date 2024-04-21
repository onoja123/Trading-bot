import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import TradingService from "../services/trading.service";
import ResponseHelper from "../utils/response";


/**
 * @description Get all token price
 * @route `/api/v1/trading/all-token`
 * @access Private
 * @type GET
 **/
export const getAllTokenPrice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const tokens = ['BTC', 'ETH', 'BNB'];

        const tokenPrices: { [token: string]: number } = {};

        for (const token of tokens) {
            const price = await TradingService.getTokenPrice(token + 'USDT', 'mainnet');
            if (price !== null) {
                tokenPrices[token] = price;
            } else {
                console.error(`Price for ${token} is null.`);
            }
        }

        ResponseHelper.sendSuccessResponse(res, { 
            statusCode: ResponseHelper.OK, 
            data: tokenPrices
        });
    } catch (error) {
        return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
    }
});


// /**
//  * @author Okpe Onoja <okpeonoja18@gmail.com>
//  * @description Place a buy order
//  * @route `/api/v1/trading/buy-order`
//  * @access Private
//  * @type POST
//  **/
// export const placeBuyOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { symbol, quantity } = req.body;

//         if (!symbol || !quantity) {
//             return next(new AppError("Symbol and quantity are required.", ResponseHelper.BAD_REQUEST));
//         }

//         const orderResponse = await TradingService.placeBuyOrder(symbol, quantity);

//         ResponseHelper.sendSuccessResponse(res, { 
//             statusCode: ResponseHelper.OK, 
//             data: orderResponse
//         });
//     } catch (error) {
//         return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
//     }
// });

// /**
//  * @author Okpe Onoja <okpeonoja18@gmail.com>
//  * @description Place a sell order
//  * @route `/api/v1/trading/sell-order`
//  * @access Private
//  * @type POST
//  **/
// export const placeSellOrder= catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
//     try {

//         const { symbol, quantity } = req.body;

//         if (!symbol || !quantity) {
//             return next(new AppError("Symbol and quantity are required.", ResponseHelper.BAD_REQUEST));
//         }

//         const orderResponse = await TradingService.placeSellOrder(symbol, quantity);

//         ResponseHelper.sendSuccessResponse(res, { 
//             statusCode: ResponseHelper.OK, 
//             data: orderResponse
//         });

//     } catch (error) {
//         return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
//     }
// })


// /**
//  * @description Get a summary
//  * @route `/api/v1/trading/summary`
//  * @access Private
//  * @type POST
//  **/
// export const summary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { symbol } = req.body;

//         if (!symbol) {
//             return next(new AppError("Symbol is required.", ResponseHelper.BAD_REQUEST));
//         }

//         const summary = await TradingService.getSummary(symbol);

//         ResponseHelper.sendSuccessResponse(res, { 
//             statusCode: ResponseHelper.OK, 
//             data: summary
//         });
//     } catch (error) {
//         return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
//     }
// });
