<template>
    <div class="wrap">
    </div>
</template>
<script>
import request from '@/utils/request';
import {mapState,mapActions} from 'vuex';
export default {
    computed:{
        ...mapState('user',['userinfo'])
    },
    created(){
        this.getUserInfo();
        // this.$store.dispatch('user/getUserInfo')
    },
    methods:{
        ...mapActions('user',['getUserInfo'])
    }
}
</script>

