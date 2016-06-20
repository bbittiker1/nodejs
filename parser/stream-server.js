var fs = require('fs');



var htmlparser = require("htmlparser");
var sys = require('sys');

fs.createReadStream('abbr-page.txt');

var handler = new htmlparser.DefaultHandler(function (error, dom) {
	// if (error)
	// 	[...do something for errors...]
	// else
	// 	[...parsing done, do something...]
});
var parser = new htmlparser.Parser(handler);

fs.createReadStream('./abbr-page.txt').pipe(parser);

parser.done();

// parser.parseComplete(rawHtml);
sys.puts(sys.inspect(handler.dom, false, null));