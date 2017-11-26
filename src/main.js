//1.0导入vue核心包
import Vue from 'vue';

//2.0导入app.vue对象
import App from './App.vue';

//导入路由
import vueRouter from 'vue-router';
//使用路由
Vue.use(vueRouter);

//new路由，
//导入首页和购物车组件
import home from './components/home.vue';
import shopcar from './components/shopcar/shopcar.vue';
//商品列表，商品详情
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
//商品图文详情，评论
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
//新闻列表，新闻详情
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
//图片列表，图片详情
import photolist from "./components/photo/photolist.vue";
import photoinfo from "./components/photo/photoinfo.vue";

//导入mintUI 并使用
import 'mint-ui/lib/style.min.css';
import mintui from 'mint-ui';
Vue.use(mintui);

//导入MUI
import '../statics/mui/css/mui.css';
import { Header } from 'mint-ui';

// 导入全局样式
import '../statics/css/site.css';

//导入ajax
import vueResource from 'vue-resource';
Vue.use(vueResource);

//new路由
var router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		//设置当服务器启动时，默认进入/home
		{
			path:'/',
			redirect:'/home'
		},
		{
			path:'/home',
			component:home
		},
		{
			path:'/goods/goodslist',
			component:goodslist
		},
		{
			path:'/goods/goodsinfo/:id',
			component:goodsinfo
		},
		{
			path:'/goods/goodsdesc/:id',
			component:goodsdesc
		},
		{
			path:'/goods/goodscomment/:id',
			component:goodscomment
		},
		{
			path:'/shopcar',
			component:shopcar
		},
		{
			path:'/news/newslist',
			component:newslist
		},
		{
			path:'/news/newsinfo/:id',
			component:newsinfo
		},
		{
			path: '/photo/photolist',
			component: photolist
		},
		{
			path:'/photo/photoinfo/:id',
			component:photoinfo
		}

	]
})
//导入时间格式化js  moment
import moment from 'moment';

Vue.filter('datefmt',function(input,fmtstring){
	return moment(input).format(fmtstring);
});

//使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//3.0 new
new Vue({
	el:'#app',
	router,
	render:c=>c(App)   //es6的函数写法 =>  goes to
})

