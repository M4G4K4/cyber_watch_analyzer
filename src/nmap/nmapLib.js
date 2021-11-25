const execSync = require('child_process').execSync;
const xml2js = require('xml2js');
const util = require('util');
const mapper = require('./nmapMapper');

const allowedScript = [
    'ssl-enum-ciphers',
    'vuln',
];


xml2js.parseStringPromise = util.promisify(xml2js.parseString);


async function scan(ip, useScript, version, script){
    try{
        const comand = constructCommand(ip, useScript, version, script);
        const nmapResult = execSync(comand);
        return await xml2js.parseStringPromise(nmapResult);
    }catch(e){
        console.log(e);
    }
}

async function scanMapped(ip, useScript, version, script){
    try{
        const comand = constructCommand(ip, useScript, version, script);
        const nmapResult = execSync(comand);
        return mapper.mapNmapResult(await xml2js.parseStringPromise(nmapResult));
    }catch(e){
        console.log(e);
    }
}

function constructCommand(ip, useScript, version, script){
    let command = 'nmap ';
    let serviceVersion = '-sv ';
    let outputXML = '-oX - ';

    if(version === true){
        command += serviceVersion;
    }

    if(useScript === true){
        if(allowedScript.includes(script)){
            command += '--script ' + script + ' ';
        }else{
            throw Error("Wrong script");
        }
    }

    command += outputXML;
    command += ip;
    return command;
}

module.exports = {
    scan,
    scanMapped
}
