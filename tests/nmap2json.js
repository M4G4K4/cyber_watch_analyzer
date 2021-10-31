var processor = require('nmap2json')
processor(unparsedxml, (err, result)=>{
    console.log(result)
})
