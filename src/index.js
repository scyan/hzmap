import './index.scss';
import {colors,ComplexCustomOverlay} from './icon';
import data from '../source/data/2017_10_16.json';
import './legend';
import Filter from './filter';
import * as Util from './util';
import Search from './search';
var map = new BMap.Map("container");          // 创建地图实例  
var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
map.enableScrollWheelZoom();
map.centerAndZoom('杭州', 15);   
map.enableScrollWheelZoom(true);
new Search(map);
new Filter((res)=>{
	clear();
	data.map((list)=>{
		list.map((house)=>{
			if(!parseFloat(house.price_num)){
				return;
			}
			var flag=false;
			var purpose=Util.isString(house.purpose)?house.purpose:house.purpose.join(',');
			Object.keys(res).some((key)=>{
				if(res[key]&&purpose.indexOf(key)>-1){
					flag=true;
					return true
				}
			})
			if(flag){
				getColor(house)

				drawIcon(house.x,house.y,house)
			}
		})
	})
})

function getColor(house){
	var price=parseFloat(house.price_num);
	
	colors.some((color)=>{

		if(price>=color.price){
			house.color=color.color
			return true;
		}
	})
	if(house.price_unit.match(/套/g)){
		house.color=colors[0].color;
	}
	if(!house.color){
		house.color=colors[colors.length-1].color;
	}
	
}
function drawIcon(x,y,house){

	//创建icon
	var pt = new BMap.Point(x, y);
	var myCompOverlay = new ComplexCustomOverlay(map,pt,house);
	map.addOverlay(myCompOverlay);  

}

function clear(){
	map.clearOverlays();         
}


