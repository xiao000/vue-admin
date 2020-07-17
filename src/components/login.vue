<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="titleArea">
          <p class="title">AMY ADMIN</p>
        </div>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="loginForm"
          label-width="70px"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item prop="username" label="用户名">
                <el-input
                  @keyup.enter.native="submitForm('loginForm')"
                  class="area"
                  type="text"
                  placeholder="用户名"
                  v-model.trim="loginForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input
                  @keyup.enter.native="submitForm('loginForm')"
                  class="area"
                  type="password"
                  placeholder="密码"
                  v-model.trim="loginForm.password"
                  show-password
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { setToken } from "@/utils/auth";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //登录
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          let that = this;
          let userinfo = that.loginForm;
          this.$axios
            .post("/admin/login", {
              username: userinfo.username,
              password: userinfo.password
            })
            .then(function(response) {
              console.log(response);
              if (response.success == true) {
                that.$message({
                  type: "success",
                  message: "登录成功"
                });
                that.$store.dispatch("UserName", userinfo.username);
                setTimeout(()=>{ that.$router.push("/userManagement/airdrop");},500)
              } else {
                that.$message({
                  type: "error",
                  message: "登录失败，请重新登录"
                });
              }
            })
            .catch(function(error) {
              that.$message({
                type: "error",
                message: "接口请求失败"
              });
            });
        } else {
          that.$message({
            type: "error",
            message: "登录失败，请重新登录"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(219, 232, 245, 0.5),
    rgba(75, 192, 200, 0.5)
  );
  background-size: 100% 100%;
}

.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  box-shadow: 2px 2px 5px #333333;
}
.titleArea {
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
}
.logo {
  width: 40px;
  margin-right: 10px;
}
.title {
  color: #409eff;
}
.submit_btn {
  width: 100%;
}
</style>
