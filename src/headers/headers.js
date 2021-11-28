const axios = require('axios');
const mapper = require('./headersMapper');

async function websiteRequest(url){
    let result;

    if(!url.includes('http:') && !url.includes('https:')){
        console.error('Badly formed url');
        return null;
    }

    const request = await axios({
        url: url,
        method: 'GET'
    });

    if(request.status == 404){
        console.error('Headers - Not found');
    }else if(request.status == 400){
        console.error('Headers - Bad Request');
    }else if(request.status == 200){
        if(request.headers != undefined){
            result = mapper.mapHeaders(request.headers);
        }
    }

    return result;
}

module.exports={
    websiteRequest
}