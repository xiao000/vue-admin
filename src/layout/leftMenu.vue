<template>
  <div class="nav">
    <div class="logo">
      <i v-show="!this.$store.state.user.isCollapse">AMY ADMIN</i>
    </div>
    <el-menu
      :default-active="$route.path"
      router
      :unique-opened="true"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#A5ACB3"
      active-text-color="#fff"
      @select="handleSelect"
      :collapse="this.$store.state.user.isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-odometer"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/userManagement/airdrop">空投用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">财务管理</span>
        </template>
        <el-menu-item index="/financialManagement/AMYDetail">AMY转账流水</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span slot="title">官网管理</span>
        </template>

        <el-menu-item index="/WebsiteManagement/emailManagement">订阅邮箱管理</el-menu-item>
        <el-menu-item index="/WebsiteManagement/companyManagement">企业服务申请管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
 
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  // inject: ['reload'],// 注入重载的功能（注入依赖）
  mounted() {
  },
  methods: {
    handleSelect(key, keyPath) {
      //  this.reload()  // 点击侧边栏重新载入页面
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  height: 100vh;
  background-color: #001529;
  .logo {
    height: 60px;
    width: 100%;
    background-color: #00284d;
    padding: 0 30px;
    text-align: center;
    box-sizing: border-box;
    i {
      color: #ffffff;
      line-height: 60px;
      font-weight: bold;
    }
  }
  .el-menu-item:hover {
    background: #e0edfa !important;
  }
  .el-submenu__title:hover {
    background: #e0edfa !important;
  }
  .el-menu-item.is-active {
    background: #1890ff !important;
  }
  .el-submenu__title.is-active {
    background: #1890ff !important;
  }
  .el-menu {
    border-right: none;
  }
}
</style>