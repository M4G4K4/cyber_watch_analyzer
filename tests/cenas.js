var nmap = require('node-nmap-vulners');

nmap.nmapLocation = "nmap"; //default

var nmapscan = new nmap.NmapScan('192.168.1.88 --script vulners');

nmapscan.on('complete',function(data){
    console.log(data);
    console.log(data[0].openPorts);
});
nmapscan.on('error', function(error){
    console.log(error);
});

nmapscan.startScan();

