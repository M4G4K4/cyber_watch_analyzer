const client = require('shodan-client');

//TODO: See how information arravies and check if needs to ve mapped
async function getHostInformation(ip) {
    const result =  await client.host(ip, 'DmBFoCoDSCTwAmyS6c5vqnIW5NB4KBLI'); //process.env.SHODAN_API_KEY
    console.log(JSON.stringify(result));
}

getHostInformation('193.137.9.114')

module.exports = {
    getHostInformation,
}
