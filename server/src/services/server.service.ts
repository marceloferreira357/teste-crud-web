import cors from "cors";
import express, { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as requestLog from "../middlewares/request-log.middleware";
import { router as actuator } from "../routes/actuator.routes";
import { router as routes } from "../routes/routes";
import { logger } from "./logger.service";

const listen = (app: Express, port: number): void => {
    app.listen(port, (): void => {
        logger.info(`Servidor sendo executado na porta ${port}`);
    });
}

const init = (port: number): void => {
    const app: Express = express();

    app.use(cors({
        origin: '*'
    }));
    app.use(express.json());

    /* middlewares */
    app.use(requestLog.log);

    /* routes */
    app.use("/actuator", actuator);
    app.use("/api/v1", routes);

    /* swagger */
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Documentacao do servidor",
                version: "1.0.0",
            },
        },
        apis: ["./src/routes/*.ts"]
    })));

    listen(app, port);
}

export {
    init
};
