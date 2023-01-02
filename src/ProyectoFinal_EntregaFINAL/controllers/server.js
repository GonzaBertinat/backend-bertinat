const { getServerInfoService, getServerConfigService } = require('../service/server');
const logger = require('../utils/winston');

const getServerInfo = (req, res) => {
    const datos = getServerInfoService();
    res.render('info', { datos });
}

const getServerConfig = (req, res) => {
    const datos = getServerConfigService();
    res.render('config', { datos });
}

const handleResourceNotFound = (req, res) => {
    const mensaje = `ruta ${req.originalUrl} - método ${req.method} no implementada`
    logger.warn(mensaje);
    res.status(404).json({
        error: -2,
        descripcion: mensaje,
    })
}

module.exports = {
    getServerInfo,
    getServerConfig,
    handleResourceNotFound
}