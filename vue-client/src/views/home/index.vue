<template>
  <div class="wrap home">
    <el-header>
       <p class="btn_top">
        <i class="iconfont icon-daiban"></i>
        <i class="iconfont icon-fangdajing"></i>
      </p>
    </el-header>
    <TableMenu @change="menuChange"/>
    <TableType :type="tableOptions.type" @change="typeChange"/>
    <TodoList :todolist="todolist"/>
    <div class="add_list" @click="show=true" >
      <i class="iconfont icon-jia"></i>
      <p>发起任务</p>
    </div>
    <PopUp :show="show" @close="show = false"/>
  </div>
</template>
<script>
import TableMenu from "./components/tableMenu";
import TableType from "./components/tableType";
import TodoList from "./components/todolist";
import PopUp from "@/components/popUp";
import api from '@/api';
import {mapActions} from 'vuex';
export default {
    name:'home',
    data(){  //访问器属性 可以监听属性变化 vnode比较最小化差异实现页面更新
        return {
            tableOptions:{
                status:0,
                type:'overtime',
                create_at:0,
                pageSize:10,
                page:1
            },
            todolist:[],
            show:false
        }
    },
    components: {
        TableMenu,
        TableType,
        TodoList,
        PopUp
    },
    created(){
      console.log('home');
        this.getTaskList();
        this.getUserInfo();
    },
    methods:{
       ...mapActions('user',['getUserInfo']),
        menuChange(index){
            this.tableOptions.status = index;
            this.tableOptions.type = 'overtime';
            this.getTaskList();
        },
        getTaskList(){
            api.taskList({
                ...this.tableOptions
            }).then(res=>{
                this.todolist = res.data;
            })
        },
        typeChange(type){
            this.tableOptions.type = type;
            this.getTaskList();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/static/scss/common.scss";
.box{
  width: 100px;
  height: 100px;
  background: red;
}
.v-enter,.v-leave-to{
    .add_list_type{
      transform: translateY(100%);
    }
}
.v-enter-active,.v-leave-active{
    .add_list_type{
       transition: transform 1s ;
    }
}
.v-enter-to,.v-leave{
    .add_list_type{
      transform: translateY(0);
    }
}
.home {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  color: #0b0b0a;
  .add_list {
    width: pxTorem(150px);
    height: pxTorem(50px);
    background: #086644;
    position: fixed;
    bottom: 3%;
    right: 5%;
    border-radius: pxTorem(30px);
    overflow: hidden;
    display: flex;
    padding: pxTorem(13px) pxTorem(25px);
    box-sizing: border-box;
    font-size: pxTorem(18px);
    // font-weight:900;
    color: #fff;
    .iconfont {
      font-size: pxTorem(23px);
      margin-right: pxTorem(3px);
      line-height: pxTorem(23px);
    }
  }
}
</style>

