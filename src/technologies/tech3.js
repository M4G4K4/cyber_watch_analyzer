var wb = require('whatsbehind');
var url = "https://www.ipvc.pt/";
wb.scan(url, function (err, data) {
    // this function is called multiple times until data.status is "complete"
 
    if (err) {
        console.log("Error : Scan of \"" + url + "\" failed : " + err.name + ":" + err.message + ".");
        return;
    }
 
    if (data.status == "complete") {
        console.log("Scan completed successfully");
        console.log(JSON.stringify(data.detected));
    } else {
        console.log("Progress : " + data.progress + "% (" + data.progressDescription + ")");
    }
});