const score = require('./src/score');
const Website = require('./src/models/Website');

async function cenas (){
    const ss = await score.perfomAnalysis('https://www.ipvc.pt/')
    console.log(ss);
}

cenas();