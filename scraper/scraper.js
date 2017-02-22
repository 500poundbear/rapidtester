var scraperjs = require('scraperjs');
var download = require('download-file');

// For file
var fs = require('fs');
var lineReader = require('readline');

var urlsPath = '../config/urls.config';

lineReader.createInterface({
      input: fs.createReadStream(urlsPath)
}).on('line', function (url) {
    console.log("Scraping: "+url);
    startScrape(url);
});

function startScrape(url) {
    
}
