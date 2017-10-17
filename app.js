var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var bodyParser = require('body-parser')
var fs =require('fs-extra');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// app.post("/fu",urlencodedParser,function(req,res){
//   console.log(req.body);
//   console.log(req.files);
//   res.end(JSON.stringify({code:0,status:1,start:100000}));
// })


app.post('/fileupload',function (req, res) {
  /*
     start
     这一步其实完全可以舍去  因为不知道怎么使用nodejs获取文件流 所以借助了第三方formidable获取文件流
  */
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      // 文件的唯一标识
      var fileKey = fields.file_key;
      //文件的原始大小
      var fileAllSize = parseInt(fields.file_size);
      // 存储路径
      var filePath = "./files/"+fileKey;
      // 服务器该文件的大小
      var serverFileSize = 0;
      // 浏览器传过来的开始写入位置
      var clientStartIndex = parseInt(fields.file_start);

      // 如果文件存在 则读取大小 
      if(fs.existsSync(filePath)){
        var fileState = fs.statSync(filePath);
        serverFileSize = fileState.size;
      }
      
      if(serverFileSize!==clientStartIndex){
        //如果前端传来的开始位置和服务器文件不一致
        //返回正确的位置让前端继续上传
        res.end(JSON.stringify({code:0,status:0,start:serverFileSize}));
        return;
      }

      //读取片段
      var contentText = fs.readFileSync(files.blob.path);
      //追加写入
      fs.appendFileSync(filePath, contentText);
      //最新的文件大小
      var curSize = serverFileSize + files.blob.size;
      var uploadStatus = 0;
      if(curSize===fileAllSize){
        //标识文件上传完成
        uploadStatus = 1;
      }
      res.end(JSON.stringify({code:0,status:uploadStatus,start:curSize}));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});