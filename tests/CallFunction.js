const execute = require('./execute');

async function cenas(){
    const result = await execute.getGitUser();
    console.log(result.name);
}

cenas();
