<template>
  <div>
      <el-menu mode="horizontal" @select="handleSelect" default-active="addTask">
          <li class="el-menu-item">
              <img src="../assets/logo.png" alt="" style="width:150px;height:auto">
          </li>
          <el-menu-item index="addTask">提交作业</el-menu-item>
          <el-menu-item index="taskList">我的作业</el-menu-item>
          <li class="el-menu-item" style="float:right" @click="logOut()">退出系统</li>
          <li class="el-menu-item" style="float:right">
              欢迎登陆：<span style="font-weight:bold;color:orange">{{s_name}}</span>
          </li>
      </el-menu>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:"AdminIndex",
    data(){
        return {
           s_name:sessionStorage.getItem("s_name")
        }
    },
    methods:{
        handleSelect(key,keyPath){
            console.log(keyPath);
            this.$router.push({name:key});
        },
        logOut(){
            sessionStorage.removeItem("s_id");
            sessionStorage.removeItem("s_name");
            this.$router.push({name:"Login"});
        }
    }
}
</script>

<style>

</style>
