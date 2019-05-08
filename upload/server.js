const express    = require("express");
const fileUpload = require('express-fileupload');

var app = express();
app.use(fileUpload());

let port = 4000;
let httpCodes = {
    BAD_REQUEST: 400,
    SERVER_ERROR: 500
};

app.post('/fileupload', function(req, res) {

    function isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    }

    if (isEmpty(req.files)) {
        return res.status(httpCodes.BAD_REQUEST).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file.
    let f = req.files.file;
    let filePath = `/tmp/${f.name}`;

    // Use the mv() method to place the file somewhere on your server
    f.mv(filePath, function(err) {
        if(err) {
            return res.status(httpCodes.SERVER_ERROR).send(err);
        }

        res.send('\n\nFile uploaded!\n\n'); // Inform client of successful upload.
    });
});

console.log(`Listening on port ${port}`);

app.listen(port);
