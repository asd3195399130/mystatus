<!--  -->
<template>
  <el-container>
    <el-aside width="250px">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#1a233c"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item >
            <template>
              <div class="head" style="flex: 1;">
                <img
                  src="https://img1.baidu.com/it/u=3521339024,2772585983&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  alt=""
                />
                <h2>学生后台管理</h2>
              </div>
            </template>
          </el-menu-item>
          <el-menu-item index="/main/students" style="margin-top: 35px;">
            <i class="el-icon-menu"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header style="height: 70px">
        <div class="header_top" @click="hide">
          <i class="el-icon-s-fold"></i>
        </div>
        <div class="header_footer">
          <img
            src="https://img2.baidu.com/it/u=2708810287,2935753791&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
          <el-button type="text" @click="handleClic">退出登录</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    // 隐藏和显示
    hide() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出登录
    handleClic() {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$router.replace({ path: '/' });
          localStorage.clear()
          this.$message({
            type: 'success',
            message: '退出成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
          });
        });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  .header_top {
    width: 60px;
    height: 60px;
    background: #00c6ff;
    font-size: 60px;
    line-height: 60px;
    margin: 5px 0;
    text-align: center;
    color: #ffffff;
    border-radius: 10px;
  }
  .header_footer {
    display: flex;
    align-items: center;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50px;
      margin-right: 25px;
    }
    .el-button {
      font-size: 20px;
      font-weight: 600;
    }
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 100%;
  overflow: hidden;
  .el-menu {
    height: 100vh;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  overflow: hidden;
}

body > .el-container {
  margin-bottom: 40px;
  overflow: hidden;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.head {
  width: 100%;
  height: 90px;
  background: #121a2c;
  text-align: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 999;
  img {
    width: 40px;
    height: 40px;
    background-size: cover;
    border-radius: 50px;
    margin-left: 16px;
  }
  h2 {
    color: #ffffff;
    text-align: center;
    margin-left: 20px;
    font-family: '华文楷体';
  }
}
</style>