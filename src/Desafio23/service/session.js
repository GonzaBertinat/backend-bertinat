const axios = require('axios');
const { sendMail, ADMIN_MAIL } = require('../utils/nodemailer');
const { sendWhatsApp, sendSMS, TWILIO_WHATSAPP_PHONE_NUMBER, ADMIN_PHONE_NUMBER, TWILIO_SMS_PHONE_NUMBER } = require('../utils/twilio');
const DAOFactory = require('../daos/DAOFactory');
const factory = new DAOFactory();
const contenedorUsuarios = factory.createDAO('users');
const contenedorCodigosTelefono = factory.createDAO('phoneCodes');

const createCartService = async (ctx) => { 
    const { data: body } = await axios.post(`${ctx.request.origin}/graphql`, {
        query: `
            mutation {
                createCart
            }
        `
    });
    const { createCart: id } = body.data;
    ctx.state.user.cartId = id;
    await contenedorUsuarios.update(ctx.state.user);
    return ctx.state.user;
}

const getUserWithCartService = async (ctx) => { 
    if(!ctx.state.user.cartId){
        return await createCartService(ctx);
    }
    return ctx.state.user;
}

const getProductsFromCartService = async (cartId, ctx) => { 
    try {
        const { data: body } = await axios.post(`${ctx.request.origin}/graphql`, {
            query: `
                query {
                    getCartById(id: "${cartId}") {
                        id,
                        timestamp,
                        products { id, title, description, price, thumbnail, code, stock, timestamp, units }
                    }
                }
            `
        });
        return {
            cartId,
            products: body.data.getCartById.products
        };
    } catch(err) {
        // En caso de error, creamos un nuevo carrito y retornamos la lista vacía de productos
        const userUpdated = await createCartService(ctx);
        return {
            cartId: userUpdated.cartId,
            products: []
        }
    }
}

const processPurchaseService = async (productos, userData) => { 
    const { cartId, name, email, phone } = userData;

    const productosHtml = productos.map(producto => {
        return `<p> - (${producto.units}) x ${producto.title} ($ ${producto.price}) | $ ${producto.units * producto.price}</p>`
    }).join("\n");

    // 1. Mail al admin del sitio 
    await sendMail({
        from: 'backend',
        to: ADMIN_MAIL,
        subject: `Nuevo pedido de ${name} | ${email}`,
        html: `<p>Se ha registrado un nuevo pedido con los siguientes productos:</p>
        ${productosHtml}
        <p>Total a pagar: $ ${productos.reduce((total, producto) => { return total + (producto.units * producto.price); }, 0)}</p>`
    });

    // 2. Mensaje de WhatsApp al admin del sitio
    await sendWhatsApp(`Nuevo pedido de ${name} | ${email}`, TWILIO_WHATSAPP_PHONE_NUMBER, ADMIN_PHONE_NUMBER);
    
    // 3. Mensaje SMS al cliente que realizó el pedido
    await sendSMS(`Estimado cliente: Su pedido ha sido recibido y se encuentra en proceso. Código de seguimiento: ${cartId}`, TWILIO_SMS_PHONE_NUMBER, `+${phone.prefix}${phone.number}`);
}

const getInternationalPhoneCodesService = async () => { 
    return await contenedorCodigosTelefono.getAll();
}

module.exports = {
    createCartService,
    getUserWithCartService,
    getProductsFromCartService,
    processPurchaseService,
    getInternationalPhoneCodesService
}