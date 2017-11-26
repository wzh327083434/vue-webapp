<template>
	<div id="tmpl">
		<comment :id="id"></comment>
	</div>
</template>
<script>
import comment from "../subcom/comment.vue";
	export default{
		components:{
			comment
		},
		created(){
			this.id = this.$route.params.id;
		},
		data(){
			return {
				id:0
			}
		}
	}
</script>
<style scoped>
	
</style>