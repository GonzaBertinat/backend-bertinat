const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { contenedorUsuarios } = require('../daos');
const { sendMail, ADMIN_MAIL } = require('../utils/nodemailer');
const logger = require('../utils/winston');

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

const signupStrategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const { name, address, age, phone_prefix, phone_number} = req.body;
        const { filename } = req.file;
        
        const usuario = await contenedorUsuarios.getByCustomFilter({ email: username });
        if(usuario){
            logger.warn('El usuario ya está registrado!');
            return done(null, false);
        }
    
        // Si no existe el usuario, lo creamos
        const newUser = {
            email: username,
            password: createHash(password),
            name,
            address,
            age,
            phone: {
                prefix: phone_prefix,
                number: phone_number
            },
            avatar: filename
        }

        const id = await contenedorUsuarios.save(newUser);
        
        logger.info('Usuario registrado exitosamente');

        sendMail({
            from: 'backend',
            to: ADMIN_MAIL,
            subject: 'Nuevo registro',
            html: `<p>Se ha registrado un nuevo usuario con los siguientes datos:</p>
            <p>Email: ${newUser.email}</p>
            <p>Nombre: ${newUser.name}</p>
            <p>Edad: ${newUser.age}</p>
            <p>Dirección: ${newUser.address}</p>
            <p>Teléfono: +${newUser.phone.prefix} ${newUser.phone.number}</p>`
        });

        return done(null, {email: newUser.email, id});
    } catch(error) {
        return done(error);
    }
});

const loginStrategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async (username, password, done) => {    
    try {
        const usuario = await contenedorUsuarios.getByCustomFilter({ email: username });
        
        if(!usuario){
            logger.warn(`No se encontró el usuario con el email: ${username}`);
            return done(null, false);
        }

        if(!isValidPassword(usuario, password)){
            logger.warn(`Contraseña incorrecta`);
            return done(null, false);
        }

        return done(null, usuario);
    } catch(error) {
        return done(error);
    }
});

const serializeUser = (user, done) => {
    done(null, user.id);
}

const deserializeUser = async (id, done) => {
    const user = await contenedorUsuarios.getById(id);
    done(null, user);
}

module.exports = {
    signupStrategy,
    loginStrategy,
    serializeUser,
    deserializeUser
}