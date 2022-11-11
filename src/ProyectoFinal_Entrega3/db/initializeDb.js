const knex = require('knex');
const { mysqlOptions, sqliteOptions } = require('../config');
const logger = require('../utils/winston');

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
.then(result => logger.info('Tabla de productos creada satisfactoriamente'))
.catch(err => logger.error(err))
.finally(() => mysql.destroy());

// Creación de tabla de Mensajes en SQLite3
sqlite.schema.createTable('messages', table => {
    table.increments('id');
    table.string('email');
    table.string('text');
    table.string('date');
})
.then(result => logger.info('Tabla de mensajes creada satisfactoriamente'))
.catch(err => logger.error(err))
.finally(() => sqlite.destroy());
