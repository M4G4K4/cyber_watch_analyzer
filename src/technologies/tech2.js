const detector = require('web-technology-detector');

async function cenas(){
    let technologies = await new detector().url('https://www.ipvc.pt');
    console.log(JSON.stringify(technologies));
}
cenas();