<template>
	<div id="tmpl">
		<div class="goodsimg">
			<!-- 轮播图组件 -->
			<slider :imgs="imgs"></slider>
		</div>
		<div class="buy">
			<h4>{{goodsinfo.title}}</h4>
			<div class="placeholder"></div>
			<p class="price">市场价：<s>￥{{goodsinfo.market_price}}</s>　 销售价：<span>￥{{goodsinfo.sell_price}}</span></p>
			<p class="count">购买数量：<inputnumber @abc="getcount"></inputnumber>
			<transition name='show'
			@before-enter='beforeEnter'
			@enter='enter'
			@after-enter='afterEnter'>
			<div class="ball" v-show="isshow"></div>
			</transition>
			</p>
			<p>
				<mt-button type="primary" size="small">立即购买</mt-button>
				<mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
			</p>
			<div class="placeholder"></div>
		</div>
		<div class="buy">
			<h6>商品参数</h6>
			<p>商品货号：{{goodsinfo.goods_no}}</p>
			<p>商品货号：{{goodsinfo.stock_quantity}}</p>
			<p>商品货号：{{goodsinfo.add_time|datefmt("YYYY-MM-DD")}}</p>
		</div>
		<div class="buy">
			<router-link v-bind="{to:'/goods/goodsdesc/'+id}">
				<mt-button size="large" type="primary">图文详情</mt-button>
			</router-link>
			<!-- 占位符 -->
			<div class="placeholder"></div>
			<router-link v-bind="{to:'/goods/goodscomment/'+id}">
			<mt-button size="large" type="danger">商品评论</mt-button>
			</router-link>
		</div>
	</div>
</template>
<script>
//引入轮播图组件
import slider from "../subcom/slider.vue";
import common from "../../kits/common.js";
import { Toast } from "mint-ui";

import inputnumber from "../subcom/inputNumber.vue";
import {vm,COUNTSTR} from "../../kits/vm.js";
import {setItem,valueObj} from "../../kits/localSg.js";

export default{
	components:{
		slider,
		inputnumber
	},
	data(){
		return{
			id:0,
			goodsinfo:{},
			imgs:[],
			inputcount:1,
			isshow:false
			}
		},
	created(){
		this.id = this.$route.params.id;
		this.getinfo();
		this.getimgs();
	},
	methods:{
		beforeEnter(el){
			el.style.transform="translate(0px,0px)";
		},
		enter(el,done){
			el.offsetWidth;
			el.style.transform="translate(70px,357px)";
			done();//结束动画
		},
		afterEnter(el){
			this.isshow = !this.isshow;
		},
		getimgs(){
			var url = common.apidomain+'/api/getthumimages/'+this.id;
			this.$http.get(url).then(function(res){
				if (res.body.status != 0) {
					Toast(res.body.message);
					return;
				}
				this.imgs = res.body.message;
			})
		},
		getinfo(){
			var url = common.apidomain+'/api/goods/getinfo/'+this.id;
			this.$http.get(url).then(function(res){
				if (res.body.status != 0) {
					Toast(res.body.message);
					return;
				}
				this.goodsinfo = res.body.message[0];
			});
		},
		getcount(count){
			this.inputcount = count;
		},
		toshopcar(){
			vm.$emit(COUNTSTR,this.inputcount);
			//将数据保存到localstorage
			valueObj.goodsid = this.id;
			valueObj.count = this.inputcount;
			setItem(valueObj);
			//
			this.isshow=!this.isshow;
		}
	}
}
</script>
<style scoped>
.goodsimg,.buy {
	border: 1px solid #000;
	border-radius: 5px;
	margin: 5px;
	background-color: #fff;
	padding: 5px;
}
.goodsimg {
	background-color: #eee;
	padding: 0;
}
.goodsimg .mint-swipe {
	text-align: center;
	height: 300px;
	margin: 40px 0;
	background-color: #fff;
}
.buy h4,h6 {
	color: #26A2FF;
	padding: 5px;
	border-bottom: 2px solid #ccc;
}
.buy .price span {
	color: red;
}
.placeholder {
	width: 100%;
	height: 15px;
}
.buy p {
	margin-left: 8px;
	font-size: 16px;}
.count {
	position: relative;
}
.ball {
	background-color: red;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	position: absolute;
	left: 152px;
	top: -9px;
	transition: all 0.4s ease;
	z-index: 100;
}
</style>