import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const consoleFormat: winston.Logform.Format = printf(({ level, timestamp, message }): string => {
    timestamp = timestamp.replace("Z", "").split("T");
    return `[${timestamp[0]} ${timestamp[1]}] [${level.toUpperCase()}]: ${message}`;
});

/* default winston instance with custom log format */
const logger: winston.Logger = winston.createLogger({
    format: combine(timestamp(), consoleFormat),
    transports: [new winston.transports.Console({ level: "silly" })]
});

export {
    logger
};
