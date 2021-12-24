const axios = require('axios');
const mapper = require('./headersMapper');

async function websiteRequest(url){
    let result;

    if(!url.includes('http:') && !url.includes('https:')){
        console.error('Badly formed url');
        return null;
    }

    const response = await axios.get(url)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        return null;
    });

    if(response === null){
        return null;
    }

    if(response.status == 404){
        console.error('Headers - Not found');
    }else if(response.status == 400){
        console.error('Headers - Bad Request');
    }else if(response.status == 200){
        if(response.headers != undefined){
            console.log(response.headers)
            result = mapper.mapHeaders(response.headers);
        }
    }
    return result;
}

module.exports={
    websiteRequest
}