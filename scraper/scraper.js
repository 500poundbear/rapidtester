var fetch = require('fetch').fetchUrl;
var download = require('download-file');
var cheerio = require('cheerio');

// For file
var fs = require('fs');
var lineReader = require('readline');

var urlsPath = '../config/urls.config';

var downloadConfigPath = '../config/url.config';
var downloadPath = '';

// Configuration
var audioSavePath = './clips';

// Results
var results = [];

lineReader.createInterface({
    input: fs.createReadStream(downloadConfigPath)
}).on('line', function (url) {
    downloadPath = url;
});

lineReader.createInterface({
    input: fs.createReadStream(urlsPath)
}).on('line', function (url) {
    console.log("Scraping: "+url);
    startScrape(url);
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

        var defResults = [];
        var pathResults = [];
        var unicodeResults = [];

        var getUnicode = $('.highlight-block-right-wide article ol li span span');
        getUnicode.each(function(i, line) {
            var gline = line.children[0].data;
            unicodeResults.push(gline);
        });

        var defn = $('.highlight-block-right-wide article ol li a');
        defn.each(function(i, line) {
            try{
                if(line.next.data && (i % 2 === 0)){
                   var data = line.next.data.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
                   defResults.push(data);
                }
            } catch (e){}
        });
        var aud = $('.highlight-block-right-wide article ol li a audio');
        aud.each(function(i, line) {
            try{
                var path = line.attribs.src;

                var url = downloadPath + path;

                var options = {
                    directory: audioSavePath
                };

                pathResults.push(getRelativePath(path));

                download(url, options, function(err) {
                    if (err) {
                        console.log(err);
                        console.log("Path " + url + " has NOT completed.");
                        return;
                    }
                    console.log("Path " + url + " has completed.");
                });
            } catch (e){}
        });

        consolidateResults(unicodeResults, defResults, pathResults);

        fs.appendFile('output.json', JSON.stringify(results), function(err) {
            if (err) throw err;
            console.log("Written");
        });

    });
}

function consolidateResults(unicodeResults, defResults, pathResults) {
    unicodeResults.forEach(function (result, i) {
        var obj = {
            'unicode' : result,
            'definition' : defResults[i],
            'path' : pathResults[i],

        };
        results.push(obj);
    });
    console.log(results);
}

function getRelativePath(path) {
    var segments = path.split('/');
    return segments[segments.length - 1];
}
