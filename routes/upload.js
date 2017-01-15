/**
 * @api {post} /api/upload 文件上传
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
 * @apiError (错误码) 1052  文件类型错误，仅支持JPG
 */

var multerutil = require('./multerUtil');
var multerupload=multerutil.single('thumbnail');            
    exports.dataInput = function (req, res) {
        multerupload(req, res, function (err) {
            //添加错误处理
            if (err) {
                result = {
                    code: 1050,
                    msg:'上传文件失败'
                };
                return res.json(result);
            } 
            //文件信息在req.file或者req.files中显示。
            //console.log(req);
            result = {
                code: 0,
                url:'https://www.wxpuu.com/files/'+req.file.filename
            };
            return res.json(result);
        });
 }

/*
router.post('/', function(req, res, next) {
    if (req.files.thumbnail.size > 2 * 1024 * 1024) {
        result = {
            code: 1051,
            msg:'文件大小不能超过2M'
        };
        return res.json(result);
    }
    if (req.files.thumbnail.type != "jpg") {
        result = {
            code: 1052,
            msg:'文件类型错误，仅支持JPG'
        };
        return res.json(result);
    }
    // 获得文件的临时路径
    var tmp_path = req.files.thumbnail.path;
    // 指定文件上传后的目录
    var target_path = '/data/wxpuu/images/' + req.files.thumbnail.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) {
        result = {
            code: 1050,
            msg:'上传文件失败'
        };
      }
      // 删除临时文件夹文件, 
      fs.unlink(tmp_path, function() {
         if (err) throw err;
      });
    });
});
*/
