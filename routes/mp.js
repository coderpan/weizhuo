var express = require('express');
var router = express.Router();
var https = require('https');
var iconv = require("iconv-lite"); 
var mpUtil = require("./mpUtil");
var mpDao = require("../dao/mpdao");

/**
 * @api {get} /api/mp/key 通过code获取openID,并自动跳转到小铺首页
 * @apiName key
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} code 从微信那边获取得到的code
 *
 */
router.get('/key', function(req, res1, next) {
    var path = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx43fff1902c387d5d&secret=d3bc9071271f0ff61facec62bad976c8&code=' + req.query.code + '&grant_type=authorization_code';
    var redirectURI = 'https://www.wxpuu.com/business/seller/index.html';//req.query.state;
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
            if (redirectURI) {
                mpDao.savetoken(json, function(ret) {
                    if (ret != 0) 
                        console.log(ret);
                });
                res1.writeHead(302, {'Location': redirectURI + '?openid=' + json.openid + '&access_token=' + json.access_token});
                res1.end();
            }
            else {
                return res1.json(result);
            }
        });
    });
});

/**
 * @api {get} /api/mp/getAuthInfoByCode 通过code获取账号信息
 * @apiName getAuthInfoByCode
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} code 从微信那边获取得到的code
 *
 * @apiSuccess (出参) {String} data 微信返回一系列信息(Json结构)
 *
 * @apiSuccessExample 成功返回:
 * {
 *   "access_token":"iKcKT8oLib3LCyoz-56Ror6FsoBOaxW7sVcSpEpn5GXeIfku4nX_si-vQls5MfMRq7RY0OuOSIXms27Dj3oFJaZv5f7jp8yIWcfSZPLzWb4",
 *   "expires_in":7200,
 *   "refresh_token":"QRBZZghaMhSQhSPFZdGYaGmO5a8JJ-Hs-yskILD4JVPrTjrjryhZnlyMP6A9x0Cs5J9YGVag1zvykiiojOUjl48UYGNcNyvbQlLp4cqphyc",
 *   "openid":"oogLjwhPimfaJqGNLr4Kmb_PbKk0",
 *   "scope":"snsapi_userinfo"
 * }
 *
 */
router.get('/getAuthInfoByCode', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx43fff1902c387d5d&secret=d3bc9071271f0ff61facec62bad976c8&code=' + req.query.code + '&grant_type=authorization_code';
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
              mpDao.savetoken(json, function(ret, msg) {
                  if (ret != 0) 
                      console.log("%d:%s", ret, msg);
              });
              return res1.json(result);
	      });
    });
});

/**
 * @api {get} /api/mp/getuserinfo 通过token和openID获取用户信息
 * @apiName getuserinfo
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} access_token 登录token
 * @apiParam (入参) {String} openid 用户的openID
 *
 * @apiSuccess (出参) {String} data 微信返回一系列用户信息(Json结构)
 *
 */
router.get('/getuserinfo', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/sns/userinfo?access_token='+req.query.access_token+'&openid='+req.query.openid+'&lang=zh_CN';
    console.log(path);
		https.get(path, function(res) {
		    console.log("onResponse");
		  	var reqData = [];
		    var size = 0;
	      res.on('data', function(data) {
	          reqData.push(data);
	          size += data.length;
	      });
	      res.on('end', function() {
	          var sss = Buffer.concat(reqData, size);
	          var result = iconv.decode(sss, "utf8");
	          console.log(result);
	          var json = JSON.parse(result);
	          console.log(json)
	          return res1.json(result);
	          //return res1.redirect(redirectURI);
	          //if (redirectURI) {
		        //  res1.writeHead(302, {'Location': redirectURI + '?openid=' + json.openid + '&access_token=' + json.access_token});
						//	res1.end();
						//} else {
						//	return res1.json(result);
						//}
	      });
    });
});

/**
 * @api {get} /api/mp/xcxCode2Session 通过code获取session资料
 * @apiName xcxCode2Session
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} code 小程序中获取到的code
 *
 * @apiSuccess (出参) {String} data 微信返回一系列用户信息(Json结构)
 *
 * @apiSuccessExample 成功返回:
 * {
 *   "session_key":"4MHh0GXymcql76b7SY3Trw==",
 *   "expires_in":7200,
 *   "openid":"ohAIa0RBoezBAaFgaN3HBQMRV7I8"
 * }
 *
 */
