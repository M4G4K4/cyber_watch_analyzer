const domain = require('./domain/domain');
const score = require('./score');
const utils = require('./utilities/utils');
const nmap = require('./nmap/nmap');
const headers = require('./headers/headers');

const url = 'https://stackoverflow.com/';
const url2 = 'https://www.ipvc.pt';

const url6 = 'www.ipvc.pt';
const ip = '62.28.241.49';

const url3 = 'https://www.uminho.pt';

const url4 = 'ipvc.pt';

(async() => {
    //const cenas = await nmap.scanSllEnumCiphers(url6);
    //console.log(cenas);

    const cenas = await headers.getHeaders(url2);
    console.log(cenas);
  })()