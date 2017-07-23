var express = require('express');
var https = require('https');
var iconv = require("iconv-lite");
var crypto = require('crypto');
var mysql = require('mysql');
var db_conf = require('../conf/db');
var sql = require('../dao/sql');

var router = express.Router();

var pool = mysql.createPool(db_conf.mysql);

/**
 * @api {post} /api/sms/smssend 发送短信
 * @apiName smssend
 * @apiGroup  Common
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid  用户openid
 * @apiParam (入参) {String} token  用户token
 * @apiParam (入参) {String} mobile  手机号
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {String} msg  错误信息
 *
 * @apiSuccessExample 成功返回：
    {
        "code": 0,
        "msg" : "发送成功"
    }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 8001,
 *       "msg": "发送失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 */
router.post('/smssend', function(req, res, next) {
    if (req.body.token != "1212wxpuu34") {
        res.json({});
        return;
    }

    var timestamp = parseInt(new Date().getTime()/1000);
    var x="0123456789";
    var vcode="";
    for(var i=0; i< 6; i++)  {
        vcode += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
    }

    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
            result = {
                code: 1000,
                msg:'未知错误'
            }; 
            return res.json(result);
        }

        connection.query(sql.sms_query, [req.body.mobile], function(err, result) {
            if (result) {
                if (result.length) {
                    if (timestamp - result[0].createtime < 120) {
                        rsp = {
                            code: 8003,
                            msg:'2分钟内不能重复发送'
                        };
                        res.json(rsp);
                        connection.release();
                        return;
                    }
                }
            }
            else {
                    console.error("select error");
                    rsp = {
                        code: 8004,
                        msg:'查询验证码失败'
                    };
                    res.json(rsp);
                    connection.release();
                    return;
                };
        });

        var x="0123456789qwertyuioplkjhgfdsazxcvbnm";
        var tmp="";
        for(var i=0; i< 16; i++)  {
            tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
        }

        var hasher=crypto.createHash("sha256");
        hasher.update("appkey=509f80a5606550750f4676cc415305c8&random="+tmp+"&time="+timestamp+"&mobile="+req.body.mobile);
        var signature =hasher.digest('hex');

        var data = {
            tel:{
                nationcode: "86",
                mobile: req.body.mobile
            },
            type: 0,
            msg: "【微小铺】你的验证码是"+vcode,
            sig: signature,
            time: timestamp,
            extend: "",
            ext: ""
        };

        rsp = {};
        var path = 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=1400036595&random=' + tmp;
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
                              .on('end', function () {
                                    var rs = JSON.parse(body);
                                    if (rs.result == 0) {
                                        connection.query(sql.sms_send, [req.body.mobile, vcode, timestamp], function(err, result) {
                                            if (result) {
                                                    rsp = {
                                                        code: 0,
                                                        msg: "发送成功"
                                                    };
                                            }
                                            else {
                                                    console.error("insert error, ret:" + err.message);
                                                    rsp = {
                                                        code: 8005,
                                                        msg:'保存验证码失败'
                                                    };
                                            }
                                            res.json(rsp);
                                            connection.release();
                                            return;
                                        });
                                    }
                                    else {
                                        //console.log(rs);
                                        rsp = {
                                            code: 8001,
                                            msg: "发送失败"
                                        };
                                    }
                                    res.json(rsp);
                                    connection.release();
                                    return;
                              });
            }
            else {
                    rsp = { 
                        code: 8002,
                        msg: "发送失败,运营商接口异常"
                    };
                    res.json(rsp);
                    connection.release();
                    return;
            }
        });
        console.log(dataStr);
        request.write(dataStr);
        request.end();
    });
});

/**
 * @api {post} /api/sms/smscheck 验证短信
 * @apiName smscheck
 * @apiGroup  Common
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid  用户openid
 * @apiParam (入参) {String} token  用户token
 * @apiParam (入参) {String} mobile  手机号
 * @apiParam (入参) {String} vcode  手机验证码
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {String} msg  错误信息
 *
 * @apiSuccessExample 成功返回：
    {
        "code": 0,
        "msg" : "验证成功"
    }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 8020,
 *       "msg": "验证失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 */

router.post('/smssend', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
            result = {
                code: 1000,
                msg:'未知错误'
            }; 
            return res.json(result);
        }
        var vcode;
        connection.query(sql.sms_query, [req.body.mobile], function(err, result) {
            if (result&&result.length) {
                if (timestamp - result[0].createtime > 600) {
                    rsp = {
                        code: 8030,
                        msg:'验证码失效'
                    };
                    res.json(rsp);
                    connection.release();
                    return;
                }
                else {
                    vcode = result[0].verifycode;
                }
            }
            else {
                console.error("select error, ret:" + err.message);
                rsp = {
                    code: 8004,
                    msg:'查询验证码失败'
                };
                res.json(rsp);
                connection.release();
                return;
            }
        });
        if (vcode == req.body.vcode) {
            rsp = {
                code: 0,
                msg:'验证成功'
            };
        }
        else {
            rsp = {
                code: 8035,
                msg:'验证码错误'
            };
        }
        res.json(rsp);
        connection.release();
    });
});
module.exports = router;
