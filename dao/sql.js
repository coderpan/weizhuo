var sql = {
    // shop
	shop_regist:'INSERT INTO t_user(userid, mobile, type, shopid, createtime) VALUES(?,?,1,?,?)',
	shop_gen: 'INSERT INTO t_shop(shopid, name, mobile, logo, createtime) VALUES(?,?,?,?,?)',
    shop_update: 'replace into t_shop(shopid, name, mobile, logo) values(?,?,?,?)',
    shop_queryid: 'select shopid from t_user where userid=?',
    shop_query: 'select shopid, name, mobile, logo, status,createtime from t_shop where shopid=?',
    shop_dealprod: 'replace into t_product(shopid, classid, prodid, name, descr, price, image, status, createtime) values(?,?,?,?,?,?,?,?,?)',
    shop_maxclassid: 'select coalesce(max(classid),0)+1 as classid from t_prodclass where shopid=?',
    shop_dealclass: 'replace into t_prodclass(shopid, classid, name, createtime) values(?,?,?,?)',
    shop_classlist: 'select classid, name from t_prodclass where shopid=? and name <> \'\'',
    shop_prodlist: 'select prodid, classid, name, descr, price, image from t_product where shopid=? and classid=? and status=0',
    shop_prodlist_all: 'select prodid, classid, name, descr, price, image from t_product where shopid=? and status=0 order by classid',
    shop_prod_query: 'select classid, name, descr, price from t_product where shopid=? and prodid=?',
    shop_order_query: 'select orderno,price,userid,detail,status from t_order where shopid=? order by createtime desc limit ?,?',
    shop_order_count: 'select count(1) as cnt from t_order where shopid=? and unix_timestamp(now())-createtime < 24*3600',
    shop_seller_verify: 'select 1 from t_user where userid=? and shopid=? and type=1',
    shop_order_deal: 'update t_order set status=3 where orderno=? limit 1',

    // user
	user_regist:'INSERT INTO t_user(userid, mobile, type, createtime) VALUES(?,?,0,?)',
    user_query: 'select status, shopid, shoplist from t_user where userid=?',
    user_order: 'insert into t_order(orderno, userid, shopid, price, detail, createtime) values(?,?,?,?,?,?)',
    user_attent: 'update t_user set shoplist=concat(shoplist, \'|\', ?) where userid=? limit 1',
    user_order_query_orderno: 'select orderno,shopid,price,detail,status from t_order where orderno=?',
    user_order_query_userid: 'select orderno,shopid,price,detail,status from t_order where userid=? order by createtime desc limit ?,?',
};
module.exports = sql;
