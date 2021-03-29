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
          <i class="el-icon-circle-plus-outline"></i>
        </p>
        <p>添加上架商品</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <!-- 商品名称,数量 -->
      <div class="section-shipment">
        <p class="title">商品名称 :</p>
        <div class="sale-inforLong">
          <el-input
            placeholder="请输入商品名称"
            v-model="productForm.name"
            maxlength="20"
            minlength="1"
          ></el-input>
        </div>
        <p class="title">商品数量 :</p>
        <div>
          <el-input
            type="number"
            v-model="productForm.num"
            placeholder="请输入商品数量"
            min="1"
            max="9999"
          ></el-input>
        </div>
      </div>
      <!-- 商品价格 -->
      <div class="section-shipment">
        <p class="title">商品价格 :</p>
        <div class="sale-infor">
          <el-input
            @input="checkToFixed"
            type="number"
            v-model="productForm.price"
            placeholder="请输入商品价格"
            min="1"
            max="1000000"
          >
            <template slot="prepend">￥</template>
          </el-input>
        </div>
        <p class="title">商品折后价 :</p>
        <div class="sale-infor">
          <el-input
            @input="checkToFixed2"
            type="number"
            v-model="productForm.selling_price"
            placeholder="请输入商品折后价"
            min="1"
            max="1000000"
          >
            <template slot="prepend">￥</template></el-input
          >
        </div>
      </div>
      <!-- 商品类型 -->
      <div class="section-shipment">
        <p class="title">商品类型 :</p>
        <div>
          <el-select v-model="productForm.saleType" placeholder="请选择">
            <el-option
              v-for="item in saleTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 商品标题 -->
      <div class="section-shipment">
        <p class="title">商品标题 :</p>
        <div>
          <el-input
            type="input"
            placeholder="请输入商品标题"
            class="sale-inforLong2"
            v-model="productForm.title"
            maxlength="30"
            minlength="4"
          ></el-input>
        </div>
      </div>
      <!-- 商品介绍 -->
      <div class="section-shipment">
        <p class="title">商品介绍 :</p>
        <div>
          <el-input
            type="textarea"
            placeholder="请输入商品介绍"
            class="sale-inforLong2"
            v-model="productForm.intro"
            maxlength="300"
            minlength="4"
          ></el-input>
        </div>
      </div>
      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">配送方式 :</p>
        <div>
          <el-select v-model="productForm.deliveryType" placeholder="请选择">
            <el-option
              v-for="item in deliveryTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 商品图片 -->
      <div class="section-shipment">
        <p class="title">商品图片 :</p>
        <el-form enctype="multipart/form-data">
          <el-form-item>
            <el-upload
              ref="upload"
              action=""
              list-type="picture-card"
              :limit="5"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :show-file-list="true"
              :auto-upload="false"
              :before-upload="beforeAvatarUpload"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <!-- 上架确认 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/sale" class="btn-base btn-return">返回</router-link>
          <a
            href="javascript:void(0);"
            class="btn-base btn-primary"
            @click="submitForm"
            >上架</a
          >
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->
  </div>
