var express = require('express');
var app = express();
var fs = require("fs");


var data = {
    cc: {},
    ssn: {
        name: [
            "KATHRYN T WATERS",
            "KATHRYN M TAMA",
            "KATHRYN TAMA",
            "KATHRYN T TAMA"],
        dob: "1952",
        addr:[
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

var htmlparser = require("htmlparser");
var sys = require('sys');

var handler = new htmlparser.DefaultHandler(function (error, dom) {
    // if (error)
    // 	[...do something for errors...]
    // else
    // 	[...parsing done, do something...]
});
var parser = new htmlparser.Parser(handler);

app.get('/ssn', function (req, res) {
    fs.readFile( __dirname + "/" + "ssndob_usssnresult_abbr.htm", 'utf8', function (err, data) {
        res.send(data);
    });
});

//
// this will be replace by Seans stuff....
//
app.get('/base64', function (req, res) {
    fs.readFile( __dirname + "/" + "ssndob_usssnresult_base64_encoded.htm", 'utf8', function (err, data) {
        res.send(data);
    });
});

var server = app.listen(8082, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});