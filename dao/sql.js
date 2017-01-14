// user
var shop = {
	shop_regist:'INSERT INTO t_user(userid, mobile, type, shopid, createtime) VALUES(?,?,1,?,?)',
	shop_gen: 'INSERT INTO t_shop(shopid, name, mobile, logo, createtime) VALUES(?,?,?,?,?)',
    shop_update: 'replace into t_shop(shopid, name, mobile, logo) values(?,?,?,?)',
    shop_dealprod: 'replace into t_product(shopid, classid, prodid, name, descr, price, image, status, createtime) values(?,?,?,?,?,?,?,?,?)',
};
module.exports = shop;
