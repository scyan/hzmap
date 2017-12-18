var superagent = require('superagent');
const agent = superagent.agent();
var fs = require("fs");

var main = function(sourceFile,targetFile){

	fs.open(targetFile,"w",function(err,fd){
		var ws = fs.createWriteStream(targetFile);
		
		fs.readFile(sourceFile, {flag: 'r+', encoding: 'utf8'}, function (err, pages) {
		    if(err) {
		     console.error(err);
		     return;
		    }
		    var newArr=[]

		    pages=JSON.parse(pages);
		    pages.map((page,j)=>{
		    	page.map((estate,i)=>{
		    		newArr.push(estate);

		    	})
		    })
		    console.log(newArr.length)
		    trans(newArr,true);

		});
		var targetArr=[];
		var trans=function(sourceArr,first){
			
			if(first){
				ws.write('[');
			}
			targetArr.push(sourceArr.pop())
			//接口每次最多只能转三个坐标
			if(targetArr.length>=3||sourceArr.length==0){
				var locationArr=[];
				targetArr.map((estate,i)=>{
					locationArr.push(estate.y.slice(0,9)+','+estate.x.slice(0,10));
				})
				

				agent.get('http://apis.map.qq.com/ws/coord/v1/translate')
				.query({
					locations:locationArr.join(';'),
					type:3,
					key:'GN2BZ-Q4OKK-ZZ3JU-AFLDR-4MQNV-W5FI2'//一个key一天只能调用1W次
				})
				.end((err,res)=>{
					if(!res||!res.body||res.body.status!=0){
						return ;
					}
					var locations=res.body.locations;
					var str='';
					targetArr.map((estate,i)=>{
						estate.x=locations[i].lng;
						estate.y=locations[i].lat;
						console.log(estate.x,estate.y)
						str+=JSON.stringify(estate)+',';
					})
					targetArr=[]
					if(sourceArr.length==0){
						str=str.slice(0,str.length-1);
						ws.write(str);
						ws.write(']');
						ws.end();
					}else{

						ws.write(str);
						setTimeout(function(){
							trans(sourceArr);
						},500)
					}

				})
			}else{
				trans(sourceArr);
			}
		}
	});
}
module.exports = main;