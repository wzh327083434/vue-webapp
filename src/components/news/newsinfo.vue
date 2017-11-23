<template>
	<div id="tmpl">
	<!-- 文章详情 -->
	<!-- 文章标题 -->
	<div class="title">
		<h4>{{info.title}}</h4>
		<p>{{info.add_time|datefmt('YYYY-MM-DD HH:mm:ss')}} 　{{info.click}}次浏览</p>
	</div>
	<!-- 文章内容 -->
	<div  id="content" v-html="info.content"></div>

	<!-- 评论组件 -->
	<comment :id="id"></comment>
	<!-- 给comment绑定一个id属性，值是data中的id的值 -->
	</div>
</template>
<script>
// 导入
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
//评论
import comment from '../subcom/comment.vue';//评论是子组件

	export default{
		data(){
			return {
				id:0,
				info:{}
			}
		},
		created(){
			this.id = this.$route.params.id;
			this.getnewsinfo(this.id);
		},
		methods:{
			getnewsinfo(id){
				var url = common.apidomain+"/api/getnew/"+id;
				this.$http.get(url).then(function(response){
					if (response.body.status !=0) {
						Toast(response.body.message);
						return;
					}
					this.info = response.body.message[0];
				});
			}
		},
		components:{
			comment  //把评论.vue  拿过来用
		}
	}
</script>
<style scoped>
	.title h4 {
		color: #007aff;
	}
	.title p {
		color: #999;
	}
	.title,#content {
		padding: 5px;
	}
</style>