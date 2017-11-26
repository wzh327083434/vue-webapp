<template>
	<div id="tmpl">
		<div class="row" v-for="(item,index) in datalist">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img class="img" :src="item.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li><carinputNumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getInputNumber"></carinputNumber></li>
						<li><a href="javascript:void(0)" @click="delrow(item.id,index)">删除</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="total">
			<div class="desc">
				<p>总计（不含运费）</p>
				<p>已勾选商品{{totalcount}}件,总价：￥{{totalAmount}}元</p>
			</div>
			<div class="payment">
				<mt-button type="danger" size="small">去结算</mt-button>
			</div>
		</div>
		<!-- {{value}} -->
	</div>
</template>

<script>
import {getgoodsObject,updateData,removeItem} from '../../kits/localSg.js';
import carinputNumber from '../subcom/carinputNumber.vue';
import common from '../../kits/common.js';
import {Toast} from 'mint-ui';

export default{
	computed:{//计算属性，一改全改
		totalcount(){
			/*var truearr = this.value.filter(function(item){
				return item;
			});
			return truearr.length;*/
			var count = 0;
			var amount = 0;
			for (var i = 0; i < this.value.length; i++) {
				if (this.value[i]==true) {
					count = count+1;
					amount+=this.datalist[i].sell_price*this.datalist[i].cou;			
				}
			}
			this.totalAmount = amount;
			return count;
		}
	},
	data(){
		return {
			totalAmount:0,
			value:[],
			datalist:[]
		}
	},
	components:{
		carinputNumber
	},
	created(){
		this.getdatalist();
	},
	methods:{
		delrow(goodsid,index){
			this.value.splice(index,1);
			this.datalist.splice(index,1);
			removeItem(goodsid);
		},
		getInputNumber(resObj){
			//console.log(resObj);
			//1 更新localStorage
			updateData(resObj);
			//2 更新this.datalist中当前数量
			
				for (var i = 0; i < this.datalist.length; i++) {
					if (this.datalist[i].id==resObj.goodsid) {
						if (resObj.type=='add') {
							this.datalist[i].cou=this.datalist[i].cou+1;
						}else{
							this.datalist[i].cou=this.datalist[i].cou-1;
						}
						break;
					}
				}
		},
		getdatalist(){
			var obj = getgoodsObject();
			
			var idstring = '';
			for (var key in obj) {
				idstring +=key+',';
			}
			idstring = idstring.substring(0,idstring.length-1);
			
			var url = common.apidomain+'/api/goods/getshopcarlist/'+idstring;
			this.$http.get(url).then(function(res){
				if (res.body.status!=0) {
					Toast(res.body.message);
					return;
					}
					res.body.message.forEach((item)=>{
						item.cou = obj[item.id];

						this.value.push(false);
					});
				this.datalist=res.body.message;
				 
				}
			);
		}
	}
}
</script>

<style scoped>
.row {
	border-bottom: 1px solid rgba(0,0,0,.3);
	height: 102px;
	display: flex;
	padding: 5px;
}
.switch {
	flex: 0 0 52px;
}
.img {
	margin-left: 5px;
	flex: 0 0 70px;
	height: 70px;
	width: 70px;
}
.inforight {
	flex: 1;
	margin-left: 5px;
}
.inforight h4 {
	color: #0094ff;
	font-size: 14px;
}
.inforight ul {
	padding-left: 0;
}
.inforight li {
	display: inline-block;
	list-style: none;
	margin-right: 5px;
}
.bottom li:first-child {
	color: red;
}
.total {
	height: 100px;
	background-color: rgba(0,0,0,.1);
	display: flex;
	padding: 5px;
}
.total .payment {
	padding-top: 30px;
}
.total .desc {
	flex: 3;
	padding-top: 15px;
}
</style>