//user agent not required for github data

var prompt = require('prompt');
var http = require('http');
var request = require('request');
var zlib = require('zlib');


// var dateTime = "";
// var eventType = "";
// var count = "";


prompt.start();
 prompt.get(['FromYearMonthDayHour', 'ToYearMonthDayHour', 'EventType', 'Count'], function (err, result) {
    console.log('Command-line input received:');
    console.log('FromYearMonthDayHour' + result.FromYearMonthDayHour);
    console.log('ToYearMonthDayHour' + result.ToYearMonthDayHour);
    console.log('EventType' + result.EventType);
    console.log('Count' + result.Count);
    //var dateTime = ;// More complicated come back to and fix this 
	var eventType = result.EventType;
	var count = result.Count;


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
        .on("err", function(e) {
            callback(e);
        })
    }).on('err', function(e) {
        callback(e)
    });
}


//call function with query changes from prompt
//TO DO STILL:
//the date will change based on variable (dateTime), count, and event type with information
getDataUnzip('http://data.githubarchive.org/' + '2015-01-01-12' + '.json.gz', function(err, data) {
   console.log(data);
   // console.log(typeof(data));
});
});

//Need to turn string to json to get the first (Count) that is entered into the prompt
// var jsonnn = JSON.parse(data);
//    console.log(typeof(jsonnn));
