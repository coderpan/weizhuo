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
 * @apiSuccess (出参) {String} code 接口返回码
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
 *
 * @apiSuccess (出参) {String} code 接口返回码
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
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {String} shopid 商户店铺唯一标识, 如果为空，表示用户没有注册店铺
 * @apiSuccess (出参) {String} name 商户店铺名称 
 * @apiSuccess (出参) {String} mobile 商户店铺联系号码
 * @apiSuccess (出参) {String} logo 商户店铺logo地址
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
 * @api {post} /api/shop/insprod 添加/更新商品
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
 *
 * @apiSuccess (出参) {String} code 接口返回码
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
})

/**
 * @api {post} /api/shop/dealclass 添加/更新分类
 * @apiName dealclass
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {int} classid 分类ID,为空表示新增分类，反之修改分类
 * @apiParam (入参) {String} name 分类名称
 *
 * @apiSuccess (出参) {String} code 接口返回码
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
 * @apiSuccess (出参) {String} code 接口返回码
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
 * @apiParam (入参) {String} openid 商户在微小铺公众号下的openid
 * @apiParam (入参) {String} token 商户登录态
 * @apiParam (入参) {String} shopid 商户ID
 * @apiParam (入参) {int} classid 分类ID,不传或者传0，返回所有分类的商品列表，按分类ID排序
 *
 * @apiSuccess (出参) {String} code 接口返回码
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

module.exports = router;
