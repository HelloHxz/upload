# SNKUpload
> 支持断点续传，图片压缩，分片上传

## Demo 实例
> npm install 

> npm start

> http://localhost:3000/index.html

## 使用方法

### webpack集成


```
var SnkUplpad = require("./某些目录/snkUpload");
var SparkMD5 = require("./某些目录/sparkMd5");

```


### 普通链接引用

```
<script src="./sparkMd5.js" type="text/javascript"></script>
<script src="./snkUpload.js"></script>
```

### 调用

> React ,Vue ,纯JS调用都大同小异

```
var Upload = new SnkUpload();
function onSelect(e){
   Upload.startUpload({
     url:"./fileupload",
     data:{
       extendkey:"一些字段"
     },
     chunckCount:1, //默认1
     compressedRatio:0.3,//默认0.5  0~1
     sparkMD5Instance:new SparkMD5(),
     file: e.target.files[0],
     getFileInfo:function(info){
       //可以获取到md5
       console.log(info)
     },
     success:function(params){
      //alert("上传成功");
     },
     error:function(params){
       /*
         params.msg 错误信息
         params.e 错误栈
       */
       console.log(params)
     },
     progress:function(params){
      console.log(params.precent);
     }
   })
}
```


![截图](https://github.com/HelloHxz/upload/blob/master/screenshots/1.png)
