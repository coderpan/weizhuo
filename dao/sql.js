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
    shop_classlist: 'select classid, name from t_prodclass where shopid=?',
    shop_prodlist: 'select prodid, classid, name, descr, price, image from t_product where shopid=? and classid=? and status=0',
    shop_prodlist_all: 'select prodid, classid, name, descr, price, image from t_product where shopid=? and status=0 order by classid',

    // user
    user_query: 'select status, shopid from t_user where userid=?',
};
module.exports = sql;
