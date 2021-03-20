<!--
 * @Description: 添加上架商品
 * @Author: 李鸿智
 -->
<template>
  <div class="userInfo">
    <!-- 头部 -->
    <div class="userInfo-header">
      <div class="header-content">
        <p>
          <i class="el-icon-user"></i>
        </p>
        <p>个人信息</p>
        <el-button @click="updatePassword">修改密码</el-button>
        <div style="position: relative">
          <el-button class="update-userInfo" @click="updateInfo">{{
            updateData.updateBtnText
          }}</el-button>
          <el-popover placement="top" width="180" v-model="updateData.popover">
            <div>返回将不保存已修改信息，确定返回？</div>
            <div style="text-align: right; margin: 10px 10px">
              <el-button type="primary" size="mini" @click="popoverOK"
                >确定</el-button
              >
              <el-button
                size="mini"
                type="default"
                @click="updateData.popover = false"
                >取消</el-button
              >
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 修改个人信息主要内容容器 -->
    <div class="content" v-if="showUpdate">
      <!-- 头像 -->
      <div class="userInfo-section">
        <p class="title">头像 :</p>

        <el-form enctype="multipart/form-data">
          <el-form-item>
            <el-upload
              ref="upload"
              action=""
              list-type="picture-card"
              :class="{ disabled: uploadDisabled }"
              :limit="1"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :show-file-list="true"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" :loading="isUploadPic"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 姓名 -->
      <div class="userInfo-section">
        <p class="title">姓名 :</p>
        <div class="user-infor user-infor-text">
          <el-input
            type="text"
            v-model="userData.name"
            placeholder="请输入姓名"
            v-if="updateData.isUpdate"
          >
          </el-input>
          <div v-else>{{ userData.name }}</div>
        </div>

        <p class="title">性别 :</p>
        <div class="user-infor user-infor-text">
          <el-select
            v-model="userData.gender"
            placeholder="请选择"
            v-if="updateData.isUpdate"
          >
            <el-option
              v-for="(item, index) in genderOptions"
              :key="item.value + index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div v-else>{{ userData.gender ? userData.gender : "未设置" }}</div>
        </div>
      </div>

      <!-- 邮箱 -->
      <div class="userInfo-section">
        <p class="title">邮箱 :</p>

        <div class="user-infor user-infor-text">
          {{ userData.email }}
        </div>

        <p class="title">年龄 :</p>
        <div class="user-infor-text user-infor">
          <el-input
            type="number"
            v-model="userData.age"
            placeholder="请输入年龄"
            v-if="updateData.isUpdate"
          >
          </el-input>
          <div v-else>{{ userData.age ? `${userData.age}岁` : "未设置" }}</div>
        </div>
      </div>

      <!-- 操作栏目 -->
      <div class="section-bar" v-show="updateData.isUpdate">
        <div class="btn">
          <div class="btn-base btn-return" @click="updateInfo">返回</div>
          <a
            href="javascript:void(0);"
            class="btn-base btn-primary"
            @click="updateInfoOK"
            >修改</a
          >
        </div>
      </div>
      <!-- 操作栏目END -->
    </div>
    <!-- 修改个人信息主要内容容器END -->

    <!-- 修改密码主要内容容器 -->
    <div class="content" v-else>
      <!-- 原密码 -->
      <div class="userInfo-section">
        <p class="title">原密码 :</p>
        <div class="user-infor user-infor-text">
          <el-input
            type="password"
            v-model="passwordData.oldPassword"
            placeholder="请输入原密码"
            maxlength="16"
            @blur="checkOldPassword"
          >
          </el-input>
        </div>
        <div
          class="user-infor-text password-error"
          v-show="checkConfig.oldPassword.showError"
        >
          {{ checkConfig.oldPassword.error }}
        </div>
      </div>

      <!-- 新密码 -->
      <div class="userInfo-section">
        <p class="title">新密码 :</p>
        <div class="user-infor user-infor-text">
          <el-input
            type="password"
            v-model="passwordData.newPassword"
            placeholder="请输入新密码"
            maxlength="16"
            @blur="checkNewPassword"
          >
          </el-input>
        </div>
        <div
          class="user-infor-text password-error"
          v-show="checkConfig.newPassword.showError"
        >
          {{ checkConfig.newPassword.error }}
        </div>
      </div>

      <!-- 确认密码 -->
      <div class="userInfo-section">
        <p class="title">确认密码 :</p>
        <div class="user-infor user-infor-text">
          <el-input
            type="password"
            v-model="passwordData.newPassword2"
            placeholder="请输入确认密码"
            maxlength="16"
            @blur="checkNewPassword2"
          >
          </el-input>
        </div>
        <div
          class="user-infor-text password-error"
          v-show="checkConfig.newPassword2.showError"
        >
          {{ checkConfig.newPassword2.error }}
        </div>
      </div>
      <!-- 操作栏目 -->
      <div class="section-bar">
        <div class="btn">
          <div class="btn-base btn-return" @click="showUpdate = true">返回</div>
          <a
            href="javascript:void(0);"
            class="btn-base btn-primary"
            @click="updatePasswordOK"
            >修改</a
          >
        </div>
      </div>
      <!-- 操作栏目END -->
    </div>
    <!-- 修改密码主要内容容器END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "User",
  data() {
    return {
      showUpdate: true, //为true展示修改信息，false展示密码修改
      updateData: {
        popover: false,
        isUpdate: false,
        updateBtnText: "修改信息",
      }, //修改信息配置
      tempUserData: [], //临时存储修改信息数据
      userData: [], //修改信息数据
      passwordData: {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      }, //修改密码数据
      checkConfig: {
        oldPassword: {
          showError: false,
          error: "",
        },
        newPassword: {
          showError: false,
          error: "",
        },
        newPassword2: {
          showError: false,
          error: "",
        },
      }, //修改密码配置
      //性别选项
      genderOptions: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      genderType: "",

      //test
      dialogVisible: false,
      isUploadPic: false,
      uploadDisabled: false,
      imageUrl: "",
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    //更新头像
    submitForm() {
      //用formdata传递数据
      const formData = new FormData();
      //上传图片
      const file = this.$refs.upload.uploadFiles[0];
      formData.append("file", file.raw);
      formData.append("user_id", this.$store.getters.getUser.uuid);
      this.$axios
        .post("/users/uploadAvatar", formData)
        .then((res) => {
          if (res.data.code === "001") {
            console.log("上传图片", res.data);
            this.notifySucceed(res.data.msg);
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //点击 按钮 弹窗上传
    handleForUpload() {
      this.dialogVisible = true;
    },
    //改变图片钩子
    handleChange(file, fileList) {
      this.file = file.raw;
      this.fileName = file.name;
      if (fileList.length >= 1) {
        this.uploadDisabled = true;
      }
    },
    //删除图片钩子
    handleRemove(file) {
      console.log(file);
      //imgDelete.post({pic_name : file.response.pic_name}).then();
      this.uploadDisabled = false;
    },
    handleAvatarSuccess(res, file) {
      this.$refs.uploadPic.clearFiles();
      this.imageUrl = res.data;
      console.log(file);
    },
    //限制上传图片标准
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("File type only support JPG, PNG!");
      }
      if (!isLt2M) {
        this.$message.error("File size must lower than 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    //修改信息
    updateInfo() {
      this.showUpdate = true; //切换为修改信息页面
      if (this.updateData.isUpdate) {
        this.updateData.popover = true;
      } else {
        this.updateData.isUpdate = true;
        this.updateData.updateBtnText = "返回";
      }
    },
    //返回弹出确认
    popoverOK() {
      this.userData = { ...this.tempUserData };
      this.updateData.isUpdate = false;
      this.updateData.updateBtnText = "修改信息";
      this.updateData.popover = false;
    },
    updateInfoOK() {
      const updateData = {
        name: this.userData.name,
        age: this.userData.age,
        gender: this.userData.gender,
      };
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      this.$axios
        .post("/users/updateUserData", {
          user_id: this.$store.getters.getUser.uuid,
          updateData: updateData,
        })
        .then((res) => {
          if (res.data.code === "001") {
            this.tempUserData = { ...this.userData };
            this.updateData.isUpdate = false;
            this.updateData.updateBtnText = "修改信息";
            this.updateData.popover = false;
            this.notifySucceed(res.data.msg);
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    updatePassword() {
      //切换为修改密码页面
      this.passwordData = {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      };
      this.showUpdate = false;
    },
    //原密码校验
    checkOldPassword() {
      const oldPassword = this.passwordData.oldPassword;
      if (oldPassword.length < 1) {
        this.checkConfig.oldPassword.showError = true;
        this.checkConfig.oldPassword.error = "请输入原密码!";
        return;
      }
      if (oldPassword.length < 6) {
        this.checkConfig.oldPassword.showError = true;
        this.checkConfig.oldPassword.error = "原密码长度为6~16位!";
        return;
      }
      this.checkConfig.oldPassword.showError = false;
    },
    //新密码校验
    checkNewPassword() {
      const newPassword = this.passwordData.newPassword;
      if (newPassword.length < 1) {
        this.checkConfig.newPassword.showError = true;
        this.checkConfig.newPassword.error = "请输入新密码!";
        return;
      }
      if (newPassword.length < 6) {
        this.checkConfig.newPassword.showError = true;
        this.checkConfig.newPassword.error = "新密码长度为6~16位!";
        return;
      }
      this.checkConfig.newPassword.showError = false;
    },
    //确认密码校验
    checkNewPassword2() {
      const newPassword2 = this.passwordData.newPassword2;
      if (newPassword2 !== this.passwordData.newPassword) {
        this.checkConfig.newPassword2.showError = true;
        this.checkConfig.newPassword2.error = "密码不一致!";
        return;
      }
      this.checkConfig.newPassword2.showError = false;
    },
    //更新密码请求
    updatePasswordOK() {
      const { oldPassword, newPassword } = this.passwordData;
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      this.$axios
        .post("/users/updateUserPassword", {
          user_id: this.$store.getters.getUser.uuid,
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
        .then((res) => {
          if (res.data.code === "001") {
            // 清空本地登录信息
            localStorage.setItem("user", "");
            // 清空vuex登录信息
            this.setUser("");
            this.notifySucceed(res.data.msg);
            this.$router.push("/");
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  activated() {
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = this.$store.getters.getUser.token;
    this.$axios
      .post("/users/getUserData", {
        user_id: this.$store.getters.getUser.uuid,
      })
      .then((res) => {
        if (res.data.code === "001") {
          this.userData = res.data.user[0];
          this.tempUserData = { ...res.data.user[0] };
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
};
</script>
<style lang='less'>
.userInfo {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  /* 头部CSS */
  .userInfo-header {
    background-color: #fff;
    border-bottom: 2px solid #ff6700;
    margin-bottom: 20px;
    .header-content {
      width: 1225px;
      margin: 0 auto;
      height: 80px;
      p {
        float: left;
        font-size: 28px;
        line-height: 80px;
        color: #424242;
        margin-right: 20px;
        i {
          font-size: 45px;
          color: #ff6700;
          line-height: 80px;
        }
      }
      .el-popover {
        right: 400px;
        top: 150px;
        .el-button {
          margin-left: 10px;
        }
      }
      .el-button {
        float: right;
        margin-top: 20px;
        &:hover {
          background-color: #f6f6f6;
        }
      }
      .update-userInfo {
        margin-right: 20px;
      }
    }
  }
  /* 头部CSS END */

  /* 主要内容容器CSS */
  .content {
    width: 1225px;
    margin: 0 auto;
    padding: 48px 0 0;
    background-color: #fff;

    /* 信息列表*/
    .userInfo-section {
      margin: 0 48px;
      padding: 25px 0;
      border-bottom: 1px solid #e0e0e0;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      .title {
        float: left;
        width: 110px;
        color: #333;
        font-size: 18px;
        line-height: 38px;
      }
      .upload-img {
        position: relative;
        .user-img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          &:hover {
            opacity: 0.5;
          }
        }
      }
      .shipment {
        float: left;
        line-height: 38px;
        font-size: 14px;
        color: #ff6700;
      }
      .user-infor {
        width: 200px;
        margin-right: 40px;
      }
      .user-infor-text {
        display: flex;
        align-items: center;
      }
      .user-inforLong {
        width: 300px;
        margin-right: 40px;
      }
      .user-inforLong2 {
        width: 400px;
      }
      .password-error {
        color: tomato;
      }
    }
    /* 信息列表CSS END */

    /* 上传确认CSS */
    .section-bar {
      padding: 20px 48px;
      border-top: 2px solid #f5f5f5;
      overflow: hidden;
      .btn {
        float: right;
        .btn-base {
          float: left;
          margin-left: 30px;
          width: 158px;
          height: 38px;
          border: 1px solid #b0b0b0;
          font-size: 14px;
          line-height: 38px;
          text-align: center;
        }
        .btn-return {
          color: rgba(0, 0, 0, 0.27);
          border-color: rgba(0, 0, 0, 0.27);
        }
        .btn-primary {
          background: #ff6700;
          border-color: #ff6700;
          color: #fff;
        }
      }
    }
    /* 上传确认CSS END */
  }
  /* 主要内容容器CSS END */
}
.disabled .el-upload--picture-card {
  display: none !important;
}
</style>