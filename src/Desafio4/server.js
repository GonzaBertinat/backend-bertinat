const express = require('express');
const ProductosAPI = require('./ProductosAPI');

const PORT = process.env.PORT || 8080;
const app = express();
const productosAPI = new ProductosAPI();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', productosAPI.router);

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));
