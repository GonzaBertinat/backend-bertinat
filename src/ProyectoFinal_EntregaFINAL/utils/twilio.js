const twilio = require('twilio');
const logger = require('../utils/winston');
const { twilioConfig } = require('../config');

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

const sendSMS = async (content, from, to) => {
    try {
        const message = await client.messages.create({
            body: content,
            from,
            to
        });
        logger.info(message);
    } catch (error) {
        logger.error(error);
    }
}

const sendWhatsApp = async (content, from, to) => {
    try {
        const message = await client.messages.create({
            body: content,
            from: `whatsapp:${from}`,
            to: `whatsapp:${to}`
        });
        logger.info(message);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    sendSMS,
    sendWhatsApp
}