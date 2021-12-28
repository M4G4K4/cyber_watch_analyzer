/*
// Info from Headers get from here : https://owasp.org/www-project-secure-headers/#div-headers
*/
const deprecated_headers = [
    'x-xss-protection',
    'public-key-pins',
    'feature-policy',
    'expect-ct'
];

const secure_headers = [
    'strict-transport-security',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Content-Security-Policy',
    'X-Permitted-Cross-Domain-Policies',
    'Referrer-Policy',
    'Clear-Site-Data',
    'Cross-Origin-Embedder-Policy',
    'Cross-Origin-Opener-Policy',
    'Cross-Origin-Resource-Policy',
    'Cache-Control'
];

function mapHeaders(headers) {
    let data = {
        deprecated_headers_present: [],
        deprecated_headers_notPresent: [],
        secure_headers_present: [],
        secure_headers_notPresent: [],
        headers: headers
    };

    for (let i = 0; i < deprecated_headers.length; i++) {
        if(headers[deprecated_headers[i].toLowerCase()] != undefined){
            data.deprecated_headers_present.push(deprecated_headers[i].toLowerCase());
        }else{
            data.deprecated_headers_notPresent.push(deprecated_headers[i].toLowerCase());
        }      
    }

        for (let i = 0; i < secure_headers.length; i++) {
        if(headers[secure_headers[i].toLowerCase()] != undefined){
            data.secure_headers_present.push(secure_headers[i].toLowerCase());
        }else{
            data.secure_headers_notPresent.push(secure_headers[i].toLowerCase());
        }      
    }
    
    return data;
}

module.exports = {
    mapHeaders
}