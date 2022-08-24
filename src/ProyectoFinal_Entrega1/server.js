const express = require('express');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.originalUrl} - método ${req.method} no implementada`,
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));
