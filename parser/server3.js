var htmlparser = require("htmlparser");
var sys = require('sys');

var rawHtml = '';

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('multi-line.txt'),
    output: rawHtml,
    terminal: false
});

lineReader.on('line', function (line) {
    rawHtml += line;

    var x = 1;
    //console.log(rawHtml);
    // console.log('Line from file:', line);
    // rawHtml += line;
    // rawHtml = rawHtml + line;
    // console.log(line);


});

var handler = new htmlparser.DefaultHandler(function (error, dom) {
    // if (error)
    // 	[...do something for errors...]
    // else
    // 	[...parsing done, do something...]
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
sys.puts(sys.inspect(handler.dom, false, null));