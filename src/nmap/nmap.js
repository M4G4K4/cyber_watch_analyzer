const nmap = require('./nmapLib');

//TODO: Remove 
async function as(){               // ip,useScript, serviceVersion, osVersion, script 
    const result = await nmap.scan('192.168.1.94', true, false, false, 'ssl-enum-ciphers');
    console.log(JSON.stringify(result));     // true              vuln e ssl-enum-ciphers
}
as();



async function scanPorts(ip){
    const result = await nmap.scan(ip, false, false, false, '');
    //return result;
    console.log(JSON.stringify(result));
}

async function scanPortsWithServiceVersion(ip){
    const result = await nmap.scan(ip, false, true, false, '');
    //return result
    console.log(JSON.stringify(result));
}

async function scanSllEnumCiphers(ip){
    const result = await nmap.scan(ip, true, false, false, 'ssl-enum-ciphers');
    //return result;
    console.log(JSON.stringify(result));
}

async function scanVulnerabilitiies(ip){
    const result = await nmap.scan(ip, true, false, false, 'vuln');
    // return result;
    console.log(JSON.stringify(result));
}