
function mapNmapResult(scanResult, useScript, serviceVersion, osVersion, script){
    let data;
    if(useScript === true){
        if(script === 'vuln'){
            data = mapVulnerability(scanResult);
        }else if(script === 'ssl-enum-ciphers'){
            data = mapSslEnumCiphers(scanResult);
        }
    }else{
        if(serviceVersion === true){
            data = mapPortsWithServiceVersion(scanResult);
        }else{
            data = mapJustPorts(scanResult);
        }
    }

    return data;
}


function mapJustPorts(result){
    let mapped = {};

    let scanInfo = {
        scanner: result.nmaprun.$.scanner,
        command: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xmlVersion: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit === 'success'
    }

    let host = {
        status: result.nmaprun.host[0].status[0].$.state,
        address: result.nmaprun.host[0].address[0].$.addr,
        addressType: result.nmaprun.host[0].address[0].$.addrType,
    };

    let ports = {
        closed: {
            count: result.nmaprun.host[0].ports[0].extraports[0].$.count,
            state: result.nmaprun.host[0].ports[0].extraports[0].$.state,
            reason: result.nmaprun.host[0].ports[0].extraports[0].extrareasons[0].$.reason
        },
        open: []
    }

    let array = result.nmaprun.host[0].ports[0].port
    for(let i = 0; i < array.length; i++){
        const data = {
            portNumber: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            service: array[i].service[0].$.name
        };

        ports.open.push(data);
    }

    mapped.host = host;
    mapped.scanInfo = scanInfo
    mapped.ports = ports;

    return mapped;
}

function mapPortsWithServiceVersion(result){
    let mapped = {};

    let scanInfo = {
        scanner: result.nmaprun.$.scanner,
        command: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xmlVersion: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit === 'success'
    }

    let host = {
        status: result.nmaprun.host[0].status[0].$.state,
        address: result.nmaprun.host[0].address[0].$.addr,
        addressType: result.nmaprun.host[0].address[0].$.addrType,
    };

    let ports = {
        closed: {
            count: result.nmaprun.host[0].ports[0].extraports[0].$.count,
            state: result.nmaprun.host[0].ports[0].extraports[0].$.state,
            reason: result.nmaprun.host[0].ports[0].extraports[0].extrareasons[0].$.reason
        },
        open: []
    }

    let array = result.nmaprun.host[0].ports[0].port
    for(let i = 0; i < array.length; i++){
        const data = {
            portNumber: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            service: array[i].service[0].$.name,
            product: array[i].service[0].$.product,
            version: array[i].service[0].$.version,
            osType: array[i].service[0].$.ostype,
            extrainfo: array[i].service[0].$.extrainfo != undefined ? array[i].service[0].$.extrainfo : null,
            hostname: array[i].service[0].$.hostname != undefined ? array[i].service[0].$.hostname : null
        };

        ports.open.push(data);
    }

    mapped.host = host;
    mapped.scanInfo = scanInfo
    mapped.ports = ports;

    return mapped;
}

function mapSslEnumCiphers(){
    let mapped = {};

    let scanInfo = {
        scanner: result.nmaprun.$.scanner,
        command: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xmlVersion: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit === 'success'
    }

    let host = {
        status: result.nmaprun.host[0].status[0].$.state,
        address: result.nmaprun.host[0].address[0].$.addr,
        addressType: result.nmaprun.host[0].address[0].$.addrType,
    };

    let ports = {
        closed: {
            count: result.nmaprun.host[0].ports[0].extraports[0].$.count,
            state: result.nmaprun.host[0].ports[0].extraports[0].$.state,
            reason: result.nmaprun.host[0].ports[0].extraports[0].extrareasons[0].$.reason
        },
        open: []
    }

    let array = result.nmaprun.host[0].ports[0].port
    for(let i = 0; i < array.length; i++){
        const data = {
            portNumber: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            service: array[i].service[0].$.name,
            product: array[i].service[0].$.product,
            version: array[i].service[0].$.version,
            osType: array[i].service[0].$.ostype,
            extrainfo: array[i].service[0].$.extrainfo != undefined ? array[i].service[0].$.extrainfo : null,
            hostname: array[i].service[0].$.hostname != undefined ? array[i].service[0].$.hostname : null
        };

        if(array[i].script != undefined){
            const scriptData = {
                name: array[i].script[0].$.id,
                ciphers: []
            }

            let arrayScript = array[i].script[0].table;
            for(let x = 0; i < arrayScript.length, i++){
                const ciphersData = {
                    version: arrayScript[i].$.key
                }
                scriptData.ciphers.push(ciphersData)
            }

            data.script = scriptData;
        }
        ports.open.push(data);
    }

    return mapped;
}

function mapVulnerability() {
    //TODO: See if I can map the vulnetability and ther port version
    let mapped = {};

}

module.exports = {
    mapNmapResult
}
