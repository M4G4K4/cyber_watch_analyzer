function mapShodanResult(result){

    const data = {
        city: result.city != undefined ? result.city : null,
        os: result.os != undefined ? result.os : null,
        isp: result.isp != undefined ? result.isp : null,
        longitude: result.longitude != undefined ? result.longitude : null,
        latitude: result.latitude != undefined ? result.latitude : null,
        ports: result.ports != undefined ? result.ports : null,
        country_code: result.country_code != undefined ? result.country_code : null,
        country_name: result.country_name != undefined ? result.country_name : null,
        org: result.org != undefined ? result.org : null,
    }

    return data;
}

module.exports = {
    mapShodanResult
}