var express = require('express');
var router = express.Router();

var userdao = require('../dao/userdao.js');

/**
 * @api {post} /api/user/query  用户查询
 * @apiName query
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {String} status 用户状态，0-正常，1-异常
 * @apiSuccess (出参) {String} shopid 商户店铺唯一标识，如果为空，表示普通用户
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
         "status":0,
 *       "shopid": "5fgdKsdfIUHDFHdss33456"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1201,
 *       "msg": "查询用户信息失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1201 查询用户信息失败
 */
router.post('/query', function(req, res, next) {
	userdao.query(req, res, next);
});

/**
 * @api {post} /api/user/order  用户下单
 * @apiName order
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} shopid 店铺ID
 * @apiParam (入参) {Object[]} prodlist 购物清单列表
 * @apiParam (入参) {String} prodlist.prodid 商品ID
 * @apiParam (入参) {int} prodlist.count 商品数量
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {String} orderno 订单号
 * @apiSuccess (出参) {int} totalprice  总价
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
         "orderno":"45sjhdjfhdjfd",
 *       "totalprice": 3000
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1205,
 *       "msg": "下单失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1205 下单失败
 */
router.post('/order', function(req, res, next) {
	userdao.order(req, res, next);
});
module.exports = router;
