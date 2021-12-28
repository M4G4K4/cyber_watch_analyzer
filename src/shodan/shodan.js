require('dotenv').config();
const client = require('shodan-client');


async function getHostInformation(ip) {
    const result =  await client.host(ip, 'DmBFoCoDSCTwAmyS6c5vqnIW5NB4KBLI'); //process.env.SHODAN_API_KEY
    return result;
}


module.exports = {
    getHostInformation,
}
