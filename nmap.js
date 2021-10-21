// https://github.com/harryhorton/node-nmap
/*
const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default
let quickscan = new nmap.QuickScan('127.0.0.1 google.com');
 */

const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default
let quickscan = new nmap.OsAndPortScan ('192.168.1.0/24');

quickscan.on('complete', function(data){
    console.log(data);
});

quickscan.on('error', function(error){
    console.log(error);
});

var ceas = quickscan.startScan();

console.log(ceas);

// var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');
