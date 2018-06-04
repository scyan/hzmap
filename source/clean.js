const filter = [
'newCode',
'title',
'purpose',
'x',
'y',
'sailing',
'price_num',
'price_unit',
'minarea',
'maxarea'
]
module.exports = function (data){
	let newData = {};
	filter.map((key)=>{
		newData[key] = data[key];
	})
	return newData;
}