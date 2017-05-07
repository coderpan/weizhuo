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
 * @apiSuccess (出参) {int} size 关注店铺的条数
 * @apiSuccess (出参) {String} status 用户状态，0-正常，1-异常
 * @apiSuccess (出参) {String} shopid 商户店铺唯一标识，如果为空，表示普通用户
 * @apiSuccess (出参) {String} shoplist 用户关注的店铺列表
 *
 * @apiSuccessExample 成功返回：
    {
        "code": 0,
        "size": 2,
        "shoplist": [
            {
                "shopid": "7086b7f20b80e980fd519770c98629125fe3641b",
                "name": "第十三",
                "mobile": "433",
                "logo": "https://www.wxpuu.com/files/thumbnail-1490754949719.jpg",
                "des": "",
                "addr": "",
                "status": 0,
                "createtime": 0
            },
            {
                "shopid": "b1ac88c50910963aaa653113a33a8c6f721842b8",
                "name": "philpan",
                "mobile": "1388888889",
                "logo": "www.baidu.com",
                "des": "aaaaabbbb",
                "addr": "ssswwww",
                "status": 0,
                "createtime": 0
            }
        ]
    }
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
    console.log(req.body);
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
 * @apiParam (入参) {String} prodlist.name 商品名称
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
 * @apiError (错误码) 1206 查询商品信息失败
 */
router.post('/order', function(req, res, next) {
    console.log(req.body);
	userdao.order(req, res, next);
});

/**
 * @api {post} /api/user/attent  用户关注店铺
 * @apiName attent
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} shopid 店铺ID
 *
 * @apiSuccess (出参) {String} code 接口返回码
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1210,
 *       "msg": "关注失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1205 下单失败
 * @apiError (错误码) 1206 查询商品信息失败
 * @apiError (错误码) 1210 用户关注店铺失败
 */
router.post('/attent', function(req, res, next) {
    console.log(req.body);
	userdao.attent(req, res, next);
});

/**
 * @api {post} /api/user/orderquery  用户订单查询
 * @apiName orderquery
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} orderno 订单号,如为空或不传，则查询用户所有的订单
 * @apiParam (入参) {int} pageno 页码，从1开始
 * @apiParam (入参) {int} pagesize 每页显示订单数
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {int} count 订单总数量
 * @apiSuccess (出参) {Object[]} orderlist 订单列表
 * @apiSuccess (出参) {String} orderlist.orderno 订单号
 * @apiSuccess (出参) {String} orderlist.totalprice 订单总金额,单位分
 * @apiSuccess (出参) {String} orderlist.userid 用户openid
 * @apiSuccess (出参) {String} orderlist.detail 订单详情
 * @apiSuccess (出参) {String} orderlist.status 订单状态，0-未付款，1-已付款，2-已退款，3-商家已处理
 *
 * @apiSuccessExample 成功返回：
 *     {
 *       "code":0,
 *       "count":2,
 *       "orderlist": [
 *         {
 *           "orderno": "sdjfdhD2eHD45",
 *           "totalprice": "3000",
 *           "userid": "ooJb5wGI6l2h8xRpw9M2uKHeu2if",
 *           "detail": "[{\"prodid\":\"c161ad04b8275e94ab4eba7c5228c9adad232046\",\"count\":2,\"price\":6200},{\"prodid\":\"b78fb56a51f419c7f28b106a47f3c6a38e57c9e4\",\"count\":10,\"price\":3330}]"
 *         },
 *         {
 *           "orderno": "sdjfdhD2eHD46",
 *           "totalprice": "4500",
 *           "userid": "ooJb5wGI6l2h8xRpw9M2uKHeu2if",
 *           "detail": "[{\"prodid\":\"c161ad04b8275e94ab4eba7c5228c9adad232046\",\"count\":2,\"price\":6200},{\"prodid\":\"b78fb56a51f419c7f28b106a47f3c6a38e57c9e4\",\"count\":10,\"price\":3330}]"
 *         }
 *       ]
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1220,
 *       "msg": "查询用户订单失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1220 查询用户信息失败
 */
router.post('/orderquery', function(req, res, next) {
    console.log(req.body);
	userdao.orderquery(req, res, next);
});

/**
 * @api {post} /api/user/regist  用户注册
 * @apiName regist
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 *
 * @apiSuccess (出参) {String} code 接口返回码
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1230,
 *       "msg": "用户注册失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1230 用户注册失败
 */
router.post('/regist', function(req, res, next) {
    console.log(req.body);
	userdao.regist(req, res, next);
});
module.exports = router;
