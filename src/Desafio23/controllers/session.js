const { createCartService, 
        getUserWithCartService, 
        getProductsFromCartService, 
        processPurchaseService,
        getInternationalPhoneCodesService } = require('../service/session');

const loadRoot = async (ctx) => { 
    const user = await getUserWithCartService(ctx);
    await ctx.render('home', { user });
}

const loadCart = async (ctx) => { 
    const user = await getUserWithCartService(ctx);
    const { cartId, products } = await getProductsFromCartService(user.cartId, ctx);
    await ctx.render('cart', { cartId, products, user });
}

const loadProfile = async (ctx) => { 
    await ctx.render('profile', { user: ctx.state.user });
}

const processPurchase = async (ctx) => { 
    const { cartId, name, email, phone } = ctx.state.user;
    const { products } = await getProductsFromCartService(cartId, ctx);

    // 1. Se procesa la compra 
    await processPurchaseService(products, { cartId, name, email, phone });

    // 2. Se asigna un nuevo carrito vacío al usuario
    await createCartService(ctx);

    // 3. Se muestra vista de éxito en la compra al cliente
    await ctx.render('successPurchase', { cartId });
}

const loadSignUp = async (ctx) => { 
    if(ctx.isAuthenticated()){
        await ctx.redirect('/');
    } else {
        const data = await getInternationalPhoneCodesService();
        await ctx.render('signup', { countries: data });
    }
}

const postSignUp = async (ctx) => { 
    await ctx.redirect('/');
}

const failSignUp = async (ctx) => { 
    await ctx.render('signuperror');
}

const loadLogin = async (ctx) => { 
    if(ctx.isAuthenticated()){
        await ctx.redirect('/');
    } else {
        await ctx.render('login');
    }
}

const postLogin = async (ctx) => { 
    await ctx.redirect('/');
}

const failLogin = async (ctx) => { 
    await ctx.render('loginerror');
}

const doLogout = async (ctx) => { 
    const { email } = ctx.state.user;
    
    ctx.logout( err => {
        if(err) {
            ctx.response.status = 500;
            ctx.body = {
                status: 'Logout ERROR',
                body: err
            };
        }
    });
    await ctx.render('logout', { username: email });
}

module.exports = {
    loadRoot,
    loadCart,
    loadProfile,
    processPurchase,
    loadSignUp,
    loadLogin,
    postSignUp,
    postLogin,
    failSignUp,
    failLogin,
    doLogout
}