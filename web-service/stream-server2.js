
var htmlparser = require("htmlparser");
var sys = require('sys');

var handler = new htmlparser.DefaultHandler(function (error, dom) {

});
var parser = new htmlparser.Parser(handler);

var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    var inputHTML = inputChunks.join();


    parser.parseComplete(inputHTML);

    var y = '';

    handler.dom.forEach((function(o){
        if(o.raw && o.raw == "tbody") {
            y = JSON.parse(JSON.stringify(o.children));
        }

        // console.log("tick");
    }));

    var myResp = {
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

    // everything
    // sys.puts(sys.inspect(y[1].children, false, null));

    // names
    // sys.puts(sys.inspect(y[1].children[3].children, false, null));

    // addr
    //sys.puts(sys.inspect(y[1].children[7].children, false, null));


    // for

    // dob
    sys.puts(sys.inspect(y[1].children[5].children[0].data, false, null));



    //     parsedData = JSON.parse(JSON.stringify(inputJSON));
    //     // outputJSON = JSON.stringify(parsedData, null, '    ');
    // // stdout.write(outputJSON);
    // // stdout.write('\n');

    // sys.puts(sys.inspect(parsedData[0], false, null));

});