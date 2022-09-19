import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Company } from "../interfaces/company.interface";
import * as companyDatabase from "../services/database/company-database.service";
import { logger } from "../services/logger.service";

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
    nomeFantasia: string | undefined;
    razaoSocial: string | undefined;
    page: string | undefined;
    size: string | undefined;
}

const insert = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const company: Company = req.body;
        if (company.constructor === Object && Object.keys(company).length === 0) {
            throw new Error("Body com informacoes da empresa nao existe");
        }
        const uuid = companyDatabase.insert(company);
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
        throw new Error("Parametro de id da empresa nao existe");
    }
    const company = companyDatabase.findById(uuid);
    if (!company) {
        res.status(StatusCodes.NOT_FOUND).json({
            result: "Empresa nao encontrada"
        });
    } else {
        res.status(StatusCodes.OK).json({
            result: company
        });
    }
}

const findAll: RequestHandler<Params, ResBody, ReqBody, ReqQuery> = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const nomeFantasia: string | undefined = req.query.nomeFantasia as string | undefined;
    const razaoSocial: string | undefined = req.query.razaoSocial as string | undefined;
    const page: string | undefined = req.query.page as string | undefined;
    const size: string | undefined = req.query.size as string | undefined;
    res.status(StatusCodes.OK).json({
        result: companyDatabase.findAll(Number(page), Number(size), nomeFantasia, razaoSocial)
    });
}

const updateById = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const uuid: string = req.params.uuid;
        const company: Company = req.body;
        if (!uuid) {
            throw new Error("Parametro de id da empresa nao existe");
        }
        if (company.constructor === Object && Object.keys(company).length === 0) {
            throw new Error("Body com informacoes da empresa nao existe");
        }
        companyDatabase.updateById(uuid, company);
        res.status(StatusCodes.OK).json({
            result: "Empresa atualizado com sucesso"
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
        throw new Error("Parametro de id da empresa nao existe");
    }
    if (companyDatabase.deleteById(uuid)) {
        res.status(StatusCodes.OK).json({
            result: "Empresa deletada com sucesso"
        });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            result: "Empresa nao encontrada"
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
