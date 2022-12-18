const logger = require('../utils/winston');

const logRequest = async (ctx, next) => { 
    logger.info(`Petición recibida: ${ctx.request.method} - ${ctx.originalUrl}`);
    await next();
}

module.exports = {
    logRequest
}