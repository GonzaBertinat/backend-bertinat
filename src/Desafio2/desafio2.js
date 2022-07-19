const Contenedor = require('./Contenedor');

const television = {
    title: 'Smart TV Samsung 50 Pulgadas',
    price: 110000,
    thumbnail: 'https://images.fravega.com/f500/d7ca24bf5639a7db78c31aa9fa963be8.jpg'
}

const heladera = {
    title: 'Heladera No Frost Inverter Samsung',
    price: 150000,
    thumbnail: 'https://images.fravega.com/f500/5b55828e930e43edab6353cb3cde2633.jpg'
}

const lavarropas = {
    title: 'Lavarropas Carga Frontal 8Kg Drean',
    price: 100000,
    thumbnail: 'https://images.fravega.com/f500/a31063c7a260d8f902dc54fee1b128e3.jpg'
}

const contenedor = new Contenedor('./productos.txt');

const testContenedor = async () => {
    // Guardar productos con id 1, 2 y 3
    const idTelevision = await contenedor.save(television);
    console.log(`Televisión guardada con id: ${idTelevision}\n`);
    const idHeladera = await contenedor.save(heladera);
    console.log(`Heladera guardada con id: ${idHeladera}\n`);
    const idLavarropas = await contenedor.save(lavarropas);
    console.log(`Lavarropas guardado con id: ${idLavarropas}\n`);
    
    // Obtener el producto con el id 2
    const producto2 = await contenedor.getById(2);
    console.log(producto2, '\n');

    // Eliminar el producto con el id 2
    await contenedor.deleteById(2);

    // Obtener todos los productos, se muestran los productos con id 1 y 3
    const listaProductos = await contenedor.getAll();
    console.log('\nLista de productos\n', listaProductos);

    // Eliminar todos los productos
    await contenedor.deleteAll();   
}

testContenedor();
