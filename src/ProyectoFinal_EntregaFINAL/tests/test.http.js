const http = require('http');
const assert = require('assert').strict;

const doRequest = (options, body) => {
    return new Promise ((resolve, reject) => {
        let req = http.request(options, res => {
            let body = ''
            res.on('data', d => {
                body += d;                    
            });

            res.on('end', () => {
                resolve({
                    data: JSON.parse(body),
                    status: res.statusCode
                });
            });
        })

        req.on('error', err => {
            reject(err);
        });

        if(body){
            req.write(body);
        }

        req.end();
    }); 
}

describe('Pruebas de API de Productos', () => {
    
    let idNuevoProducto = null;

    describe('Lectura de productos disponibles', () => {
        it('Debería retornar cinco productos', async () => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/api/productos',
                method: 'GET'
            }

            const response = await doRequest(options, null);
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
            const nuevoProducto = JSON.stringify({
                title: 'Microondas BGH Quick Chef',
                description: 'Microondas BGH Quick Chef',
                price: 39999,
                thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_868957-MLA51538271923_092022-F.webp',
                code: 'XXX101',
                stock: 10,
                category: 'electrodomesticos'
            });

            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/api/productos',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': nuevoProducto.length
                }
            }

            const response = await doRequest(options, nuevoProducto);
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
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/api/productos',
                method: 'GET'
            }

            const response = await doRequest(options, null);
            const { data: productos, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(productos.length, 6);
            assert.strictEqual(productos.map(p => p.id).includes(idNuevoProducto), true);
        });
    });

    describe('Modificación de un producto', () => {
        it('Debería actualizarse el producto Microondas', async () => {
            const optionsGet = {
                hostname: 'localhost',
                port: 3000,
                path: `/api/productos/${idNuevoProducto}`,
                method: 'GET'
            }

            // Se obtiene el producto Microondas del listado
            let response = await doRequest(optionsGet, null);
            const { data: microondas } = response;
            
            // Se modifica el precio a 50000 y el stock a 200
            microondas.price = 50000;
            microondas.stock = 200;
            
            const body = JSON.stringify(microondas);

            // Se actualiza el producto
            const optionsPut = {
                hostname: 'localhost',
                port: 3000,
                path: `/api/productos/${idNuevoProducto}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': body.length
                }
            }

            response = await doRequest(optionsPut, body);
            
            const { status } = response;
            const { product: productoActualizado } = response.data;
            const { price, stock } = productoActualizado;
            assert.strictEqual(status, 200);
            assert.strictEqual(price, 50000);
            assert.strictEqual(stock, 200);
        });

        it('Al consultar el Microondas debería tener los cambios aplicados', async () => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: `/api/productos/${idNuevoProducto}`,
                method: 'GET'
            }

            // Se obtiene el producto Microondas del listado
            const response = await doRequest(options, null);
            const { data: producto, status } = response;
            const { price, stock } = producto;
            assert.strictEqual(status, 200);
            assert.strictEqual(price, 50000);
            assert.strictEqual(stock, 200);
        });
    });

    describe('Borrado de un producto', () => {
        it('Debería eliminarse el producto Microondas', async () => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: `/api/productos/${idNuevoProducto}`,
                method: 'DELETE'
            }
            const response = await doRequest(options, null);
            const { data, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(data.status, 'Producto eliminado con éxito');
        });

        it('Ahora deberían existir de nuevo cinco productos', async () => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/api/productos',
                method: 'GET'
            }
        
            const response = await doRequest(options, null);    
            const { data: productos, status } = response;
            assert.strictEqual(status, 200);
            assert.strictEqual(productos.length, 5);

            // Además, no debería estar el microondas entre los productos
            const nombreProductos = productos.map(p => p.title);
            assert.strictEqual(nombreProductos.includes('Microondas BGH Quick Chef'), false);
        });
    });
});
