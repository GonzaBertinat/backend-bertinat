const { graphqlHTTP } = require('express-graphql');
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
        units: Int,
        category: String
    }
    input ProductoInput {
        title: String,
        description: String,
        code: String,
        price: Float,
        thumbnail: String,
        stock: Int,
        category: String
    }
    type Carrito {
        id: String,
        timestamp: Float,
        products: [Producto],
        email: String,
        deliveryAddress: String
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
        getProductsByCategory(categoria: String): [Producto],
        getCartById(id: String): Carrito,
        getRandomProducts: [Producto],
        getServerInfo: ServerInfo,
        getInternationalPhoneCodes: [PhoneCode]
    }
    type Mutation {
        createProduct(producto: ProductoInput): Producto,
        updateProduct(id: String, producto: ProductoInput): Producto,
        deleteProduct(id: String): String,
        createCart(email: String, deliveryAddress: String): String,
        deleteCart(id: String): String,
        addProductToCart(cartId: String, productId: String, units: Int): Carrito,
        deleteProductFromCart(cartId: String, productId: String): Carrito
    }
`);

class GraphQLController {
    constructor(){
        return graphqlHTTP({
            schema,
            rootValue: {
                // Productos
                getProducts: productsService.getProductsService,
                getProductById: ({ id }) => productsService.getProductByIdService(id),
                createProduct: ({ producto }) => productsService.createProductService(producto),
                updateProduct: ({ id, producto }) => productsService.updateProductService(id, producto),
                deleteProduct: ({ id }) => productsService.deleteProductByIdService(id),
                getProductsByCategory: ({ categoria }) => productsService.getProductsByCategoryService(categoria),

                // Carritos
                createCart: ({ email, deliveryAddress }) => cartsService.createCartService(email, deliveryAddress),
                deleteCart: ({ id }) => cartsService.deleteCartByIdService(id),
                getCartById: ({ id }) => cartsService.getCartByIdService(id),
                addProductToCart: ({ cartId, productId, units  }) => cartsService.addProductToCartService(cartId, productId, units),
                deleteProductFromCart: ({ cartId, productId }) => cartsService.deleteProductFromCartService(cartId, productId),
                
                // Productos Mock
                getRandomProducts: productsTestService.getRandomProductsService,
                
                // Server info
                getServerInfo: serverService.getServerInfoService, 

                // Prefijos de teléfono
                getInternationalPhoneCodes: sessionService.getInternationalPhoneCodesService
            },
            graphiql: true
        });
    }
}

module.exports = GraphQLController;
