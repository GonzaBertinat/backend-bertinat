const { createTransport } = require('nodemailer');
const { mailSender } = require('../config');
const logger = require('../utils/winston');
const config = require('../config');

const transporter = createTransport({
    service: mailSender.service,
    port: Number(mailSender.port),
    auth: {
        user: config.mailSender.user,
        pass: mailSender.pass
    }
});

const sendMail = async mailOptions => {
    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Mail enviado a ${mailOptions.to} exitosamente`);
    } catch(error){
        logger.error(error);
    }
}

module.exports = { 
    sendMail 
};