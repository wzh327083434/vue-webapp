<template>
	<div id="tmpl">
		<h4 v-text="info.title" class="title"></h4>
		<p class="line"></p>
		<p v-html="info.content"></p>
	</div>
</template>
<script>
import common from "../../kits/common.js";
import {Toast} from "mint-ui";
	export default{
		created(){
			this.id=this.$route.params.id;
			this.getdesc();
		},
		data(){
			return{
				id:0,
				info:{}
			}
		},
		methods:{
			getdesc(){
				var url = common.apidomain+"/api/goods/getdesc/"+this.id;
				this.$http.get(url).then(function(res){
					if (res.body.status != 0) {
						Toast(res.body.message);
						return;
					}
					this.info = res.body.message[0];
				});
			}
		}
	}
</script>
<style scoped>
#tmpl {
	padding: 5px;
}
.title {
	color: #0094ff;
}
.line {
	width: 100%;
	height: 2px;
	background-color: rgba(0,0,0,.3);
}
</style>