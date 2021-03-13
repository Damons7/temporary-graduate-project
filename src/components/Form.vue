<!--
 * @Description: 
 * @Author: 李鸿智
 -->
<template>
  <el-form
    :model="addressForm"
    :rules="rules"
    status-icon
    ref="ruleForm"
    label-width="70px"
    size="mini"
  >
    <el-form-item label="收件人" prop="name">
      <el-input v-model="addressForm.name"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="addressForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="addressForm.address"></el-input>
    </el-form-item>
    <el-form-item label="设为默认" prop="isDefault">
      <el-switch v-model="addressForm.isDefault" :width="26"></el-switch>
      <div class="add-address-ok">
        <el-button type="primary" @click="OnOK" size="mini">确认</el-button>
        <el-button @click="$emit('setIsShowAddressIn')" size="mini"
          >取消</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "Form",
  props: ["addressForms"],
  data() {
    //收件人格式验证
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写收件人！"));
      }
      if (value.length > 10) {
        return callback(new Error("名字太长啦！"));
      }
      this.$refs.ruleForm.validateField("checkPass");
      return callback();
    };
    // 收件人手机格式验证
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入手机号码"));
      }
      // 手机格式正则
      const phoneRule = /^1[3|4|5|7|8]\d{9}$/;
      if (phoneRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("手机格式有误"));
      }
    };
    //收件人地址格式验证
    const validateAddress = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入地址"));
      }
      // 收件人地址格式验证

      if (value.length > 50) {
        return callback(new Error("地址太长啦"));
      }
      if (value.length < 5) {
        return callback(new Error("地址太短啦"));
      }
      this.$refs.ruleForm.validateField("checkPass");
      return callback();
    };

    return {
      //地址信息
      addressForm: {},
      //地址信息格式规则
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }],
      },
    };
  },
  methods: {
    OnOK() {
      // 通过element自定义表单校验规则，校验用户输入的地址信息
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$emit("OnOKAddress");
          // 清空输入框的校验状态
          this.$refs["ruleForm"].resetFields();
        } else {
          this.notifyError("检查是否输入正确格式");
          return false;
        }
      });
    },
  },
  created() {
    this.addressForm = this.addressForms;
  },
};
</script>
<style lang='less'>
.el-form-item__content {
  position: relative;
  .add-address-ok {
    position: absolute;
    right: -4px;
    top: 0;
  }
}
</style>