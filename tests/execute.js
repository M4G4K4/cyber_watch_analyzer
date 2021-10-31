const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

module.exports.getGitUser = async function getGitUser () {
    // Exec output contains both stderr and stdout outputs
    const nameOutput = await exec('dir')

    return {
        name: nameOutput.stdout.trim(),
    }
};
