import { NextFunction, Request, Response } from "express";
import { logger } from "../services/logger.service";

const log = (req: Request, res: Response, next: NextFunction): void => {
    logger.http(`Requisicao ${req.method} em ${req.url} de ${req.socket.remoteAddress}`);
    next();
}

export {
    log
};
