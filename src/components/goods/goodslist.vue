<template>
	<div id="tmpl">
		<div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list">
		            <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body">{{item.title}}</div>
		                <div id="desc">
		                <p class="price">
		                	<span>￥{{item.sell_price}}</span>
		                	<s>￥{{item.market_price}}</s>
		                </p>
		                <div class="count">
		                	<h6>热卖中</h6>
		                	<h6>剩余{{item.stock_quantity}}件</h6>
		                </div>
		                </div>
					</router-link>
		        </li>
		    </ul>    
		</div>
		
	</div>
</template>
<script>
import common from "../../kits/common.js";
import {Toast} from "mint-ui";

	export default{
		data(){
			return {
				pageIndex:1,
				list:[]
			}
		},
		created(){
			this.getgoods(this.pageIndex);
		},
		methods:{
			getgoods(pageIndex){
				pageIndex = pageIndex || 1;
				var url = common.apidomain+"/api/getgoods?pageindex="+pageIndex;
				this.$http.get(url).then(function(res){
					if (res.body.status != 0) {
						Toast(res.body.message);
						return;
					}
					this.list = res.body.message;
				});
			}
		}
	}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell {
	box-shadow: 0 0 4px #000;
	margin-left: 4px;
	padding: 4px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
	margin: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
	color: #5294FF;
}
#desc {
	height: 60px;
    background-color: rgba(0,0,0,0.1);
    margin: 10px 0 5px;
    text-align: left;
    font-size: 14px;
}
.price span {
	color: red;
	margin-right: 15px;
}
.price {
	margin-bottom: 15px;
}
.count {
	padding: 5px;
}
.count h6:first-child {
	float: left;
}
.count h6:last-child {
	float: right;
}
</style>
