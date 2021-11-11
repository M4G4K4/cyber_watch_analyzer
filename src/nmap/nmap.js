const nmap = require('./nmapLib');

async function as(){
    const result = await nmap.scan('192.168.1.88', false, 'ssl-enum-ciphers');
    console.log(JSON.stringify(result));
}


async function qq(){
    const result = await nmap.scanMapped('192.168.1.88', false, 'ssl-enum-ciphers');
    console.log(JSON.stringify(result));
}


qq();
