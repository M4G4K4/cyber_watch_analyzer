const domain = require('./domain/domain');
const utils = require('./utilities/utils');
const nmap = require('./nmap/nmap');
const headers = require('./headers/headers');

async function retrieveData(url){
    var result;
    const data = {};

    data.domain = domain.domainInfo(url);

    result = await domain.domainData(data.domain.stripped);

    data.domain.creation_date = result.creationDate;

    result = await domain.ipFromDomain(url);
    data.domain.ip = result;

    result = utils.getAge(data.domain.creation_date);
    data.domain.age_in_months = result;


    result = await headers.getHeaders(data.domain.url)
    data.headers = result;


    result = await nmap.scanSllEnumCiphers(data.domain.ip[0]);
    data.scan_ssl = result;


    result = await nmap.scanVulnerabilitiiesWithServiceVersion(data.domain.ip[0]);
    data.scan_vulnerabilities = result;

    return data;
}

async function calculateScore(data){

}

module.exports ={
    retrieveData,
    calculateScore
}