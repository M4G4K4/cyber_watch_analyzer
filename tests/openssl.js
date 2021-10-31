const openssl = require('openssl-nodejs');

openssl(['req', '-config', '-out', 'CSR.csr', '-new', '-newkey', 'rsa:2048', '-nodes', '-keyout', 'privateKey.key'], function (err, buffer) {
    console.log(err.toString(), buffer.toString());
});

openssl('openssl req -config csr.cnf -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout key.key -out certificate.crt')


openssl(['req', '-config', '-out', 'CSR.csr', '-new', '-newkey', 'rsa:2048', '-nodes', '-keyout', 'privateKey.key'], function (err, buffer) {
    console.log(err.toString(), buffer.toString());
});
