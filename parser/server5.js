var fs = require('fs');
var readline = require('readline');

var filename = process.argv[2] || "multi-line.txt";
var a = [];

readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line) {
    
    if(line.indexOf('dumps[]') > -1) {
        a.push(line.trim());
    }

    // console.log('Line: ' + line);
}).on('close', function() {
    console.log(JSON.parse(JSON.stringify(a)));
});

