<template>
  <div>
      <h2 class=" pageTitle">我的作业</h2>
      <el-row :gutter="24">
          <el-col :span="20" :offset="2">
              <el-table :data="taskList" style="width:100%" stripe border v-loading="loading">
                <el-table-column prop="t_id" label="序号" width="80"></el-table-column>
                <el-table-column prop="s_id" label="学号" width="100"></el-table-column>
                <el-table-column prop="t_Date1" label="上传时间" width="180"></el-table-column>
                <el-table-column prop="t_path" label="作业文件"></el-table-column>
                <el-table-column prop="t_content" label="内容"></el-table-column>
              </el-table>
          </el-col>
          <el-col :span="20" :offset="2" style="margin-top:20px">
            <el-pagination style="float:right" layout="prev, pager, next" background :total="sumCount" :page-size="10" :current-page="pageIndex"></el-pagination>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import formatDataTime from '../utils/formatDateTime.js'
export default {
  name: "taskList",
  data() {
    return {
      taskList: [],
       s_id:sessionStorage.getItem("s_id"),
       pageIndex:1,
       loading:true,
       pageCount:0,
       sumCount:0
    };
  },
  created(){
      this.getListByPage();
  },
  methods: {
        getListByPage(){
            this.loading=true;
            this.$http.get(`/TaskInfo/findByS_id/${this.s_id}/${this.pageIndex}`).then(res=>{
                if(res.data.status=="success"){
                    console.log(res.data);
                    this.taskList=res.data.data.listData;
                    this.pageCount=res.data.data.pageCount;
                    this.sumCount=res.data.data.sumCount;
                    this.taskList.forEach(item=>{
                        item.t_Date1=formatDataTime(item.t_Date);
                    })
                    this.loading=false;
                }
                else{
                    this.loading=false;
                    this.$alert(res.data.msg,"请求失败");
                }
            }).catch(err=>{
                this.loading=false;
                this.$alert("服务器失败","请求失败");
            });
        }
  }
};
</script>
<style lang="scss" scoped>
.pageTitle {
  text-align: center;
}
</style>
