const axios = require('axios');
const { sendMail, ADMIN_MAIL } = require('../utils/nodemailer');
const { sendWhatsApp, sendSMS, TWILIO_WHATSAPP_PHONE_NUMBER, ADMIN_PHONE_NUMBER, TWILIO_SMS_PHONE_NUMBER } = require('../utils/twilio');
const DAOFactory = require('../daos/DAOFactory');
const factory = new DAOFactory();
const contenedorUsuarios = factory.createDAO('users');
const contenedorCodigosTelefono = factory.createDAO('phoneCodes');
const contenedorOrdenes = factory.createDAO('orders');

const createCartService = async (req) => {
    const { data: body } = await axios.post(`${req.protocol}://${req.get('host')}/api/carrito`, {
        email: req.user.email,
        deliveryAddress: req.user.address
    });
    const { id } = body;
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
        const { data: body } = await axios.get(`${req.protocol}://${req.get('host')}/api/carrito/${cartId}/productos`);
        return {
            cartId,
            products: body
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

    // 1. Registrar la orden 
    const cantidadOrdenes = await contenedorOrdenes.countDocuments();
    const newOrder = {
        items: productos,
        orderNumber: cantidadOrdenes + 1,
        timestamp: Date.now(),
        state: 'generada',
        email
    }

    const orderId = await contenedorOrdenes.save(newOrder);

    const productosHtml = productos.map(producto => {
        return `<p> - (${producto.units}) x ${producto.title} ($ ${producto.price}) | $ ${producto.units * producto.price}</p>`
    }).join("\n");

    // 2. Mail al admin del sitio 
    await sendMail({
        from: 'backend',
        to: ADMIN_MAIL,
        subject: `Nuevo pedido de ${name} | ${email}`,
        html: `<p>Se ha registrado un nuevo pedido con los siguientes productos:</p>
        ${productosHtml}
        <p>Total a pagar: $ ${productos.reduce((total, producto) => { return total + (producto.units * producto.price); }, 0)}</p>`
    });

    // 3. Mensaje de WhatsApp al admin del sitio
    await sendWhatsApp(`Nuevo pedido de ${name} | ${email}`, TWILIO_WHATSAPP_PHONE_NUMBER, ADMIN_PHONE_NUMBER);
    
    // 4. Mensaje SMS al cliente que realizó el pedido
    await sendSMS(`Estimado cliente: Su pedido ha sido recibido y se encuentra en proceso. Código de seguimiento: ${orderId}`, TWILIO_SMS_PHONE_NUMBER, `+${phone.prefix}${phone.number}`);

    return orderId;
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