// var colors=[
// 	'#FF0000',
// 	'#FF5500',
// 	'#FFAA00',
// 	'#FFFF00',
// 	'#BBFF55',
// 	'#77FFAA',
// 	'#33FFFF',
// 	'#4DB3E6',
// 	'#6666CC',
// 	'#333399',
// 	'#000066'
// ]
import * as Util from './util';
var colors=[
	{color:'#FF0000',price: 50000},
	{color:'#FF4D00',price: 40000},
	{color:'#FF8000',price: 35000},
	{color:'#FF9900',price: 30000},
	{color:'#DD9909',price: 25000},
	{color:'#BB9911',price: 20000},
	{color:'#99991A',price: 15000},
	{color:'#55992B',price: 10000},
	{color:'#339933',price: 0},
	// {color:'#995566',price:'40000'},
	// {color:'#802B80',price:'40000'},
	// {color:'#660099',price:'40000'}
]

function ComplexCustomOverlay(mp,point, house){
	this._mp=mp;
  this._point = point;
  this._house = house;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();

ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.className="label";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    // console.log(div.style.zIndex)
    div.style.backgroundColor=this._house.color;
    this._mp.getPanes().labelPane.appendChild(div);
    var house=this._house;
    this._div.onmouseover=()=>{
    	this._div.className+= ' hover';
    	var purpose=Util.isString(house.purpose)?house.purpose:house.purpose.join(',');
    	this._div.appendChild(document.createTextNode(house.title+","+house.price_num+' '+house.price_unit+" ,"+purpose))
    }
    this._div.onmouseout=()=>{
    	this._div.className=this._div.className.replace("hover","");
    	while (this._div.firstChild) {
		    this._div.removeChild(this._div.firstChild);
		}
    }
    return div;
}
ComplexCustomOverlay.prototype.draw = function(){
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x  + "px";
  this._div.style.top  = pixel.y  + "px";
}
export {ComplexCustomOverlay,colors}
// export default icons;
