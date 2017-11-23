<template>
	<div id="tmpl">
	<!-- 图片分类 -->
	<div id="cate">
		<ul v-bind="{style:'width:'+ulWidth+'px'}">
			<li @click="getimages(0)">全部</li>
			<li v-for="item in cates" @click="getimages(item.id)">{{item.title}}</li>
		</ul>
	</div>

	<!-- 图片列表 -->
	<div id="imglist">
		<ul>
			<li v-for="item in list">
				<router-link v-bind="{to:'/photo/photoinfo/'+item.id}" >
					<img v-lazy="item.img_url" >
					<div id="desc">
						<h5 v-text="item.title"></h5>
						<p v-text="item.zhaiyao"></p>
					</div>
				</router-link>	
	 		 </li>
		</ul>
	</div>
	</div>
</template>
<script>
import common from "../../kits/common.js";
import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return {
				ulWidth:320,
				cates:[],
				list:[]
			}
		},
		created(){
			this.getcates();
			var all = 0;  //获取所有数据
			this.getimages(all);
		},
		methods:{
			//获取分类数据
			getcates(){
				var url = common.apidomain+"/api/getimgcategory";
				this.$http.get(url).then(function name(res) {
					if (res.body.status != 0) {
						Toast(res.body.message);
						return;
					}	
					this.cates = res.body.message;
					//ul宽度
					var w = 62;
					var count = res.body.message.length+1;
					this.ulWidth=count*w;
				});
			},
			//获取图片数据
			getimages(cateid){
				cateid = cateid || 0;
				var url=common.apidomain+'/api/getimages/'+cateid;
				this.$http.get(url).then(function(res){
					if (res.body.status!=0) {
						Toast(res.body.message);
						return;
					};
					if (res.body.message.length==0) {
						MessageBox('此分类下暂无数据！');
					}
					this.list = res.body.message;
				});
			}
		}
	}
</script>
<style scoped>
/* 图片分类 */
#cate {
	width: 375px;
	max-width: 320px;
	overflow-x: auto;
}
#cate ul {
	margin: 0;
	width: 1000px;
	padding-left: 10px;
}
#cate li{
	list-style: none;
	display: inline-block;
	color: #0094ff;
	font-size: 14px;
	margin-left: 6px;
}
#cate li:hover {
	cursor: pointer;
}
/* 图片列表样式 */
#imglist {

}
#imglist ul {
	padding-left: 0;
}
#imglist li {
	list-style: none;
	position: relative;
}
#imglist img {
	width: 100%;
	height: 300px;
}
#desc {
	width: 100%;
	background-color: rgba(0,0,0,.2); 
	position: absolute;
	bottom: 2px;
	left: 0;
}
#desc h5 {
	color: #fff;
	font-weight: 700;
}
#desc p {
	color: #fff;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
