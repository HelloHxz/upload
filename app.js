var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var bodyParser = require('body-parser')
var fs =require('fs-extra');


app.use(bodyParser.json());
app.use(bodyParser({defer: true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static(path.join(__dirname, 'public')));


app.post('/fileupload',function (req, res) {
  var form = new formidable.IncomingForm();
  //Formidable uploads to operating systems tmp dir by default
  form.uploadDir = "./files";       //set upload directory
  form.keepExtensions = true;     //keep file extension

  form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      console.log("form.bytesReceived");
      //TESTING
      console.log("file size: "+JSON.stringify(files.fileUploaded.size));
      console.log("file path: "+JSON.stringify(files.fileUploaded.path));
      console.log("file name: "+JSON.stringify(files.fileUploaded.name));
      console.log("file type: "+JSON.stringify(files.fileUploaded.type));

      var contentText = fs.readFileSync(files.fileUploaded.path);
      fs.writeFileSync("./realpath/"+files.fileUploaded.name, contentText);

      fs.rename(files.fileUploaded.path, './files/'+files.fileUploaded.name, function(err) {
        if (err){
          throw err;
        }
        console.log('renamed complete');  
      });
      res.end(JSON.stringify({code:0,status:200}));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});