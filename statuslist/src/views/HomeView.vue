<!--  -->
<template>
  <div class="header">
    <div class="main">
      <div class="left">
        <img src="https://img.zcool.cn/community/0115635c8c79f5a801208f8bccbead.gif" alt="" />
      </div>
      <div class="right">
        <h2>学生后台管理登录</h2>
        <div class="sginup">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1500" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password>
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>
            <el-form-item style="text-align: left">
              <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" >立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logon } from '../api/login';
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        checked: true,
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(666);
          let data = {
            username: this.ruleForm.username,
            pwd: this.ruleForm.password
          }
          console.log(data);
          localStorage.setItem("data", JSON.stringify(data));
          logon(data)
            .then((res) => {
              console.log(res);
              data = res.data
              this.$router.replace({ path: '/main' })
              localStorage.setItem('token', res.data.token)
             this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
            })
            .catch((error) => {
              console.log(error);
               this.$message.error('登陆失败');
            });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() { },
  mounted() {

  },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.header {
  width: 100%;
  height: 100vh;
  background: url(https://img.zcool.cn/community/0142735d9eac93a801211d537a2fee.png?x-oss-process=image/format,webp) no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .main {
    width: 968px;
    height: 50vh;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;

    .left {
      width: 50%;
      height: 100%;
      background: red;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      width: 50%;
      height: 100%;
      background: #ffffff;

      h2 {
        text-align: center;
        padding: 70px 0;
      }

      .sginup {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 auto;

        .el-button {
          width: 300px;
          margin-top: -20px;
        }

        .el-checkbox {
          width: 50px !important;
          height: 50px !important;
        }
      }
    }
  }
}

::v-deep {
  input {
    width: 100%;
  }
}
</style>