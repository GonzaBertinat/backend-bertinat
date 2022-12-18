const { getProductsService, 
        getProductByIdService,
        createProductService,
        updateProductService,
        deleteProductByIdService } = require('../service/products');

const logger = require('../utils/winston');

const getProducts = async (ctx) => { 
    const products = await getProductsService();
    ctx.response.status = 200;
    ctx.body = products;
}

const getProduct = async (ctx) => { 
    const { id } = ctx.request.params;
    const product = await getProductByIdService(id);
    if(!product) {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        ctx.response.status = 404;
        ctx.body = mensaje;
    } else {
        ctx.response.status = 200;
        ctx.body = product;
    }
}

const createProduct = async (ctx) => { 
    const newProduct = await createProductService(ctx.request.body);
    ctx.response.status = 201;
    ctx.body = {
        ok: true,
        status: 'Producto guardado con éxito',
        product: newProduct
    }
}

const updateProduct = async (ctx) => { 
    const { id } = ctx.request.params;
    const product = await getProductByIdService(id);
    if(product) {
        const productUpdated = await updateProductService(id, ctx.request.body);
        ctx.response.status = 200;
        ctx.body = {
            ok: true,
            status: 'Producto actualizado con éxito',
            product: productUpdated
        }
    } else {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        ctx.response.status = 404;
        ctx.body = mensaje;
    }
}

const deleteProduct = async (ctx) => { 
    const { id } = ctx.request.params;
    const product = await getProductByIdService(id);
    if(!product) {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        ctx.response.status = 404;
        ctx.body = mensaje;
    } else {
        await deleteProductByIdService(id);
        ctx.response.status = 200;
        ctx.body = {
            ok: true,
            status: 'Producto eliminado con éxito'
        }
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}