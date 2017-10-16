export default class Search{
	constructor(map){
		this.search=document.getElementById('search');
		this.btn=document.getElementById('search-btn');
		this.local = new BMap.LocalSearch(map, {
			renderOptions:{map: map},
			onSearchComplete:(res)=>{
				console.log(res)
			}
		});
		this.btn.addEventListener('click',()=>{
			this.q=this.search.value;
			this.local.search(this.q);
		})
	}

}
