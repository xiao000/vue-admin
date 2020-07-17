<template>
  <!-- 主页面 -->
  <div class="home rflex">
    <left-menu></left-menu>
    <div class="menu_right el-scrollbar" ref="menu_right">
      <head-nav></head-nav>
      <el-scrollbar style="height:100%">
        <div class="menu_content" ref="menu_content">
           <el-card class="box-card">
             <router-view></router-view>
           </el-card>
          <!--页面渲染入口-->
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import LeftMenu from "./leftMenu.vue";
import HeadNav from "./headNav.vue";
// import Bread from './bread.vue';
// import FooterNav from './footerNav.vue';
// import backTop from 'cps/backTop';
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(['sidebar']),
  },
  components: {
    LeftMenu,
    HeadNav
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>
<style scoped lang='less'>
.home {
  height: 100%;
  display: flex;
  overflow: hidden;
  .menu_right {
    flex: 1;
    background: #f6f7fc;
    height: 100vh;
    .menu_content {
      // position: relative;
      margin: 10px 10px 5rem 10px;
      width: 100%;
      background: #ffffff;
    }
    .el-scrollbar__wrap {
      overflow-x: auto;
    }
  }
}
</style>
