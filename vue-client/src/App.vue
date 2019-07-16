<template>
    <div id="app">
        <keep-alive include="home">
            <router-view />
        </keep-alive>
    </div>
</template>
<script>

export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
@import './static/scss/_minix.scss';
html,body,#app{
    height: 100%;
}
</style>

