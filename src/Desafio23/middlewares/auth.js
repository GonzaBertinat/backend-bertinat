const ADMINISTRADOR = true;

const isAdminUser = async (ctx, next) => { 
    if(!ADMINISTRADOR){
        ctx.response.status = 403;
        ctx.body = {
            error: -1,
            descripcion: `ruta ${ctx.originalUrl} - método ${ctx.request.method} no autorizada`,
        };
    } else {
        await next();
    }
}

const checkAuthentication = async (ctx, next) => { 
    if(ctx.isAuthenticated()){
        await next();
    } else {
        await ctx.redirect('/login');
    }
}

module.exports = {
    isAdminUser,
    checkAuthentication
}