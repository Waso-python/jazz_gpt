const winston = require("winston");
const path = require('path');

const logger=winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: path.join(__dirname, '..', '/logs/app.log'),
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
            format:winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        })
    ],
    exitOnError: false
})

logger.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
}

module.exports =logger