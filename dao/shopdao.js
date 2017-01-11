var mysql = require('mysql');
var db_conf = require('../conf/db');
var sql = require('./sql');
var crypto = require('crypto');

var pool = mysql.createPool(db_conf.mysql);

module.exports = {
	shopregister(req, res, next) {
		pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
                result = {
                    code: 1000,
                    msg:'未知错误'
                }; 
                return res.json(result);
            }
			connection.query(sql.shop_regist, [req.body.openid, req.body.mobile, new Date().getTime()/1000], function(err, result) {
				if(result) {
                    //console.log("result:",result);
                    var hasher=crypto.createHash("sha1");
                    hasher.update(req.body.mobile+"wxpuu");
                    var hashmsg=hasher.digest('base64');
					result = {
						code: 0,
                        shopmd5: hashmsg
					};    
				}
				else {
					console.error("insert error, ret:" + err.message);
					result = {
						code: 1001,
						msg:'绑定手机失败'
					};
				}
				res.json(result);
				connection.release();
			});
		});
	},

	login(req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query(sql.checkPwd, [req.body.data.userid, req.body.data.passwd], function(err, result) {
				if(result.length != 0) {
					result = {
						code: 0,
						msg:'登陆成功'
					};
				}
				else {
					result = {
						code: -1,
						msg:'密码错误'
					};
				}
				res.json(result);
				connection.release();
			});
		});
	}
};
