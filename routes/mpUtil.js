var https = require('https');
var iconv = require("iconv-lite");

module.exports.sendTemplateMessage = function (access_token, data, cb) {
	var path = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+access_token;
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
            var body = "";
            serverFeedback.on('data', function (data) { body += data; })
                          .on('end', function () { cb(200, body); });
        }
        else {
            cb(serverFeedback.statusCode, "serverFeedback.statusCode = " + serverFeedback.statusCode);
        }
    });
    request.write(dataStr);
    console.log(request);
    request.end();
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
            var body = "";
            //console.log(serverFeedback);
            //console.log("response type ="+serverFeedback.headers['content-type']);
            serverFeedback.on('data', function (data) { body += data; })
            							.on('response', function(response) {
            								console.log(response);
            								console.log("response type ="+response.headers['content-type']);
            							})
                          .on('end', function () {
                          		cb(200, body);
                          	});
        }
        else {
            cb(serverFeedback.statusCode, "serverFeedback.statusCode = " + serverFeedback.statusCode);
        }
    });
    request.write(dataStr);
    console.log(request);
    request.end();
}
