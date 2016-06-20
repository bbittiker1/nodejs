var trumpet = require('trumpet');
var tr = trumpet();

tr.selectAll('#td* td', function (span) {
    span.createReadStream().pipe(process.stdout);
});

var fs = require('fs');
fs.createReadStream(__dirname + '/' + 'abbr-page.txt').pipe(tr);