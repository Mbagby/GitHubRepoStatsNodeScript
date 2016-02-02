//user agent not required for github data

var prompt = require('prompt');
var http = require('http');
var request = require('request');
var zlib = require('zlib');


var dateTime = 
var eventType =
var count =


prompt.start();
 prompt.get(['FromYearMonthDayHour', 'ToYearMonthDayHour', 'EventType', 'Count'], function (err, result) {
    console.log('Command-line input received:');
    console.log('FromYearMonthDayHour' + result.FromYearMonthDayHour);
    console.log('ToYearMonthDayHour' + result.ToYearMonthDayHour);
    console.log('EventType' + result.EventType);
    console.log('Count' + result.Count);
});

function getDataUnzip(url, callback) {
    var chunk = [];
    http.get(url, function(res) {
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);
        gunzip.on('data', function(data) {
            chunk.push(data.toString())
            //push newly ready data (unzipped) into chunk
        })
        .on("end", function() {
            //when the decompression(unzip) is complete
            callback(null, chunk.join("")); 
            //join the chunk
        })
        .on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}

//call function with query changes from prompt
getDataUnzip('http://data.githubarchive.org/' + '2015-01-01-12' + '.json.gz', function(err, data) {
   console.log(data);
});

