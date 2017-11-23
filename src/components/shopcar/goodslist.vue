<template>
	<div id="tmpl">
		<div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6">
		            <a href="#">
		                <img class="mui-media-object" src="http://vue.studyit.io/upload/201504/20/thumb_201504200046589514.jpg">
		                <div class="mui-media-body">华为（HUAWEI）荣耀6Plus 16G双4G版</div></a>
		                <div class="desc">
		                	师大附近
		                </div>

		                </li>
		    </ul>    
		</div>

	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell {
	box-shadow: 0 0 1px 1px #000;
	margin-left: 4px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
	color: #5294FF;
}
.mui-table-view-cell .mui-media .mui-col-xs-6 .desc {
	height: 60px;
    background-color: rgba(0,0,0,0.1);
    margin-top: 10px;
    padding: 5px;
    text-align: left;
}
</style>
