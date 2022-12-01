const normalizr = require('normalizr');
const { schema, normalize } = normalizr;

const authorSchema = new schema.Entity('author', undefined, { idAttribute: 'id' });

const messageSchema = new schema.Entity('message', {
    author: authorSchema
});

const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

const normalizeMessages = messages => {
    // Se obtiene un array de mensajes limpio de atributos de Mongo
    const messagesToNormalize = messages.map(message => ({
        id: message.id,
        author: {
            id: message.author.id,
            nombre: message.author.nombre,
            apellido: message.author.apellido,
            edad: message.author.edad,
            alias: message.author.alias,
            avatar: message.author.avatar
        },
        text: message.text,
        date: message.date
    }));

    return normalize({ id: 'messages', messages: messagesToNormalize }, messagesSchema);
}

module.exports = {
    normalizeMessages
}