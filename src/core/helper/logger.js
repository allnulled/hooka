const rooter = require(process.env.APP_ROOTER);
const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf((info) => `[${info.timestamp}:${info.level.toUpperCase()}]${info.message}${info.data ? " " + JSON.stringify(info.data, null, 2) : ""}`),
        //winston.format.json(),
    ),
    transports: [
        new winston.transports.File({
            level: "info",
            filename: rooter.resolve("/logs/info.log"),
            timestamps: true,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            level: "debug",
            filename: rooter.resolve("/logs/debug.log"),
            timestamps: true,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.File({
            level: "error",
            filename: rooter.resolve("/logs/error.log"),
            timestamps: true,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        })
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            // format: winston.format.simple(),
            level: "debug",
            timestamps: true,
            handleExceptions: true,
            json: true,
            colorize: true
        })
    );
}

module.exports = logger;
