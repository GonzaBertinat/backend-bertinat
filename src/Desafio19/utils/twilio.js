const twilio = require('twilio');
const logger = require('../utils/winston');
const { twilioConfig } = require('../config');

const TWILIO_SMS_PHONE_NUMBER = '+18318513845';
const TWILIO_WHATSAPP_PHONE_NUMBER = '+14155238886';
const ADMIN_PHONE_NUMBER = '+5491133139548';

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
    sendWhatsApp,
    TWILIO_SMS_PHONE_NUMBER,
    TWILIO_WHATSAPP_PHONE_NUMBER,
    ADMIN_PHONE_NUMBER
}