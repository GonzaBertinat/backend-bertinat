const autocannon = require('autocannon');
const { PassThrough } = require('stream');

const run = (url) => {
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections: 100, // 100 conexiones concurrentes 
        duration: 20      // realizadas en un tiempo de 20 segundos.
    });

    autocannon.track(inst, { outputStream });

    outputStream.on('data', data => buf.push(data));
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf));
    })
}

console.log('Corriendo todos los benchmarks en paralelo...');

run('http://localhost:3000/info');