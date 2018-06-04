// var http=require('http');
var superagent = require('superagent');
// var cheerio=require('cheerio');
// var Eventproxy = require('eventproxy');
var async = require("async");
var fs = require("fs");

var main = function(fileName,city){
	return new Promise((resolve,reject)=>{
		fs.open(fileName,"w",function(err,fd){
			var ws = fs.createWriteStream(fileName);

			// var ws = fs.createWriteStream('./data/index.json');
			const agent = superagent.agent();
			var pages=[];
			var list=[];
			for(var i=0;i<10;i++){
				pages.push(i+1);
			}
			async.mapLimit(pages,1,function(page,callback){
				getMapData(page,callback);
			},function(err,results){
				ws.write('[]]');
				ws.end();
				resolve()
			})
			function getMapData(pageNo,callback){
				var str='';
				if(pageNo==1){
					str='[';
				}
				agent.get('http://newhouse.hz.fang.com/house/s/list/')
				.query({
					PageNo:pageNo,
					zoom:15,
					city:city,
					a:'ajaxSearch'
				})
				.end((err,res)=>{
					console.log('pageNo:',pageNo)
					var data=JSON.parse(res.body.data)
					if(!data.hit){
						console.log(data.hit);
						callback([]);
					}else{
						str+=JSON.stringify(data.hit)+',';
						console.log('page length',data.hit.length)
						ws.write(str);
						list=list.concat(data.hit);
						callback(null,data.hit)
					}
				})
			}
		});
	})
}

module.exports = main;