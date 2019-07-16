<template>
    <div class="wrap">
        <section class="login">
            <p>
                <input type="text" placeholder="手机号码" v-model="phone_value"/>
            </p>
            <p>
                <input type="password" placeholder="密码" v-model="pwd_value"/>
            </p>
            <button class="loginbtn" @click="handleLogin">登陆</button>
        </section>
    </div>
</template>
<script>
import api from '@/api'
const phonereg = /^1[3579]\d{9}$/;
export default {
    data(){
        return {
            phone_value:'',
            pwd_value:''
        }
    },
    methods:{
        handleLogin(){
            if(phonereg.test(this.phone_value) && this.pwd_value.trim() !== ''){
                api.userlogin({
                    phone:this.phone_value,
                    password:this.pwd_value
                }).then(res=>{
                    window.localStorage.setItem('token',res.token);
                    this.$router.back();
                }).catch(error=>{
                    alert(error.response.data.message);
                })
            }else{
               alert('请输入正确的用户名或密码') 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/scss/_minix.scss';
@import '../../static/scss/common.scss';
.login{
    @include sizing;
    padding: pxTorem(20px);
    width: 100%;
    p{
        width: 100%;
        height: pxTorem(60px);
        border-bottom:1px solid #ccc;
        font-size:pxTorem(16px);
        line-height:  pxTorem(60px);
    }
    .loginbtn{
        width: 100%;
        height:  pxTorem(50px);
        margin-top:pxTorem(10px);
        line-height:  pxTorem(50px);
        text-align: center;
        background: none;
        border:none;
        outline: none;
        background: gray;
        color:#fff;
        font-size: pxTorem(14px);
        border-radius: pxTorem(25px);
    }
}
</style>