router.get('/xcxCode2Session', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3798b69011ebbf2c&secret=0cc66abe1db89010037cc272325b9189&js_code='+req.query.code+'&grant_type=authorization_code';
    console.log(path);
		https.get(path, function(res) {
		    console.log("onResponse");
		  	var reqData = [];
		    var size = 0;
	      res.on('data', function(data) {
	          reqData.push(data);
	          size += data.length;
	      });
	      res.on('end', function() {
	          var sss = Buffer.concat(reqData, size);
	          var result = iconv.decode(sss, "utf8");
	          console.log(result);
	          var json = JSON.parse(result);
	          console.log(json)
	          return res1.json(result);
	          //return res1.redirect(redirectURI);
	          //if (redirectURI) {
		        //  res1.writeHead(302, {'Location': redirectURI + '?openid=' + json.openid + '&access_token=' + json.access_token});
						//	res1.end();
						//} else {
						//	return res1.json(result);
						//}
	      });
    });
});

/**
 * @api {get} /api/mp/getXCXAccessToken 获取小程序Accesstoken
 * @apiName getXCXAccessToken
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiSuccess (出参) {String} data 微信返回凭证(Json结构)
 *
 * @apiSuccessExample 成功返回:
 * {
 *  "access_token":"dkmTNWedPB5qV_OyyjGwZ9kKSmHVxM1IXm-sMNZKjehwpldTbg0lqNx00kK_tYHYCT2uTuAIa-ZufZuK5KPv1QpdIdaYmUzNK3rpZA3QsgmZzNirwPR9ReyXpEBLJaBhUZDfAJAHMQ",
 *  "expires_in":7200
 * }
 *
 *
 */
router.get('/getXCXAccessToken', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3798b69011ebbf2c&secret=0cc66abe1db89010037cc272325b9189';
    console.log(path);
		https.get(path, function(res) {
		    console.log("onResponse");
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
	          console.log(json)
	          return res1.json(result);
	      });
    });
});

/**
 * @api {get} /api/mp/getXCXQRCode 获取小程序二维码
 * @apiName getXCXQRCode
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} access_token 获取到的小程序token
 *
 * @apiParam (入参) {String} path 小程序页面路径(不传默认认为打开店铺的路径)
 *
 * @apiParam (入参) {String} shopid 跳转商铺id
 *
 * @apiSuccess (出参) {String} pic  二维码图片
 *
 *
 */
router.get('/getXCXQRCode', function(req, res, next) {
    
    var path = req.query.path;
    if (!path || path.length <= 0) {
    	path = 'pages/itemList/itemList';
    }
    var data = {
		    "path": path+"?shopid="+req.query.shopid,
		    "width": 480
		}
    
    mpUtil.getXCXQRCode(req.query.access_token, data, function(code, msg) {
    	if(code == 200) {
    		/*
				res.writeHead(200, {'Content-Type':'image/jpg'});
		    res.write(msg,'binary');
	      res.end();
	      */
	      
	      var str = "data:image/jpeg;base64," + msg;
	      result = {
            code: 0,
            imgData: str
        }; 
        
        return res.json(result);
        
	    } else {
	    	res.send(code, msg);
	    }
		});
		
});

/**
 * @api {get} /api/mp/getAccessToken 获取Accesstoken
 * @apiName getAccessToken
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiSuccess (出参) {String} data 微信返回凭证(Json结构)
 *
 * @apiSuccessExample 成功返回:
 * {
 *  "access_token":"dkmTNWedPB5qV_OyyjGwZ9kKSmHVxM1IXm-sMNZKjehwpldTbg0lqNx00kK_tYHYCT2uTuAIa-ZufZuK5KPv1QpdIdaYmUzNK3rpZA3QsgmZzNirwPR9ReyXpEBLJaBhUZDfAJAHMQ",
 *  "expires_in":7200
 * }
 *
 *
 */
 
router.get('/getAccessToken', function(req, res1, next) {
/*
    var path = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx43fff1902c387d5d&secret=d3bc9071271f0ff61facec62bad976c8';
    console.log(path);
		https.get(path, function(res) {
		    console.log("onResponse");
		  	var reqData = [];
		    var size = 0;
	      res.on('data', function(data) {
	          reqData.push(data);
	          size += data.length;
	      });
	      res.on('end', function() {
	          var sss = Buffer.concat(reqData, size);
	          var result = iconv.decode(sss, "utf8");
	          console.log(result);
	          var json = JSON.parse(result);
	          console.log(json)
	          return res1.json(result);
	      });
    });
    */
    mpUtil.getAccessToken(function(result) {
        return res1.json(result);
    });
});

