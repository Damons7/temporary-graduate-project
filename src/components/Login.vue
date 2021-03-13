<!--
 * @Description: 登录组件
 * @Author: lihongzhi
 -->
<template>
  <div id="login">
    <el-dialog title="登录" width="300px" center :visible.sync="isLogin">
      <el-form
        :model="LoginUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入邮箱"
            v-model="LoginUser.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="LoginUser.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="Login"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    // 邮箱的校验方法
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空！"));
      }
      // 邮箱格式验证
      const userEmailRule = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (userEmailRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("邮箱格式有误！"));
      }
    };
    // 密码的校验方法
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码长度在6-16之间,允许字母数字和下划线
      const passwordRule = /\w{5,15}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("密码长度6-16之间,允许字母数字和下划线"));
      }
    };
    return {
      LoginUser: {
        email: "",
        password: "",
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      },
    },
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    Login() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate((valid) => {
        //如果通过校验开始登录
        if (valid) {
          this.$axios
            .post("/users/login", {
              email: this.LoginUser.email,
              password: this.LoginUser.password,
            })
            .then((res) => {
              // 0代表登录成功，其他的均为失败
              if (res.data.code === 0) {
                // 隐藏登录组件
                this.isLogin = false;
                // 登录信息存到本地
                let user = JSON.stringify(res.data.user);
                localStorage.setItem("user", user);
                // 登录信息存到vuex
                this.setUser(res.data.user);
                // 弹出通知框提示登录成功信息
                this.notifySucceed(res.data.msg);
              } else {
                // 清空输入框的校验状态
                this.$refs["ruleForm"].resetFields();
                // 弹出通知框提示登录失败信息
                this.notifyError(res.data.msg);
              }
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style>
</style>