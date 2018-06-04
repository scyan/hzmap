const spider = require('./spider_test') //爬虫获取原始数据，分页[[],[],[]]
const trans = require('./translate') //百度坐标转换为腾讯坐标 [{},{},{}]
let getFileName = function(city){
	const today= new Date();
	return {
		source: __dirname+'/data/'+today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate()+'_'+city+'_baidu'+'.json',
		target: __dirname+'/data/'+today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate()+'_'+city+'_tx'+'.json'
	}
}
const city='sh';
const fileNames = getFileName(city);
// spider(fileNames.source,city).then((res)=>{
// 	trans(fileNames.source,fileNames.target);	
// });
trans(fileNames.source,fileNames.target);	