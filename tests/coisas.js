var child_process = require('child_process');

var child = child_process.spawnSync("npm -v", [""], { encoding : 'utf8' });
console.log("Process finished.");
if(child.error) {
    console.log("ERROR: ",child.error);
}
console.log("stdout: ",child.stdout);
console.log("stderr: ",child.stderr);
console.log("exist code: ",child.status);
