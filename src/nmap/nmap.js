const nmap = require('./nmapLib');


async function as(){
    const result = await nmap.scan('192.168.1.88', true, 'ssl-enum-ciphers');
    console.log(JSON.stringify(result));
}

as();