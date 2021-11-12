
function mapNmapResult(result, useScript, script){
    let data;
    if(useScript === true){
        if(script === 'vuln'){
            data = mapVulnerability(result);
        }else if(script === 'ssl-enum-ciphers'){
            data = mapSslEnumCiphers(result);
        }
    }else{
        data = mapJustPorts(result);
    }

    return data;
}


function mapSslEnumCiphers(){

}

function mapJustPorts(result){
    let mapped = {};

    let scanInfo = {
        scanner: result.nmaprun.$.scanner,
        scanner: result.nmaprun.$.scanner,
        comand: result.nmaprun.$.args,
        version: result.nmaprun.$.version,
        xmlVersion: result.nmaprun.$.xmloutputversion,
        protocol: result.nmaprun.scaninfo[0].$.protocol,
        success: result.nmaprun.runstats[0].finished[0].$.exit == 'success' ? 
                                                    true : 
                                                    false
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
        var data = {
            portNumber: array[i].$.portid,
            protocol: array[i].$.protocol,
            state: array[i].state[0].$.state,
            service: array[i].service[0].$.name
        }

        ports.open.push(data);
    }

    
    mapped.host = host;
    mapped.scanInfo = scanInfo
    mapped.ports = ports;
    
    return mapped;
}

function mapVulnerability() {
    
}

module.exports = {
    mapNmapResult
}