<!-- 以后项目的根组件 -->
<template>
    <div id="tmpl">
    <!-- 占位符 -->
    <router-view></router-view>
    <!-- 底部tab -->
        <mt-header fixed title="Vue商城系统"></mt-header>
        <div id="back" @click="goprev" v-show="isshow">返回</div>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/vip">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-contact"><span id="badge" class="mui-badge">0</span></span>

                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>

    </div>
</template>

<script>
import {vm,COUNTSTR} from "./kits/vm.js";
vm.$on(COUNTSTR,function(count){
    var badge = document.getElementById('badge');
    badge.innerText = parseInt(badge.innerText)+count;
});
export default{
    data(){
        return {
            isshow:false
        }
    },
    watch:{
        '$route':function(newroute,oldroute){
            if (newroute.path.toLowerCase()=='/home') {
                this.isshow = false;
            }else{
                this.isshow = true;
            }
        }
    },
    methods:{
        goprev(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
    #back {
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 101;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
</style>