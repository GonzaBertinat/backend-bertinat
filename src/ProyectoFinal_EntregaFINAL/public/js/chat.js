const socket = io();

const messageSchema = new normalizr.schema.Entity('message');

const messagesSchema = new normalizr.schema.Entity('messages', {
    messages: [messageSchema]
});

// Se obtienen los mensajes de acuerdo a si estamos en el Chat General o no
const tipoChat = document.querySelector('#chatMode').value;
const email = document.querySelector('#chatMode').attributes.email.value;
if(tipoChat === 'general'){
    // Chat General -> obtener mensajes de todos los usuarios
    socket.emit('get-general-messages', {});
} else {
    // Chat Personal -> obtener mensajes del usuario conectado
    socket.emit('get-user-messages', { email });
}

socket.on('messages', messages => {
    const denormalizedData = normalizr.denormalize(messages.result, messagesSchema, messages.entities);
    const messagesDiv = document.querySelector('#mensajes-container');
    if(denormalizedData.messages.length > 0) {
        // Se cargan los mensajes en la vista
        const html = denormalizedData.messages.map(message => {
            return `<div class="mensaje">
                <div class="mensaje__avatar">
                    <img src="uploads/${'test'}">
                </div>
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
    const email = document.querySelector('#user-email');
    const mensaje = document.querySelector('#mensaje');

    const message = {
        email: email.textContent,
        text: mensaje.value
    }

    socket.emit('new-message', {
        message,
        type: tipoChat
    });

    mensaje.value = '';
    return false;
}