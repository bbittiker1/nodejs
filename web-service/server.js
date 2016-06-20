var express = require('express');
var app = express();
var fs = require("fs");
var $ = require('cheerio');
var http = require('http');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var sampleData = {
    cc: {},
    ssn: {
        name: [
            "KATHRYN T WATERS",
            "KATHRYN M TAMA",
            "KATHRYN TAMA",
            "KATHRYN T TAMA"],
        dob: "1952",
        addr: [
            "421 Campana Pl Arroyo Grande, CA 93420",
            "2931 Cathedral Ave NW Washington, DC 20008",
            "5306 W Lawrence Ave Ste 10 Chicago, IL 60630",
            "3105 Hawthorne St NW Washington, DC 20008",
            "2931 Cathedral Ave Northwest Ave Washington, DC 20008",
            "180 Harbor Dr Ste 112 Sausalito, CA 94965",
            "2931 Cathedral Avenue Northwest Ave Washington, DC 20008",
            "40 LINCOLN PARK AVENUE SAN ANSELMO, CA 94960",
            "40 LINCOLN PARK SAN ANSELMO, CA 94960",
            "0 LINCOLN PARK S SAN ANSELMO, CA 94960"
        ]
    }

};
Array.prototype.containsPartial = function (s) {
    for (var i in this) {
        if (this[i].indexOf && this[i].indexOf(s) > -1) {
            return true;
        }
    }
    return false;
};

app.get('/list', function (req, res) {
    var params = req.query;

    // console.log(params.lname);
    // console.log(params.fname);

    var lname = params.lname && params.lname.toUpperCase();
    var fname = params.fname && params.fname.toUpperCase();
    var zipCode = params.zip;

    var bFound = false;
    sampleData.ssn.name.forEach((function (s) {
        if (s.indexOf(lname) > -1) {
            bFound = true;
        }
    }));

    var myResp = {};
    if (sampleData.ssn.name.containsPartial(lname)) {
        myResp = sampleData;
    }

    res.json(myResp);
});

app.get('/ssn', function (req, res) {
    fs.readFile(__dirname + "/" + "ssndob_usssnresult_abbr.htm", 'utf8', function (err, data) {
        var myResp = [];

        var parsedHTML = $.load(data, {
            normalizeWhitespace: true
        });

        parsedHTML('tbody tr').each(function (i, tr) {
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

            tr.children[3].children.forEach(function (a) {
                if (a.type == 'text') {
                    myRecord.ssn.name.push(a.data);
                    myRecord.ssn.status = 1;
                }
            });

            tr.children[7].children.forEach(function (a) {
                if (a.type == 'text') {
                    myRecord.ssn.addr.push(a.data);
                    myRecord.ssn.status = 1;
                }
            });

            myRecord.ssn.dob = tr.children[5].children[0].data;

            myResp.push(myRecord);
        });

        res.json(myResp);
    });
});


app.get('/listssn', function (req, res) {
    var params = req.query;

    // console.log(params.lname);
    // console.log(params.fname);

    var lname = (params.lname && params.lname.toUpperCase()) || '';
    var fname = (params.fname && params.fname.toUpperCase()) || '';
    var state = (params.state) || '';


    // var bFound = false;
    // sampleData.ssn.name.forEach((function(s){
    //     if(s.indexOf(lname) > -1)  {
    //         bFound = true;
    //     }
    // }));
    //
    // var myResp = {};
    // if(sampleData.ssn.name.containsPartial(lname)) {
    //     myResp = sampleData;
    // }

    var myResp = {};

    var options = {
        host: "10.70.152.129",
        path: "/crawl?lname=" + lname + "&fname=" + fname + "&state=" + state,
        port: "83",
        method: "GET"
    };

    var callback = function (response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var myResp = [];

            var jsonData = JSON.parse(str);

            // var base64Encoded = str.join();
            if (jsonData.status == "Ready") {
                var base64Encoded = jsonData.data;
                var inputHTML = new Buffer(base64Encoded, 'base64').toString('utf-8');

                // console.log(inputHTML);

                var parsedHTML = $.load(inputHTML, {
                    normalizeWhitespace: true
                });

                var names = [];

                parsedHTML('tbody tr').each(function (i, tr) {
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

                    tr.children[3].children.forEach(function (a) {
                        if (a.type == 'text') {
                            myRecord.ssn.name.push(a.data);
                            myRecord.ssn.status = 1;
                        }
                    });

                    tr.children[7].children.forEach(function (a) {
                        if (a.type == 'text') {
                            myRecord.ssn.addr.push(a.data);
                            myRecord.ssn.status = 1;
                        }
                    });

                    myRecord.ssn.dob = (tr.children[5].children[0] && tr.children[5].children[0].data ) ?
                        tr.children[5].children[0].data : "";

                    myResp.push(myRecord);
                });
            } else {
                if (jsonData.status === "Not found") {
                    res.json("{}");
                } else if (jsonData.status === "In progress") {

                }

            }

            res.json(myResp);
        });
    };

    var myReq = http.request(options, callback);
    myReq.end();
});

//
// this will be replace by Seans stuff....
//
app.get('/base64', function (req, res) {
    fs.readFile(__dirname + "/" + "ssndob_usssnresult_base64_encoded.htm", 'utf8', function (err, data) {
        res.send(data);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});