const getRandomNumber = () => {
    return Math.ceil(Math.random() * 1000);
}

process.on('message', cantidad => {
    let result = {}
    for(let i = 0; i < cantidad; i++) {
        const numero = getRandomNumber();
        result[numero.toString()] = result[numero.toString()] ? ++result[numero.toString()] : 1
    }
    process.send(result);
})