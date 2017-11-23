<template>
  <div id="tmpl">
	  <div id="desc">
		<!-- 图片详情 -->
		<div class="title">
			<h4>{{photoinfo.title}}</h4>
			<p>{{photoinfo.add_time|datefmt('YYYY-MM-DD HH:mm:ss')}} {{photoinfo.click}}次浏览</p>
			<p class="line"></p>
		</div>
		<!-- 缩略图 -->
			<div class="mui-content">
			  	<ul class="mui-table-view mui-grid-view mui-grid-9">
			        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in list">
			        <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, list)">
			        </li>
				</ul>
		    </div>
		    <p v-html="photoinfo.content"></p>
	  </div>
	  <!-- 评论组件 -->
	<comment :id="id"></comment>
  </div>
</template>
<script>

import comment from '../subcom/comment.vue';
import common from '../../kits/common.js';
import { Toast } from "mint-ui";

export default {
  components:{
  	comment
  },
  data(){
  	return {
  		id:0,
  		photoinfo:[],
  		list:[]
  	}
  },
  created(){
  	this.id=this.$route.params.id;
  	this.getinfo();
  	this.getthumimages();
  },
  methods:{
  	getinfo(){
  		var url = common.apidomain+'/api/getimageInfo/'+this.id;
  		this.$http.get(url).then(function(res){
  			if (res.body.status !=0) {
  				Toast(res.body.message);
  				return;
  			};
  			this.photoinfo=res.body.message[0];
  		});
  	},
  	getthumimages(){
  		var url = common.apidomain+'/api/getthumimages/'+this.id;
  		this.$http.get(url).then(function(res){
  			if (res.body.status !=0) {
  				Toast(res.body.message);
  				return;
  			};
  			//服务器返回的数据缺少w，h
  			res.body.message.forEach(function(item){
  				var img = document.createElement('img');
  				img.src = item.src;
  				item.h = img.height;
  				item.w = img.width;
  			});
  			this.list=res.body.message;
  		});
  	}
  }
}
</script>
<style scoped>
#desc {
	padding: 10px;
}
#desc .title h4 {
	color:#0094ff;
}
#desc .title p {
	color: rgba(0,0,0,.4);
	margin-top: 5px;
}
#desc .title .line {
	width: 100%;
	height: 1px;
	border-bottom: 1px solid rgba(0,0,0,.4);
}
/*九宫格*/
.mui-content,.mui-content ul {
	background-color: #fff;
	border-left: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	border-right: 0;
	border-bottom: 0;
}
.mui-grid-view.mui-grid-9 {
	border-top: 0;
}
.mui-content img {
	width: 100px;
	height: 100px;
}
</style>
