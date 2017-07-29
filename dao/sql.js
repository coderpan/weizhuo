var sql = {
    // shop
	shop_regist:'INSERT INTO t_user(userid, mobile, type, shopid, createtime) VALUES(?,?,1,?,?)',
	shop_gen: 'INSERT INTO t_shop(shopid, name, mobile, logo, createtime) VALUES(?,?,?,?,?)',
    shop_update: 'replace into t_shop(shopid, name, mobile, logo, des, addr) values(?,?,?,?,?,?)',
    shop_queryid: 'select shopid from t_user where userid=?',
    shop_queryuserid: 'select userid from t_user where shopid=?',
    shop_query: 'select shopid, name, mobile, logo, des, addr, status,createtime from t_shop where shopid=?',
    shop_query_all: 'select shopid, name, mobile, logo, des, addr, status, createtime from t_shop where shopid in ',
    shop_dealprod: 'replace into t_product(shopid, classid, prodid, name, descr, price, image, dealuserid, status, createtime) values(?,?,?,?,?,?,?,?,?,?)',
    shop_queryemployee: 'select count(1) as cnt from t_product where shopid=? and dealuserid=?',
    shop_maxclassid: 'select coalesce(max(classid),0)+1 as classid from t_prodclass where shopid=?',
    shop_dealclass: 'replace into t_prodclass(shopid, classid, name, createtime) values(?,?,?,?)',
    shop_classlist: 'select classid, name from t_prodclass where shopid=? and name <> \'\'',
    shop_prodlist: 'select prodid, classid, name, descr, price, image, status from t_product where shopid=? and classid=? /*and status=0 */',
    shop_prodlist_all: 'select prodid, classid, name, descr, price, image, status from t_product where shopid=? /*and status=0*/ order by classid',
    //shop_prodlist_all_2: 'select prodid, classid, name, descr, price, image from t_product where shopid=?',
    shop_prod_query: 'select classid, name, descr, price from t_product where shopid=? and prodid=?',
    shop_order_query: 'select orderno,price,userid,mobile,detail,status,createtime from t_order where shopid=? and from_unixtime(createtime,\'%Y%m%d\')=? order by createtime desc limit ?,?',
    shop_order_count: 'select status as st,count(1) as cnt from t_order where shopid=? and from_unixtime(createtime,\'%Y%m%d\')=? group by status',
    shop_seller_verify: 'select 1 from t_user where userid=? and shopid=? and type=1',
    shop_order_deal: 'update t_order set status=3 where orderno=? limit 1',

    // user
	user_regist:'INSERT INTO t_user(userid, mobile, type, createtime) VALUES(?,?,0,?)',
    user_query: 'select status, shopid, mobile, shoplist from t_user where userid=?',
    user_order: 'insert into t_order(orderno, userid, shopid, price, mobile, detail, createtime) values(?,?,?,?,?,?,?)',
    user_attent: 'update t_user set shoplist=concat(shoplist, \'|\', ?) where userid=? limit 1',
    user_order_query_orderno: 'select orderno,shopid,price,mobile,detail,status,createtime from t_order where orderno=?',
    user_order_query_userid: 'select orderno,shopid,price,mobile,detail,status,createtime from t_order where userid=? order by createtime desc limit ?,?',
	user_update:'update t_user set mobile = ? where userid = ?',
    //user_shopidentifyquery:'select employee from t_shop where shopid=?',
    user_shopidentifyquery:'select prodid, name, descr, image, status from t_product where shopid=? and dealuserid=?',
    user_order_cancel: 'update t_order set status=2 where orderno=? limit 1',

    // mp
    save_token: 'replace into t_wxtoken(userid, accesstoken, refreshtoken, expiresec, createtime) values(?, ?, ?, ?, ?)',

    //common
    sms_send: 'replace into t_sms(mobile, verifycode, type, createtime) values(?, ?, ?, ?)',
    sms_query: 'select verifycode, type, createtime from t_sms where mobile=? and type = ?',
};
module.exports = sql;
