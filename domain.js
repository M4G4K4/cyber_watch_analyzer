const dns = require('dns');
const geoip = require('geoip-lite');

dnsPromises = dns.promises;

function stripUrl(url){
    return url.replace("https://", "").replace("/", "");
}

async function getIpFromDomain(url) {
    return await dnsPromises.lookup(stripUrl(url));
}

async function getAddressFromDomain(url){
    return await dnsPromises.resolve4(stripUrl(url));
}

function subDomain(url) {
    url = url.replace(new RegExp(/^\s+/),""); // START
    url = url.replace(new RegExp(/\s+$/),""); // END
    url = url.replace(new RegExp(/\\/g),"/");
    url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
    url = url.replace(new RegExp(/^www\./i),"");
    url = url.replace(new RegExp(/\/(.*)/),"");
    if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");

    } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
    }

    return (url.match(new RegExp(/\./g))) ? true : false;
}

async function reverseLookup(ip) {
    return await dnsPromises.reverse(ip);
}

function getInfoFromIp(ip){
    return geoip.lookup(ip);
}

module.exports = {
    getInfoFromIp,
    getIpFromDomain,
    subDomain,
    reverseLookup,
    getAddressFromDomain
}

