var htmlparser = require("htmlparser");
var sys = require('sys');

var handler = new htmlparser.DefaultHandler(function (error, dom) {

});
var parser = new htmlparser.Parser(handler);

// var dom = htmlparser.parseDOM("<html>your html string</html>");
// console.log(dom[0].children[0].data);

function visible(a) {
    var R  =  '';
    for (var i = 0; i < a.length; i++) {
        if (a[i] == '\b') {  R -= 1; continue; }
        if (a[i] == '\u001b') {
            while (a[i] != 'm' && i < a.length) i++;
            if (a[i] == undefined) break
        }
        else R += a[i]
    }
    return  R
}

function empty(a) {
    a = visible(a);
    for (var i = 0; i < a.length; i++) {
        if (a[i] != ' ') return false
    }
    return  true
}

var readline = require('readline');
var rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,
        terminal: false
    }
);

var rawHtml = '';

rl.on('line', function(line) {
    // console.log("line: " + line);
    rawHtml += line;
});

rl.on('close', function() {
    // console.log(rawHtml);

    parser.parseComplete(rawHtml);

    handler.dom.forEach((function(o){
        if(o.raw && o.raw == "tbody") {
            y = JSON.parse(JSON.stringify(o.children));
        }

        // console.log("tick");
    }));


    sys.puts(sys.inspect(handler.dom, false, null));
});

