//操作localStorage
//获取数据:var Str = localStorage.getItem(key);
//添加数据：localStorage.setItem(key,value)     value是字符串
//移除数据：localStorage.removeItem(key);

//1 定义常量key，将来操作的localStorage中的数据都以这个key作为标识
export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};

//2 实现数据的增加
//value格式： {goodsid:87,count:10}
export function setItem(value){
	//1 获取json格式
	var jsonString = localStorage.getItem(KEY);
	jsonString = jsonString || '[]';
	var arr = JSON.parse(jsonString);
	//2将value追加进arr
	arr.push(value);
	//3 将arr转换成json字符串保存起来
	localStorage.setItem(KEY,JSON.stringify(arr));
}

//3 获取数据
export function getItem(){
	var jsonString = localStorage.getItem(KEY);
	//将json格式字符串转换成js对象
	//jsonString：是一个标准的json格式
	jsonString = jsonString || '[]';
	return JSON.parse(jsonString);
}

//4 移除数据 goodsid：商品id
export function removeItem(goodsid){
	var arr = getItem();
	//查找arr中的goodsid和传入的参数goodsid一致的数据全部移除
	for (var i = arr.length-1; i >=0; i--) {
		if (arr[i].goodsid==goodsid) {
			arr.splice(i,1);
		}
	}
	localStorage.setItem(KEY,JSON.stringify(arr));
}
//5 整合数据
export function getgoodsObject(){
	var arr = getItem();

	var resObj = {};
	//将arr数组中，goodsid相同的多个对象合并成同一个对象
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (!resObj[item.goodsid]) {
			//如果没有当前商品数据，则添加数据
			resObj[item.goodsid]=item.count;
		}else{
			//已经有当前商品的数据了，则将count追加
			var count=resObj[item.goodsid];
			resObj[item.goodsid] = count + item.count;
		}
	}
	return resObj;
}

//更新 obj格式： {goodsid:87,type:'add'}
export function updateData(obj){
	var arr = getItem();

	var count = 1;
	if (obj.type=='add') {
		//加
		arr.push({goodsid:obj.goodsid,count:count});
	}else{
		//jian
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].goodsid==obj.goodsid) {
				if (arr[i].count>1) {
					arr[i].count=arr[i].count-1;
					break;
				}else{
					//删除此对象
					arr.splice(i,1);
					break;
				}
			}

		}
	}
	//将最新的arr保存
	localStorage.setItem(KEY,JSON.stringify(arr));
}