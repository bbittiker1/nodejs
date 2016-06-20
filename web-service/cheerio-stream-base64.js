var $ = require('cheerio');
var sys = require('sys');
var request = require('request');


var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    var base64Encoded = inputChunks.join();

    var inputHTML = new Buffer(base64Encoded, 'base64').toString('utf-8');

    var parsedHTML = $.load(inputHTML, {
        normalizeWhitespace: true
    });

    var myResp = [];

    var names = [];

    parsedHTML('tbody tr').each(function(i, tr){
        var myRecord = {
            cc: {
                status: 0
            },
            ssn: {
                status: 0,
                addr: [],
                name: [],
                dob: ''
            }
        };

        tr.children[3].children.forEach(function(a) {
            if(a.type == 'text') {
                myRecord.ssn.name.push(a.data);
                myRecord.ssn.status = 1;
            }
        });

        tr.children[7].children.forEach(function(a){
            if(a.type == 'text') {
                myRecord.ssn.addr.push(a.data);
                myRecord.ssn.status = 1;
            }
        });

        myRecord.ssn.dob = tr.children[5].children[0].data;

        myResp.push(myRecord);
    });

    console.log(myResp);

});


