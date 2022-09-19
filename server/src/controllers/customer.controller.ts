import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Customer } from "../interfaces/customer.interface";
import * as customerDatabase from "../services/database/customer-database.service";
import { logger } from "../services/logger.service";

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
    nome: string | undefined;
    page: string | undefined;
    size: string | undefined;
}

const insert = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const customer: Customer = req.body;
        if (customer.constructor === Object && Object.keys(customer).length === 0) {
            throw new Error("Body com informacoes do cliente nao existe");
        }
        const uuid = customerDatabase.insert(customer);
        res.status(StatusCodes.OK).json({
            result: uuid
        });
    } catch (error) {
        logger.error((error as Error).stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: (error as Error).message,
            stack: (error as Error).stack
        });
    }
}

const findById = (req: Request, res: Response, next: NextFunction): void => {
    const uuid: string = req.params.uuid;
    if (!uuid) {
        throw new Error("Parametro de id do cliente nao existe");
    }
    const customer = customerDatabase.findById(uuid);
    if (!customer) {
        res.status(StatusCodes.NOT_FOUND).json({
            result: "Cliente nao encontrado"
        });
    } else {
        res.status(StatusCodes.OK).json({
            result: customer
        });
    }
}

const findAll: RequestHandler<Params, ResBody, ReqBody, ReqQuery> = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const nome: string | undefined = req.query.nome as string | undefined;
    const page: string | undefined = req.query.page as string | undefined;
    const size: string | undefined = req.query.size as string | undefined;
    res.status(StatusCodes.OK).json({
        result: customerDatabase.findAll(Number(page), Number(size), nome)
    });
}

const updateById = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const uuid: string = req.params.uuid;
        const customer: Customer = req.body;
        if (!uuid) {
            throw new Error("Parametro de id do cliente nao existe");
        }
        if (customer.constructor === Object && Object.keys(customer).length === 0) {
            throw new Error("Body com informacoes do cliente nao existe");
        }
        customerDatabase.updateById(uuid, customer);
        res.status(StatusCodes.OK).json({
            result: "Cliente atualizado com sucesso"
        });
    } catch (error) {
        logger.error((error as Error).stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: (error as Error).message,
            stack: (error as Error).stack
        });
    }
}

const deleteById = (req: Request, res: Response, next: NextFunction): void => {
    const uuid: string = req.params.uuid;
    if (!uuid) {
        throw new Error("Parametro de id do cliente nao existe");
    }
    if (customerDatabase.deleteById(uuid)) {
        res.status(StatusCodes.OK).json({
            result: "Cliente deletado com sucesso"
        });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            result: "Cliente nao encontrado"
        });
    }
}

export {
    insert,
    findById,
    findAll,
    updateById,
    deleteById
};
