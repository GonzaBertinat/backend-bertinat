const os = require('os');
const config = require('../config');

const getServerInfoService = () => {
    return {
        argumentosEntrada: process.argv.slice(2),
        nombrePlataforma: process.platform,
        versionNodeJS: process.version,
        memoriaTotalReservada: process.memoryUsage().rss,
        pathEjecucion: process.execPath,
        processId: process.pid,
        carpetaProyecto: process.cwd(),
        numeroProcesadores: os.cpus().length
    }
}

const getServerConfigService = () => {
    return {
        puertoEscucha: config.express.port,
        modo: config.modoEjecucion,
        sessionSecret: config.session.sessionSecret,
        cookieSecret: config.session.cookieSecret,
        tiempoExpiracionSesion: config.session.expirationTime,
        mailService: config.mailSender.service,
        mailPort: config.mailSender.port,
        mailOriginAccount: config.mailSender.user,
        mailPass: config.mailSender.pass,
        mailAdminAccount: config.mailSender.adminMail,
        twilioAccountSID: config.twilioConfig.accountSid,
        twilioToken: config.twilioConfig.authToken,
        twilioSmsPhoneNumber: config.twilioConfig.smsPhoneNumber,
        twilioWhatsappPhoneNumber: config.twilioConfig.whatsappPhoneNumber,
        twilioAdminPhoneNumber: config.twilioConfig.adminPhoneNumber,
        metodoPersistenciaProductos: config.metodoPersistencia.productos,
        metodoPersistenciaCarritos: config.metodoPersistencia.carritos,
        metodoPersistenciaMensajes: config.metodoPersistencia.mensajes,
        metodoPersistenciaUsuarios: config.metodoPersistencia.usuarios,
        metodoPersistenciaOrdenes: config.metodoPersistencia.ordenes,
        mongoUrl: config.mongoURL,
        coleccionProductos: config.productosCollection,
        coleccionCarritos: config.carritosCollection,
        coleccionMensajes: config.mensajesCollection,
        coleccionUsuarios: config.usuariosCollection,
        coleccionOrdenes: config.ordenesCollection,
        codigosTelefonoPath: config.codigosTelefonoPath
    }
}

module.exports = {
    getServerInfoService,
    getServerConfigService
}