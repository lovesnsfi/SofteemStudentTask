<template>
  <div class="registerDiv">
      <h2 class="pageTitle">学生信息注册</h2>
      <hr>
      <el-row>
          <el-col :span="12" :offset="4" class="registerFormDiv">
            <el-form :model="formData" ref="registerForm" label-width="80px" :rules="rules">
                <el-form-item label="学生学号" prop="s_id"> 
                    <el-input placeholder="请输入学号" v-model="formData.s_id" ></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" prop="s_name">
                    <el-input placeholder="请输入学生姓名" v-model="formData.s_name" ></el-input>
                </el-form-item> 
                <el-form-item label="学生性别" prop="s_sex">
                    <el-radio v-model="formData.s_sex" label="男">男</el-radio>
                    <el-radio v-model="formData.s_sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="手机号码"  prop="s_tel">
                    <el-input placeholder="请输入手机号码" v-model="formData.s_tel"></el-input>
                </el-form-item>
                <el-form-item label="QQ号" prop="s_qq">
                    <el-input placeholder="请输入QQ号" v-model="formData.s_qq" ></el-input>
                </el-form-item>
                <el-form-item label="专业名称" prop="s_major">
                    <el-input placeholder="请输入专业名称" v-model="formData.s_major" ></el-input>
                </el-form-item>
                <el-form-item label="班级名称" prop="s_class">
                    <el-input placeholder="请输入班级名称" v-model="formData.s_class" ></el-input>
                </el-form-item>
                <el-form-item label="宿舍编号">
                    <el-input placeholder="请输入宿舍编号" v-model="formData.s_local"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">提交注册</el-button>
                    <el-button type="success" @click="$router.push({name:'Login'})">返回登陆</el-button>
                </el-form-item>
            </el-form>
        </el-col>
      </el-row>
      <el-row  >
          <el-col :span="12" :offset="3">
              <ul>
                  <li><b>说明：</b>
                      <ol>
                          <li>带*号项为必填项</li>
                            <li>手机号为注册以后登陆的密码</li>
                            <li>注册成功以后请返回登陆页面进行登陆</li>
                      </ol>
                  </li>
                  
              </ul>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import qs from 'qs';
export default {
    name:"Register",
    data(){
        return {
            formData:{
                s_id:"", 
                s_name:"", 
                s_sex:"", 
                s_qq:"",
                s_tel:"", 
                s_major:"", 
                s_class:"", 
                s_local:""
            },
            rules:{
                s_id:[
                    {required:true,message:"请输入学号",trigger: 'blur'}
                ], 
                s_name:[{required:true,message:"请输入姓名",trigger: 'blur'}], 
                s_sex:[
                    {required:true,message:"请选择性别",trigger: 'blur'}
                ], 
                s_qq:[{required:true,message:"请输入QQ号",trigger: 'blur'}],
                s_tel:[{required:true,message:"请输入手机号，手机号作为登陆密码",trigger: 'blur'}], 
                s_major:[{required:true,message:"请输入专业名称",trigger: 'blur'}], 
                s_class:[{required:true,message:"请输入班级名称",trigger: 'blur'}] 
            }
        }
    },
    methods:{
        submitForm(formName){
           this.$refs[formName].validate((valid) => {
                if (valid) {
                    //验证通过
                    const loading=this.$loading({
                        lock:true,
                        text:"正在提交数据",
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http.post("/StuInfo/Register",qs.stringify(this.formData)).then(res=>{
                        loading.close();
                        if(res.data.status=="success"){
                            this.$alert("注册成功","恭喜",{
                                confirmButtonText:"确定",
                                callback:action=>{
                                    this.$router.push({name:"Login"});
                                }
                            });

                        }
                    }).catch(err=>{
                        loading.close();
                        $this.$alert(res.data.msg,"注册失败");
                    });
                } else {
                    this.$message("请输入正确的信息");
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.registerDiv
{
    .pageTitle
    {
        text-align: center;
    }
}
</style>
