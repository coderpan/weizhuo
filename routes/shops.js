var express = require('express');
var router = express.Router();

var shopdao = require('../dao/shopdao.js');

/**
 * @api {post} /api/shop/register 店铺注册
 * @apiName register
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} mobile 商户手机号
 * @apiParam (入参) {String} smscode 商户手机验证码
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {String} shopid 商户店铺唯一标识
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "shopid": "5fgdKsdfIUHDFHdss33456"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1001,
 *       "msg": "绑定手机号失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1000 绑定手机号失败
 * @apiError (错误码) 1001 生成店铺失败
 */
router.post('/register', function(req, res, next) {
    console.log(req.body);
	shopdao.shopregister(req, res, next);
});

/**
 * @api {post} /api/shop/update 店铺信息更新
 * @apiName update
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {String} name 商户店铺名称
 * @apiParam (入参) {String} mobile 商户联系方式
 * @apiParam (入参) {String} logo 商户店铺logo地址
 * @apiParam (入参) {String} desc 商户店铺描述
 * @apiParam (入参) {String} addr 商户店铺地址
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {String} shopid 商户店铺唯一标识
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "shopid": "5fgdKsdfIUHDFHdss33456"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1020,
 *       "msg": "更新店铺信息失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1020 更新店铺信息失败
 */
router.post('/update', function(req, res, next) {
    console.log(req.body);
	shopdao.shopupdate(req, res, next);
});

/**
 * @api {post} /api/shop/query 店铺信息查询
 * @apiName query
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid，如果是小程序使用，这里填小程序的openid
 * @apiParam (入参) {String} shopid 如果是小程序使用，可以指定shopid查询
 * @apiParam (入参) {String} token 商户登录态
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {String} shopid 商户店铺唯一标识, 如果为空，表示用户没有注册店铺
 * @apiSuccess (出参) {String} name 商户店铺名称 
 * @apiSuccess (出参) {String} mobile 商户店铺联系号码
 * @apiSuccess (出参) {String} logo 商户店铺logo地址
 * @apiSuccess (出参) {String} desc 商户店铺描述
 * @apiSuccess (出参) {String} addr 商户店铺地址
 * @apiSuccess (出参) {String} status 商户店铺状态，0-正常，1-异常
 * @apiSuccess (出参) {String} createtime 商户店铺创建时间
 *
 * @apiSuccessExample 成功返回：
 *     {
 *       "code":0,
 *       "shopid": "5fgdKsdfIUHDFHdss33456"
 *       "name": "微小铺",
 *       "mobile": "13888888888",
 *       "logo": "http://www.wxpuu.com/mylogo.jpg",
 *       "desc": "这是一家好店铺",
 *       "addr": "深圳市南山区xx路",
 *       "status": 0,
 *       "createtime": "1484407390"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1010,
 *       "msg": "查询店铺信息失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1010 查询店铺信息失败
 */
router.post('/query', function(req, res, next) {
    console.log(req.body);
	shopdao.shopquery(req, res, next);
});

/**
 * @api {post} /api/shop/dealprod 添加/更新商品
 * @apiName dealprod
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {int} classid 分类ID
 * @apiParam (入参) {String} prodid 商品ID，为空表示新增商品，反之修改商品
 * @apiParam (入参) {String} name 商品名称
 * @apiParam (入参) {String} desc 商品描述 
 * @apiParam (入参) {String} price 商品价格，单位分 
 * @apiParam (入参) {String} image 商品图片地址
 * @apiParam (入参) {String} status  商品状态，0-上架，1-下架
 * @apiParam (入参) {String} dealuserid  添加商品的用户标识,可以不传
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {String} prodid 商品唯一标识
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "prodid": "5fgdKsdfIUHDFHdss33456"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1030,
 *       "msg": "添加或更新商品失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1030  添加或更新商品失败
 */
router.post('/dealprod', function(req, res, next) {
    console.log(req.body);
	shopdao.dealprod(req, res, next);
});

/**
 * @api {post} /api/shop/dealemployee 添加/更新店员
 * @apiName dealemployee
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {int} classid 分类ID
 * @apiParam (入参) {String} prodid 商品ID，为空表示新增商品，反之修改商品
 * @apiParam (入参) {String} name 商品名称
 * @apiParam (入参) {String} desc 商品描述 
 * @apiParam (入参) {String} price 商品价格，单位分 
 * @apiParam (入参) {String} image 商品图片地址
 * @apiParam (入参) {String} status  商品状态，0-上架，1-下架
 * @apiParam (入参) {String} dealuserid  添加商品的用户标识,可以不传
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {String} prodid 商品唯一标识
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "prodid": "5fgdKsdfIUHDFHdss33456"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1030,
 *       "msg": "添加或更新商品失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1030  添加或更新商品失败
 * @apiError (错误码) 1031  不能添加重复商品
 */
router.post('/dealemployee', function(req, res, next) {
    console.log(req.body);
	shopdao.dealemployee(req, res, next);
});

/**
 * @api {post} /api/shop/dealclass 添加/更新/删除分类
 * @apiName dealclass
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {int} classid 分类ID,为空表示新增分类，反之修改分类
 * @apiParam (入参) {String} name 分类名称，为空表示删除分类
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {int} classid 分类ID
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "classid": 2
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1040,
 *       "msg": "添加或更新分类失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1040  添加或更新分类失败
 */
