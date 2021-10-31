// https://github.com/harryhorton/node-nmap
// var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');

const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap';

//var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');
// var nmapscan = new nmap.NmapScan('127.0.0.1 --script vulners');
// var nmapscan = new nmap.NmapScan('127.0.0.1 --script vulners', '-sV');
// var nmapscan = new nmap.NmapScan('127.0.0.1 -sV --script vulners');

// 13.225.242.113
let scan = new nmap.NmapScan('192.168.1.88', '-O');




scan.on('complete', function(data){
    console.log(data);
    console.log(data[0].openPorts);
});

scan.on('error', function(error){
    console.log(error);
});

scan.startScan();
