const nmap = require('./nmapLib');

async function scanPorts(ip) {
    const result = await nmap.scanMapped(ip, false, false, false, '');
    return result;
}

async function scanPortsWithServiceVersion(ip) {
    const result = await nmap.scanMapped(ip, false, true, false, '');
    return result
}

async function scanSllEnumCiphers(ip) {
    const result = await nmap.scanMapped(ip, true, false, false, 'ssl-enum-ciphers');
    return result;
}

async function scanVulnerabilitiies(ip) {
    const result = await nmap.scanMapped(ip, true, false, false, 'vuln');
    return result;
}

async function scanVulnerabilitiiesWithServiceVersion(ip) {
    const result = await nmap.scanMapped(ip, true, true, false, 'vuln');
    return result;
}

module.exports = {
    scanPorts,
    scanPortsWithServiceVersion,
    scanSllEnumCiphers,
    scanVulnerabilitiies,
    scanVulnerabilitiiesWithServiceVersion
}