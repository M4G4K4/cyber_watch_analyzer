const client = require('shodan-client');


//TODO: See how information arravies and check if needs to ve mapped
async function getHostInformation(ip){
    return await client.host(ip, process.env.SHODAN_API_KEY);
}

module.exports = {
    getHostInformation,
}
