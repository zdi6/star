import head from '@/components/header/head'
import alertConfig from '@/components/alertMessage'
class Dialog {
    constructor(Vue){
        this.AlertClass = Vue.extend(alertConfig);
        this.AlertComponent = null;
    }
    init(){
        if(this.AlertComponent){
            return this.AlertComponent;
        }else{
            this.AlertComponent = new this.AlertClass();
            this.AlertComponent.$mount();
            document.body.appendChild(this.AlertComponent.$el);
            return this.AlertComponent;
        }
    }
    show(){
        this.init().open = true;
    }
}
export default {
    install(Vue){
        // alert('install');
        Vue.component('el-header',head);
        const dialog = new Dialog(Vue);
        Vue.prototype.$alert = (text)=>{
            //组件实例
            dialog.init().alertOpen(text);
            // dialog.show();
        }
    }
}