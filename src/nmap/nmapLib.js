const execSync = require('child_process').execSync;
const xml2js = require('xml2js');
const util = require('util');
const mapper = require('./nmapMapper');

const allowedScript = [
    'ssl-enum-ciphers',
    'vuln',
];

xml2js.parseStringPromise = util.promisify(xml2js.parseString);

async function scan(ip, useScript, script){
    const code = execSync(constructComand(ip, useScript, script));
    return await xml2js.parseStringPromise(code);
}

async function scanMapped(ip, useScript, script){
    const nmapResult = await execSync(constructComand(ip, useScript, script));
    return mapper.mapNmapResult(await xml2js.parseStringPromise(nmapResult));
}

function constructComand(ip, useScript, script){
    let comand = 'nmap ';

    if(useScript === true){
        if(allowedScript.includes(script)){
            comand += '--script ' + script + ' ';
        }
    }

    comand += '-oX - ';
    comand += ip;
    return comand;
}

module.exports = {
    scan,
    scanMapped
}