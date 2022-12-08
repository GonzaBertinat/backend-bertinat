const os = require('os');

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

module.exports = {
    getServerInfoService
}