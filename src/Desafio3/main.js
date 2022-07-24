const express = require('express');
const Contenedor = require('./Contenedor');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

const contenedor = new Contenedor('./productos.txt');

app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    console.log(productos);
    res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll(); 
    const id = Math.floor(Math.random() * productos.length);
    const producto = productos[id];
    if(producto){
        res.send(producto);
    } else {
        res.status(404).send({});
    }
});