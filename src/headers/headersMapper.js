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
        num_deprecated_headers: 4,
        num_secure_headers: 11,
        deprecated_present: [],
        secure_headers_present: [],
        secure_headers_notPresent: []
    };

    for(let i = 0; i < deprecated_headers.length; i++){
        if(headers[deprecated_headers[i]] != undefined){
            data.deprecated_present.push(deprecated_headers[i]);
        }
    }

    for(let x = 0; x < secure_headers.length; x++){
        if(headers[secure_headers[x]] != undefined){
            data.secure_headers_present.push(secure_headers[x]);
        }else{
            data.secure_headers_notPresent.push(secure_headers[x]);
        }
    }
    
    return data;
}

module.exports = {
    mapHeaders
}