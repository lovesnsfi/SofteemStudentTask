<template>
  <div class="loginDiv">
      <img src="../assets/admin-login-bg.0da2737.jpg" alt="" class="bgImg">
      <el-form class="loginForm" :model="formData" ref="loginForm" :rules="rules">
          <h2 style="text-align:center">softeem作业提交平台</h2>
          <el-form-item style="margin-top: 15px;" prop="s_id">
            <el-input placeholder="请输入用户名" v-model="formData.s_id" >
                <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-top: 15px;" prop="s_tel">
            <el-input placeholder="请输入密码" v-model="formData.s_tel" type="password">
                <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-top: 15px;">
              <el-row type="flex" justify="space-around">
                <el-button type="primary" @click="loginSystem('loginForm')">我要登陆</el-button>
                <el-button type="danger" @click="$router.push({name:'Register'})">我要注册</el-button>
            </el-row>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        s_id: "",
        s_tel: ""
      },
      rules:{
          s_id:[{required:true,message:"请输入学号",trigger:'blur'}],
          s_tel:[{required:true,message:"请输入手机号",trigger:'blur'}]
      }
    };
  },
  methods:{
      loginSystem(formName){
          this.$refs[formName].validate(valid=>{
              if(valid){
                  const loading=this.$loading({
                        lock:true,
                        text:"正在登陆",
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                  })
                  this.$http.post("/StuInfo/checkLogin",this.formData).then(res=>{
                      if(res.data.status=="success"){
                          sessionStorage.setItem("s_id",res.data.data.s_id);
                          sessionStorage.setItem("s_name",res.data.data.s_name);
                          this.$alert("登陆成功","提示",{
                              confirmButtonText:"确定",
                              callback:action=>{
                                  this.$router.push({name:"addTask"})
                              }
                          })
                      }
                      else{
                          this.$alert(res.data.msg,"提示");
                      }
                      loading.close();
                  }).catch(err=>{
                      loading.close();
                      this.$alert("服务器错误","提示");
                  });
              }
              else{
                  this.$alert("请输入学号与密码","提示");
              }
          });
      }
  }
};
</script>

<style lang="scss" scoped>
.loginDiv
{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    img.bgImg
    {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -1;
    }
    .loginForm
    {
        width:400px;
        height: 280px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -140px;
        box-sizing: border-box;
        padding: 20px;
        border:1px solid lightblue;
        >h2{
            border-bottom: 1px solid lightgray;
        }
    }
}
</style>
