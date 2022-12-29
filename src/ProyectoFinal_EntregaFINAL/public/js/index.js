const socket = io();

const authorSchema = new normalizr.schema.Entity('author', undefined, { idAttribute: 'id' });

const messageSchema = new normalizr.schema.Entity('message', {
    author: authorSchema
});

const messagesSchema = new normalizr.schema.Entity('messages', {
    messages: [messageSchema]
});

const renderProducts = products => {
    const productsDiv = document.querySelector('#productos-container');

    fetch('/productsTemplate')
        .then(response => response.text())
        .then(text => { 
            let html = ejs.render(text, {products});
            productsDiv.innerHTML = html;
        });
}

socket.on('products', products => {
    renderProducts(products);
});

const sendProduct = e => {

    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const thumbnail = document.querySelector('#thumbnail');
    
    const product = {
        title: title.value,
        price: Number(price.value),
        thumbnail: thumbnail.value,

        // Se agregan valores por default para respetar el modelo
        description: "Descripción",
        code: "XXX123",
        stock: 10,
        timestamp: Date.now()
    }

    socket.emit('new-product', product);

    title.value = '';
    price.value = '';
    thumbnail.value = '';

    return false;
}

socket.on('messages', messages => {

    console.log('--- Mensajes normalizados ---', messages);
    const normalizedSize = JSON.stringify(messages).length;
    console.log('--- Tamaño = ' + normalizedSize);

    const denormalizedData = normalizr.denormalize(messages.result, messagesSchema, messages.entities);
    console.log('--- Mensajes denormalizados ---', denormalizedData);
    const denormalizedSize = JSON.stringify(denormalizedData).length;
    console.log('--- Tamaño = ' + denormalizedSize);

    const headerCompresion = document.querySelector('#porcentaje-compresion');
    const messagesDiv = document.querySelector('#mensajes-container');
    if(denormalizedData.messages.length > 0) {
        // Se calcula y muestra el porcentaje de compresión
        const porcentajeCompresion = ((normalizedSize / denormalizedSize) * 100).toFixed(2);
        headerCompresion.innerHTML = `Porcentaje de compresión: ${porcentajeCompresion} %`;

        // Se cargan los mensajes en la vista
        const html = denormalizedData.messages.map(message => {
            return `<div class="mensaje">
                <div class="mensaje__avatar">
                    <img src="uploads/${message.author.avatar}">
                </div>
                <span class="mensaje__email">${message.author.id}</span>
                [<span class="mensaje__fecha">${message.date}</span>] :
                <span class="mensaje__texto">${message.text}</span>
            </div>`
        }).join(" ");
        messagesDiv.innerHTML = html;
    } else {
        headerCompresion.innerHTML = '';
        messagesDiv.innerHTML = `<p class="mensajes__empty">No hay mensajes...</p>`;
    }
});

const sendMessage = e => {
    const email = document.querySelector('#user-email');
    const alias = document.querySelector('#alias');
    const mensaje = document.querySelector('#mensaje');

    const message = {
        author: {
            id: email.textContent,
            alias: alias.value,
        },
        text: mensaje.value
    }

    socket.emit('new-message', message);

    mensaje.value = '';
    return false;
}