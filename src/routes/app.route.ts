import express from "express";
import { Routes } from "../interfaces/app.inter";
import TradingRouter from "./trading.route";

const AppRouter = express.Router();

const appRoutes: Routes = [
  {
    path: "/trading",
    router: TradingRouter,
  },
];

appRoutes.forEach((route) => {
  AppRouter.use(route.path, route.router);
});

export default AppRouter;
