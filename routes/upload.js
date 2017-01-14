/**
 * @api {post} /api/shop/upload 文件上传
 * @apiName upload
 * @apiGroup  Shop
 * @apiVersion 0.1.0
 *
 * @apiParam (入参) {String} name html中表单name,默认为thumbnail
 *
 * @apiSuccess (出参) {String} url 图片地址
 *
 * @apiSuccessExample 成功返回：
 *     {
         "code":0,
 *       "url": "http://www.baidu.com/1.jpg"
 *     }
 *
 * @apiErrorExample 失败返回
 *     {
 *       "code": 1050,
 *       "msg": "上传文件失败"
 *     }
 *
 * @apiError (错误码) 0 成功
 * @apiError (错误码) 99 参数错误
 * @apiError (错误码) 100 登录态校验失败
 * @apiError (错误码) 101 未知错误
 * @apiError (错误码) 1050  文件上传失败
 * @apiError (错误码) 1051  文件大小不能超过2M
 */

router.post('/upload', function(req, res, next) {
    
});

};
