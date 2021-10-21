// https://github.com/marzavec/nnmap.js#installation


const util = require('util');
const { Scanner } = require('nnmap.js');

const scanner = new Scanner({
    target: 'scanme.nmap.org',
    profile: 'Quick scan',
    onScanComplete: (nmapOut) => {
        console.log(util.inspect(nmapOut.scanData.data, false, null, true));
    },
});

// See scripts
// https://nnmap.js.org/Script.html

