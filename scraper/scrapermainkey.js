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

        var getWordsWithAudio = $('audio').first();
        getWordsWithAudio.each(function(i, line) {
            pathResults.push(line.attribs.src);
            //console.log(getWordsWithAudio.parent().prev().prev());
            console.log(getWordsWithAudio.parent());
        });

/*        var getUnicode = $('li>span.unicode>span.font40');
        getUnicode.each(function(i, line) {
            var gline = line.children[0].data;
            unicodeResults.push(gline);
        });
        console.log(unicodeResults.length);


        var getRoman = $('li span.unicode span.font40').parent().siblings('.burmese').text();
        console.log(getRoman);
*/
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
