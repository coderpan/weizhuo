var mysql = require('mysql');
var db_conf = require('../conf/db');
var sql = require('./sql');
var crypto = require('crypto');

var pool = mysql.createPool(db_conf.mysql);

module.exports = {
	shopregister(req, res, next) {
        if (!req.body.openid || !req.body.mobile) {
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

            var hasher=crypto.createHash("sha1");
            hasher.update(req.body.mobile+"wxpuu");
            var hashmsg=hasher.digest('hex');
            var rsp;
			connection.query(sql.shop_regist, [req.body.openid, req.body.mobile, hashmsg, new Date().getTime()/1000], function(err, result) {
				if(result) {
                    // generate shop
                    connection.query(sql.shop_gen, [hashmsg, '', '', '', new Date().getTime()/1000], function(err, result) {
                        if (result) {
                            rsp = {
                                code: 0,
                                shopid: hashmsg
                            };    
                        }
                        else {
                            console.error("insert error, ret:" + err.message);
                            rsp = {
                                code: 1002,
                                msg:'生成店铺失败'
                            };
                        }
                        res.json(rsp);
                        connection.release();
                    })
				}
				else {
					console.error("insert error, ret:" + err.message);
					rsp = {
						code: 1001,
						msg:'绑定手机失败'
					};
                    res.json(rsp);
                    connection.release();
				}
			});
		});
	},

	shopupdate(req, res, next) {
        if (!req.body.openid || !req.body.shopid) {
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
			connection.query(sql.shop_update, [req.body.shopid, req.body.name, req.body.mobile, req.body.logo], function(err, result) {
                if (result) {
                    rsp = {
                        code: 0,
                        shopid: req.body.shopid
                    };    
                }
                else {
                    console.error("replace error, ret:" + err.message);
                    rsp = {
                        code: 1020,
                        msg:'更新店铺信息失败'
                    };
                }
                res.json(rsp);
                connection.release();
            });
        });
	},

	shopquery(req, res, next) {
        if (!req.body.openid || !req.body.token) {
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
			connection.query(sql.shop_queryid, [req.body.openid], function(err, result) {
                if (result) {
                    if (result.length && result[0].shopid != "") {
                        connection.query(sql.shop_query, [result[0].shopid], function(err, result) {
                            if (result) {
                                rsp = {
                                    code: 0,
                                    shopid: result[0].shopid,
                                    name: result[0].name,
                                    mobile: result[0].mobile,
                                    logo: result[0].logo,
                                    status: result[0].status,
                                    createtime: result[0].createtime
                                };    
                            }
                            else {
                                console.error("select error, ret:" + err.message);
                                rsp = {
                                    code: 1010,
                                    msg:'查询店铺信息失败'
                                };
                            }
                            res.json(rsp);
                            connection.release();
                        });
                    }
                    else {
                        rsp = {
                            code: 0,
                            shopid: ""
                        };    
                        res.json(rsp);
                        connection.release();
                    }
                }
                else {
                    console.error("select error, ret:" + err.message);
                    rsp = {
                        code: 1010,
                        msg:'查询店铺信息失败'
                    };
                    res.json(rsp);
                    connection.release();
                }
            });
        });
	},

	dealprod(req, res, next) {
        if (!req.body.openid || !req.body.shopid || !req.body.classid) {
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
            var currentMs = new Date().getTime();
            var prodid = req.body.prodid;
            if (!prodid) {
                var hasher=crypto.createHash("sha1");
                hasher.update(req.body.shopid+currentMs+"productid");
                prodid=hasher.digest('hex');
            }
			connection.query(sql.shop_dealprod, [req.body.shopid, req.body.classid, 
                                                 prodid, req.body.name, req.body.desc, 
                                                 req.body.price, req.body.image, req.body.status, new Date().getTime()/1000], 
             function(err, result) {
                if (result) {
                    rsp = {
                        code: 0,
                        prodid: prodid
                    };
                }
                else {
                    console.error("replace error, ret:" + err.message);
                    rsp = {
                        code: 1030,
                        msg:'添加/更新商品信息失败'
                    };
                }
                res.json(rsp);
                connection.release();
            });
        });
	},

	dealclass(req, res, next) {
        if (!req.body.openid || !req.body.shopid) {
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
            console.log(sql.shop_maxclassid);
			connection.query(sql.shop_maxclassid, [req.body.shopid], function(err, result) {
                var classid = result[0].classid;
                connection.query(sql.shop_dealclass, [req.body.shopid, classid, req.body.name, new Date().getTime()/1000], 
                 function(err, result) {
                    if (result) {
                        rsp = {
                            code: 0,
                            classid: classid
                        };
                    }
                    else {
                        console.error("replace error, ret:" + err.message);
                        rsp = {
                            code: 1040,
                            msg:'添加/更新分类失败'
                        };
                    }
                    res.json(rsp);
                    connection.release();
                    });
                });
        });
    },

	classquery(req, res, next) {
        if (!req.body.openid || !req.body.shopid) {
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
			connection.query(sql.shop_classlist, [req.body.shopid], function(err, result) {
                if (result) {
                    rsp = {
                        code: 0,
                        classlist: result
                    };
                }
                else {
                    console.error("select error, ret:" + err.message);
                    rsp = {
                        code: 1045,
                        msg:'查询分类信息失败'
                    };
                }
                res.json(rsp);
                connection.release();
            });
        });
    },

	prodlist(req, res, next) {
        if (!req.body.openid || !req.body.shopid) {
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
            var sqlstr = req.body.classid ? sql.shop_prodlist : sql.shop_prodlist_all;
			connection.query(sqlstr, [req.body.shopid, req.body.classid], function(err, result) {
                if (result) {
                    rsp = {
                        code: 0,
                        prodlist: result
                    };
                }
                else {
                    console.error("select error, ret:" + err.message);
                    rsp = {
                        code: 1035,
                        msg:'查询商品列表失败'
                    };
                }
                res.json(rsp);
                connection.release();
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
			connection.query(sql.shop_order_query, [req.body.shopid, req.body.pageno?(req.body.pageno-1):0, req.body.pagesize?req.body.pagesize:10], function(err, result) {
                if (result) {
                    rsp = {
                        code: 0,
                        orderlist: result
                    };
                }
                else {
                    console.error("select error, ret:" + err.message);
                    rsp = {
                        code: 1035,
                        msg:'查询客户订单失败'
                    };
                }
                res.json(rsp);
                connection.release();
            });
        });
    }
};
