var express = require('express');
var router = express.Router();

var shopdao = require('../dao/shopdao.js');

/**
 * @api {post} /api/shop/register 商户注册
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
	shopdao.shopregister(req, res, next);
});

/**
 * @api {post} /api/shop/update 商户信息更新
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
	shopdao.shopupdate(req, res, next);
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
 * @apiParam (入参) {String} classid 分类ID
 * @apiParam (入参) {String} prodid 商品ID，为空表示新增商品，反之修改商品
 * @apiParam (入参) {String} name 商品名称
 * @apiParam (入参) {String} desc 商品描述 
 * @apiParam (入参) {String} price 商品价格 
 * @apiParam (入参) {String} image 商品图片地址
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
	shopdao.dealprod(req, res, next);
});

module.exports = router;
