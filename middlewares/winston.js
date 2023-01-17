const logger = require('../utils/winston');

const logRequest = (req, res, next) => {
    logger.info(`Petición recibida: ${req.method} - ${req.originalUrl}`);
    next();
}

module.exports = {
    logRequest
}