import {colors} from './icon';
initInfos();
function initInfos(){
	var container=document.querySelector('.legend')
	colors.map((color)=>{
		var div = document.createElement('div');
		div.innerHTML='<div class="info"><div class="icon" style="background:'+color.color+';"></div><span> >='+color.price+'</span></div>'
		container.appendChild(div);
	})
}