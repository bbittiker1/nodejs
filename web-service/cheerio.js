/*

 curl localhost:8082/ssn | nodejs cheerio-stream.js
 */


var $ = require('cheerio');
var request = require('request');

function gotHTML(err, resp, html) {
    if (err) return console.error(err);
    var parsedHTML = $.load(html, {
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
}

var domain = 'http://localhost:8082/ssn';
request(domain, gotHTML);