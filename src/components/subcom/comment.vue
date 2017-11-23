<template>
	<div>
		<!-- 评论组件{{id}} -->
		<div id="postcomment">
			<h3>提交评论</h3>
			<p class="p"></p>
			<textarea placeholder="请输入您要评论的内容" v-model="postcontent" @keydown.enter="postcomment"></textarea>
			<mt-button type="primary"  size="large" @click="postcomment">发表</mt-button>
		</div>
		<!-- 评论列表 -->
		<div id="list">
			<h3>评论列表</h3>
			<p class="p"></p>
			<div v-for="(item,index) in list">
				<div class="title">
					 <span>第{{index+1}}楼</span>
					 <span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time|datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
				</div>
				<ul class="mui-table-view">
				 	<li class="mui-table-view-cell">{{item.content}}</li>
				</ul>

			</div>
		</div>
		<!-- 加载更多按钮 -->
			<mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
	</div>
</template>
<script>
// url
import common from '../../kits/common.js';
import {Toast} from 'mint-ui';
	export default{
		data(){
			return {
				pageindex:1,
				postcontent:'',
				list:[]
			}
		},
		props:['id'],
		created(){
			this.getpostlist();
		},
		methods:{
			getmore(){
				this.pageindex++;
				this.getpostlist();
			},
			getpostlist(){
				var url = common.apidomain+"/api/getcomments/"+this.id+"?pageindex="+this.pageindex;
				this.$http.get(url).then(function(res){
					if (res.body.status != 0) {
						Toast(res.body.message);
						return;
					};
					this.list=this.list.concat(res.body.message);
				});
			},
			// 评论数据的提交
			postcomment(){
				//判断用户是否填写了评论内容
				if (this.postcontent.trim().length <= 0) {
					Toast('您要评论的内容不能为空！');
					return;
				}
				// 提交的URL
				var url = common.apidomain+"/api/postcomment/"+this.id;
				// Ajax 的post请求提交数据
				// 用户填写的评论内容
				this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
						Toast(res.body.message);
					this.list = [{
						"user_name":"匿名用户",
						"add_time":new Date(),
						"content":this.postcontent
					}].concat(this.list);

				//清空文本框内容
					this.postcontent = '';
					});
			}
		}
	}
</script>
<style scoped>
/*1.0提交评论*/
#postcomment {
	padding: 5px;
}
.p {
	height: 1px;
	width: 100%;
	border-bottom: 1px solid #999;
}

/*评论列表*/
#list {
	padding: 5px;
}
.title {
	padding: 5px;
	color: #6d6d72;
	font-size: 15px;
	background-color: rgba(0,0,0,0.1);
}
</style>