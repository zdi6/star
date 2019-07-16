<template>
    <div class="alertbox" v-show="open">
        {{text}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            open:false,
            timer:null,
            text:''
        }
    },
    methods:{
        alertOpen(text){
            this.text = text;
            this.open = true;
            this.timer = setTimeout(()=>{
                this.open = false;
            },2000)
        }
    },
    destroyed(){
        clearTimeout(this.timer);
    }
}
</script>

<style lang="scss" scoped>
@import '@/static/scss/common.scss';
.alertbox{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.6);
    color:#fff;
    padding: pxTorem(20px);
    font-size: pxTorem(14px);
    z-index: 100;
}
</style>

