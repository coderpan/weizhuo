// user
var shop = {
	shop_regist:'INSERT INTO t_user(userid, mobile, type, createtime) VALUES(?,?,1,?)',
	checkPwd: 'select 1 from t_user where userid=? and passwd=?',
};
module.exports = shop;
