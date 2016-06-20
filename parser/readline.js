var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('abbr-page.txt')
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
})