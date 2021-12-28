const dns = require('dns');

dnsPromises = dns.promises;

function isSubDomain(url) {
    url = url.replace(new RegExp(/^\s+/),"");

    url = url.replace(new RegExp(/\\/g),"/");

    url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");

    url = url.replace(new RegExp(/^www\./i),"");

    url = url.replace(new RegExp(/\/(.*)/),"");

    if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");

    } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
    }

    return !!(url.match(new RegExp(/\./g)));
}

async function reverseLookup(ip) {
    return await dnsPromises.reverse(ip);
}

function domainInfo(link) {
    const url = new URL(link);
    const result =  {
        hostname: url.hostname,
        pathname: url.pathname,
        protocol: url.protocol.replace(':',''),
        query_parameters: url.search
    }
    return result;
}

async function resolveIpFromDomain(domain){
    const result = await dnsPromises.resolve(domain);
    return result;
}

module.exports = {
    domainInfo,
    isSubDomain,
    reverseLookup,
    resolveIpFromDomain
}