import yargs, { Argv } from 'yargs';
import tradingService from '../services/trading.service';

yargs
    .command({
        command: 'get <symbol> [quantity]',
        describe: 'Get token price for a specific symbol',
        builder: (yargs: Argv) => {
            return yargs
                .positional('symbol', {
                    describe: 'Token symbol to get price for',
                    type: 'string',
                    demandOption: true, // Making this argument mandatory
                })
                .positional('quantity', {
                    describe: 'Optional quantity for future usage',
                    type: 'number',
                });
        },
        handler: async (argv: any) => {
            try {
                // Call the getTokenPrice function from TradingService
                const price = await tradingService.getTokenPrice(argv.symbol);
                console.log(`Token price for ${argv.symbol}: ${price}`);

                // If quantity is provided, you can use it for further actions
                if (argv.quantity) {
                    console.log(`Quantity provided: ${argv.quantity}`);
                }
            } catch (error) {
                console.error('Error in CLI handler:', error);
            }
        },
    })
    // .command({
    //     command: 'buy <symbol> <quantity>',
    //     describe: 'Buy tokens',
    //     builder: (yargs: Argv) => {
    //         return yargs
    //             .positional('symbol', {
    //                 describe: 'Token symbol',
    //                 type: 'string'
    //             })
    //             .positional('quantity', {
    //                 describe: 'Quantity to buy',
    //                 type: 'number'
    //             });
    //     },
    //     handler: (argv: any) => {
    //         tradingService.placeBuyOrder(argv.symbol as string, argv.quantity as number);
    //     }
    // })
    // .command({
    //     command: 'sell <symbol> <quantity>',
    //     describe: 'Sell tokens',
    //     builder: (yargs: Argv) => {
    //         return yargs
    //             .positional('symbol', {
    //                 describe: 'Token symbol',
    //                 type: 'string'
    //             })
    //             .positional('quantity', {
    //                 describe: 'Quantity to sell',
    //                 type: 'number'
    //             });
    //     },
    //     handler: (argv: any) => {
    //         tradingService.placeSellOrder(argv.symbol as string, argv.quantity as number);
    //     }
    // })
    // .command({
    //     command: 'summary <symbol>',
    //     describe: 'View summary for a token',
    //     builder: (yargs: Argv) => {
    //         return yargs
    //             .positional('symbol', {
    //                 describe: 'Token symbol',
    //                 type: 'string'
    //             });
    //     },
    //     handler: (argv: any) => {
    //         tradingService.getSummary(argv.symbol as string);
    //     }
    // })
    .demandCommand()
    .help()
    .argv;
