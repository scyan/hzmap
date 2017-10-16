var superagent = require('superagent');
var fs=require('fs');
var src;
fs.readFile('./source/data/index.json', function (err, data) {
    if (err) {
    	console.log(err)
        // Deal with error.
    } else {
    	src=data.toString('utf-8');
       	src=JSON.parse(src);
    }
});

function getPoint(address){
	agent.get('http://api.map.baidu.com/geocoder/v2/')
	.query({

		address:address,

	})
}
http://api.map.baidu.com/geocoder/v2/?address=北京市海淀区上地十街10号&output=json&ak=E4805d16520de693a3fe707cdc962045&callback=showLocation