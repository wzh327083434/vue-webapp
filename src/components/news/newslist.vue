<template>
<div id="tmpl">
	<ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media" v-for="item in list">
			<router-link v-bind="{to:'/news/newsinfo/'+item.id}">
				<img class="mui-media-object mui-pull-left" :src="item.img_url">
				<div class="mui-media-body">
					{{item.title}}
					<p class='mui-ellipsis'>{{item.zhaiyao}}</p>
					<div class="ft">
						发表时间：{{item.add_time|datefmt('YYYY-MM-DD HH:mm:ss')}}　　 点击数：{{item.click}}
					</div>
				</div>
			</router-link>
		</li>
	</ul>

	
</div>
	
</template>
<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
	export default{
		data(){
			return {
				list:[] //新闻列表功能
			}
		},
		created(){
			this.getnewslist();
		},
		methods:{
			getnewslist(){
				var url = common.apidomain+"/api/getnewslist";
				this.$http.get(url).then(function(response){
					if (response.body.status != 0) {
						Toast(response.body.message);
						return;
					}
					this.list=response.body.message;
				});
			}
		}
	}
</script>
<style scoped>
	.mui-table-view .mui-media-object.mui-pull-left {
		max-width: 80px;
		height: 80px;
	}
	.ft {
		font-size: 14px;
		color: #0094ff;
		margin-top: 1.5em;
	}
</style>