const knex = require('knex');
const { options: mysqlOptions } = require('./config/mysql');
const { options: sqliteOptions } = require('./config/sqlite3');

const mysql = knex(mysqlOptions);
const sqlite = knex(sqliteOptions);

// Creación de tabla de Productos en MariaDB
mysql.schema.withSchema('ecommerce').createTable('products', table => {
    table.increments('id');
    table.string('title');
    table.float('price');
    table.string('thumbnail');
    table.bigInteger('timestamp');
    table.string('description');
    table.string('code');
    table.integer('stock');
})
.then(result => console.log('Tabla de productos creada satisfactoriamente'))
.catch(err => console.log(err))
.finally(() => mysql.destroy());

// Creación de tabla de Mensajes en SQLite3
sqlite.schema.createTable('messages', table => {
    table.increments('id');
    table.string('email');
    table.string('text');
    table.string('date');
})
.then(result => console.log('Tabla de mensajes creada satisfactoriamente'))
.catch(err => console.log(err))
.finally(() => sqlite.destroy());
