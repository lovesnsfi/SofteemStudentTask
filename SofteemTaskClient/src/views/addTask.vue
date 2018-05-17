<template>
  <div>
      <div>
          <input type="file" @change="fileUpload($event)" style="display:none" ref="taskFile">
      </div>
      <el-row>
          <h2 class="pageTitle">提交作业</h2>
          <el-col :span="16" :offset="4">
              <el-form :model="formData" :rules="rules" label-width="80px" ref="addTaskForm">
                  <el-form-item label="学生姓名">
                      <el-input readonly placeholder="请输入姓名" v-model="formData.s_name"></el-input>
                  </el-form-item>
                  <el-form-item label="提交日期">
                      <el-input
                        v-model="formData.t_Date"
                        placeholder="选择日期" readonly>
                      </el-input>
                  </el-form-item>
                  <el-form-item label="作业文件" prop="t_path">
                      <el-col :span="5">
                          <el-button size="medium" type="primary" @click="$refs['taskFile'].click()">
                            选择文件<i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                      </el-col>
                      <el-col :span="18">
                          <span v-if="formData.t_path">文件路径：{{formData.t_path}}</span>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="作业内容" prop="t_content">
                      <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请填写作业内容"
                            v-model="formData.t_content">
                            </el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="submitTask('addTaskForm')">提交作业</el-button>
                      <el-button type="info" @click="$router.push({name:'taskList'})">返回列表</el-button>
                  </el-form-item>
              </el-form>
          </el-col>
        
      </el-row>
      
  </div>
</template>

<script>
export default {
    name:"addTask",
    data(){
        return {
            formData:{
                s_name:sessionStorage.getItem('s_name'),
                t_Date:(new Date()).toLocaleString(), 
                s_id:sessionStorage.getItem('s_id'), 
                t_content:"", 
                t_path:""
            },
            rules:{
                t_path:[{required:true,message:"请上传作业文件",trigger:"blur"}],
                t_content:[{required:true,message:"请填写作业内容",trigger:"blur"}]
            }
        }
    },
    methods:{
        fileUpload(event){
            const loading=this.$loading({
                lock:true,
                text:"正在上传"
            });
            var file=event.currentTarget.files[0];
            var formData=new FormData();
            formData.append("taskFile",file);
            this.$http.post("/TaskInfo/uploadTaskFiles",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res=>{
                loading.close();
                if(res.data.status=="success"){
                    this.formData.t_path=res.data.data;
                    this.$message("文件上传成功");
                }
                else{
                    this.$alert(res.data.msg,"上传失败");
                }
            }).catch(err=>{
                loading.close();
                this.$message("上传错误");
            })
        },
        submitTask(formName){
            this.$refs[formName].validate(valid=>{
                if(valid){
                    const loading=this.$loading({
                        lock:true,
                        text:"正在提交作业",
                        background:'rgba(0,0,0,0.7)'
                    });
                    this.$http.post("/TaskInfo/addTaskInfo",this.formData).then(res=>{
                        loading.close();
                        if(res.data.status=="success"){
                            this.$alert("提交成功","提示",{
                                confirmButtonText:"确定",
                                callback:action=>{
                                    this.$router.push({name:"taskList"});
                                }
                            });
                        }
                        else{
                            this.$alert(data.msg,"提示");
                        }
                    }).catch(err=>{
                        this.$alert("服务器错误","提示");
                    });
                }
                else{
                    this.$alert("请将信息填写完整","提示");
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .pageTitle
    {
        text-align: center;
    }
</style>
