const portScan = {
    scanInfo: {
        scanner: nmaprun.$.scanner,
        comand: nmaprun.$.args,
        version: nmaprun.$.version,
        xmlVersion: nmaprun.$.xmloutputversion,
        protocol: nmaprun.scaninfo[0].$.protocol,
        success: nmaprun.runstats[0].finished[0].$.exit == 'success' : true
    },
    host: {
        status: nmaprun.host[0].status[0].$.state,
        address: nmaprun.host[0].address[0].$.addr,
        addressType: nmaprun.host[0].address[0].$.addrType,
    },
    ports: [
        closed: {
            count: nmaprun.host[0].ports[0].extraports[0].$.count,
            state: nmaprun.host[0].ports[0].extraports[0].$.state,
            reason: nmaprun.host[0].ports[0].extraports[0].extrareasons[0].$.reason,
        }
        open: [
            {
                portNumber: nmaprun.host[0].ports[0].port[i].$.portid,
                protocol: nmaprun.host[0].ports[0].port[i].$.protocol,
                state: nmaprun.host[0].ports[0].port[i].state[0].$.state,
                service: nmaprun.host[0].ports[0].port[i].service[0].$.name
            }
        ]
    ]
}


const sslEnumCiphers = {
    
}

function mapNmapResult(result, useScript, script){

    
}


function mapSslEnumCiphers(){

}

function mapJustPorts(){


}

function mapVulnerability() {
    
}

module.exports = {
    mapNmapResult
}