var https = require('https');
var iconv = require("iconv-lite");

module.exports.sendTemplateMessage = function (data, cb) {
    this.getAccessToken( function (result) {
        var access_token = result.access_token;
        var path = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+access_token;
        var dataStr = JSON.stringify(data);
        dataStr = iconv.encode(dataStr, "utf8");
        var post_option = url.parse(path);
        post_option.method = 'POST';
        post_option.port = 443;
        post_option.headers = {
            "Content-Type": 'application/json',
            "Content-Length": dataStr.length
        };
        var request = https.request(post_option, function (serverFeedback) {
            if (serverFeedback.statusCode == 200) {
                var body = "";
                serverFeedback.on('data', function (data) { body += data; })
                              .on('end', function () { cb(200, body); });
            }
            else {
                cb(serverFeedback.statusCode, "serverFeedback.statusCode = " + serverFeedback.statusCode);
            }
        });
        request.write(dataStr);
        request.end();
    });
}

module.exports.getXCXQRCode = function (access_token, data, cb) {
	  var path = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+access_token;
    console.log(path);
    
    var dataStr = JSON.stringify(data);
    
    console.log(dataStr);
    
    dataStr = iconv.encode(dataStr, "utf8");
    
    var post_option = url.parse(path);
    post_option.method = 'POST';
		post_option.port = 443;
		
		post_option.headers = {
			"Content-Type": 'application/json',
      "Content-Length": dataStr.length
		};
  
    var request = https.request(post_option, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var buffer;
            //console.log(serverFeedback);
            //console.log("response type ="+serverFeedback.headers['content-type']);
            serverFeedback.on('data', function (data) { 
            									if (buffer) {
            										buffer = Buffer.concat([buffer, data]);
            									} else {
            										buffer = data;
            									}
            									console.log(buffer);
            								})
            							.on('response', function(response) {
            								console.log("response type ="+response.headers['content-type']);
            							})
                          .on('end', function () {
	                          	cb(200, buffer.toString('base64'));
                          	});
        }
        else {
            cb(serverFeedback.statusCode, "serverFeedback.statusCode = " + serverFeedback.statusCode);
        }
    });
    request.write(dataStr);
    request.end();
}

module.exports.getAccessToken = function (cb) {
    var path = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx43fff1902c387d5d&secret=d3bc9071271f0ff61facec62bad976c8';
    https.get(path, function(res) {
        var reqData = [];
        var size = 0;
        res.on('data', function(data) {
            reqData.push(data);
            size += data.length;
        });
        res.on('end', function() {
            var sss = Buffer.concat(reqData, size);
            var result = iconv.decode(sss, "utf8");
            var json = JSON.parse(result);
            console.log(json);
            cb(json);
        });
    });
}
