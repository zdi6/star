import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/'
import elui from '@/plugins/elui'
import {DatePicker,TimePicker} from 'element-ui'
import './utils/flexble';
import './static/scss/common.scss';
import './static/font/iconfont.css';
Vue.use(elui); //install  el-header
Vue.use(DatePicker);  //el-date-picker
Vue.use(TimePicker);   //el-time-picker

new Vue({
    el:'#app',
    router,
    store,
    render:h=>h(App)  //渲染 返回vnode vnode会变成真实dom节点替换el
})


