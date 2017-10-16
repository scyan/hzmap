
class Filter{
	constructor(callback){
		this.res={
			// zhuzhai:true,
			// shangzhu:true,
			// xiezilou:true,
			// shangpu:true
		};
		this.callback=callback;
		this.boxes=document.getElementsByName('purpose');
		this.initRes();
		this.callback(this.res);
		this.initListen();
	}
	initRes(){
		[...this.boxes].map((box)=>{
			this.res[box.value]=box.checked;
		})
	}
	initListen(){
		[...this.boxes].map((box)=>{
			box.onchange=()=>{
				this.initRes()
				this.callback(this.res)
			}
		})
	}

}
export default Filter;