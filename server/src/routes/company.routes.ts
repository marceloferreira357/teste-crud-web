import express, { Router } from "express";
import * as companyController from "../controllers/company.controller";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/companies/:
 *   post:
 *     description: Inserir uma nova empresa
 */
router.post("/", companyController.insert);

/**
 * @openapi
 * /api/v1/companies/{uuid}:
 *   get:
 *     description: Obtem uma empresa pelo id
 *   parameters:
 *     - in: path
 *       name: uuid
 *       type: string
 *       description: Id cliente
 */
router.get("/:uuid", companyController.findById);

/**
 * @openapi
 * /api/v1/companies:
 *   get:
 *     description: Obter as empresas do banco de dados
 *   parameters:
 *     - in: query
 *       name: page
 *       type: string
 *       description: Pagina da busca
 *     - in: query
 *       name: size
 *       type: string
 *       description: Quantidade de empresas por pagina
 *     - in: query
 *       name: nomeFantasia
 *       type: string
 *       description: Nome fantasia da empresa
 *     - in: query
 *       name: razaoSocial
 *       type: string
 *       description: Razao social da empresa
 */
router.get("/", companyController.findAll);

/**
 * @openapi
 * /api/v1/companies/{uuid}:
 *   patch:
 *     description: Altera uma empresa pelo id
 *   parameters:
 *     - in: path
 *       name: uuid
 *       type: string
 *       description: Id da empresa
 */
router.patch("/:uuid", companyController.updateById);

/**
 * @openapi
 * /api/v1/companies/{uuid}:
 *   delete:
 *     description: Deleta uma empresa pelo id
 *   parameters:
 *     - in: path
 *       name: uuid
 *       type: string
 *       description: Id da empresa
 */
router.delete("/:uuid", companyController.deleteById);

export {
    router
};
