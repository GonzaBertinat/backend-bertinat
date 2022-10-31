require('dotenv').config();

module.exports = {
    express: {
        port: process.env.PORT
    },
    mysqlOptions: {
        client: process.env.MYSQL_CLIENT,
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        }
    },
    sqliteOptions: {
        client: process.env.SQLITE_CLIENT,
        connection: {
            filename: process.env.SQLITE_FILENAME
        },
        useNullAsDefault: Boolean(process.env.SQLITE_USE_NULL_AS_DEFAULT)
    },
    productosTabla: process.env.TABLA_PRODUCTOS,
    carritosTabla: process.env.TABLA_CARRITOS,
    productosPath: process.env.PRODUCTOS_PATH,
    carritosPath: process.env.CARRITOS_PATH,
    mongoURL: process.env.MONGO_URL,
    firebaseConfig: {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    },
    productosCollection: process.env.COLECCION_PRODUCTOS,
    carritosCollection: process.env.COLECCION_CARRITOS,
    mensajesCollection: process.env.COLECCION_MENSAJES,
    usuariosCollection: process.env.COLECCION_USUARIOS,
    session: {
        sessionSecret: process.env.SESSION_SECRET,
        cookieSecret: process.env.COOKIE_SECRET,
        expirationTime: Number(process.env.SESSION_EXPIRATION_TIME)
    },
    metodoPersistencia: {
        productos: process.env.METODO_PERSISTENCIA_PRODUCTOS,
        carritos: process.env.METODO_PERSISTENCIA_CARRITOS,
        mensajes: process.env.METODO_PERSISTENCIA_MENSAJES,
        usuarios: process.env.METODO_PERSISTENCIA_USUARIOS
    } 
}