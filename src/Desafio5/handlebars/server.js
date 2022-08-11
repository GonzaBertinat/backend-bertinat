const express = require('express');
const handlebars = require('express-handlebars');
const productsRouter = require('./routes/products');

const PORT = process.env.PORT || 8080;
const app = express();

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('form', { titulo: 'Cargar producto' });
})

app.use('/productos', productsRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));
