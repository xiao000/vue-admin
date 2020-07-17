<template>
  <div class="headNav">
    <i ref="icom" class="el-icon-s-fold foldIcom" @click="getWidth"></i>
    <div class="loginOut">
      <el-dropdown>
        <span class="el-dropdown-link info"><el-avatar
          class="icom"
          size="medium"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
          admin
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="less" scoped>
.headNav {
  // display: inline-block;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  text-align: left;
  border: 1px solid #eee;
  background: #ffffff;
  .foldIcom {
    font-size: 35px;
    line-height: 60px;
  }
  .loginOut {
    width: 200px;
    margin: auto 0;
    .info{
      display: flex;
      flex-direction: row;
      align-items: center;
      .icom{
        margin-right: 10px;
      }
    }
  }
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    // ...mapGetters(["isCollapse"])
  },
  mounted() {},
  methods: {
    getWidth() {
      // console.log(this.$store.state.user.isCollapse);
      if (this.isCollapse == false) {
        this.isCollapse = true;
        this.$refs.icom.className = "el-icon-s-unfold foldIcom";
        this.$store.dispatch("setIsCollapse", this.isCollapse);
      } else {
        this.isCollapse = false;
        this.$refs.icom.className = "el-icon-s-fold foldIcom";
        this.$store.dispatch("setIsCollapse", this.isCollapse);
      }
    },
    logout() {
      var that = this;
      that.$store.dispatch("UserLogout").then(() => {
        that.$router.push({ path: "/login" });
      });
    }
  }
};
</script>