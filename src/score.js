const domain = require('./domain/domain');
const utils = require('./utilities/utils');
const nmap = require('./nmap/nmap');
const headers = require('./headers/headers');


const scoreDecrease = {
    domain: {
        age_in_months_under_1_month: 20,
        age_in_months_under_3_months: 15,
        age_in_months_under_6_months: 10,
    },
    headers:{
        each_deprecated_present: 5,
        each_secure_not_present: 1
    },
    scan_ssl: {
        version_1_0: 10,
        version_1_1: 5,
        version_1_2: 2,
        version_1_3: 0,
    },
    scan_vulnerability: {
        vulnerability_found: 20,
        possible_vulnerability_found: 10
    }
}


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

async function calculateScore(url){
    var score = 100;
    const data = await retrieveData(url);

    if(data.age_in_months<= 1){
        score = score - scoreDecrease.domain.age_in_months_under_1_month;
    } else if(data.age_in_months > 1 && data.age_in_months <= 3){
        score = score - scoreDecrease.domain.age_in_months_under_3_months;
    }else if(data.age_in_months > 3 && data.age_in_months <= 6){
        score = score - scoreDecrease.domain.age_in_months_under_6_months;
    }

    for(var i = 0; i < data.headers.deprecated_headers_present.length; i++){
        score = score - scoreDecrease.headers.each_deprecated_present;
    }

    for(var i = 0; i < data.headers.secure_headers_notPresent.length; i++){
        score = score - scoreDecrease.each_secure_not_present;
    }

    for(var i = 0; i < data.scan_ssl.ports.open.length; i++){
        if( data.scan_ssl.ports.open[i].script != undefined){
            for(var j = 0; j < data.scan_ssl.ports.open[i].script.ciphers.length; j++){
                if(data.scan_ssl.ports.open.script.ciphers[j].version === 'TLSv1.0'){
                    score = score - scoreDecrease.scan_ssl.version_1_0;
                }else if(data.scan_ssl.ports.open.script.ciphers[j].version === 'TLSv1.1'){
                    score = score - scoreDecrease.scan_ssl.version_1_1;
                }else if(data.scan_ssl.ports.open.script.ciphers[j].version === 'TLSv1.2'){
                    score = score - scoreDecrease.scan_ssl.version_1_2;
                }else if(data.scan_ssl.ports.open.script.ciphers[j].version === 'TLSv1.3'){
                    score = score - scoreDecrease.scan_ssl.version_1_3;
                }
            }
        }
    }


    for(var i = 0; i < data.scan_vulnerabilities.ports.open.length; i++){
        if(data.scan_vulnerabilities.ports.open[i].vulnerability.length >= 1){
            for(var j = 0; data.scan_vulnerabilities.ports.open[i].vulnerability.length; j++){
                for(var x = 0; data.scan_vulnerabilities.ports.open[i].vulnerability[j].data.length; x++){
                    if(data.scan_vulnerability.ports.open[i].vulnerability[j].data[x] === 'LIKELY VULNERABLE'){
                        score = score - scoreDecrease.scan_vulnerability.possible_vulnerability_found;
                    }else if(data.scan_vulnerability.ports.open[i].vulnerability[j].data[x] === 'VULNERABLE'){
                        score = score - scoreDecrease.scan_vulnerability.vulnerability_found;
                    }
                }
            }
        }
    }

    return score;
}

module.exports ={
    retrieveData,
    calculateScore
}