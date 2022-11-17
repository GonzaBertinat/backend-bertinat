const axios = require('axios');
const { sendMail, ADMIN_MAIL } = require('../utils/nodemailer');
const { sendWhatsApp, sendSMS, TWILIO_WHATSAPP_PHONE_NUMBER, ADMIN_PHONE_NUMBER, TWILIO_SMS_PHONE_NUMBER } = require('../utils/twilio');
const { contenedorUsuarios } = require('../daos');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo');

const createCartService = async (req) => {
    const response = await axios.post(`${req.protocol}://${req.get('host')}/api/carrito/`, {});
    const { id } = response.data;
    req.user.cartId = id;
    await contenedorUsuarios.update(req.user);
    return req.user;
}

const getUserWithCartService = async (req) => {
    if(!req.user.cartId){
        return await createCartService(req);
    }
    return req.user;
}

const getProductsFromCartService = async (cartId, req) => {
    try {
        const response = await axios.get(`${req.protocol}://${req.get('host')}/api/carrito/${cartId}/productos`);
        return {
            cartId,
            products: response.data
        };
    } catch(err) {
        // En caso de error, creamos un nuevo carrito y retornamos la lista vacía de productos
        const userUpdated = await createCartService(req);
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
    const contenedorPaises = new ContenedorArchivo('./data/internationalPhoneCodes.json');
    return await contenedorPaises.getAll();
}

module.exports = {
    createCartService,
    getUserWithCartService,
    getProductsFromCartService,
    processPurchaseService,
    getInternationalPhoneCodesService
}