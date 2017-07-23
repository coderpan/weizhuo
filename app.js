'use strict';

//require('./globals');
//require('./setup-qcloud-sdk');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./conf/config');

const app = express();

app.set('query parser', 'simple');
app.set('case sensitive routing', true);
app.set('jsonp callback name', 'callback');
app.set('strict routing', true);
app.set('trust proxy', true);

app.disable('x-powered-by');

// 记录请求日志
app.use(morgan('tiny'));

// parse `application/x-www-form-urlencoded`
//app.use(bodyParser.urlencoded({ extended: true }));

/*
//save post data
app.use(function(req, res, next){
	var reqData = [];
	var size = 0;
	req.on('data', function(data) {
		reqData.push(data);
		size += data.length;
	});
	req.on('end', function() {
		req.reqData = Buffer.concat(reqData, size);
		console.log(JSON.parse(req.reqData).data.name);
	});
	next();
});
*/

// parse `application/json`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var index = require('./routes/index');
var shops = require('./routes/shops');
var users = require('./routes/users');
var upload = require('./routes/upload.js');
var mp = require('./routes/mp');
var sms = require('./routes/sms');

app.use('/', index);
app.use('/api/shop', shops);
app.use('/api/user', users);
app.use('/api/upload', upload.dataInput);
app.use('/api/mp', mp);
app.use('/api/sms', sms);

// 打印异常日志
process.on('uncaughtException', error => {
    console.log(error);
});

// 启动server
http.createServer(app).listen(config.port, () => {
    console.log('Express server listening on port: %s', config.port);
});
