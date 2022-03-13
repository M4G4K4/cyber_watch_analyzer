require('dotenv').config();
const domain = require('./domain/domain');
const utils = require('./utilities/utils');
const nmap = require('./nmap/nmap');
const headers = require('./headers/headers');

const testData = require('./tests/testData');
const Website = require('./models/Website');

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

    console.log("Retriving data");

    const data = {};

    data.domain = domain.domainInfo(url);

    console.log('Domain info');

    result = await domain.domainData(data.domain.stripped);

    data.domain.creation_date = result.creationDate;

    result = await domain.ipFromDomain(url);
    data.domain.ip = result;

    result = utils.getAge(data.domain.creation_date);
    data.domain.age_in_months = result;

    console.log('Domain age');

    result = await headers.getHeaders(data.domain.url)
    data.headers = result;

    console.log('Get headers');


    result = await nmap.scanSllEnumCiphers(data.domain.ip[0]);
    data.scan_ssl = result;

    console.log('Scan ssl');


    result = await nmap.scanVulnerabilitiiesWithServiceVersion(data.domain.ip[0]);
    data.scan_vulnerabilities = result;

    console.log('Fisnish retrieving data')

    return data;
}

async function calculateScore(url){
    var score = 100;
    
    const data = await retrieveData(url);


    console.log('Calculating score, start at ' + score);

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
        score = score - scoreDecrease.headers.each_secure_not_present;
    }

    for(var i = 0; i < data.scan_ssl.ports.open.length; i++){
        if( data.scan_ssl.ports.open[i].script != undefined){
            if(data.scan_ssl.ports.open[i].script.ciphers != undefined){
                for(var j = 0; j < data.scan_ssl.ports.open[i].script.ciphers.length; j++){
                    if(data.scan_ssl.ports.open[i].script.ciphers[j].version === 'TLSv1.0'){
                        score = score - scoreDecrease.scan_ssl.version_1_0;
                    }else if(data.scan_ssl.ports.open[i].script.ciphers[j].version === 'TLSv1.1'){
                        score = score - scoreDecrease.scan_ssl.version_1_1;
                    }else if(data.scan_ssl.ports.open[i].script.ciphers[j].version === 'TLSv1.2'){
                        score = score - scoreDecrease.scan_ssl.version_1_2;
                    }else if(data.scan_ssl.ports.open[i].script.ciphers[j].version === 'TLSv1.3'){
                        score = score - scoreDecrease.scan_ssl.version_1_3;
                    }
                }
            }
        }
    }


    for(var i = 0; i < data.scan_vulnerabilities.ports.open.length; i++){
        if(data.scan_vulnerabilities.ports.open[i].vulnerability.length >= 1){
            for(var j = 0; j < data.scan_vulnerabilities.ports.open[i].vulnerability.length; j++){
                for(var x = 0; x < data.scan_vulnerabilities.ports.open[i].vulnerability[j].data.length; x++){
                    if(data.scan_vulnerabilities.ports.open[i].vulnerability[j].data[x] === 'LIKELY VULNERABLE'){
                        score = score - scoreDecrease.scan_vulnerability.possible_vulnerability_found;
                    }else if(data.scan_vulnerabilities.ports.open[i].vulnerability[j].data[x] === 'VULNERABLE'){
                        score = score - scoreDecrease.scan_vulnerability.vulnerability_found;
                    }
                }
            }
        }
    }

  console.log('score: ' + score);
    
    return {data, score};
}

async function perfomAnalysis(url){
    console.log('Performing analysis');

    const website = await  Website.findOne({
        where: {
            full_domain: url
        }
    });

    if(website && website.score == null){
        const {data, score} = await calculateScore(url);

        await Website.update({ 
            score: score,
            data: data,
            domain: data.domain.hostname
        }, 
        {
            where: {
                full_domain: url
            }
      });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports ={
    perfomAnalysis
}