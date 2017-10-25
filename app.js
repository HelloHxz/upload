var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var bodyParser = require('body-parser')
var fs =require('fs-extra');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './')));

app.post('/fileupload',function (req, res) {
  /*
     这一步其实完全可以舍去  因为不知道怎么使用nodejs获取文件流 所以借助了第三方formidable获取文件流
  */
  var form = new formidable.IncomingForm();
  //未发生异常为0 发生异常code为1
  form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      // 文件扩展名
      var fileExtendName = fields.file_extend_name;
      // 文件的唯一标识
      var fileMD5 = fields.file_md5;
      //文件的原始大小
      var fileAllSize = parseInt(fields.file_size);
      // 存储路径
      var filePath = "./files/"+fileMD5+"."+fileExtendName;
      // 服务器该文件的大小
      var serverFileSize = 0;
      // 浏览器传过来的开始写入位置
      var clientStartIndex = parseInt(fields.file_start_index);

      // 如果文件存在 则读取大小 
      if(fs.existsSync(filePath)){
        var fileState = fs.statSync(filePath);
        serverFileSize = fileState.size;
      }

      if(fileAllSize===serverFileSize){
        //服务器的大小和文件一样说明文件已上传完成
        res.end(JSON.stringify({code:0,file_size:fileAllSize}));
        return;
      }
      if(serverFileSize!==clientStartIndex){
        //如果前端传来的开始位置和服务器文件不一致
        //返回正确的位置让前端判断是否继续上传
        res.end(JSON.stringify({code:0,file_size:serverFileSize}));
        return;
      }

      //读取片段
      var contentText = fs.readFileSync(files.blob.path);
      //追加写入
      fs.appendFileSync(filePath, contentText);
      //最新的文件大小
      var curSize = serverFileSize + files.blob.size;

      res.end(JSON.stringify({code:0,file_size:curSize}));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});