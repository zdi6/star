import Vue from 'vue';
import VueRouter from 'vue-router';
//1 import方法和import指令有什么区别？
//import方法返回的是一个promise对象 什么时候调用什么时候去加载模块
//import指令是一个静态方法 加载页面会全部加载完成
//
Vue.use(VueRouter); //install Vue Vue.component('router-view') Vue.component('router-link')

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:"/",
            redirect:'/home'
        },
        {
            path:'/home',
            meta:{
                title:'加班/休假'
            },
            name:'home',
            component:()=>import('@/views/home/index')
        },
        {
            path:'/order',
            meta:{
                title:'筛选'
            },
            name:'order',
            component:()=>import('@/views/order/index')
        },
        {
            path:'/login',
            meta:{
                title:'登陆'
            },
            name:'login',
            component:()=>import('@/views/login/index')
        },
        {
            path:'/detail/:type/:id',
            name:'detail',
            meta:{
                title:'审请表'
            },
            props:true,
            component:()=>import('@/views/detail/index')
        },
        {
            path:'/commit/:type',
            name:'commit',
            meta:{
                title:'提交申请表'
            },
            props:true,
            component:()=>import('@/views/commit/index')
        }
    ]
})

router.beforeEach((to,from,next)=>{
    document.title = to.meta.title;
    next();
})
export default router;