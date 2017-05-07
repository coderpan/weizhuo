var mysql = require('mysql');
var db_conf = require('../conf/db');
var sql = require('./sql');

Date.prototype.format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };

    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear().toString()).substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

var pool = mysql.createPool(db_conf.mysql);

module.exports = {
	savetoken(req, func) {
        if (!req.openid || !req.access_token) {
            return func(-1, "参数错误");
        }
		pool.getConnection(function(err, connection) {
            if(err) {
                return func(-2, "未知错误");
            }

            var rsp;
			connection.query(sql.save_token, [req.openid, req.access_token, req.refresh_token, req.expires_in, new Date().getTime()/1000], function(err, result) {
				if(!err) {
                    connection.release();
                    return func(0,"insert success");
				}
				else {
					console.error("insert error, ret:" + err.message);
                    connection.release();
                    return func(-3,"token save failed");
				}
			});
		});
	}
};
