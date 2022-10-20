const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { contenedorUsuarios } = require('../daos');

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
        const usuario = await contenedorUsuarios.getByCustomFilter({ email: username });
        if(usuario){
            console.log('El usuario ya está registrado!');
            return done(null, false);
        }
    
        // Si no existe el usuario, lo creamos
        const newUser = {
            email: username,
            password: createHash(password)
        }
        const id = await contenedorUsuarios.save(newUser);
        
        console.log('Usuario registrado exitosamente');
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
            console.log(`No se encontró el usuario con el email: ${username}`);
            return done(null, false);
        }

        if(!isValidPassword(usuario, password)){
            console.log(`Contraseña incorrecta`);
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