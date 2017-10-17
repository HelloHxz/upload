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


// fd.append("blob", chunckBlob);
// fd.append("file_size", allSize);
// fd.append("file_start", startIndex);
// fd.append("file_name", file.name);
// fd.append("file_key", fileKey);
app.post('/fileupload',function (req, res) {
  var form = new formidable.IncomingForm();
  //Formidable uploads to operating systems tmp dir by default
  form.uploadDir = "./files";       //set upload directory
  form.keepExtensions = true;     //keep file extension

  form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});

      //读取已有文件的大小
      var fileKey = fields.file_key;
      var filePath = "./realpath/"+fileKey;
      var serverFileSize = 0;
      var fileContent = "";

      if(fs.existsSync(filePath)){
        var fileState = fs.statSync(filePath);
        serverFileSize = fileState.size;
        fileContent = fs.readFileSync(filePath);
        console.log(serverFileSize+"    size》》》");
      }

      var clientStartIndex = parseInt(fields.file_start);
      var fileAllSize = parseInt(fields.file_size);
      if(serverFileSize!==clientStartIndex){
        res.end(JSON.stringify({code:0,status:0,start:serverFileSize}));
        return;
      }

      console.log("file size: "+JSON.stringify(files.blob.size));
      console.log("file path: "+JSON.stringify(files.blob.path));
      console.log("file name: "+JSON.stringify(files.blob.name));
      console.log("file type: "+JSON.stringify(files.blob.type));

      var contentText = fs.readFileSync(files.blob.path);
      
      fs.appendFileSync(filePath, contentText);

      fs.rename(files.blob.path, './files/'+files.blob.name, function(err) {
        if (err){
          throw err;
        }
        console.log('renamed complete');  
      });
      var curSize = serverFileSize + files.blob.size;
      
      var upState = 0;
      if(curSize===fileAllSize){
        upState = 1;
      }
      res.end(JSON.stringify({code:0,status:upState,start:curSize}));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});