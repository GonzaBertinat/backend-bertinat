const request = require('supertest')('http://localhost:3000');
const expect = require('chai').expect;

describe('Pruebas de API de Productos', () => {
    
    let idNuevoProducto = null;

    describe('Lectura de productos disponibles', () => {
        it('Debería retornar cinco productos', async () => {
            const response = await request.get('/api/productos');
            const { body: productos, status } = response;
            expect(status).to.eql(200);
            expect(productos.length).to.eql(5);
            
            // Los productos deberían ser: TV, Notebook, Celular Samsung, Auriculares y Silla
            const nombreProductos = productos.map(producto => producto.title);
            expect(nombreProductos.includes('Smart TV Samsung - 50" 4K')).to.eql(true);
            expect(nombreProductos.includes('Notebook HP -  15-ef2126wm - 15.6"')).to.eql(true);
            expect(nombreProductos.includes('Samsung Galaxy S22+ 8gb 256gb Phantom Black')).to.eql(true);
            expect(nombreProductos.includes('Auriculares inalámbricos Sony WH-CH510 azul')).to.eql(true);
            expect(nombreProductos.includes('Silla de escritorio ergonómica negra')).to.eql(true);
            // Cualquier otro producto no debe formar parte de la lista
            expect(nombreProductos.includes('Microondas')).to.eql(false);
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
                stock: 10
            };

            const response = await request.post('/api/productos').send(nuevoProducto);
            const { body, status } = response;      
            const { id, title, description, price, thumbnail, code, stock } = body.product;
            idNuevoProducto = id;
            
            expect(status).to.eql(201);
            expect(title).to.eql('Microondas BGH Quick Chef');
            expect(description).to.eql('Microondas BGH Quick Chef');
            expect(price).to.eql(39999);
            expect(thumbnail).to.eql('https://http2.mlstatic.com/D_NQ_NP_2X_868957-MLA51538271923_092022-F.webp');
            expect(code).to.eql('XXX101');
            expect(stock).to.eql(10);
        });

        it('Ahora deberían existir seis productos', async () => {
            // Ahora la lista de productos debería tener 6 en total e incluir al Microondas
            const response = await request.get('/api/productos');
            const { body: productos, status } = response;
    
            expect(status).to.eql(200);
            expect(productos.length).to.eql(6);
            expect(productos.map(p => p.id).includes(idNuevoProducto)).to.eql(true);
        });
    });

    describe('Modificación de un producto', () => {
        it('Debería actualizarse el producto Microondas', async () => {   
            // Se obtiene el producto Microondas del listado
            let response = await request.get(`/api/productos/${idNuevoProducto}`);
            const { body: microondas } = response;
            
            // Se modifica el precio a 50000 y el stock a 200
            microondas.price = 50000;
            microondas.stock = 200;
            
            // Se actualiza el producto
            response = await request.put(`/api/productos/${idNuevoProducto}`).send(microondas);
            const { status } = response;
            const { product: productoActualizado } = response.body;
            const { price, stock } = productoActualizado;
            expect(status).to.eql(200);
            expect(price).to.eql(50000);
            expect(stock).to.eql(200);
        });

        it('Al consultar el Microondas debería tener los cambios aplicados', async () => {
            // Se obtiene el producto Microondas del listado
            const response = await request.get(`/api/productos/${idNuevoProducto}`);
            const { body: producto, status } = response;
            const { price, stock } = producto;
            expect(status).to.eql(200);
            expect(price).to.eql(50000);
            expect(stock).to.eql(200);
        });
    });

    describe('Borrado de un producto', () => {
        it('Debería eliminarse el producto Microondas', async () => {
            const response = await request.delete(`/api/productos/${idNuevoProducto}`);
            const { body, status } = response;
            expect(status).to.eql(200);
            expect(body.status).to.eql('Producto eliminado con éxito');
        });

        it('Ahora deberían existir de nuevo cinco productos', async () => {
            const response = await request.get('/api/productos');
            const { body: productos, status } = response;
            expect(status).to.eql(200);
            expect(productos.length).to.eql(5);

            // Además, no debería estar el microondas entre los productos
            const nombreProductos = productos.map(p => p.title);
            expect(nombreProductos.includes('Microondas BGH Quick Chef')).to.eql(false);
        });
    });
});



