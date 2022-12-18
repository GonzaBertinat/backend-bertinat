const { getServerInfoService } = require('../service/server');
const logger = require('../utils/winston');

const getServerInfo = async (ctx) => { 
    const datos = getServerInfoService();
    await ctx.render('info', { datos });
}

const handleResourceNotFound = async (ctx) => { 
    const mensaje = `ruta ${ctx.originalUrl} - método ${ctx.request.method} no implementada`
    logger.warn(mensaje);
    
    ctx.response.status = 404;
    ctx.body = {
        error: -2,
        descripcion: mensaje,
    };
}

module.exports = {
    getServerInfo,
    handleResourceNotFound
}