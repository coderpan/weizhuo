var express = require('express');
var router = express.Router();
var https = require('https');
var iconv = require("iconv-lite"); 

/**
 * @api {post} /api/mp/key 通过code获取openID
 * @apiName key
 * @apiGroup  mp
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} code 从微信那边获取得到的code
 *
 * @apiSuccess (出参) {String} obj 微信返回一些列信息(Json结构)
 *
 */
router.get('/key', function(req, res1, next) {

    var path = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx6b34074c3a5ea64d&secret=8589a5d4e774904b077bf5f3bff6dfd9&code=' + req.query.code + '&grant_type=authorization_code';
    var redirectURI = 'http://www.ingcloud.net/business/seller/index.html';//req.query.state;
    console.log('change 1' + req.query.state);
    console.log(redirectURI);
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
	          console.log(json);
	          //return res1.json(result);
	          //return res1.redirect(redirectURI);
	          if (redirectURI) {
                  console.log("AAAA " + redirectURI + '?openid=' + json.openid + '&access_token=' + json.access_token);
		          res1.writeHead(302, {'Location': redirectURI + '?openid=' + json.openid + '&access_token=' + json.access_token});
							res1.end();
						} else {
							return res1.json(result);
						}
	      });
    });
});

module.exports = router;
