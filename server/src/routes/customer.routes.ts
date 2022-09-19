import express, { Router } from "express";
import * as customerController from "../controllers/customer.controller";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/customer/:
 *   post:
 *     description: Inserir um novo cliente
 */
router.post("/", customerController.insert);

/**
 * @openapi
 * /api/v1/customer/{uuid}:
 *   get:
 *     description: Obtem um cliente pelo id
 *   parameters:
 *     - in: path
 *       name: uuid
 *       type: string
 *       description: Id cliente
 */
router.get("/:uuid", customerController.findById);

/**
 * @openapi
 * /api/v1/customer:
 *   get:
 *     description: Buscar todos os clientes
 *   parameters:
 *     - in: query
 *       name: page
 *       type: string
 *       description: Numero da pagina
 *     - in: query
 *       name: size
 *       type: string
 *       description: Quantidade de clientes por pagina
 *     - in: query
 *       name: nome
 *       type: string
 *       description: Nome do cliente
 */
router.get("/", customerController.findAll);

/**
 * @openapi
 * /api/v1/customer/{uuid}:
 *   patch:
 *     description: Altera um cliente pelo id
 *   parameters:
 *     - in: path
 *       name: uuid
 *       type: string
 *       description: Id cliente
 */
router.patch("/:uuid", customerController.updateById);

/**
 * @openapi
 * /api/v1/customer/{uuid}:
 *   delete:
 *     description: Deleta um cliente pelo id
 *   parameters:
 *     - in: path
 *       name: uuid
 *       type: string
 *       description: Id cliente
 */
router.delete("/:uuid", customerController.deleteById);

export {
    router
};
