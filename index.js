/*
const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default
let quickscan = new nmap.QuickScan('127.0.0.1 google.com');
 */

const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default
let quickscan = new nmap.OsAndPortScan ('192.168.1.0/24');


quickscan.startScan();

// var nmapscan = new nmap.NmapScan('127.0.0.1 google.com', '-sn');
