<template>
  <div v-if="loading">loading...</div>
  <div v-else class="wrap">
    <el-header :title="title"></el-header>
    <div class="top">
      <div class="det">
        <div class="left">
          <img :src="this.list.avatar" alt class="left_img">
        </div>
        <div class="middle">
          <ul>
            <li>
              <p>申请人姓名</p>
              <p>{{this.list.nickname}}</p>
            </li>
            <li>
              <p>直接主管</p>
              <p class="p">秦毅超</p>
            </li>
            <li>
              <p>申请单号</p>
              <p class="p">{{this.list.applicationNumber}}</p>
            </li>
            <li>
              <p>发起时间</p>
              <p class="p">{{new Date(this.list.startTime).toLocaleDateString()}}</p>
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
              <p>{{new Date(this.list.startTime).toLocaleDateString()}}</p>
            </li>
            <li>
              <p>{{titletext}}类型</p>
              <p>{{showType}}</p>
            </li>
            <li class="required">
              <p>{{titletext}}起始时间</p>
              <p>{{startTime}}</p>
            </li>
            <li class="required">
              <p>{{titletext}}截止时间</p>
              <p>{{endTime}}</p>
            </li>
            <li>
              <p>共计时数</p>
              <p>{{reducetime}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="cont2">
        <h2>{{titletext}}事由</h2>
        <p>{{this.list.describes}}</p>
      </div>
      <div class="cont3">
        <div class="cont3_top">
          <p class="r">附件</p>
          <p class="s">共{{list.annex.length}}件 ></p>
        </div>
        <div class="cont3_cont">
          <div v-for="(val,i) in list.annex" :key="i">
            <img :src="'http://localhost:3000'+val" alt>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li class="gray">
          <dl>
            <dd></dd>
            <dt>审批历史</dt>
          </dl>
        </li>
        <li class="li li_l back" @click="$router.back()">退回</li>
        <li class="li li_r success">同意</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { showType, showTime, reduceTime } from "@/utils/computedTime";
import api from "@/api";
export default {
  props: {
    type: String,
    id: String
  },
  data() {
    return {
      list: {},
      loading:true
    };
  },
  computed: {
    title() {
      return this.type === "overtime" ? "办公室加班申请表" : "办公室调休申请表";
    },
    showType() {
      //showType 访问器属性的get函数
      return showType(this.list.type, this.list.list_type);
    },
    startTime() {
      return showTime(this.list.startTime);
    },
    endTime() {
      return showTime(this.list.endTime);
    },
    reducetime() {
      return reduceTime(this.list.startTime, this.list.endTime);
    },
    titletext() {
      return this.type === "overtime" ? "加班" : "休假";
    }
  },
  created() {
    api[`${this.type}Detail`]({
      applicationNumber: this.id
    }).then(res => {
      this.list = res.data;
      this.loading = false;
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/static/scss/detail.scss'
</style>

