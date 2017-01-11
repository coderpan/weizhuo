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
 * @apiParam (入参) {String} mobile 商户手机号
 * @apiParam (入参) {String} smscode 商户手机验证码
 *
 * @apiSuccess (出参) {String} code 接口返回码
 * @apiSuccess (出参) {String} shopmd5 商户店铺唯一标识
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "shopmd5": "5fgdKsdfIUHDFHdss33456"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1001,
 *       "msg": "绑定手机号失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 1000 未知错误
 * @apiError (错误码) 1001 绑定手机号失败
 */
router.post('/register', function(req, res, next) {
	shopdao.shopregister(req, res, next);
});
router.post('/login', function(req, res, next) {
	shopdao.login(req, res, next);
});

module.exports = router;
