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



参数名| 说明  | 类型 | 必填
---|---|---|---
url | 上传地址，可带get参数 | String | 是
data | formData参数扩展 | Json|否
chunckCount | 分片数,默认分3片上传 |Int|否
compressedRatio |图片压缩率,默认0.3 范围 0.01~1 |INT|否
sparkMD5Instance |MD5插件实例 |Object|是
file |input type='file' 选中的文件对象 |File|是
getFileInfo |获取到md5和压缩后的信息 |Function|否
success |上传成功回调 |Function|否
error |上传失败回调 |Function|否
progress |上传进度回调 |Function|否




![截图](https://github.com/HelloHxz/upload/blob/master/screenshots/1.png)
