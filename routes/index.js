url = require("url");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
    var param = url.parse(req.url, true).query;
	console.log(param);
	console.log(param.name);
	res.send(param);
});

module.exports = router;
