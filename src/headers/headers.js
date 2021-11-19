const axios = require('axios');
const mapper = require('./headersMapper');

async function websiteRequest(url){
    const result = await axios({
        url: url,
        method: 'GET'
    });

    if(result.status == 404){
        console.error('Headers - Not found');
    }else if(result.status == 400){
        console.error('Headers - Bad Request');
    }else if(result.status == 200){
        return mapper.mapHeaders(result.headers);
    }
}

module.exports={
    websiteRequest
}