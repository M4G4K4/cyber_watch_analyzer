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
    const code = execSync(constructCommand(ip, useScript, script));
    return await xml2js.parseStringPromise(code);
}

async function scanMapped(ip, useScript, script){
    const nmapResult = await execSync(constructCommand(ip, useScript, script));
    return mapper.mapNmapResult(await xml2js.parseStringPromise(nmapResult));
}

function constructCommand(ip, useScript, script){
    let command = 'nmap ';

    if(useScript === true){
        if(allowedScript.includes(script)){
            command += '--script ' + script + ' ';
        }else{
            throw Error("Wrong script");
        }
    }

    command += '-oX - ';
    command += ip;
    return command;
}

module.exports = {
    scan,
    scanMapped
}
