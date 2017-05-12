var mysql = require('mysql');
var db_conf = require('../conf/db');
var sql = require('./sql');
var crypto = require('crypto');
var pool = mysql.createPool(db_conf.mysql);
var mpUtil = require("../routes/mpUtil");

Date.prototype.format = function(format) {
 
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    };
 
    if (/(y+)/.test(format))
        format=format.replace(RegExp.$1,
                (this.getFullYear()+"").substr(4- RegExp.$1.length));
 
    for (var k in o)
        if (new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                    RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
 
    return format;
};
 
//console.log(new Date().format("yyyy-MM-dd hh:mm:ss.S"));
//console.log(new Date(1395763200000).format("yyyy-MM-dd hh:mm:ss.S"));

module.exports = {
	regist(req, res, next) {
        if (!req.body.openid) {
            result = {
                code: 99,
                msg:'参数错误'
            }; 
            return res.json(result);
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

            var rsp;
			connection.query(sql.user_regist, [req.body.openid, '', new Date().getTime()/1000], function(err, result) {
                if (result) {
                    rsp = {
                        code: 0,
                        msg:'用户注册成功'
                    };
                }
                else {
                    console.error("insert error, ret:" + err.message);
                    rsp = {
                        code: 1230,
                        msg:'用户注册失败'
                    };
                }
                res.json(rsp);
                connection.release();
			});
		});
	},

	query(req, res, next) {
        if (!req.body.openid) {
            result = {
                code: 99,
                msg:'参数错误'
            }; 
            return res.json(result);
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

            var rsp;
            var shoplist = [];
			connection.query(sql.user_query, [req.body.openid], function(err, result) {
                if (result) {
                    if (result.length) {
                        status = result[0].status;
                        shopid = result[0].shopid;
                        var shopids  = result[0].shoplist;
                        if (!shopids.length) {
                            shopids = "|7086b7f20b80e980fd519770c98629125fe3641b|a679db45b2034ee5b35a71bddd02df772253c468";
                        }
                        if (shopids.length) {
                            shopids = "('" + shopids.substring(1).replace(/\|/g,"','") + "')";
                            sqlstr = sql.shop_query_all+shopids;
                            console.log(sqlstr);
                            connection.query(sqlstr, function(err, result) {
                                if (result) {
                                    rsp = {
                                        code: 0,
                                        status: status,
                                        size: result.length,
                                        shoplist: result
                                    };
                                }
                                else {
                                    console.error("select error, ret:" + err.message);
                                    rsp = {
                                        code: 1201,
                                        msg:'查询用户信息失败'
                                    };
                                }
                                res.json(rsp);
                                connection.release();
                            });
                        }
                    }
                    else {
                        rsp = {
                            code: 0,
                            size: 0,
                            shoplist: shoplist
                        };    
                        res.json(rsp);
                        connection.release();
                    }
                }
                else {
                    console.error("query error, ret:" + err.message);
                    rsp = {
                        code: 1201,
                        msg:'查询用户信息失败'
                    };
                    res.json(rsp);
                    connection.release();
                }
			});
		});
	},

	order(req, res, next) {
        if (!req.body.openid || !req.body.shopid || !req.body.prodlist || !req.body.prodlist.length) {
            result = {
                code: 99,
                msg:'参数错误'
            }; 
            return res.json(result);
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

            var hasher=crypto.createHash("md5");
            hasher.update(req.body.openid+"orderno");
            var currentMs = new Date(new Date().getTime()).format("yyyyMMddhhmmssS");
            orderno=hasher.digest('hex').substring(8,16).toUpperCase() + currentMs;

            // calculate the price
            var prodPriceArray = req.body.prodlist;
            var totalPrice = 0;
            var index = 0;
            var rsp;
            for (var i = 0; i < prodPriceArray.length; ++i) {
                (function(i) {
                    connection.query(sql.shop_prod_query, [req.body.shopid, prodPriceArray[i].prodid], function(err, result) {
                        if (result && result.length) {
                            index++;
                            prodPriceArray[i].price = result[0].price;//result[0].price * prodPriceArray[i].count;
                            totalPrice += (result[0].price * prodPriceArray[i].count);//prodPriceArray[i].price;

                            if (index == prodPriceArray.length) {
                                var detail = JSON.stringify(prodPriceArray);
                                connection.query(sql.user_order, [orderno, req.body.openid, 
                                                                    req.body.shopid, totalPrice, detail,new Date().getTime()/1000], 
                                function(err, orderres) {
                                    if (orderres) {
                                        rsp = {
                                            code: 0,
                                            orderno: orderno,
                                            totalprice: totalPrice
                                        };

                                        //查询店主openid，下发模板消息
                                        connection.query(sql.shop_queryuserid, [req.body.shopid], function(err2, shopres) {
                                            if (shopres) {
                                                console.log(shopres);
                                                var data = {
                                                    "touser": shopres[0].userid,
                                                    "template_id": "fGHCtqEvZ5nFbN1P25l838XhYaOLrwsOmDv9g4QpGoQ",
                                                    "data": {
                                                        "first": {
                                                            "value": "你有新的订单!",
                                                            "color": "#173177"
                                                        },
                                                        "productType": {
                                                            "value": "订单号",
                                                            "color": "#173177"
                                                        },
                                                        "name": {
                                                            "value": "非卖品",
                                                            "color": "#173177"
                                                        },
                                                        "number": {
                                                            "value": prodPriceArray.length,
                                                            "color": "#173177"
                                                        },
                                                        "expDate": {
                                                            "value": "永久",
                                                            "color": "#173177"
                                                        },
                                                        "remark": {
                                                            "value": "订单总金额:"+totalPrice,
                                                            "color": "#173177"
                                                        }
                                                    }
                                                };
                                                console.log(data);
                                                mpUtil.sendTemplateMessage(data, function(code, msg) {
                                                    console.log(msg);
                                                });
                                            }
                                            else {
                                                console.log("找不到店主信息");
                                            }
                                            connection.release();
                                            res.json(rsp);
                                        });
                                    }
                                    else { 
                                        rsp = {
                                            code: 1205,
                                            msg: '下单失败'
                                        };
                                        connection.release();
                                        res.json(rsp);
                                    }
                                });
                            }
                        }
                        else {
                            console.error("query prod error, ret:" + err.message);
                            rsp = {
                                code: 1206,
                                msg:'查询商品信息失败'
                            };
                            connection.release();
                            return res.json(rsp);
                        }
                    });
                })(i);
            }
        });
	},

	attent(req, res, next) {
        if (!req.body.openid) {
            result = {
                code: 99,
                msg:'参数错误'
            }; 
            return res.json(result);
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

            var rsp;
			connection.query(sql.user_query, [req.body.openid], function(err, result) {
                if (result&&result.length) {
                    if (result[0].shoplist.search(req.body.shopid) == -1) {
                        connection.query(sql.user_attent, [req.body.shopid, req.body.openid], function(err, result) {
                            if (result) {
                                rsp = {
                                    code: 0,
                                    msg:'关注店铺成功'
                                };
                            }
                            else {
                                console.error("update error, ret:" + err.message);
                                rsp = {
                                    code: 1210,
                                    msg:'关注店铺失败'
                                };
                            }
                            res.json(rsp);
                            connection.release();
                        });
                    }
                    else {
                        rsp = {
                            code: 0,
                            msg:'关注店铺成功'
                        };
                        res.json(rsp);
                        connection.release();
                    }
                }
                else
                {
                    rsp = {
                        code: 1210,
                        msg:'用户未注册'
                    };
                    res.json(rsp);
                    connection.release();
                }
            });
		});
	},

	orderquery(req, res, next) {
        if (!req.body.openid) {
            result = {
                code: 99,
                msg:'参数错误'
            }; 
            return res.json(result);
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

            var rsp;
            var sqlstr;
            if (req.body.orderno) {
                sqlstr = sql.user_order_query_orderno;
                connection.query(sqlstr, [req.body.orderno], function(err, result) {
                    if (result) {
                        for (var k = 0; k < result.length; ++k) {
                            result[k].detail = JSON.parse(result[k].detail);
                        }
                        rsp = {
                            code: 0,
                            count: result.length,
                            orderlist: result
                        };
                    }
                    else {
                        console.error("select error, ret:" + err.message);
                        rsp = {
                            code: 1220,
                            msg:'查询用户订单失败'
                        };
                    }
                    res.json(rsp);
                    connection.release();
                });
            }
            else
            {
                sqlstr = sql.user_order_query_userid;
                connection.query(sqlstr, [req.body.openid, req.body.pageno?(req.body.pageno-1):0, req.body.pagesize?req.body.pagesize:10], function(err, result) {
                    if (result) {
                        for (var k = 0; k < result.length; ++k) {
                            result[k].detail = JSON.parse(result[k].detail);
                        }
                        rsp = {
                            code: 0,
                            count: result.length,
                            orderlist: result
                        };
                    }
                    else {
                        console.error("select error, ret:" + err.message);
                        rsp = {
                            code: 1220,
                            msg:'查询用户订单失败'
                        };
                    }
                    res.json(rsp);
                    connection.release();
                });
            }
        });
    }
};
