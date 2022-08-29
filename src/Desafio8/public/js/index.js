const socket = io();

socket.on('products', products => {
    const productsDiv = document.querySelector('#productos-container');

    fetch('/productsTemplate')
        .then(response => response.text())
        .then(text => { 
            let html = ejs.render(text, {products});
            productsDiv.innerHTML = html;
        });
});

const sendProduct = e => {

    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const thumbnail = document.querySelector('#thumbnail');
    
    const product = {
        title: title.value,
        price: Number(price.value),
        thumbnail: thumbnail.value
    }

    socket.emit('new-product', product);

    title.value = '';
    price.value = '';
    thumbnail.value = '';

    return false;
}

socket.on('messages', messages => {
    const messagesDiv = document.querySelector('#mensajes-container');
    
    if(messages.length > 0) {
        const html = messages.map(message => {
            return `<div class="mensaje">
                <span class="mensaje__email">${message.email}</span>
                [<span class="mensaje__fecha">${message.date}</span>] :
                <span class="mensaje__texto">${message.text}</span>
            </div>`
        }).join(" ");
        messagesDiv.innerHTML = html;
    } else {
        messagesDiv.innerHTML = `<p class="mensajes__empty">No hay mensajes...</p>`;
    }
});

const sendMessage = e => {
    const email = document.querySelector('#email');
    const text = document.querySelector('#message');

    const message = {
        email: email.value,
        text: text.value
    }

    socket.emit('new-message', message);

    text.value = '';
    return false;
}