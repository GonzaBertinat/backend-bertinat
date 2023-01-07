const axios = require('axios');
const assert = require('assert').strict;

describe('Pruebas de API de Productos', () => {
    const API_PRODUCTOS = 'http://localhost:3000/api/productos';
    let idNuevoProducto = null;

    describe('Lectura de productos disponibles', () => {
        it('Debería retornar cinco productos', async () => {
            const response = await axios.get(API_PRODUCTOS);
            const { data: productos, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(productos.length, 5);
            
            // Los productos deberían ser: TV, Notebook, Celular Samsung, Auriculares y Silla
            const nombreProductos = productos.map(producto => producto.title);
            assert.strictEqual(nombreProductos.includes('Smart TV Samsung - 50" 4K'), true);
            assert.strictEqual(nombreProductos.includes('Notebook HP -  15-ef2126wm - 15.6"'), true);
            assert.strictEqual(nombreProductos.includes('Samsung Galaxy S22+ 8gb 256gb Phantom Black'), true);
            assert.strictEqual(nombreProductos.includes('Auriculares inalámbricos Sony WH-CH510 azul'), true);
            assert.strictEqual(nombreProductos.includes('Silla de escritorio ergonómica negra'), true);
            // Cualquier otro producto no debe formar parte de la lista
            assert.strictEqual(nombreProductos.includes('Microondas'), false);
        });
    });

    describe('Incorporación de nuevos productos', () => {
        it('Debería crearse un nuevo producto', async () => {
            const nuevoProducto = {
                title: 'Microondas BGH Quick Chef',
                description: 'Microondas BGH Quick Chef',
                price: 39999,
                thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_868957-MLA51538271923_092022-F.webp',
                code: 'XXX101',
                stock: 10,
                category: 'electrodomesticos'
            }

            const response = await axios.post(API_PRODUCTOS, nuevoProducto);
            const { data, status } = response;
            const { id, title, description, price, thumbnail, code, stock } = data.product;
            idNuevoProducto = id;
            
            assert.strictEqual(status, 201);
            assert.strictEqual(title, 'Microondas BGH Quick Chef');
            assert.strictEqual(description, 'Microondas BGH Quick Chef');
            assert.strictEqual(price, 39999);
            assert.strictEqual(thumbnail, 'https://http2.mlstatic.com/D_NQ_NP_2X_868957-MLA51538271923_092022-F.webp');
            assert.strictEqual(code, 'XXX101');
            assert.strictEqual(stock, 10);
        });

        it('Ahora deberían existir seis productos', async () => {
            // Ahora la lista de productos debería tener 6 en total e incluir al Microondas
            const response = await axios.get(API_PRODUCTOS);
            const { data: productos, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(productos.length, 6);
            assert.strictEqual(productos.map(p => p.id).includes(idNuevoProducto), true);
        });
    });

    describe('Modificación de un producto', () => {
        it('Debería actualizarse el producto Microondas', async () => {
            // Se obtiene el producto Microondas del listado
            let response = await axios.get(`${API_PRODUCTOS}/${idNuevoProducto}`);
            const { data: microondas } = response;
            
            // Se modifica el precio a 50000 y el stock a 200
            microondas.price = 50000;
            microondas.stock = 200;

            // Se actualiza el producto
            response = await axios.put(`${API_PRODUCTOS}/${idNuevoProducto}`, microondas);
            const { status } = response;
            const { product: productoActualizado } = response.data;
            const { price, stock } = productoActualizado;
            assert.strictEqual(status, 200);
            assert.strictEqual(price, 50000);
            assert.strictEqual(stock, 200);
        });

        it('Al consultar el Microondas debería tener los cambios aplicados', async () => {
            const response = await axios.get(`${API_PRODUCTOS}/${idNuevoProducto}`);
            const { data: producto, status } = response;
            const { price, stock } = producto;
            assert.strictEqual(status, 200);
            assert.strictEqual(price, 50000);
            assert.strictEqual(stock, 200);
        });
    });

    describe('Borrado de un producto', () => {
        it('Debería eliminarse el producto Microondas', async () => {
            const response = await axios.delete(`${API_PRODUCTOS}/${idNuevoProducto}`);
            const { data, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(data.status, 'Producto eliminado con éxito');
        });

        it('Ahora deberían existir de nuevo cinco productos', async () => {
            const response = await axios.get(API_PRODUCTOS);
            const { data: productos, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(productos.length, 5);

            // Además, no debería estar el microondas entre los productos
            const nombreProductos = productos.map(p => p.title);
            assert.strictEqual(nombreProductos.includes('Microondas BGH Quick Chef'), false);
        });
    });
});