router.post('/dealclass', function(req, res, next) {
    console.log(req.body);
	shopdao.dealclass(req, res, next);
});

/**
 * @api {post} /api/shop/classquery 分类列表查询
 * @apiName classquery
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {Object[]} classlist 分类列表
 * @apiSuccess (出参) {int} classlist.classid 分类ID
 * @apiSuccess (出参) {String} classlist.name 分类名称
 *
 * @apiSuccessExample 成功返回：
 *     {
 *       "code":0,
 *       "classlist": [
 *         {
 *           "classid": 1,
 *           "name": "class-example1"
 *         },
 *         {
 *           "classid": 2,
 *           "name": "class-example2"
 *         }
 *       ]
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1045,
 *       "msg": "查询分类列表失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1045  查询分类列表失败
 */
router.post('/classquery', function(req, res, next) {
    console.log(req.body);
	shopdao.classquery(req, res, next);
});

/**
 * @api {post} /api/shop/prodlist 商品列表查询
 * @apiName prodlist
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid，如果是用户进入店铺，这里填用户的openid
 * @apiParam (入参) {String} token 商户登录态，如果是用户进入店铺，这里填用户的token
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {int} classid 分类ID，不传或者传0，返回所有分类的商品列表，按分类ID排序
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {Object[]} prodlist 商品列表
 * @apiSuccess (出参) {String} prodlist.prodid 商品ID
 * @apiSuccess (出参) {String} prodlist.classid 分类ID
 * @apiSuccess (出参) {String} prodlist.name 商品名称
 * @apiSuccess (出参) {String} prodlist.desc 商品描述
 * @apiSuccess (出参) {int} prodlist.price 商品价格，单位分
 * @apiSuccess (出参) {String} prodlist.image 商品图片地址列表，以|分隔
 *
 * @apiSuccessExample 成功返回：
 *     {
 *       "code":0,
 *       "prodlist": [
 *         {
 *           "prodid": "sdjfdhD2eHD45",
 *           "name": "prodname-example",
 *           "desc": "prod-desc",
 *           "price": 3000,
 *           "image": "http://www.baidu.com/a.jpg|http://www.baidu.com/b.jpg"
 *         },
 *         {
 *           "prodid": "sdjfdhD2eHD46",
 *           "name": "prodname-example2",
 *           "desc": "prod-desc2",
 *           "price": 4000,
 *           "image": "http://www.baidu.com/a.jpg|http://www.baidu.com/b.jpg"
 *         }
 *       ]
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1035,
 *       "msg": "查询商品列表失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1035  查询商品列表失败
 */
router.post('/prodlist', function(req, res, next) {
    console.log(req.body);
	shopdao.prodlist(req, res, next);
});

/**
 * @api {post} /api/shop/orderquery 客户订单查询
 * @apiName orderquery
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 店铺ID
 * @apiParam (入参) {String} date 日期，如20170415，不传默认当天
 * @apiParam (入参) {int} pageno 页码，从1开始，传0或不传，返回订单总数
 * @apiParam (入参) {int} pagesize 每页显示订单数
 *
 * @apiSuccess (出参) {int} code 接口返回码
 * @apiSuccess (出参) {int} count 订单总数
 * @apiSuccess (出参) {int} dealcount 已处理订单总数,不包括已退款的订单
 * @apiSuccess (出参) {int} nodealcount 未处理订单总数，不包括未支付的订单
 * @apiSuccess (出参) {Object[]} orderlist 订单列表
 * @apiSuccess (出参) {String} orderlist.orderno 订单号
 * @apiSuccess (出参) {String} orderlist.totalprice 订单总金额,单位分
 * @apiSuccess (出参) {String} orderlist.userid 用户openid
 * @apiSuccess (出参) {String} orderlist.mobile 用户手机号
 * @apiSuccess (出参) {String} orderlist.detail 订单详情
 * @apiSuccess (出参) {String} orderlist.status 订单状态，0-未付款，1-已付款，2-已退款，3-商家已处理
 *
 * @apiSuccessExample 成功返回：
 *     {
 *       "code":0,
 *       "count": 98,
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
 *       "code": 1040,
 *       "msg": "查询客户订单失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1040  查询客户订单失败
 */
router.post('/orderquery', function(req, res, next) {
    console.log(req.body);
	shopdao.orderquery(req, res, next);
});

/**
 * @api {post} /api/shop/orderdeal  商家处理订单
 * @apiName orderdeal
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} shopid 店铺ID
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
 *       "code": 1045,
 *       "msg": "处理订单失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1045 处理订单失败
 */
router.post('/orderdeal', function(req, res, next) {
    console.log(req.body);
	shopdao.orderdeal(req, res, next);
});

/**
 * @api {post} /api/shop/employeeorderdeal 店员处理订单
 * @apiName employeeorderdeal
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 用户的openid
 * @apiParam (入参) {String} token 用户登录态
 * @apiParam (入参) {String} shopid 店铺ID
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
 *       "code": 1045,
 *       "msg": "处理订单失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1045 处理订单失败
 */
router.post('/employeeorderdeal', function(req, res, next) {
    console.log(req.body);
	shopdao.employeeorderdeal(req, res, next);
});
module.exports = router;
