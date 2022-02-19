const dns = require('dns');
const whois = require('whois-json');

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
    return {
        hostname: url.hostname,
        pathname: url.pathname,
        protocol: url.protocol.replace(':', ''),
        query_parameters: url.search,
        stripped: url.hostname.replace("www.", "")
    }
}

async function resolveIpFromDomain(domain){
    return await dnsPromises.resolve(domain);
}

async function metadata(domain){
   return await whois(domainInfo(domain).hostname);
}

module.exports = {
    domainInfo,
    isSubDomain,
    reverseLookup,
    resolveIpFromDomain,
    metadata
}