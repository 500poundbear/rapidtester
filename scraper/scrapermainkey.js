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
    fetch(url, function(err, meta, body) {
        var $ = cheerio.load(body);

        var defResults = [];
        var romanResults = [];
        var pathResults = [];
        var unicodeResults = [];

        var getListElement = $('audio').parent();
        var getRoman = getListElement.siblings('.burmese');

        var getUnicode = getListElement.siblings('.blue, .unicode');
        getUnicode.each(function(i, line) {
            if (line.attribs.class === "blue") {
                //Modifications
                console.log(line.children[0].children[0].data);
            } else if (line.attribs.class === "unicode") {
                // Main words
                //console.log(line.children[0].children[0].data);
            }
        });

/*
        var aud = $('.highlight-block-right-wide article ol li a audio');
        aud.each(function(i, line) {
            try{
                var path = line.attribs.src;

                var url = downloadPath + path;

                var options = {
                    directory: audioSavePath
                };

                pathResults.push(getRelativePath(path));

                /*download(url, options, function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log("Path " + url + " has completed.");
                });
            } catch (e){}
        });*/
        consolidateResults(unicodeResults, defResults, pathResults);
    });
}

function consolidateResults(unicodeResults, defResults, pathResults) {
    unicodeResults.forEach(function (result, i) {
        var obj = {
            'unicode' : result,
            'definition' : defResults[i],
            'path' : pathResults[i]
        };
        results.push(obj);
    });
    console.log(results);
}

function getRelativePath(path) {
    var segments = path.split('/');
    return segments[segments.length - 1];
}
