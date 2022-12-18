const { graphqlHTTP } = require('koa-graphql'); 
const { buildSchema } = require('graphql');

const productsService = require('../service/products');
const cartsService = require('../service/cart');
const productsTestService = require('../service/products-test');
const serverService = require('../service/server');
const sessionService = require('../service/session');

const schema = buildSchema(`
    type Producto {
        id: String,
        title: String,
        description: String,
        price: Float,
        thumbnail: String,
        code: String,
        stock: Int,
        timestamp: Float,
        units: Int
    }
    input ProductoInput {
        title: String,
        description: String,
        code: String,
        price: Float,
        thumbnail: String,
        stock: Int
    }
    type Carrito {
        id: String,
        timestamp: Float,
        products: [Producto] 
    }
    type ServerInfo {
        argumentosEntrada: [String],
        nombrePlataforma: String,
        versionNodeJS: String,
        memoriaTotalReservada: Float,
        pathEjecucion: String,
        processId: Int,
        carpetaProyecto: String,
        numeroProcesadores: Int
    }
    type PhoneCode {
        id: Int,
        country: String,
        phone_code: String
    }
    type Query {
        getProducts: [Producto],
        getProductById(id: String): Producto,
        getCartById(id: String): Carrito,
        getRandomProducts: [Producto],
        getServerInfo: ServerInfo,
        getInternationalPhoneCodes: [PhoneCode]
    }
    type Mutation {
        createProduct(producto: ProductoInput): Producto,
        updateProduct(id: String, producto: ProductoInput): Producto,
        deleteProduct(id: String): String,
        createCart: String,
        deleteCart(id: String): String,
        addProductToCart(cartId: String, productId: String): Carrito,
        deleteProductFromCart(cartId: String, productId: String): Carrito
    }
`);

class GraphQLController {
    constructor(){
        return graphqlHTTP({
            schema,
            graphiql: true,
            rootValue: {
                // Productos
                getProducts: productsService.getProductsService,
                getProductById: ({ id }) => productsService.getProductByIdService(id),
                createProduct: ({ producto }) => productsService.createProductService(producto),
                updateProduct: ({ id, producto }) => productsService.updateProductService(id, producto),
                deleteProduct: ({ id }) => productsService.deleteProductByIdService(id),
                
                // Carritos
                createCart: cartsService.createCartService,
                deleteCart: ({ id }) => cartsService.deleteCartByIdService(id),
                getCartById: ({ id }) => cartsService.getCartByIdService(id),
                addProductToCart: ({ cartId, productId }) => cartsService.addProductToCartService(cartId, productId),
                deleteProductFromCart: ({ cartId, productId }) => cartsService.deleteProductFromCartService(cartId, productId),
                
                // Productos Mock
                getRandomProducts: productsTestService.getRandomProductsService,
                
                // Server info
                getServerInfo: serverService.getServerInfoService, 

                // Prefijos de teléfono
                getInternationalPhoneCodes: sessionService.getInternationalPhoneCodesService
            }
        });
    }
}

module.exports = GraphQLController;
