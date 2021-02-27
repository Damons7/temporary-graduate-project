<!--
 * @Description: 用户注册组件
 * @Author: 李鸿智
 -->
<template>
  <div id="register">
    <el-dialog title="注册" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入邮箱"
            v-model="RegisterUser.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="RegisterUser.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input
            prefix-icon="el-icon-view"
            type="password2"
            placeholder="请再次输入密码"
            v-model="RegisterUser.password2"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="Register"
            style="width: 100%"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Register",
  props: ["register"],
  data() {
    // email的校验方法
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
    // 确认密码的校验方法
    const validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入确认密码"));
      }
      // 校验是否以密码一致
      if (
        this.RegisterUser.password != "" &&
        value === this.RegisterUser.password
      ) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      isRegister: false, // 控制注册组件是否显示
      RegisterUser: {
        email: "",
        password: "",
        password2: "",
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: validatePassword2, trigger: "blur" }],
      },
    };
  },
  watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
    register: function (val) {
      if (val) {
        this.isRegister = val;
      }
    },
    // 监听this.isRegister变量的值，更新父组件register变量的值
    isRegister: function (val) {
      if (!val) {
        this.$refs["ruleForm"].resetFields();
        this.$emit("fromChild", val);
      }
    },
  },
  methods: {
    Register() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate((valid) => {
        //如果通过校验开始注册
        if (valid) {
          this.$axios
            .post("/users/register", {
              email: this.RegisterUser.email,
              password: this.RegisterUser.password,
              password2: this.RegisterUser.password2,
            })
            .then((res) => {
              // 0代表注册成功，其他的均为失败
              if (res.data.code === 0) {
                // 隐藏注册组件
                this.isRegister = false;
                // 弹出通知框提示注册成功信息
                this.notifySucceed(res.data.msg);
              } else {
                // 弹出通知框提示注册失败信息
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