// Creación de base de datos
use ecommerce;

// Creación de colecciones
db.createCollection('mensajes');
db.createCollection('productos');

// Carga de 10 documentos para cada colección
db.productos.insertOne({title: 'Televisión 32 Pulgadas', price: 150, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_686081-MLA47203370323_082021-F.jpg', timestamp: new Timestamp(), description: 'Smart TV Philips 6800 Series 32PHD6825/77 LED HD 32" 110V/240V', code: 'AAA_001'});
db.productos.insertOne({title: 'Aire Acondicionado Split', price: 300, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_694117-MLA40282485103_122019-F.jpg', timestamp: new Timestamp(), description: 'Aire acondicionado BGH Silent Air split frío/calor 3000 frigorías blanco 220V BS35WCCR', code: 'AAA_002'});
db.productos.insertOne({title: 'Lavarropas Carga Superior', price: 500, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_674561-MLA32542008579_102019-F.jpg', timestamp: new Timestamp(), description: 'Lavarropas automático Samsung WA80F5S4UD plata 8kg 220 V', code: 'AAA_003'});
db.productos.insertOne({title: 'Heladera No Frost', price: 1000, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_976585-MLA40492791635_012020-F.jpg', timestamp: new Timestamp(), description: 'Heladera inverter no frost Samsung RT38K5932 inox con freezer 382L 220V', code: 'AAA_004'});
db.productos.insertOne({title: 'Celular Samsung S22 Ultra', price: 1500, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_668050-MLA49303776893_032022-F.jpg', timestamp: new Timestamp(), description: 'Samsung Galaxy S22 Ultra 12gb 256gb Green', code: 'AAA_005'});
db.productos.insertOne({title: 'Notebook Lenovo Thinkpad', price: 2000, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_951326-MLA51194986817_082022-F.jpg', timestamp: new Timestamp(), description: 'Notebook Lenovo ThinkPad L15 Gen 2 negra 15.6", Intel Core i7 1165G7 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 96EUs 1366x768px FreeDOS', code: 'AAA_006'});
db.productos.insertOne({title: 'PlayStation 5', price: 2750, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_841787-MLA44484414455_012021-F.jpg', timestamp: new Timestamp(), description: 'Sony PlayStation 5 825GB Standard color blanco y negro', code: 'AAA_007'});
db.productos.insertOne({title: 'Cafetera Express', price: 3500, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_668428-MLA45293283628_032021-F.jpg', timestamp: new Timestamp(), description: 'Cafetera Nescafé Moulinex Dolce Gusto Genio S automática blanca para cápsulas monodosis 230V', code: 'AAA_008'});
db.productos.insertOne({title: 'Microondas', price: 4250, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_779516-MLA41329962823_042020-F.jpg', timestamp: new Timestamp(), description: 'Microondas BGH Quick Chef B120DB9 blanco 20L 220V', code: 'AAA_009'});
db.productos.insertOne({title: 'Reloj inteligente', price: 4900, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_772017-MLA50416734366_062022-F.jpg', timestamp: new Timestamp(), description: 'Xiaomi Mi Smart Band 7 1.62" caja negra, malla negra', code: 'AAA_010'});

db.mensajes.insertOne({email: 'juan@gmail.com', text: 'Hola Maru! Cómo estás?', date: new Date()});
db.mensajes.insertOne({email: 'maria@gmail.com', text: 'Hola Juancito! Todo bien, y vos?', date: new Date()});
db.mensajes.insertOne({email: 'juan@gmail.com', text: 'Todo en orden! Qué andas haciendo?', date: new Date()});
db.mensajes.insertOne({email: 'maria@gmail.com', text: 'Uff.. A full con la entrega de Mongo! Vos?', date: new Date()});
db.mensajes.insertOne({email: 'juan@gmail.com', text: 'Sii, yo mirando Netflix... No sabés que buena la serie que enganché!', date: new Date()});
db.mensajes.insertOne({email: 'maria@gmail.com', text: 'Qué bueno! Ya entregaste el desafío?', date: new Date()});
db.mensajes.insertOne({email: 'juan@gmail.com', text: 'Noo.. Lo vengo pateando, el jueves lo entrego', date: new Date()});
db.mensajes.insertOne({email: 'maria@gmail.com', text: 'Uh.. sos terrible! No te dejes estar que el curso se pone más difícil!', date: new Date()});
db.mensajes.insertOne({email: 'juan@gmail.com', text: 'Tranqui, termino este capítulo y arranco, lo prometo!', date: new Date()});
db.mensajes.insertOne({email: 'maria@gmail.com', text: 'Dale dale... estamos hablando, saludos!', date: new Date()});

// Listar todos los documentos en cada colección
db.productos.find();
db.mensajes.find();

// Mostrar la cantidad de documentos almacenados en cada colección
db.productos.estimatedDocumentCount();
db.mensajes.estimatedDocumentCount();

// CRUD:
// Agregar un producto más en la colección de productos - (C)reate
db.productos.insertOne({title: 'Impresora Multifunción', price: 1250, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_729863-MLA50606451366_072022-F.jpg', timestamp: new Timestamp(), description: 'Impresora a color multifunción HP Deskjet Ink Advantage 3775 con wifi blanca y azul 200V - 240V', code: 'AAA_011'});

// Consultas de productos - (R)ead
// Consulta por nombre de producto específico
db.productos.find({title: 'PlayStation 5'});
// Listar los productos con precio menor a 1000 pesos
db.productos.find({price: {$lt: 1000}});
// Listar los productos con precio entre los 1000 y los 3000 pesos
db.productos.find({$and: [{price: {$gte: 1000}}, {price: {$lte: 3000}}]});
// Listar los productos con precio mayor a 3000 pesos
db.productos.find({price: {$gt: 3000}});
// Consulta que traiga sólo el nombre del tercer producto más barato
db.productos.find({}, {"title": 1}).sort({price: 1}).skip(2).limit(1);

// Actualizar todos los productos - (U)pdate - Agregar stock = 100
db.productos.updateMany({}, {$set: {stock: 100}});
// Cambiar el stock a cero de los productos con precios mayores a 4000 pesos
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});

// Borrar los productos con precio menor a 1000 pesos - (D)elete
db.productos.deleteMany({price: {$lt: 1000}});

// Creación de un usuario de sólo lectura
use admin;
db.createUser({user: 'pepe', pwd: 'asd456', roles: [{ role: 'read', db: 'ecommerce' }]});