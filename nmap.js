// https://github.com/harryhorton/node-nmap

// var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');

const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap';
let quickscan = new nmap.OsAndPortScan ('192.168.1.82'); // 192.168.1.82
let nmapScan = new nmap.NmapScan('192.168.1.82', '');

// See nmap3.js
//var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');
// var nmapscan = new nmap.NmapScan('127.0.0.1 --script vulners');


// --script vuln
        // https://nmap.org/nsedoc/categories/vuln.html
// --script nmap-vulners
// --script vulscan
        // https://github.com/scipag/vulscan
// --script nmap-vulners,vulscan
// --script=vulscan/vulscan.nse
// --script vulners
        // https://github.com/vulnersCom/nmap-vulners
// --script nmap-vulners
        // --script nmap-vulners,vulscan

quickscan.on('complete', function(data){
    console.log(data);
});

quickscan.on('error', function(error){
    console.log(error);
});

quickscan.startScan();

// example
/*
[
  {
    hostname: 'LAPTOP-LENFERN.Home',
    ip: '192.168.1.82',
    mac: '80:30:49:A2:0C:2D',
    openPorts: [ [Object] ],
    osNmap: 'Microsoft Windows XP SP3',
    vendor: 'Liteon Technology'
  }
]
 */

// queue
/*
//the actionFunction gets run each time a scan on a host is complete
function actionFunction(data){
    console.log(data);
    console.log("Percentage complete" + scan.percentComplete());
}
var scan = new nmap.QueuedOsAndPortScan("google.com 192.168.0.1-10", actionFunction);

scan.on('complete', function(data){
    console.log(data);
    console.log("total scan time" + scan.scanTime);
});

scan.on('error', function(error){
  console.log(error);
});

scan.startRunScan(); //processes entire queue
 */
