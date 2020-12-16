<template>
  <div id="list-warp">
      <el-form :inline="true" :model="formInline" >
        <!-- 类型 -->
        <el-form-item label="类型">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="体育竞技" value="shanghai"></el-option>
            <el-option label="八卦娱乐" value="beijing"></el-option>
            <el-option label="实时新闻" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期">
          <div class="block">
            <el-date-picker type="datetimerange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" align="right">
            </el-date-picker>
          </div>
        </el-form-item>
        <!-- 关键字 -->
        <el-form-item label="关键字">
          <el-select v-model="formInline.region" placeholder="ID" style="width:100px">
            <el-option label="娱乐" value="shanghai"></el-option>
            <el-option label="体育" value="beijing"></el-option>
            <el-option label="文化" value="beijing"></el-option>
          </el-select>
          <el-input placeholder="请输入内容" style="width:200px; margin-left:10px "></el-input>
        </el-form-item>
        <!-- 搜索 -->
        <el-form-item> 
          <!-- @click="onSubmit" -->
          <el-button type="danger">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table :data="tableData" border style="width: 100%"> -->
      <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 99%"  >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- 标题 -->
        <el-table-column prop="address" label="标题" show-overflow-tooltip align="center">
        </el-table-column>
        <!-- 类别 -->
        <el-table-column prop="type" label="类别" width="140" align="center"> 
        </el-table-column>
        <!-- 日期 -->
        <el-table-column label="日期" width="140" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <!-- 管理人 -->
        <el-table-column prop="name" label="管理人" width="120" align="center">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- @click="handleDelete(scope.$index, scope.row)" -->
            <el-button @click="open" size="mini" type="danger" >删除</el-button>
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 批量删除 -->
    <div style="margin-top: 20px"> 
      <!-- 删除 @click="toggleSelection()"-->
      <el-button>批量删除</el-button>
      <!-- 分页 -->
      <el-pagination class="pull-right fy" background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
export default {
  setup(){
    const tableData=reactive([{
          date: '2020-05-02',
          type: '国内信息',
          name: '管理员',
          address: '纽约市长白思豪宣布退出总统竞选 特朗普发布回应'
        }, {
          date: '2020-02-28',
          type: '国内信息',
          name: '组长',
          address: '上海市普陀区金沙江路 1517 路'
        }, {
          date: '2020-05-07',
          type: '国内信息',
          name: '成员1',
          address: '上海市普陀区金沙江路 1519 路'
        }, {
          date: '2020-07-17',
          type: '国内信息',
          name: '成员2',
          address: '上海市普陀区金沙江路 1516 路'
        }
    ])
    const formInline=reactive(
      {
          user: '',
          region: ''
        }
    )
    // methods: {
    //   handleEdit(index, row) {
    //     console.log(index, row);
    //   },
    //   handleDelete(index, row) {
    //     console.log(index, row);
    //   }
    // }
    // var Ctor =ref(Vue.extend(Main)) 
    // new Ctor().$mount('#app')
    return{
      tableData,
      formInline
    }
  },
  methods: {
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
}
</script>
<style lang="scss">
#list-warp{
  margin: 0 auto;
  padding:20px 50px 0 20px;
}
// form表单
.el-form{
  width: 100%;
  padding: 20px 10px 20px 20px ;
}
.el-range-editor.el-input__inner{
  border: 1px solid #cccccc;
}
//table表单
  //分页
  .fy{
    padding-right: 120px;
  }
</style>