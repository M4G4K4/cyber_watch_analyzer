const execSync = require('child_process').execSync;
const code = execSync('nmap 192.168.1.88');
console.log(code.toString())
