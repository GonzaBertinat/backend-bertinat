const ADMINISTRADOR = true;

const isAdminUser = (req, res, next) => {
    if(!ADMINISTRADOR){
        res.status(403).json({
            error: -1,
            descripcion: `ruta ${req.originalUrl} - método ${req.method} no autorizada`,
        })
    } else {
        next();
    }
}

const checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    isAdminUser,
    checkAuthentication
}