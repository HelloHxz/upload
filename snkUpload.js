;(function(){
    function Upload() {
        this.xhr = null; 
    }

    Upload.prototype = {
        /*
            {
                sparkMD5Instance:null,
                file:e.target.files[0]，
                url:"",
                chunckCount:1,//default 0.5
                compressedRatio:0.5,//defult 0.5
                success：function(){},
                progress:function(){},
                error:function(){}
            }
        */
        startUpload:function(config){
            var _this = this;
            if(!config){
                console.error("snk-upload组件startUpload方法缺少参数");
            }
            if(!config.sparkMD5Instance){
                console.error("snk-upload组件startUpload方法缺少sparkMD5Instance参数,引入spark-md5.min.js并实例化传入");
            }
            if(!config.url){
                console.error("snk-upload组件startUpload方法缺少url参数");
            }
            this.url = config.url;
            if(!config.file){
                console.error("snk-upload组件startUpload方法缺少file参数,file例如：e.target.files[0]");
            }
            this.successCallBack = config.success;
            this.errorCallBack = config.error;
            this.getFileInfo = config.getFileInfo;
            this.progressCallBack = config.progress;
            this.extendsData = config.data || {};
            
            this.chunckCount = 1;
            if(config.chunckCount&&!isNaN(config.chunckCount)){
                this.chunckCount = config.chunckCount;
            }
            this.sparkMD5Instance = config.sparkMD5Instance;
            this.compressedRatio = 0.5;
            if(config.compressedRatio&&!isNaN(config.compressedRatio)){
                this.compressedRatio = config.compressedRatio;
            }
            this.fileName = config.file.name;

            var file_suffix = "";
            var nameArr =this.fileName.split(".");
            if(nameArr.length >= 2){
                file_suffix = nameArr[nameArr.length-1];
            }
            this.fileExtendName = file_suffix;
            this.compressImage(config.file,config.compressedRatio,function(compressedFile){
                _this._getFileMd5(compressedFile,_this.fileName,function(md5){
                    var info = {
                        fileSize:compressedFile.size,
                        file:compressedFile,
                        md5:md5,
                        fileName:_this.fileName,
                        fileExtendName:this.fileExtendName
                     };
                    if(_this.getFileInfo){
                        _this.getFileInfo(info);
                    }
                     _this._start(info);
                });
            });

            return this;
        },
        _uploadFile:function(params){

            //this.testStep = this.testStep||0;
            
            // if(this.testStep>=3){
            //     alert("asdasd");
            //     return;
            // }
            
            // this.testStep += 1;
            

            var file = params.file;
            var startIndex = params.startIndex;
            var chunkSize = params.chunkSize;
            var fileSize = params.fileSize;
            var md5 = params.md5;
            
            var fd = new FormData();
            var chunckBlob = null;
            if(startIndex+chunkSize<fileSize){
                chunckBlob=file.slice(startIndex,startIndex+chunkSize);
            }else{
                chunckBlob=file.slice(startIndex);
            }
            fd.append("blob", chunckBlob);
            fd.append("file_size", fileSize);
            fd.append("file_start_index", startIndex);
            fd.append("file_name", this.fileName);
            fd.append("file_md5", md5);
            fd.append("file_extend_name",this.fileExtendName);

            for(var key in this.extendsData){
                if(["blob","file_size","file_start_index","file_name","file_md5","file_extend_name"].indexOf(key)>=0){
                    console.error("data中字段"+key+"和插件内置字段重名");
                    return;
                }
                fd.append(key,this.extendsData[key]);
            }
            this.xhr.open('POST', this.url, true);
            this.xhr.send(fd);
        },
        _start:function(params){
            var _this = this;
            var fileSize = params.fileSize;
            var md5 = params.md5;
            var file = params.file;

            var chunkSize = parseInt(Math.ceil((fileSize/ this.chunckCount)));
            this.hasAlreadyUploadSize = 0;

            this.xhr = null;
            this.xhr = new XMLHttpRequest();

            function onprogressHandler (evt){
                var loaded = 0;
                if (evt.lengthComputable) {
                    loaded = evt.loaded;
                }else {
                }
                
                var precent = Math.round((_this.hasAlreadyUploadSize+loaded) * 100 /fileSize);
                _this.progressCallBack && _this.progressCallBack({
                    precent:precent>100?100:precent,
                    loaded:_this.hasAlreadyUploadSize+loaded,
                    fileSize:fileSize
                });
            }

            this.xhr.upload.addEventListener('progress', onprogressHandler, false);

            this.xhr.onreadystatechange = function(){
                if (_this.xhr.readyState==4 && _this.xhr.status==200){
                   var RJSON = JSON.parse(_this.xhr.responseText);
                   if(RJSON.code===0){
                        var RFileSize = RJSON.file_size;
                        _this.writeStartIndexWithFileKey(md5,RFileSize);
                        if(RFileSize<fileSize){
                            //继续上传
                            if(_this.hasAlreadyUploadSize===RFileSize){
                                // 避免死循环
                                return;
                            }
                            _this.hasAlreadyUploadSize = RFileSize;
                            _this._uploadFile({
                                file:file,
                                startIndex:RFileSize,
                                chunkSize:chunkSize,
                                md5:md5,
                                fileSize:fileSize
                            });
                        }else{
                            _this.uploadSuccess(md5,RJSON,RFileSize);
                            return;
                        }
                   }else{
                       _this.uploadError({
                         code:0,
                         msg:RJSON.msg||"服务器发生错误",
                         e:"服务器发生错误"
                       });
                   }
                }else if(_this.xhr.status!==0&& _this.xhr.status!==200){
                    _this.uploadError({
                        code:1,
                        msg:_this.xhr.responseText,
                        e:"服务器发生错误"
                    });
                }
            }

            var startIndex = this.readStartIndexByFileKey(md5);
            this._uploadFile({
                file:file,
                startIndex:startIndex,
                chunkSize:chunkSize,
                md5:md5,
                fileSize:fileSize
            });
        },
        uploadError:function(response){
            this.errorCallBack && this.errorCallBack(response);
        },
        uploadSuccess:function(md5,response,fileSize){
            this.removeStartIndexByFileKey(md5);
            this.successCallBack && this.successCallBack(response);
            this.progressCallBack && this.progressCallBack({
                precent:100,
                loaded:fileSize,
                fileSize:fileSize
            });
        },
        getStoreIndexKey:function(md5){
            return md5+"_uploadfilemd5";
        },
        readStartIndexByFileKey:function(fileKey){
            var v = localStorage.getItem(this.getStoreIndexKey(fileKey));
            if(!isNaN(v)&&v){
                return parseInt(v);
            }
            return 0;
        },
        writeStartIndexWithFileKey:function(fileKey,startIndex){
            localStorage.setItem(this.getStoreIndexKey(fileKey),startIndex);
        },
        removeStartIndexByFileKey:function(fileKey){
            localStorage.removeItem(this.getStoreIndexKey(fileKey));
        },
        _getFileMd5:function(file,fliename,successCallBack){
            var fileReader = new FileReader(),    
                blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,    
                chunkSize = 2097152,    
                chunks = Math.ceil(file.size / chunkSize),    
                currentChunk = 0,    
                spark = this.sparkMD5Instance;    

            try{
                fileReader.onload = function(e) {    
                    spark.appendBinary(e.target.result); 
                    currentChunk++;    
                
                    if (currentChunk < chunks) {    
                        loadNext();    
                    }    
                    else {    
                        successCallBack(spark.end());  
                    }    
                };    
                function loadNext() {    
                    var start = currentChunk * chunkSize,    
                        end = start + chunkSize >= file.size ? file.size : start + chunkSize;    
                
                    fileReader.readAsBinaryString(blobSlice.call(file, start, end));    
                };    
                loadNext();  

            }catch(e){
                this.uploadError({
                    code:0,
                    msg:"计算MD5发生错误",
                    e:e
                });
            }
          
        },
        compressImage:function(file,compressedRatio,successCallBack){
            var isImage = file.type.indexOf("image")>=0&&file.type.indexOf("gif")<0;
            if(!isImage){
                successCallBack(file);
                return;
            }
            try{
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    var dataUrl = reader.result;   
                    var img = new Image();
                    img.onload = function () {
                        var canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, img.width, img.height);
                        var data = canvas.toDataURL('image/jpeg',compressedRatio);
                        data = data.split(',')[1];
                        data = window.atob(data);
                        var ia = new Uint8Array(data.length);
                        for (var i = 0; i < data.length; i++) {
                            ia[i] = data.charCodeAt(i);
                        }
                        var blob = new Blob([ia], { type: 'image/jpeg' });
                        successCallBack(blob)
                    }
                    img.src = dataUrl;    
                }
            }catch(e){
                this.uploadError({
                    code:0,
                    msg:"压缩图片发生错误",
                    e:e
                });
            }
            
        }

    }
    
    var moduleName = Upload;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        var W = typeof window !== 'undefined' ? window : global;
        W.SnkUpload = moduleName;
    }
}).call(function() {
    return this;
});
