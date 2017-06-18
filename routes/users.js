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
 * @apiSuccess (出参) {String} mobile 用户手机号
 * @apiSuccess (出参) {String} shoplist 用户关注的店铺列表
 *
 * @apiSuccessExample 成功返回：
    {
        "code": 0,
        "size": 2,
        "status": "0",
        "mobile": "13823457869",
        "shoplist": "|aaaa|bbbb"
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
 * @apiParam (入参) {String} mobile 用户的手机号
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
 * @apiParam (入参) {String} shopid 店铺id,如为空或不传，则查询用户所有的订单
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

/**
 * @api {post} /api/user/update  用户更新
 * @apiName update
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} mobile 用户手机号
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
 *       "code": 1240,
 *       "msg": "用户更新失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1240 用户更新失败
 */
router.post('/update', function(req, res, next) {
    console.log(req.body);
	userdao.update(req, res, next);
});

/**
 * @api {post} /api/user/shopidentifyquery 用户店铺身份查询
 * @apiName shopidentifyquery
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} shopid 店铺标识
 * @apiParam (入参) {String} token 用户登录态
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {int} ident 身份，1-员工，0-普通用户
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0
         "msg":"ok",
         "ident":1
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1250,
 *       "msg": "用户店铺身份查询失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1250 用户店铺身份查询失败
 */
router.post('/shopidentifyquery', function(req, res, next) {
    console.log(req.body);
	userdao.shopidentifyquery(req, res, next);
});

/**
 * @api {post} /api/user/ordercancel  取消订单
 * @apiName ordercancel
 * @apiGroup  User
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} orderno 订单号
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
 *       "code": 1060,
 *       "msg": "取消订单失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1060 取消订单失败
 */
router.post('/ordercancel', function(req, res, next) {
    console.log(req.body);
	userdao.ordercancel(req, res, next);
});

module.exports = router;
