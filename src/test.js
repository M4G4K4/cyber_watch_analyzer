const domain = require('./domain/domain');
const score = require('./score');
const utils = require('./utilities/utils');
const nmap = require('./nmap/nmap');
const headers = require('./headers/headers');
const axios = require('axios');

const url = 'https://stackoverflow.com/';
const url2 = 'https://www.ipvc.pt';

const url6 = 'www.ipvc.pt';
const ip = '62.28.241.49';

const url3 = 'https://www.uminho.pt';

const url4 = 'ipvc.pt';

const ip2 = '192.168.1.94';

(async() => {

    const cenas = await score.calculateScore(url2);
    console.log(cenas);
    
  })()