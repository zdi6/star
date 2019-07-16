<template>
  <div class="wrap">
    <el-header :title="type==='overtime' ? '办公室加班申请表' : '办公室调休申请表'"/>
    <div class="top">
      <div class="det">
        <div class="left">
          <img :src="userinfo.avatar" alt class="left_img">
        </div>
        <div class="middle">
          <ul>
            <li>
              <p>申请人姓名</p>
              <p>{{userinfo.nickname}}</p>
            </li>
            <li>
              <p>直接主管</p>
              <p class="p">秦毅超</p>
            </li>
          </ul>
        </div>
        <div class="right">
          <p>></p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <h2>申请信息</h2>
        <div class="cont">
          <ul>
            <li class="required">
              <p>{{titletext}}日期</p>
              <p>
                <el-date-picker 
                v-model="date"/>
              </p>
            </li>
            <li>
              <p>{{titletext}}类型</p>
              <p>
                <select v-model="usertype">
                  <option value="-1">默认</option>
                  <option  
                  v-for="val in this[type+'Type']"
                  :key="val.id"
                  :value="val.id">{{val.title}}</option>
                </select>
              </p>
            </li>
            <li class="required">
              <p>{{titletext}}起始时间</p>
              <p>
                <el-time-picker 
                v-model="startime"
                :selectableRange="[
                    '21:00:00 - 24:00:00',
                    '07:00:00 - 09:00:00'
                ]"/>
              </p>
            </li>
            <li class="required">
              <p>{{titletext}}截止时间</p>
              <p>
                <el-time-picker 
                v-model="endtime"
                @change="endtimeSelected"
                :selectableRange="[
                    '21:00:00 - 24:00:00',
                    '07:00:00 - 09:00:00'
                ]"/>
              </p>
            </li>
            <li>
              <p>共计时数</p>
              <p>{{num}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="cont2">
        <h2>{{titletext}}事由</h2>
        <p>
            <textarea v-model="describe"></textarea>
        </p>
      </div>
      <div class="cont3">
        <h2>
            <div class="addpic">
              <img src="../../static/images/addicon.png" style="vertical-align: middle"/>
              上传附件
              <input type="file" @change="submitFile" class="files"/>
            </div>
        </h2>
        <div>
          <ul class="images">
            <li 
              v-for="(val,i) in images"
              :key="i">
              <span @click="images.splice(i,1)">X</span> 
              <img :src="'http://localhost:3000'+val" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li @click="$router.back()" class="gray">取消</li>
        <li class="li li_r success" @click="submitTask">提交</li>
      </ul>
    </div>
    <!-- <alertMessage text="报错信息"/> -->
  </div>
</template>
<script>
import {mapActions,mapState} from 'vuex';
import api from '@/api'
export default {
  props: {
    type: String
  },
  data(){
    return {
      date:'',
      startime:'',
      endtime:'',
      num:'',
      images:[],
      describe:"",
      usertype:-1,
      guide:{
        type:['png','gif','svg','jpg','jpeg'],
        size:3  //mb
      },
      overtimeType:[
        {
          id:1,
          title:'双休日'
        },
        {
          id:2,
          title:'节假日'
        },
        {
          id:3,
          title:'工作日'
        }
      ],
      vacationType:[
        {
          id:1,
          title:'年假'
        },
        {
          id:2,
          title:'调休'
        }
      ]
    }
  },
  computed:{
      ...mapState('user',['userinfo']),
      titletext(){
          return this.type === 'overtime' ? '加班' : '休假'
      }
  },
  created(){
    this.getUserInfo();
    // console.log(this);
  },
  methods:{
      ...mapActions('user',['getUserInfo']) ,
      endtimeSelected(){
        let startime = new Date(this.startime)*1;
        let endtime = new Date(this.endtime)*1;
        let num =endtime-startime;
        if( num < 0){
          this.$alert('时间选择错误')
          return;
        }
        this.num = num;
      },
      submitFile(e){
        let userfile = e.target.files[0];  //图片对象
        let {name,size} = userfile;  //kb 1024
        //只能上传图片 3Mb
        // console.log(userfile);
        let filetype = name.match(/\.(\w+)$/i)[1];
        let error = '';
        if(!this.guide.type.includes(filetype)){
            error = `请上传${this.guide.type.join()}类型的文件`
        }
        if(this.guide.size*1024*1024 < size){
            error = `请上传小于${this.guide.size}MB大小的文件`
        }
        if(error){
          this.$alert(error);
          return;
        }
        // console.log(userfile); //向服务器提交文件
        const fromdata = new FormData();  //window 
        //功能：向ajax对象提交键值对格式的参数的 可以提交二进制流
        //file:图片
        fromdata.append('file',userfile);
        api.submitFile(fromdata).then(res=>{
          this.images.push(res.url);
        })
      },
      submitTask(){
        let options = {
          annex:this.images,
          describe:this.describe,
          endTime:this.endtime,
          startTime:this.startime,
          type:this.usertype
        };
        api['submit'+this.type](options).then(res=>{
           let {msg} = res;
           if(msg==='提交成功'){
             this.$router.back();
           }else{
             this.$alert(msg);
           }
        })
      }
  }
};
</script>
<style lang="scss" scoped>
@import '@/static/scss/detail.scss';
.addpic{
  position: relative;
}
.files{
  opacity: 0;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index: 10;
}
.images{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li{
    width: pxTorem(103px);
    height: pxTorem(103px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    position: relative;
    span{
      position: absolute;
      top:pxTorem(2px);
      right:pxTorem(2px);
      width: pxTorem(20px);
      height: pxTorem(20px);
      text-align: center;
      line-height: pxTorem(20px);
      border-radius: 50%;
      color:#fff;
      background: rgba(0,0,0,.6);
    }
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>


