<template>
	<div id="subtmpl">
		<div class="inleft div" @click="substrict">-</div>
		<div class="incenter div" v-text="count"></div>
		<div class="inright div" @click="add">+</div>
	</div>
</template>
<script>
	export default{
		props:['initCount','goodsid'],
		data(){
			return {
				count:1,//购买的商品数量
				resObj:{
					goodsid:0,
					type:'add'
				}
			}
		},
		created(){
			this.count = this.initCount;
		},
		methods:{
			substrict(){
				this.count--;
				if (this.count<1) {
					this.count=1; //确保最小值为1
				}
				this.sendmessage('substrict');
			},
			add(){
				this.count++;
				this.sendmessage('add');
			},
			sendmessage(type){
				this.resObj.goodsid=this.goodsid;
				this.resObj.type = type;
				this.$emit('cardataobj',this.resObj);
			}
		}
	}
</script>
<style scoped>
.div {
	width: 40px;
	height: 25px;
	line-height: 25px;
	border: 1px solid #000;
	display: inline-block;
	text-align: center;
	vertical-align: middle;
}
#subtmpl {
	display: inline-block;
}
</style>