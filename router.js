var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Mock = require('mockjs');
var Random = Mock.Random;

var fileArr = fs.readdirSync('./api');

router.get('/fileList', function(req, res, next){
	var data = {};
	data.filelist = fileArr.map((value, index) => {
		return value.split('.')[0]
	})
	res.send(data);
})

router.post('/project_detail', function(req, res, next){
	var params = req.body;
	if(params.fileName){
		var fileName = params.fileName.replace(/\//g, "-") + ".json";
		var data = fs.readFileSync(path.resolve('./api', fileName)).toString();
		data = JSON.parse(data);
		var urlList = [];
		urlList = data.map(function(value, index){
			return value
		})
		var resData = {data: {urlList: urlList}}
		res.send(JSON.stringify(resData))
	} else {
		res.send({code: 1, msg: "请求参数错误!"});
	}
	
})

router.post('/addFile', function(req, res, next){
	var params = req.body;
	var fileName = params.fileName;
	var url = params.url;
	var mockData = JSON.parse(params.mockData);
	params.method = params.method || "get";
	 params.failRandom =  params.failRandom || 0;
	//设置接口返回数据和基本信息
	var _mockData = {
		"url": fileName + "/" + url,
		"data": mockData,
		"method": params.method,
		"failRandom": params.failRandom
	}
	var filePath = path.join('./api', fileName.replace(/\//g, '-')) + ".json";

	if(fileArr.indexOf(fileName.replace(/\//g, '-') + ".json") != -1){
		var originData = fs.readFileSync(filePath).toString();
		originData = JSON.parse(originData);
		
		var isExsit = false, exsitIndex = -1;
		originData.map(function(value, index){
			if(value.url == (fileName + "/" + url) && value.method == params.method){
				isExsit = true;
				exsitIndex = index;
			}
		})
		if(!isExsit){
			originData.push(_mockData);
			fs.writeFileSync(filePath, JSON.stringify(originData));
			res.send({code: 0});
		} else {
			originData[exsitIndex] = _mockData;
			fs.writeFileSync(filePath, JSON.stringify(originData));
			res.send({code: 1, msg: "接口已覆盖"})
		}

	} else {
		var writeStream = fs.createWriteStream(filePath);
		var str = "[" + JSON.stringify(_mockData) + "]";
		fs.writeFileSync(filePath, str);
		res.send({code: 0});
	}
})




fileArr.map(function(value, index){
	var data = fs.readFileSync(path.resolve('./api', value)).toString();
	data = JSON.parse(data);
	var fileName = value.split('.')[0];
	if(data.length != 0 ){
		data.map(function(value, index){
			var method = value.method || "get";
			value.url = `/${value.url}`;
			// console.log(value.url)
			router[method](value.url, function(req, res, next){
				var randomNum = Math.round(Math.random() * 100);
				if(randomNum < value.failRandom){
					res.send({code: 1, msg: "请求失败"});
				} else {
					var resData = Mock.mock(value.data);
					resData.code = 0;
					resData.servertime = new Date().getTime();
					resData.msg = "";
					if(req.url.indexOf('callback') != -1){
						var name = req.query.callback;
						resData = name + "(" + JSON.stringify(resData) + ")";
						
					}
					res.send(resData);
				}
			})
		})
	}
})

module.exports = router;