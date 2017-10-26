;(function(){
    
        (function(factory){if(typeof exports==="object"){ window.SparkMD5 =factory(); module.exports=factory()}else if(typeof define==="function"&&define.amd){define(factory)}else{var glob;try{glob=window}catch(e){glob=self}glob.SparkMD5=factory()}})(function(undefined){"use strict";var add32=function(a,b){return a+b&4294967295},hex_chr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32(a<<s|a>>>32-s,b)}function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a+=(b&c|~b&d)+k[0]-680876936|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[1]-389564586|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[2]+606105819|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[3]-1044525330|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[4]-176418897|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[5]+1200080426|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[6]-1473231341|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[7]-45705983|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[8]+1770035416|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[9]-1958414417|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[10]-42063|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[11]-1990404162|0;b=(b<<22|b>>>10)+c|0;a+=(b&c|~b&d)+k[12]+1804603682|0;a=(a<<7|a>>>25)+b|0;d+=(a&b|~a&c)+k[13]-40341101|0;d=(d<<12|d>>>20)+a|0;c+=(d&a|~d&b)+k[14]-1502002290|0;c=(c<<17|c>>>15)+d|0;b+=(c&d|~c&a)+k[15]+1236535329|0;b=(b<<22|b>>>10)+c|0;a+=(b&d|c&~d)+k[1]-165796510|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[6]-1069501632|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[11]+643717713|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[0]-373897302|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[5]-701558691|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[10]+38016083|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[15]-660478335|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[4]-405537848|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[9]+568446438|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[14]-1019803690|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[3]-187363961|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[8]+1163531501|0;b=(b<<20|b>>>12)+c|0;a+=(b&d|c&~d)+k[13]-1444681467|0;a=(a<<5|a>>>27)+b|0;d+=(a&c|b&~c)+k[2]-51403784|0;d=(d<<9|d>>>23)+a|0;c+=(d&b|a&~b)+k[7]+1735328473|0;c=(c<<14|c>>>18)+d|0;b+=(c&a|d&~a)+k[12]-1926607734|0;b=(b<<20|b>>>12)+c|0;a+=(b^c^d)+k[5]-378558|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[8]-2022574463|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[11]+1839030562|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[14]-35309556|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[1]-1530992060|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[4]+1272893353|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[7]-155497632|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[10]-1094730640|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[13]+681279174|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[0]-358537222|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[3]-722521979|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[6]+76029189|0;b=(b<<23|b>>>9)+c|0;a+=(b^c^d)+k[9]-640364487|0;a=(a<<4|a>>>28)+b|0;d+=(a^b^c)+k[12]-421815835|0;d=(d<<11|d>>>21)+a|0;c+=(d^a^b)+k[15]+530742520|0;c=(c<<16|c>>>16)+d|0;b+=(c^d^a)+k[2]-995338651|0;b=(b<<23|b>>>9)+c|0;a+=(c^(b|~d))+k[0]-198630844|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[7]+1126891415|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[14]-1416354905|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[5]-57434055|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[12]+1700485571|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[3]-1894986606|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[10]-1051523|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[1]-2054922799|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[8]+1873313359|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[15]-30611744|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[6]-1560198380|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[13]+1309151649|0;b=(b<<21|b>>>11)+c|0;a+=(c^(b|~d))+k[4]-145523070|0;a=(a<<6|a>>>26)+b|0;d+=(b^(a|~c))+k[11]-1120210379|0;d=(d<<10|d>>>22)+a|0;c+=(a^(d|~b))+k[2]+718787259|0;c=(c<<15|c>>>17)+d|0;b+=(d^(c|~a))+k[9]-343485551|0;b=(b<<21|b>>>11)+c|0;x[0]=a+x[0]|0;x[1]=b+x[1]|0;x[2]=c+x[2]|0;x[3]=d+x[3]|0}function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24)}return md5blks}function md5blk_array(a){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=a[i]+(a[i+1]<<8)+(a[i+2]<<16)+(a[i+3]<<24)}return md5blks}function md51(s){var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)))}s=s.substring(i-64);length=s.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=s.charCodeAt(i)<<(i%4<<3)}tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function md51_array(a){var n=a.length,state=[1732584193,-271733879,-1732584194,271733878],i,length,tail,tmp,lo,hi;for(i=64;i<=n;i+=64){md5cycle(state,md5blk_array(a.subarray(i-64,i)))}a=i-64<n?a.subarray(i-64):new Uint8Array(0);length=a.length;tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<length;i+=1){tail[i>>2]|=a[i]<<(i%4<<3)}tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=n*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(state,tail);return state}function rhex(n){var s="",j;for(j=0;j<4;j+=1){s+=hex_chr[n>>j*8+4&15]+hex_chr[n>>j*8&15]}return s}function hex(x){var i;for(i=0;i<x.length;i+=1){x[i]=rhex(x[i])}return x.join("")}if(hex(md51("hello"))!=="5d41402abc4b2a76b9719d911017c592"){add32=function(x,y){var lsw=(x&65535)+(y&65535),msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}}if(typeof ArrayBuffer!=="undefined"&&!ArrayBuffer.prototype.slice){(function(){function clamp(val,length){val=val|0||0;if(val<0){return Math.max(val+length,0)}return Math.min(val,length)}ArrayBuffer.prototype.slice=function(from,to){var length=this.byteLength,begin=clamp(from,length),end=length,num,target,targetArray,sourceArray;if(to!==undefined){end=clamp(to,length)}if(begin>end){return new ArrayBuffer(0)}num=end-begin;target=new ArrayBuffer(num);targetArray=new Uint8Array(target);sourceArray=new Uint8Array(this,begin,num);targetArray.set(sourceArray);return target}})()}function toUtf8(str){if(/[\u0080-\uFFFF]/.test(str)){str=unescape(encodeURIComponent(str))}return str}function utf8Str2ArrayBuffer(str,returnUInt8Array){var length=str.length,buff=new ArrayBuffer(length),arr=new Uint8Array(buff),i;for(i=0;i<length;i+=1){arr[i]=str.charCodeAt(i)}return returnUInt8Array?arr:buff}function arrayBuffer2Utf8Str(buff){return String.fromCharCode.apply(null,new Uint8Array(buff))}function concatenateArrayBuffers(first,second,returnUInt8Array){var result=new Uint8Array(first.byteLength+second.byteLength);result.set(new Uint8Array(first));result.set(new Uint8Array(second),first.byteLength);return returnUInt8Array?result:result.buffer}function hexToBinaryString(hex){var bytes=[],length=hex.length,x;for(x=0;x<length-1;x+=2){bytes.push(parseInt(hex.substr(x,2),16))}return String.fromCharCode.apply(String,bytes)}function SparkMD5(){this.reset()}SparkMD5.prototype.append=function(str){this.appendBinary(toUtf8(str));return this};SparkMD5.prototype.appendBinary=function(contents){this._buff+=contents;this._length+=contents.length;var length=this._buff.length,i;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk(this._buff.substring(i-64,i)))}this._buff=this._buff.substring(i-64);return this};SparkMD5.prototype.end=function(raw){var buff=this._buff,length=buff.length,i,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff.charCodeAt(i)<<(i%4<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.prototype.reset=function(){this._buff="";this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}};SparkMD5.prototype.setState=function(state){this._buff=state.buff;this._length=state.length;this._hash=state.hash;return this};SparkMD5.prototype.destroy=function(){delete this._hash;delete this._buff;delete this._length};SparkMD5.prototype._finish=function(tail,length){var i=length,tmp,lo,hi;tail[i>>2]|=128<<(i%4<<3);if(i>55){md5cycle(this._hash,tail);for(i=0;i<16;i+=1){tail[i]=0}}tmp=this._length*8;tmp=tmp.toString(16).match(/(.*?)(.{0,8})$/);lo=parseInt(tmp[2],16);hi=parseInt(tmp[1],16)||0;tail[14]=lo;tail[15]=hi;md5cycle(this._hash,tail)};SparkMD5.hash=function(str,raw){return SparkMD5.hashBinary(toUtf8(str),raw)};SparkMD5.hashBinary=function(content,raw){var hash=md51(content),ret=hex(hash);return raw?hexToBinaryString(ret):ret};SparkMD5.ArrayBuffer=function(){this.reset()};SparkMD5.ArrayBuffer.prototype.append=function(arr){var buff=concatenateArrayBuffers(this._buff.buffer,arr,true),length=buff.length,i;this._length+=arr.byteLength;for(i=64;i<=length;i+=64){md5cycle(this._hash,md5blk_array(buff.subarray(i-64,i)))}this._buff=i-64<length?new Uint8Array(buff.buffer.slice(i-64)):new Uint8Array(0);return this};SparkMD5.ArrayBuffer.prototype.end=function(raw){var buff=this._buff,length=buff.length,tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i,ret;for(i=0;i<length;i+=1){tail[i>>2]|=buff[i]<<(i%4<<3)}this._finish(tail,length);ret=hex(this._hash);if(raw){ret=hexToBinaryString(ret)}this.reset();return ret};SparkMD5.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._hash=[1732584193,-271733879,-1732584194,271733878];return this};SparkMD5.ArrayBuffer.prototype.getState=function(){var state=SparkMD5.prototype.getState.call(this);state.buff=arrayBuffer2Utf8Str(state.buff);return state};SparkMD5.ArrayBuffer.prototype.setState=function(state){state.buff=utf8Str2ArrayBuffer(state.buff,true);return SparkMD5.prototype.setState.call(this,state)};SparkMD5.ArrayBuffer.prototype.destroy=SparkMD5.prototype.destroy;SparkMD5.ArrayBuffer.prototype._finish=SparkMD5.prototype._finish;SparkMD5.ArrayBuffer.hash=function(arr,raw){var hash=md51_array(new Uint8Array(arr)),ret=hex(hash);return raw?hexToBinaryString(ret):ret};return SparkMD5});
        
        function SnkUpload() {
            this.xhr = null; 
        }
    
        SnkUpload.prototype = {
            startUpload:function(config){
                var _this = this;
                if(!config){
                    console.error("snk-upload组件startUpload方法缺少参数");
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
                
                this.chunckCount = 3;
                if(config.chunckCount&&!isNaN(config.chunckCount)){
                    this.chunckCount = config.chunckCount;
                }
                this.sparkMD5Instance = new SparkMD5();
                this.compressedRatio = 0.3;
                if(config.compressedRatio&&!isNaN(config.compressedRatio)){
                    this.compressedRatio = config.compressedRatio;
                }
                this.fileName = config.file.name;
    
                var file_suffix = "";
                var nameArr =this.fileName.split(".");
                if(nameArr.length >= 2){
                    file_suffix = nameArr[nameArr.length-1];
                }
                this.hasAlreadyUploadSize = 0;
                
                this.fileExtendName = file_suffix;
                this.compressImage(config.file,config.compressedRatio,function(compressedFile){
                    _this._getFileMd5(compressedFile,_this.fileName,function(md5){
                        var info = {
                            fileSize:compressedFile.size,
                            file:compressedFile,
                            md5:md5,
                            fileName:_this.fileName,
                            fileExtendName:_this.fileExtendName
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
    
                // this.testStep = this.testStep||0;
                
                // if(this.testStep>=3){
                //     alert("asdasd");
                //     return;
                // }
                
                // this.testStep += 1;
                
    
                var file = params.file;
                var startIndex = params.startIndex;
                this.hasAlreadyUploadSize = startIndex;
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
                for(var key in this.extendsData){
                    if(["blob"].indexOf(key)>=0){
                        console.error("data中字段"+key+"和插件内置字段重名");
                        return;
                    }
                    fd.append(key,this.extendsData[key]);
                }
    
                var url = this.url;
                var pstr = "file_name="+encodeURI(this.fileName)+"&file_start_index="+startIndex+"&file_md5="+md5+"&file_extend="+this.fileExtendName+"&file_size="+fileSize;
                var urlInfoArr =  this.url.split("?");
                if(urlInfoArr.length===2){
                    url = urlInfoArr[0];
                    var paramsArr = urlInfoArr[1].split("&");
                    for(var i=0,j=paramsArr.length;i<j;i++){
                        var paramsPair = paramsArr[i];
                        var paraKey = paramsPair.split("=")[0];
                        if(["file_name","file_start_index","file_md5","file_extend","file_size"].indexOf(paraKey)>=0){
                            console.error("url传参的参数"+paraKey+"和插件内置参数重复，请更改");
                            return;
                        }
                    }
                    url = this.url+"&"+pstr;
                }else{
                    url = url+"?"+pstr;
                }
                this.xhr.open('POST', url, true);
                this.xhr.send(fd);
            },
            _start:function(params){
                var _this = this;
                var fileSize = params.fileSize;
                var md5 = params.md5;
                var file = params.file;
    
                var chunkSize = parseInt(Math.ceil((fileSize/ this.chunckCount)));
    
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
        
        var moduleName = SnkUpload;
        if (typeof module !== 'undefined' && typeof exports === 'object') {
            var W = typeof window !== 'undefined' ? window : global;
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
    