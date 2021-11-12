const nmap = require('./nmapLib');

async function as(){
    const result = await nmap.scan('192.168.1.88', true, 'vuln');
    console.log(JSON.stringify(result));
}


as();