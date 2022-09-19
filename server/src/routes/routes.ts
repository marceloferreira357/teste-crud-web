import express, { Router } from "express";
import { router as company } from "./company.routes";
import { router as customer } from "./customer.routes";

const router: Router = express.Router();

/* all the sub-routes */
router.use("/customers", customer);
router.use("/companies", company);

export {
    router
};
