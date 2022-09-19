import express, { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router: Router = express.Router();

/**
 * @openapi
 * /actuator/health:
 *   get:
 *     description: Verifica o status do servidor
 */
router.get("/health", (req: Request, res: Response, next: NextFunction): void => {
    res.status(StatusCodes.OK).json({
        status: "UP"
    });
});

export {
    router
};