</template>
<script>
export default {
  name: "AddSale",
  data() {
    return {
      productForm: {
        name: "",
        num: 1,
        price: "",
        selling_price: "",
        intro: "",
        title: "",
        saleType: "", //商品类型
        deliveryType: "", //配送方式
      },
      //商品类型
      saleTypeOptions: [
        {
          value: "书籍",
          label: "书籍",
        },
        {
          value: "电子设备",
          label: "电子设备",
        },
        {
          value: "娱乐",
          label: "娱乐",
        },
        {
          value: "其他宝藏",
          label: "其他宝藏",
        },
      ],
      //配送方式
      deliveryTypeOptions: [
        {
          value: "配送",
          label: "配送",
        },
        {
          value: "自提",
          label: "自提",
        },
      ],
      isUploadPic: false,
      uploadDisabled: false,
    };
  },
  methods: {
    //价格小数超过两位时保留两位小数,第一个写小数点时自动补全0
    checkToFixed() {
      const price = this.productForm.price.replace(/^\./, "0.");
      this.productForm.price = price;
      const tofixed = price.match(/((\d*)\.\d{2})\d*/);
      if (tofixed) {
        this.productForm.price = tofixed[1];
      }
    },
    //价格小数超过两位时保留两位小数,第一个写小数点时自动补全0
    checkToFixed2() {
      const selling_price = this.productForm.selling_price.replace(/^\./, "0.");
      this.productForm.selling_price = selling_price;
      const tofixed = selling_price.match(/(\d*\.\d{2})\d*/);
      if (tofixed) {
        this.productForm.selling_price = tofixed[1];
      }
    },
    //上传商品信息
    submitForm() {
      //用formdata传递数据
      const formData = new FormData();
      //上传图片
      const file = this.$refs.upload.uploadFiles;
      if (!this.checkUpload(this.productForm)) {
        return;
      }
      const {
        saleType,
        name,
        num,
        price,
        selling_price,
        intro,
        title,
        deliveryType,
      } = this.productForm;
      for (let i = 0; i < file.length; i++) {
        const suffix = file[i].raw.name.split(".").pop();
        const reName = `${saleType}_${name}_${i + 1}.${suffix}`;
        const reFile = new File([file[i].raw], reName, {
          type: file[i].raw.type,
        });
        formData.append("file", reFile, reName);
      }
      formData.append("user_id", this.$store.getters.getUser.uuid);
      const productsData = {
        product_name: name,
        product_num: num,
        product_price: price,
        product_selling_price: selling_price,
        product_intro: intro,
        product_title: title,
        category_name: saleType,
        deliveryType: deliveryType,
      };
      formData.append("productsData", JSON.stringify(productsData));
      this.$axios
        .post("/product/addProduct", formData)
        .then((res) => {
          if (res.data.code === "001") {
            this.notifySucceed(res.data.msg);
            this.uploadDisabled = false;
            this.$refs.upload.uploadFiles.pop();
            this.$router.push("/sale");
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //改变图片钩子
    handleChange(file, fileList) {
      if (!this.beforeAvatarUpload(file.raw)) {
        this.$refs.upload.uploadFiles.pop();
        return;
      }
      this.file = file.raw;
      this.fileName = file.name;
      if (fileList.length >= 1) {
        this.uploadDisabled = true;
      }
    },
    //删除图片钩子
    handleRemove(file) {
      console.log(file, "删除");
      this.uploadDisabled = false;
      this.fileList = [];
    },
    //限制上传图片标准
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.notifyError("仅支持 JPG, PNG 格式!");
      }
      if (!isLt2M) {
        this.notifyError("图片大小必须小于2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    //传数据校验
    checkUpload(data) {
      let msg = "";
      if (data.name.length < 1) {
        msg = "商品名称不为空";
        this.notifyError(msg);
        return false;
      }
      if (data.num < 0) {
        msg = "商品数量不能小于1";
        this.notifyError(msg);
        return false;
      }
      if (!(parseInt(data.num, 10) == data.num)) {
        msg = "商品数量格式错误";
        this.notifyError(msg);
        return false;
      }
      if (data.price < 0.01 || data.selling_price < 0.01) {
        msg = "商品价格不能小于0.01";
        this.notifyError(msg);
        return false;
      }
      if (data.title.length < 1) {
        msg = "商品标题不能为空";
        this.notifyError(msg);
        return false;
      }
      if (data.intro.length < 1) {
        msg = "商品介绍不能为空";
        this.notifyError(msg);
        return false;
      }
      const imgArr = this.$refs.upload.uploadFiles;
      if (imgArr.length < 1) {
        msg = "请上传商品图片";
        this.notifyError(msg);
        return false;
      }
      return true;
    },
  },
  activated() {
    this.productForm.saleType = this.saleTypeOptions[3].value;
    this.productForm.deliveryType = this.deliveryTypeOptions[0].value;
  },
  deactivated() {
    this.$refs.upload.uploadFiles = [];
    this.productForm = {};
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
      padding: 20px 0;
      border-bottom: 1px solid #e0e0e0;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      .title {
        float: left;
        width: 150px;
        color: #333;
        font-size: 18px;
        line-height: 38px;
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