router.get('/getTestAccessToken', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd8830d2cc9b45d1e&secret=1f94bd08790e728c9eb174b1617dde2c';
    console.log(path);
		https.get(path, function(res) {
		    console.log("onResponse");
		  	var reqData = [];
		    var size = 0;
	      res.on('data', function(data) {
	          reqData.push(data);
	          size += data.length;
	      });
	      res.on('end', function() {
	          var sss = Buffer.concat(reqData, size);
	          var result = iconv.decode(sss, "utf8");
	          console.log(result);
	          var json = JSON.parse(result);
	          console.log(json)
	          return res1.json(result);
	      });
    });
});

/**
 * @api {get} /api/mp/sendTemplateMessage 发送模版消息
 * @apiName sendTemplateMessage
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} access_token 公众号的access_token,可由getAccessToken接口得到
 *
 */
 
router.get('/sendTemplateMessage', function(req, res1, next) {

    //var path = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+req.query.access_token;
    //var path = 'https://www.wxpuu.com/api/mp/printPara?access_token='+req.query.access_token;
    //console.log(path);
/*
    var data = {
		    "touser": "oogLjwhPimfaJqGNLr4Kmb_PbKk0", 
		    "template_id": "HjyHmC98cvqQX03nTCz79_NFx583hdrX4BHPItL620M", 
		    "data": {
		        "first": {
		            "value": "你有新的订单!", 
		            "color": "#173177"
		        },
		        "day": {
		            "value": "恭喜你购买成功！", 
		            "color": "#173177"
		        }, 
		        "orderId": {
		            "value": "709394", 
		            "color": "#173177"
		        }, 
		        "orderType": {
		            "value": "测试单", 
		            "color": "#173177"
		        }, 
		        "customerName": {
		            "value": "mouse", 
		            "color": "#173177"
		        }, 
		        "customerPhone": {
		            "value": "136000xxxxx", 
		            "color": "#173177"
		        }, 
		        "remark": {
		            "value": "测试用,请忽略", 
		            "color": "#173177"
		        }
		    }
		}
    */
  var data = {
		    "touser": "oogLjwhPimfaJqGNLr4Kmb_PbKk0", 
		    "template_id": "fGHCtqEvZ5nFbN1P25l838XhYaOLrwsOmDv9g4QpGoQ",
		    "url":"http://weixin.qq.com/download",  
           "miniprogram":{
             "appid":"wx3798b69011ebbf2c"
             /*"pagepath":"index?foo=bar"*/
           },
		    "data": {
		        "first": {
		            "value": "你有新的订单!",
		            "color": "#173177"
		        },
		        "productType": {
		            "value": "名称",
		            "color": "#173177"
		        },
		        "name": {
		            "value": "非卖品",
		            "color": "#173177"
		        },
		        "number": {
		            "value": "1",
		            "color": "#173177"
		        },
		        "expDate": {
		            "value": "2017-3-4",
		            "color": "#173177"
		        },
		        "remark": {
		            "value": "测试用,请忽略",
		            "color": "#173177"
		        }
		    }
		}
		
		mpUtil.sendTemplateMessage(req.query.access_token, data, function(code, msg) {
			console.log(msg);
		});
		
		res1.send("200, done!");
		/*
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
                          .on('end', function () { res1.send(200, body); });
        }
        else {
            res1.send("serverFeedback.statusCode = " + serverFeedback.statusCode);
        }
    });
    request.write(dataStr);
    console.log(request);
    request.end();
    */
    
});

/**
 * @api {get} /api/mp/sendCustomMessage 发送文本消息
 * @apiName sendCustomMessage
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} access_token 公众号的access_token,可由getAccessToken接口得到
 *
 * @apiParam (入参) {String} msg 要发送的消息
 *
 */
router.get('/sendCustomMessage', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+req.query.access_token;
    console.log(path);

    var data = {
		    "touser": "owfVz0ed4jKsiCOgZFQeqjJIb4so", 
		    "msgtype": "text",
		    "text": {
		        "content": req.query.msg
		    }
		}
    
    var dataStr = JSON.stringify(data);
    dataStr = iconv.encode(dataStr, "utf8");
    console.log(dataStr);
    
    var post_option = url.parse(path);
    post_option.method = 'POST';
		post_option.port = 443;
		
		post_option.headers = {
			"Content-Type": 'application/json',
      "Content-Length": dataStr.length
		};
  
    var req = https.request(post_option, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) { body += data; })
                          .on('end', function () { res1.send(200, body); });
        }
        else {
            res1.send("serverFeedback.statusCode = " + serverFeedback.statusCode);
        }
    });
    req.write(dataStr);
    req.end();
});

/**
 * @api {post} /api/mp/printPara 发送模版消息
 * @apiName printPara
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 */
router.post('/printPara', function (req, res, next) {  
    console.log(req.body);
    res.send(req.body);
    res.end();  
});

module.exports = router;
