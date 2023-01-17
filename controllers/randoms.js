const { getRandomNumbersService } = require('../service/randoms');

const getRandomNumbers = (req, res) => {    
    const cantidad = req.query.cant ? Number(req.query.cant) : 100000000;
    res.json(getRandomNumbersService(cantidad));
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