<template>
	<div id="tmpl">
		<div class="goodsimg">
			<mt-swipe :auto="4000">
			  <mt-swipe-item>
				<img src="http://vue.studyit.io/upload/201504/20/thumb_201504200046589514.jpg">
			  </mt-swipe-item>
			  <mt-swipe-item>
				<img src="http://vue.studyit.io/upload/201504/20/thumb_201504200046589514.jpg">
			  </mt-swipe-item>
			  <mt-swipe-item>
				<img src="http://vue.studyit.io/upload/201504/20/thumb_201504200046589514.jpg">
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="buy">
			<h4>华为（HUAWEI）荣耀6Plus 16G双4G版</h4>
			<p></p>

		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped>
.goodsimg,.buy {
	border: 1px solid #000;
	border-radius: 5px;
	margin: 5px;
	background-color: #eee;
}
.goodsimg .mint-swipe {
	text-align: center;
	height: 300px;
	margin: 40px 0;
	background-color: #fff;
}
.buy {
	background-color: #fff;
}
.buy h4 {
	color: #26A2FF;
	margin: 5px;
	padding: 5px;
	border-bottom: 2px solid #ccc;
}
</style>