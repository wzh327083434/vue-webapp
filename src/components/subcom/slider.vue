<template>
	<div id="tmpl">
		<mt-swipe :auto="3000">
			<mt-swipe-item v-for="item in imgs">
			  	<img :src="item.img||item.src" />
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default{
		props:['imgs']
	}
</script>

<style scoped>
.mint-swipe {
	height: 300px;
}
.mint-swipe-item img {
	width: 100%;
}
.mint-swipe-item {
	background-color: red;
	width: 100%;
	height: 300px;
}
</style>