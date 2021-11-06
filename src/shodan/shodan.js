const client = require('shodan-client');

async function getHostInformation(ip){
    return await client.host(ip, process.env.SHODAN_API_KEY);
}

module.exports = {
    getHostInformation,
}
