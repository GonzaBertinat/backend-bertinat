const { fork } = require('child_process');

const getRandomNumbers = (req, res) => {    
    const cantidad = req.query.cant ? Number(req.query.cant) : 100000000;

    const forked = fork('./controllers/randomsChild.js');
    forked.send(cantidad);

    forked.on('message', result => {
        res.json(result);
    });
}

module.exports = {
    getRandomNumbers
}