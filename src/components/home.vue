<template>
	<div id="tmpl">
		
		<!-- 轮播图 -->
			<mt-swipe :auto="2000">

			  <mt-swipe-item v-for="item in list"><img :src="item.img" /></mt-swipe-item>
			  
			</mt-swipe>
		<!-- end轮播图 -->

		<!-- 功能导航区 -->
		<div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="news/newslist">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photo/photolist">
		                    <span class="mui-icon mui-icon-email"></span>
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goods/goodslist">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/feedback">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/vide">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/callme">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul> 
		</div>

		<!-- end功能导航区 -->
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../kits/common.js';

	export default{
		data(){
			return {
				list:[]
			}
		},
		//data   methods对象创建完毕，发送请求
		created(){
			this.getimgs();
		},
		methods:{
			getimgs(){
				//实现轮播图中的数据请求
				var url=  common.apidomain + '/api/getlunbo';
				//get请求
				this.$http.get(url).then(function(response){
						var data = response.body;
						//错误处理
						if (data.status!=0) {
							Toast(data.message);
							return;
						}
						//数据正常赋值给list
						this.list = data.message;
				});
			}
		}
	}
</script>

<style scoped>
	/*轮播图样式*/
	.mint-swipe {
		height: 300px;
	}
	.mint-swipe-item img {
		width: 100%;
		height: 100%;
	}
	.mint-swipe-item {
		background-color: red;
		width: 100%;
		height: 300px;
	}
	/*导航*/
	.mui-content,.mui-content ul {
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border-right: 0;
		border-bottom: 0;
	}
	.mui-grid-view.mui-grid-9 {
		border-top: 0;
	}
	.mui-icon-home:before,
	.mui-icon-email:before,
	.mui-icon-chatbubble:before,
	.mui-icon-location:before,
	.mui-icon-search:before,
	.mui-icon-phone:before
	 {
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		-webkit-background-repeat: round;
		background-repeat: round;
	}
	.mui-icon-home:before {
		background-image: url(../../statics/imgs/1.png);
	}
	.mui-icon-email:before {
		background-image: url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before {
		background-image: url(../../statics/imgs/3.png);
	}
	.mui-icon-location:before {
		background-image: url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before {
		background-image: url(../../statics/imgs/5.png);
	}
	.mui-icon-phone:before {
		background-image: url(../../statics/imgs/6.png);
	}
	.mui-col-sm-3 {
		width: 33.33%;
	}
</style>