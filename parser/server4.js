var htmlparser = require("htmlparser");
var sys = require("sys");
var fs = require("fs");

var rawHtml = fs.readFileSync(process.argv[2]);

var handler = new htmlparser.DefaultHandler(function (error, dom) {
    // if (error)
    //     [...do something for errors...]
    // else
    // [...parsing done, do something...]
});

var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
sys.puts(sys.inspect(handler.dom, false, null));