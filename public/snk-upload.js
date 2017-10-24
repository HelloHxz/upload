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
            this.progressCallBack = config.progress;
            
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
            this.compressImage(config.file,config.compressedRatio,function(compressedFile){
                _this._getFileMd5(compressedFile,_this.fileName,function(md5){
                     _this._start({
                        fileSize:compressedFile.size,
                        file:compressedFile,
                        md5:md5
                     });
                });
            });
           
        },
        _uploadFile:function(params){
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
                if (evt.lengthComputable) {
                    var percentComplete = Math.round((_this.hasAlreadyUploadSize+evt.loaded) * 100 /fileSize);
                    //updateProgress(percentComplete.toString()+"%")
                }else {
                    //updateProgress("unable to compute")
                }
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
                            _this.uploadSuccess(md5);
                            return;
                        }
                   }else{
                       alert(RJSON.mes||"上传发生错误");
                   }
                  
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
        uploadSuccess:function(md5){
            this.removeStartIndexByFileKey(md5);
            // updateProgress("100%");
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
            
            fileReader.onload = function(e) {    
                spark.appendBinary(e.target.result); 
                currentChunk++;    
            
                if (currentChunk < chunks) {    
                    loadNext();    
                }    
                else {    
                    var file_suffix = "";
                    var nameArr =fliename.split(".");
                    if(nameArr.length >= 2){
                        file_suffix = "." + nameArr[nameArr.length-1];
                    }
                    successCallBack(spark.end()+file_suffix);  
                }    
            };    
            
            function loadNext() {    
                var start = currentChunk * chunkSize,    
                    end = start + chunkSize >= file.size ? file.size : start + chunkSize;    
            
                fileReader.readAsBinaryString(blobSlice.call(file, start, end));    
            };    
            loadNext();  
        },
        compressImage:function(file,compressedRatio,successCallBack){
            var isImage = file.type.indexOf("image")>=0;
            if(!isImage){
                successCallBack(file);
                return;
            }
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
