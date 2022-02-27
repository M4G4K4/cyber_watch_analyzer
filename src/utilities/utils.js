//Receives format dd/mm/yyyy
function getAge(dateString) {
    var date = dateString.substring(0,10)

    var finalDate;

    // 2003-12-26
    if(date.includes('-')){
        var year = date.substring(0,4);
        var month = date.substring(6,7);
        var day = date.substring(8,10);

        finalDate = year + '/' + month + '/' + day;
        
    }else if(date.includes('/')){
        var year = date.substring(6,10);
        var month = date.substring(3,5);
        var day = date.substring(0,2);
    
        finalDate = year + '/' + month + '/' + day;
    }

    var today = new Date();
    var birthDate = new Date(finalDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    age = age * 12 + m;
    return age;
}

module.exports = {
    getAge
}