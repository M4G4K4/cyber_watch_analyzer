const client = require('shodan-client');

//TODO: See how information arravies and check if needs to ve mapped
async function getHostInformation(ip) {
    return await client.host(ip, process.env.SHODAN_API_KEY);
}

async function getHostInformation2(ip) {
    const result = await client.host(ip, 'DmBFoCoDSCTwAmyS6c5vqnIW5NB4KBLI');
    console.log(JSON.stringify(result));
}

async function getCVE(ip){
    const result = await client.host
}

getHostInformation2('62.28.241.49');

module.exports = {
    getHostInformation,
}
