<!--
 * @Description: 添加上架商品
 * @Author: 李鸿智
 -->
<template>
  <div class="addSale">
    <!-- 头部 -->
    <div class="addSale-header">
      <div class="header-content">
        <p>
          <i class="el-icon-user"></i>
        </p>
        <p>个人信息</p>
        <el-button>修改密码</el-button>
        <el-button class="update-userInfo">修改信息</el-button>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <!-- 头像 -->
      <div class="section-shipment">
        <p class="title">头像 :</p>

        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          class="upload-img"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <img :src="userData.avatar" alt="无法加载" class="user-img" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>

      <!-- 姓名 -->
      <div class="section-shipment">
        <p class="title">姓名 :</p>
        <div class="sale-infor sale-infor-text">
          <!-- <el-input
            type="text"
            v-model="userData.name"
            placeholder="请输入姓名"
          >
          </el-input> -->
          张三
        </div>
        <p class="title">性别 :</p>
        <div class="sale-infor sale-infor-text">
            男
        </div>
      </div>

      <!-- 邮箱 -->
      <div class="section-shipment">
        <p class="title">邮箱 :</p>
        <div class="sale-infor-text sale-infor">{{ userData.email }}</div>
        <p class="title">年龄 :</p>
        <div class="sale-infor-text sale-infor">21岁</div>
      </div>

      <!-- 上架确认 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/sale" class="btn-base btn-return">返回</router-link>
          <a href="javascript:void(0);" class="btn-base btn-primary">修改</a>
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->
  </div>
</template>
<script>
export default {
  name: "User",
  data() {
    return {
      userData: [],
      productForm: {
        name: "",
        num: 1,
        price: 0,
        selling_price: 0,
        intro: "",
        title: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      saleTypeOptions: [
        {
          value: "选项1",
          label: "书籍",
        },
        {
          value: "选项2",
          label: "电子设备",
        },
        {
          value: "选项3",
          label: "娱乐",
        },
        {
          value: "选项4",
          label: "其他宝藏",
        },
      ],
      saleType: "",
      deliveryTypeOptions: [
        {
          value: "选项1",
          label: "配送",
        },
        {
          value: "选项2",
          label: "自提",
        },
      ],
      deliveryType: "",
    };
  },
  methods: {
    handleRemove(file) {
      console.log("删除", file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
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
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
};
</script>
<style lang='less'>
.addSale {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  /* 头部CSS */
  .addSale-header {
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

    /* 商品表单 */
    .section-shipment {
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
      .sale-infor {
        width: 200px;
        margin-right: 40px;
      }
      .sale-infor-text {
        display: flex;
        align-items: center;
      }
      .sale-inforLong {
        width: 300px;
        margin-right: 40px;
      }
      .sale-inforLong2 {
        width: 400px;
      }
    }
    /* 商品表单CSS END */

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
</style>