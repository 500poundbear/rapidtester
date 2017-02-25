/* 
 * Initial document: Multiple []s containing {"unicode":.., "definition":..,
 * "path:..."}
 * 
 * Modified document: [{"unicode":, "meaning":,"path":, "romanisation":,},..]
 *
 * */

var fs = require('fs');
var lineReader = require('readline');

var totalObj = JSON.parse('[]');

lineReader.createInterface({
    input: fs.createReadStream('output.json')
}).on('line', function (objStr) {
    console.log("WORKING ON LINE");
    var currObj = JSON.parse(objStr);
    console.log(currObj);
    currObj.forEach(function(e) {
        var newObj = JSON.parse('{}');
        newObj["unicode"]=e["unicode"];
        newObj["meaning"]=e["definition"].slice(3);
        newObj["path"]="/clips/"+e["path"];
        newObj["romanisation"]=e["path"].split('.')[0];
        totalObj.push(newObj);
    });
}).on('close', function() {
    console.log("END");
    console.log(totalObj);
    fs.appendFile('tidiedOutput.json', JSON.stringify(totalObj), function(err) {
        if (err) throw err;
        console.log("written");
    });
});
