<template>
    <ul class="content">
        <todoitem 
         v-for="val in todolist"
         :key="val.applicationNumber"
         :val="val"/>
    </ul>
</template>
<script>
import todoitem from './todoitem';
export default {
  props:{
    todolist:Array
  },
  components:{
    todoitem
  }
}
</script>

<style lang="scss" scoped>
@import "@/static/scss/common.scss";
.content {
    flex: 1;
    overflow-y: auto;
    }
</style>

