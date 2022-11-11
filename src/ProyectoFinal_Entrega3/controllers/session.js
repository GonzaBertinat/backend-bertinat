const axios = require('axios');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo');
const { contenedorUsuarios } = require('../daos');
const { sendMail, ADMIN_MAIL } = require('../utils/nodemailer');
const { sendSMS, sendWhatsApp, TWILIO_SMS_PHONE_NUMBER, TWILIO_WHATSAPP_PHONE_NUMBER, ADMIN_PHONE_NUMBER } = require('../utils/twilio');

const loadRoot = async (req, res) => {
    const user = await getUserWithCart(req);
    res.render('home', { user });
}

const loadCart = async (req, res) => {
    const user = await getUserWithCart(req);
    // Se toma el id del carrito y se obtienen los productos
    let { cartId } = user;
    let products = [];
    try {
        const response = await axios.get(`${req.protocol}://${req.get('host')}/api/carrito/${cartId}/productos`);
        products = response.data;
    } catch(err){
        // En caso de error, creamos un nuevo carrito y retornamos la lista vacía de productos
        const userUpdated = await createCart(req);
        cartId = userUpdated.cartId;
    }
    res.render('cart', { cartId, products, user });
}

const loadProfile = async (req, res) => {
    res.render('profile', { user: req.user });
}

const processPurchase = async (req, res) => {
    const { cartId, name, email, phone } = req.user;

    const response = await axios.get(`${req.protocol}://${req.get('host')}/api/carrito/${cartId}/productos`);
    const productos = response.data;

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

    // 4. Se asigna un nuevo carrito vacío al usuario
    await createCart(req);

    // 5. Se muestra vista de éxito en la compra al cliente
    res.render('successPurchase', { cartId });
}

const loadSignUp = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        const contenedorPaises = new ContenedorArchivo('./data/internationalPhoneCodes.json');
        const data = await contenedorPaises.getAll();
        res.render('signup', { countries: data });
    }
}

const loadLogin = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        res.render('login');
    }
}

const postSignUp = async (req, res) => {
    res.redirect('/');
}

const postLogin = async (req, res) => {
    res.redirect('/');
}

const failSignUp = async (req, res) => {
    res.render('signuperror');
}

const failLogin = async (req, res) => {
    res.render('loginerror');
}

const doLogout = async (req, res) => {
    const { email } = req.user;
    req.logout( err => {
        if(err) {
            return res.status(500).json({
                status: 'Logout ERROR',
                body: err
            })
        }
    });
    res.render('logout', { username: email });
}

// Funciones para almacenar un id de carrito dentro de un usuario
const createCart = async (req) => {
    const response = await axios.post(`${req.protocol}://${req.get('host')}/api/carrito/`, {});
    const { id } = response.data;
    req.user.cartId = id;
    await contenedorUsuarios.update(req.user);
    return req.user;
}

const getUserWithCart = async (req) => {
    if(!req.user.cartId){
        return await createCart(req);
    }
    return req.user;
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