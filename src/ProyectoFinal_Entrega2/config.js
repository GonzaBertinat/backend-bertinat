/** Bases de datos SQL **/
const productosTabla = 'products';
const carritosTabla = 'carts';

// MySQL
const mysqlOptions = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        database: 'ecommerce'
    }
}

// SQLite
const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

/** Archivos **/
const productosPath = './db/productos.txt';
const carritosPath = './db/carritos.txt';

/** Bases de datos NO SQL **/
const mongoURL = 'mongodb+srv://GonzaloBertinat:admin123@coderhouse-cluster.kzsbufg.mongodb.net/ecommerce?retryWrites=true&w=majority';
const productosCollection = 'products';
const carritosCollection = 'carts';

const firebaseConfig = {
    type: "service_account",
    project_id: "backend-bertinat",
    private_key_id: "f56c66b70901e378ecd925ad36303e4d7342af8f",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDnUVFPKBgNHS9l\nqT6bzgcPqkKs+GzSyIc3WkeTd8B4k1UR0CD8/raIq+RAhv2HqrD40CCn95GF8yIy\nJmZsj1g7kifGcYnZIHwiJnqC5FqLJkyOxLRHi+PsXkUi9ZDxFM14w+7TkdbdnsTO\nomVP2apuaai/oqtG07RftYW++3XW7qDo2s7Cvk1bknfiAmxIBaC3JDAMkUOmjZtJ\ntiiNhog3sMsWKYakSQw1ge2RoCfQFRZJt/pwiXIT7HIFOnZQX0ZzUV39OxUyJRxw\nFny1je0Z+1tSzj1bC6rxQG6yf+VanfpVnQzEs5fEFTn+42tqt9Nfot9V3wv6hKkB\nqfE0t9vvAgMBAAECggEAP/+Lk27wWJB+kI3muIyj/32HvPtugFLitjnQG8jCA5of\nqzH+LoD6V43XNNMkSei71dsfbdlc9cZy65UcOWTfcHvbbVf0X5JRRdGHi7dKJb2O\n6OEbT8AwazEZx7ZRR6INxx/Ob9Kls+M9aD4d8Z2zPaEWAw8qfAoOmXxLaK+Bxtjw\nFbpoq6NxgvhM44oOtKyFmgdyC3dYJ+ZrNhKdlpp4xp3lf9RuhiU1+kLIk+gCPMp0\nskdjweF7e0ZlTHGTevV8dvpVmZyqmGGtqLzorBG2NHRFasTXl7BpMHo+La+YJ4nZ\nOY1W3cBnru8DtB32JpZrdF5PDT7b9eOr3H1KirSmwQKBgQD4Nwci0/+aIwCmIEOx\nqUBmDojYGRBs4b3gbhNLi7Yh+1GxeT42ONGY05ZfZ7N7WdV9fGqPrOPJGn7+a1OE\nh6truEuj7Hq5CH8UcSn9KjZprnCPrs1wVoQC2fMiF4pDS6waP5815/duE1bT8toL\nn8RIp++7sKsJnfJSQhjbCt2uaQKBgQDukp4ZhWr8/9foEQzqMJlfYz21F+jtXo5J\nyeCYUQwaF66AfE5WbRutciyS+4zrMa2lKNjEmP29zYUpsS+D/VLIUDBp3z9eaCmI\nNz/VxHXrz7GCvsv2sEUBBrTWH0+vLDoYgzvmLgMwFNXa2Vryu3gdoB/5aJQrLqmx\n1vzMLn6clwKBgFdo0XuDWqTGJMlb3VroNoR6I9it4unlCT/Ko8Lb3XTUEy3De5QO\nqEkAYhkQ5NTQiu0Y7lHQWZsNWKFx3ER0nnpduU1tzr3wbwgc3eOIhQbsZjlDHper\n7+stI4Di907BjEbmFsQd/zVlXBNhl0W2qqHHehYHngPR+m7bVfN1PSHZAn92WkYU\nYxuwZzu05MCDbZiouZLjQ/lJyJ7N/FhvN8XJK/Zlx0UVmwsgAIQcZq6B/yMlzB29\naih3AH4PMNdho0puFVnvK9FEBGiWKtKAOfZGBcMKGZ0VxFx3JdyQXPgq7sXjYzdT\n+X+bWrq81xdHU7lC+Szjjf3zbjLBBuZiZK5rAoGAdb+KH41qYXAXXgxqATzsCXUc\nZ1D+slATiaaz9HjjVoNz9W/rKxUTnRTh17S/CiYGnCe4GkxgSc3Ppz9ScbpyBRxC\nyxdg7tVZND6B/t5s4LCbI0JkQ5JNvWK4ube3ZGv2plgxiONnbibQlhaYG4L46YA8\nEnezurtLCFT4Dv7y+js=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-u0mns@backend-bertinat.iam.gserviceaccount.com",
    client_id: "109369787619432894522",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u0mns%40backend-bertinat.iam.gserviceaccount.com"
}

module.exports = {
    productosTabla,
    carritosTabla,
    mysqlOptions,
    sqliteOptions,
    productosPath,
    carritosPath,
    mongoURL,
    productosCollection,
    carritosCollection,
    firebaseConfig
}