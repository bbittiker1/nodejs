var http = require("http");

var options = {
    host: 'stackoverflow.com',
    port: 80,
    path: '/questions/6819143/curl-equivalent-in-nodejs',
    method: 'POST'
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    res.on('end', function() {
        // console.log('done');
    })
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();