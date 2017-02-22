var fetch = require('fetch').fetchUrl;
var download = require('download-file');
var cheerio = require('cheerio');

// For file
var fs = require('fs');
var lineReader = require('readline');

var urlsPath = '../config/urls.config';

var downloadConfigPath = '../config/url.config';
var downloadPath = '';

lineReader.createInterface({
    input: fs.createReadStream(downloadConfigPath)
}).on('line', function (url) {
    console.log(url);
});

lineReader.createInterface({
    input: fs.createReadStream(urlsPath)
}).on('line', function (url) {
    console.log("Scraping: "+url);
    //startScrape(url);
});

function startScrape(url) {
    /*
     * Structure of li
     *  |- span
     *    |- span(.unicode)
     *  |- a: contains text
     *  |- a
     *    |- audio
     *    |- image src (useless)
     */
    fetch(url, function(err, meta, body) {
        var $ = cheerio.load(body);

        var unicodeResults = [];
        var defResults = [];
        var results = [];

        var getUnicode = $('.highlight-block-right-wide article ol li span span');
        getUnicode.each(function(i, line) {
            var line = line.children[0].data;
            unicodeResults.push(line);
            console.log(line);
        });

        var defn = $('.highlight-block-right-wide article ol li a');
        defn.each(function(i, line) {
            try{
                if(line.next.data && (i % 2 == 0)){
                   var data = line.next.data.replace(/[\x00-\x1F\x7F-\x9F]/g, "");;
                   defResults.push(data);
                }
            } catch (e){}
        });

        var defn = $('.highlight-block-right-wide article ol li a audio');
        defn.each(function(i, line) {
            try{
                console.log(line.attribs.src);
            } catch (e){}
        });
        
    });
}
