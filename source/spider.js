// var http=require('http');
var superagent = require('superagent');
// var cheerio=require('cheerio');
// var Eventproxy = require('eventproxy');
var async = require("async");
var fs = require("fs");

var ws = fs.createWriteStream('./data/index.json');
const agent = superagent.agent();
var pages=[];
var list=[];
for(var i=0;i<10;i++){
	pages.push(i+1);
}
async.mapLimit(pages,2,function(page,callback){
	getMapData(page,callback);
},function(err,results){
	ws.write('[]]');
	ws.end();
})
function getMapData(pageNo,callback){
	var str='';
	if(pageNo==1){
		str='[';
	}
	agent.get('http://newhouse.hz.fang.com/house/s/list/')
	.query({
		// x1:120.124083,
		// y1:30.280891,
		// x2:120.21032,
		// y2:30.320179,

		x1:119.966222,
		y1:30.155728,
		x2:120.329568,
		y2:30.388282,
		PageNo:pageNo,
		zoom:15,
		city:'hz',
		a:'ajaxSearch'
	})
	.end((err,res)=>{
		console.log(pageNo)
		var data=JSON.parse(res.body.data)
		if(!data.hit){
			console.log(data.hit);
			callback([]);
		}else{
			console.log('has')
			str+=JSON.stringify(data.hit)+',';
			ws.write(str);
			list=list.concat(data.hit);
			callback(null,data.hit)
		}
	})
}
