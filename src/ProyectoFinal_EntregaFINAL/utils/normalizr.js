const normalizr = require('normalizr');
const { schema, normalize } = normalizr;

const messageSchema = new schema.Entity('message');

const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

const normalizeMessages = messages => {
    // Se obtiene un array de mensajes limpio de atributos de Mongo
    const messagesToNormalize = messages.map(message => ({
        id: message.id,
        email: message.email,
        type: message.type,
        text: message.text,
        date: message.date
    }));

    return normalize({ id: 'messages', messages: messagesToNormalize }, messagesSchema);
}

module.exports = {
    normalizeMessages
}