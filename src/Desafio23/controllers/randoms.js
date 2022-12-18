const { getRandomNumbersService } = require('../service/randoms');

const getRandomNumbers = async (ctx) => {    
    const cantidad = ctx.request.query.cant ? Number(ctx.request.query.cant) : 100000000;
    ctx.response.status = 200;
    ctx.body = getRandomNumbersService(cantidad);
}

/*  Se deja comentado el código referente al uso de child_process.
    En entrega anterior se solicitó no utilizarlo más para utilizar en su lugar un cluster.

    const { fork } = require('child_process');

    const getRandomNumbersChild = (req, res) => {    
        const cantidad = req.query.cant ? Number(req.query.cant) : 100000000;

        const forked = fork('./controllers/randomsChild.js');
        forked.send(cantidad);

        forked.on('message', result => {
            res.json(result);
        });
}
*/

module.exports = {
    getRandomNumbers
}