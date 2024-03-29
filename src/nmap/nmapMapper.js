function verifyHostIsUp(result){
    if(result.nmaprun.runstats[0].hosts[0].$.up === "0"){
        return {
            scanner: result.nmaprun.$.scanner,
            command: result.nmaprun.$.args,
            version: result.nmaprun.$.version,
            xmlVersion: result.nmaprun.$.xmloutputversion,
            protocol: result.nmaprun.scaninfo[0].$.protocol,
            status: "down"
        }
    }else{
        return null
    }
}

function mapNmapResult(scanResult, useScript, serviceVersion, osVersion, script) {
    let data;
    if (useScript === true) {
        if (script === 'vuln') {
            if (serviceVersion === true) {
                data = mapVulnerabilityWithServiceVersion(scanResult);
            } else {
                data = mapVulnerability(scanResult);

            }
        } else if (script === 'ssl-enum-ciphers') {
            data = mapSslEnumCiphers(scanResult);
        } else {
            data = mapPorts(scanResult);
        }
    } else {
        if (serviceVersion === true) {
            data = mapPortsWithServiceVersion(scanResult);
        } else {
            data = mapPorts(scanResult);
        }
    }

    return data;
}


function mapPorts(result) {

    const hostDown = verifyHostIsUp(result);
    if(hostDown.status === 'down'){
        return hostDown;
    }

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
    for (let i = 0; i < array.length; i++) {
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

function mapPortsWithServiceVersion(result) {

    const hostDown = verifyHostIsUp(result);
    if(hostDown.status === 'down'){
        return hostDown;
    }

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
    for (let i = 0; i < array.length; i++) {
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

function mapSslEnumCiphers(result) {

    const hostDown = verifyHostIsUp(result);
    if(hostDown != null){
        return hostDown
    }

    let mapped = {};

    let info = {
        scanner: result.nmaprun.$.scanner,
        command: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xml_version: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit === 'success'
    };

    let host = {
        status: result.nmaprun.host[0].status[0].$.state,
        address: result.nmaprun.host[0].address[0].$.addr,
        address_type: result.nmaprun.host[0].address[0].$.addrtype,
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
    for (let i = 0; i < array.length; i++) {
        const data = {
            port_number: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            service: array[i].service[0].$.name,
            product: array[i].service[0].$.product,
            version: array[i].service[0].$.version,
            os_type: array[i].service[0].$.ostype,
            extra_info: array[i].service[0].$.extrainfo != undefined ? array[i].service[0].$.extrainfo : null,
            hostname: array[i].service[0].$.hostname != undefined ? array[i].service[0].$.hostname : null
        };

        if (array[i].script != undefined) {
            const scriptData = {
                name: array[i].script[0].$.id,
                ciphers: []
            }

            let arrayScript = array[i].script[0].table;
            for (let x = 0; x < arrayScript.length; x++) {
                const ciphersData = {
                    version: arrayScript[x].$.key
                }
                scriptData.ciphers.push(ciphersData)
            }

            data.script = scriptData;
        }
        ports.open.push(data);
    }

    mapped.info = info;
    mapped.host = host;
    mapped.ports = ports;

    return mapped;
}

function mapVulnerability(result) {
    const hostDown = verifyHostIsUp(result);
    if(hostDown != null){
       return hostDown
    }
    
    let mapped = {};

    let scanInfo = {
        scanner: result.nmaprun.$.scanner,
        command: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xmlVersion: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit === 'success',
        status: "up"
    }

    let host = {
        status: result.nmaprun.host[0].status[0].$.state,
        address: result.nmaprun.host[0].address[0].$.addr,
        addressType: result.nmaprun.host[0].address[0].$.addrtype
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

    for (let i = 0; i < array.length; i++) {
        const data = {
            portNumber: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            vulnerability: []
        };

        if (array[i].script != undefined) {
            let arrayScript = array[i].script;
            
            for (let x = 0; x < arrayScript.length; x++) {
                if (arrayScript[x].table != undefined && arrayScript[x].table[0].elem != undefined && arrayScript[x].table[0].$.key != undefined) {
                    let table = arrayScript[x].table;
                    
                    const vulnData = {
                        name: arrayScript[x].$.id,
                        key: table[0].$.key,
                        data: []
                    }

                    for (let c = 0; c < table[0].elem.length; c++) {
                        vulnData.data.push(table[0].elem[c]._)
                    }

                    data.vulnerability.push(vulnData);
                }
            }
        }
        ports.open.push(data);
    }

    mapped.host = host;
    mapped.scanInfo = scanInfo
    mapped.ports = ports;

    return mapped;
}

function mapVulnerabilityWithServiceVersion(result) {

    const hostDown = verifyHostIsUp(result);
    if(hostDown != null){
       return hostDown
    }

    let mapped = {};

    let scanInfo = {
        scanner: result.nmaprun.$.scanner,
        command: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xmlVersion: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit === 'success',
        status: "up"
    }

    let host = {
        status: result.nmaprun.host[0].status[0].$.state,
        address: result.nmaprun.host[0].address[0].$.addr,
        addressType: result.nmaprun.host[0].address[0].$.addrtype
    };

    let ports = {
        closed: {
            count: result.nmaprun.host[0].ports[0].extraports[0].$.count,
            state: result.nmaprun.host[0].ports[0].extraports[0].$.state,
            reason: result.nmaprun.host[0].ports[0].extraports[0].extrareasons[0].$.reason
        },
        open: []
    }

    let array = result.nmaprun.host[0].ports[0].port;

    for (let i = 0; i < array.length; i++) {
        const data = {
            portNumber: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            service: array[i].service[0].$.name,
            product: array[i].service[0].$.product,
            version: array[i].service[0].$.version,
            osType: array[i].service[0].$.ostype,
            extrainfo: array[i].service[0].$.extrainfo != undefined ? array[i].service[0].$.extrainfo : null,
            hostname: array[i].service[0].$.hostname != undefined ? array[i].service[0].$.hostname : null,
            vulnerability: []
        };

        if (array[i].script != undefined) {
            let arrayScript = array[i].script;
            for (let x = 0; x < arrayScript.length; x++) {
                if (arrayScript[x].table != undefined && arrayScript[x].table[0].elem != undefined && arrayScript[x].table[0].$ != undefined) {
                    let table = arrayScript[x].table;
                    
                    const vulnData = {
                        name: arrayScript[x].$.id,
                        key: table[0].$.key,
                        data: []
                    }

                    for (let c = 0; c < table[0].elem.length; c++) {
                        vulnData.data.push(table[0].elem[c]._)
                    }

                    data.vulnerability.push(vulnData);
                }
            }
        }
        ports.open.push(data);
    }

    mapped.host = host;
    mapped.scanInfo = scanInfo
    mapped.ports = ports;

    return mapped;
}

module.exports = {
    mapNmapResult
}
