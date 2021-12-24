const execSync = require('child_process').execSync;
const xml2js = require('xml2js');
const util = require('util');
const mapper = require('./nmapMapper');

xml2js.parseStringPromise = util.promisify(xml2js.parseString);

const allowedScript = [
    'ssl-enum-ciphers',
    'vuln',
];


async function scan(ip, useScript, serviceVersion, osVersion, script) {
    try {
        const comand = constructCommand(ip, useScript, serviceVersion, osVersion, script);
        const scanResult = execSync(comand);
        return await xml2js.parseStringPromise(scanResult);
    } catch (e) {
        console.log(e);
    }
}

async function scanMapped(ip, useScript, serviceVersion, osVersion, script) {
    try {
        const comand = constructCommand(ip, useScript, serviceVersion, osVersion, script);
        const scanResult = execSync(comand);
        const nmapJsonResponse = await xml2js.parseStringPromise(scanResult); 
        return mapper.mapNmapResult(nmapJsonResponse, useScript, serviceVersion, osVersion, script);
    } catch (e) {
        console.log(e);
    }
}

function constructCommand(ip, useScript, serviceVersion, osVersion, script) {
    let command = 'nmap ';

    if (serviceVersion === true) {
        command += '-sV ';
    }

    if (osVersion === true) {
        command += '-O ';
    }

    if (useScript === true) {
        if (allowedScript.includes(script)) {
            command += '--script ' + script + ' ';
        } else {
            // TODO: Test this scenario
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
