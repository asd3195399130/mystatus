<!--  -->
<template>
  <div class="">
    <div class="header">
      <div class="header_miner">
        <!-- 添加按钮 -->
        <el-button type="primary" @click="addlist">添加</el-button>
        <div>
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" @keydown.enter="showInfo" @input="showInfo">
            <el-button slot="append" icon="el-icon-search" @click="showInfo"></el-button>
          </el-input>
        </div>
        <el-select v-model="select" filterable clearable placeholder="请选择" @change="handselect">
          <el-option v-for="item in options" :key="item.webid" :label="item.webname" :value="item.webid">
          </el-option>
        </el-select>
      </div>
      <div class="header_center">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="name" label="姓名" width="190" align="center">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="190" align="center">
            <template slot-scope="scope">
              {{ scope.row.sex === 0 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="190" align="center">
          </el-table-column>
          <el-table-column prop="iphone" label="手机号" width="210" align="center">
          </el-table-column>
          <el-table-column prop="idcards" label="身份证号" width="240" align="center">
          </el-table-column>
          <el-table-column prop="xueli" label="学历" width="190" align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="240" align="center">
          </el-table-column>
          <el-table-column prop="mark" label="描述" width="240" align="center">
          </el-table-column>
          <el-table-column label="操作" width="300" align="center"    fixed="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="delClick(scope.row.id)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageSize"
          :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="pagelimit" layout="total, sizes, prev, pager, next, jumper"
          background :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="添加列表" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="名字" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="custom-input" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off" class="custom-input" placeholder="用输入年纪"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="0">男</el-radio>
          <el-radio v-model="form.sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="iphone">
          <el-input v-model="form.iphone" autocomplete="off" class="custom-input" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idcards">
          <el-input v-model="form.idcards" autocomplete="off" class="custom-input" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="老师" :label-width="formLabelWidth" prop="teacher">
          <el-select v-model="form.webid" clearable placeholder="请选择老师" style="width: 400px;">
            <el-option v-for="item in options" :key="item.webid" :label="item.webname" :value="item.webid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="form.xueli" clearable placeholder="请选择老师" style="width: 400px;">
            <el-option v-for="item in xueli" :key="item.id" :label="item.label" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" class="custom-input" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入描述详情信息" v-model="form.mark"
            style="width: 400px;">
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('form')" :plain="true">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form>
    </el-dialog>
    <!-- 详情信息 -->
    <el-dialog title="信息" :visible.sync="dialogTableVisible" height="96px">
      <h1>个人信息</h1>
      <el-table :data="gridData" border>
        <el-table-column property="name" label="姓名" width="150" align="center"></el-table-column>
        <el-table-column property="age" label="年龄" width="150" align="center"></el-table-column>
        <el-table-column property="sex" label="性别" width="150" align="center"></el-table-column>
        <el-table-column property="iphone" label="手机号" width="150" align="center"></el-table-column>
        <el-table-column property="idcards" label="身份证号" width="200" align="center"></el-table-column>
        <el-table-column property="address" label="地址" align="center"></el-table-column>
        <el-table-column property="mark" label="详情" align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="添加列表" :visible.sync="FormVisible" width="30%">
        <el-form :model="formdata" :rules="rules" ref="formdata">
          <el-form-item label="名字" :label-width="formLabelWidth" prop="name">
            <el-input v-model="formdata.name" autocomplete="off" class="custom-input" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="formdata.age" autocomplete="off" class="custom-input" placeholder="用输入年纪"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio v-model="formdata.sex" :label="0">男</el-radio>
            <el-radio v-model="formdata.sex" :label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="iphone">
            <el-input v-model="formdata.iphone" autocomplete="off" class="custom-input" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="idcards">
            <el-input v-model="formdata.idcards" autocomplete="off" class="custom-input" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="老师" :label-width="formLabelWidth" prop="teacher">
            <el-select v-model="formdata.webid" clearable placeholder="请选择老师" style="width: 400px;">
              <el-option v-for="item in options" :key="item.webid" :label="item.webname" :value="item.webid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth">
            <el-select v-model="formdata.xueli" clearable placeholder="请选择老师" style="width: 400px;">
              <el-option v-for="item in xueli" :key="item.id" :label="item.label" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="formdata.address" autocomplete="off" class="custom-input" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入描述详情信息" v-model="formdata.mark"
              style="width: 400px;">
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="submitform('formdata')" :plain="true">立即修改</el-button>
          <el-button @click="resetdata">取消修改</el-button>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { getreading, getdelete, getteacher, getaddlist, getdetail, getedit, getsearch} from "../../api/addlist"
export default {
  data() {
    return {
      input: '',
      input3: "",
      options: [],
      xueli: [
        "小学",
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士",
        "研究生"
      ],
      select:"",
      pageSize: 1,
      total: null,
      pagelimit: 5,
      tableData: [],
      form: {
        name: '',
        age: "",
        sex: "",
        idcards: "",
        iphone: "",     
        xueli: "",
        mark: "",
        address: "",
        webid: ""
      },
      formdata:{
        id: "",
        name: '',
        age: "",
        sex:0,
        idcards: "",
        iphone: "",
        xueli: "",
        mark: "",
        address: "",
        webid: ""
      },
      FormVisible:false,
      formLabelWidth: '130px',
      dialogFormVisible: false,
      dialogTableVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: "名字只能输入2到16个中文字符", trigger: 'blur' }
        ],
        age: [
          { required: true, message: "请输入年纪", trigger: "blur" },
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: 'blur' }
        ],
        iphone: [
          { required: true, message: "请输入手机号", trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        idcards: [
          { required: true, message: "请输入身份证号", trigger: 'blur' },
          {
            pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/, message: "请输入有效的身份证号", trigger: 'blur'
          }
        ]
      },
      gridData: []
    };

  },
  methods: {
    // 过滤
    handselect(){
      let data ={
        token:localStorage.getItem("token"),
        page:this.pageSize,
        webid: this.select,
       pagelimit: this.pagelimit
      }
      console.log(data);
      this.reading(data)
    },
    // 搜索
    showInfo() {

    let  obj = {
       name: this.input3
     }
     getsearch(obj).then(res=>{
      this.tableData = res.data.data
      this.total = 1
     })
    },
    // 修改
    editClick(row){
       this.formdata.id =row.id;
       this.formdata.sex = row.sex
       console.log(this.formdata.sex);
       this.formdata.name = row.name
       this.formdata.address= row.address
       this.formdata.xueli = row.xueli
       this.formdata.mark = row.mark
       this.formdata.iphone = row.iphone
       this.formdata.idcards = row.idcards
       this.formdata.age = row.age
       this.formdata.webid = row.webid
      this.FormVisible = true  
    },
    submitform(formName){
         this.$refs[formName].validate((valid) => {
        if (valid) {
        getedit(this.formdata).then(() => {
            this.reading()
          })
       this.FormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetdata(){
       this.FormVisible = false
    },
    // 查看详情信息
    handleClick(id) {
      console.log(id);
      this.dialogTableVisible = !this.dialogTableVisible;
      getdetail(id).then(res => {
        console.log(res.data);
        this.gridData = [res.data]
        
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagelimit = val; // 更新每页显示的条数
      this.pageSize = 1; // 重置当前页为第一页
      this.reading(); // 重新读取数据
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageSize = val; // 更新当前页
      this.reading(); // 重新读取数据
    },
    // 添加
    addlist() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            xueli: this.form.xueli,
            name: this.form.name,
            age: this.form.age,
            idcards: this.form.idcards,
            webid: this.form.webid,
            sex: this.form.sex,
            iphone: this.form.iphone,
            mark: this.form.mark,
            address: this.form.address,
          }
          getaddlist(data).then(res => {
            console.log(res);
            this.reading()
          })
          this.form={
              xueli: '',
            name: '',
            age: '',
            idcards: '',
            webid: '',
            sex: '',
            iphone: '',
            mark: '',
            address: ''
          }
          this.dialogFormVisible = false,
            this.$message({
              message: '恭喜你，添加成功',
              type: 'success'
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除
    delClick(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'

        });
        getdelete(id).then(res => {
          console.log(res);
          this.reading()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 渲染学生列表
    reading() {
      let data = {
        page: this.pageSize,
        pagelimit: this.pagelimit,
        token:localStorage.getItem("token"),
        webid:this.select
      }
      getreading(data).then(res => {
        this.tableData = res.data.data
        this.total = res.data.pagecount
      })
    },
    // 录入老师
    teacher(data) {
      getteacher(data).then(res => {
        this.options = res.data
        this.reading()
      })
    },
  },

  // 渲染
  created() {
    this.reading();
    this.teacher()
  },
  mounted() { },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.header {
  width: 100%;
  height: 90vh;
  border: 1px solid red;
  border: none;
  background: #f9e9cd;
  overflow: hidden;

  .block {
    position: relative;
    z-index: 50;
    bottom: 25px;
  }

  ::v-deep {
    .el-pagination.is-background .el-pager li:not(.disabled) {
      background-color: #fff; // 进行修改未选中背景和字体
      // color: #fff;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: red; // 进行修改选中项背景和字体
      color: gold;
    }
  }

  .header_center {
    width: 94%;
    height: 80vh;
    background: #f9e9cd;
    position: relative;
    top: 65px;
    margin: auto;
  }

  .header_miner {
    text-align: left;
    display: flex;
    align-items: flex-end;
    padding: 20px;

    .el-select {
      margin-left: 60px;
    }

    .el-input {
      width: 400px;
      margin-left: 15px;
    }
  }
}

.custom-input {
  width: 400px;
}
</style>