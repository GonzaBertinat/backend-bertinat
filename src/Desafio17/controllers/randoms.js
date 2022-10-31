const { fork } = require('child_process');

const getRandomNumbersChild = (req, res) => {    
    const cantidad = req.query.cant ? Number(req.query.cant) : 100000000;

    const forked = fork('./controllers/randomsChild.js');
    forked.send(cantidad);

    forked.on('message', result => {
        res.json(result);
    });
}

const getRandomNumbers = (req, res) => {    
    const cantidad = req.query.cant ? Number(req.query.cant) : 100000000;

    let result = {}
    for(let i = 0; i < cantidad; i++) {
        const numero = Math.ceil(Math.random() * 1000);
        result[numero.toString()] = result[numero.toString()] ? ++result[numero.toString()] : 1
    }
    res.json(result);
}

module.exports = {
    getRandomNumbers
}