var mysql = require('mysql');
var db_conf = require('../conf/db');
var sql = require('./sql');
var crypto = require('crypto');
var pool = mysql.createPool(db_conf.mysql);

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
			connection.query(sql.user_query, [req.body.openid], function(err, result) {
                if (result) {
                    if (result.length) {
                        status = result[0].status;
                        shopid = result[0].shopid;
                        shoplist = result[0].shoplist;
                    }
                    else {
                        status = 0;
                        shopid = "";
                        shoplist = "";
                    }
                    rsp = {
                        code: 0,
                        status: status,
                        shopid: shopid,
                        shoplist: shoplist
                    };    
                }
                else {
                    console.error("query error, ret:" + err.message);
                    rsp = {
                        code: 1201,
                        msg:'查询用户信息失败'
                    };
                }
                res.json(rsp);
                connection.release();
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
                            prodPriceArray[i].price = result[0].price * prodPriceArray[i].count;
                            totalPrice += prodPriceArray[i].price;

                            if (index == prodPriceArray.length) {
                                var detail = JSON.stringify(prodPriceArray);
                                console.log("shopid"+req.body.shopid);
                                connection.query(sql.user_order, [orderno, req.body.openid, 
                                                                    req.body.shopid, totalPrice, detail,new Date().getTime()/1000], 
                                function(err, orderres) {
                                    if (orderres) {
                                        rsp = {
                                            code: 0,
                                            orderno: orderno,
                                            totalprice: totalPrice
                                        };
                                    }
                                    else { 
                                        rsp = {
                                            code: 1205,
                                            msg: '下单失败'
                                        };
                                    }
                                    connection.release();
                                    res.json(rsp);
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
                        rsp = {
                            code: 0,
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
                        rsp = {
                            code: 0,
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
