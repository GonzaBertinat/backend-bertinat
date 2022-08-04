const express = require('express');

class ProductosAPI {
    
    constructor() {
        this.router = this.getRouter();
        this.products = [];
        this.id = 1;
    };

    getRouter() {
        const router = express.Router();

        router.get('/', (req, res) => {
            res.json(this.products);
        });
        
        router.get('/:id', (req, res) => {
            const { id } = req.params;
            const product = this.products.find(product => product.id === Number(id));
            if(!product) {
                res.status(404).json({error: 'producto no encontrado'});
            } else {
                res.json(product);
            }
        });
        
        router.post('/', (req, res) => {
            const newProduct = {
                id: this.id++, 
                title: req.body.title,
                price: Number(req.body.price),
                thumbnail: req.body.thumbnail
            };
            this.products = [...this.products, newProduct];
            res.status(201).json({
                ok: true,
                status: 'Producto guardado con éxito',
                product: newProduct
            }) 
        });
        
        router.put('/:id', (req, res) => {
            const { id } = req.params;
            const productIndex = this.products.findIndex(product => product.id === Number(id));
            
            if(productIndex < 0) {
                res.status(404).json({error: 'producto no encontrado'});
            } else {
                const updatedProduct = {
                    id: this.products[productIndex].id,
                    title: req.body.title,
                    price: req.body.price,
                    thumbnail: req.body.thumbnail
                }
                this.products[productIndex] = updatedProduct;
    
                res.json({
                    ok: true,
                    status: 'Producto actualizado con éxito',
                    product: updatedProduct
                }) 
            }
        });
        
        router.delete('/:id', (req, res) => {
            const { id } = req.params;
            const product = this.products.find(product => product.id === Number(id));
            if(!product) {
                res.status(404).json({error: 'producto no encontrado'});
            } else {
                this.products = this.products.filter(product => product.id !== Number(id));
                res.json({
                    ok: true,
                    status: 'Producto eliminado con éxito'
                });
            }
        });

        return router;
    }
}

module.exports = ProductosAPI;