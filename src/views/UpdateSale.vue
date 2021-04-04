<!--
 * @Description: 更新上架商品
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
        <p>更新上架商品</p>

        <el-button class="returnProduct" @click="isReturn = true"
          >下架该商品</el-button
        >
        <!-- 确认下架弹窗 -->
        <el-popover
          placement="top"
          width="180"
          v-model="isReturn"
          class="popover"
        >
          <div>确定下架？</div>
          <div style="text-align: right; margin: 10px 10px">
            <el-button type="primary" size="mini" @click="returnProduct"
              >确定</el-button
            >
            <el-button size="mini" type="default" @click="isReturn = false"
              >取消</el-button
            >
          </div>
        </el-popover>
        <!-- 确认下架弹窗END -->
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
          ></el-input>
        </div>
      </div>
      <!-- 商品价格 -->
      <div class="section-shipment">
        <p class="title">商品价格 :</p>
        <div class="sale-infor">
          <el-input
            type="number"
            v-model="productForm.price"
            placeholder="请输入商品价格"
          >
            <template slot="prepend">￥</template>
          </el-input>
        </div>
        <p class="title">商品折后价 :</p>
        <div class="sale-infor">
          <el-input
            type="number"
            v-model="productForm.selling_price"
            placeholder="请输入商品折后价"
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
            maxlength="50"
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
            maxlength="40"
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
              :file-list="fileList"
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
            >更新</a
          >
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->
  </div>
</template>
<script>
import { checkUpload } from "../utils";
import { beforeAvatarUpload ,getBase64Image,dataURLtoBlob} from "../utils/index";
export default {
  name: "UpdateSale",
  data() {
    return {
      isReturn: false, //确认下架弹窗
      fileList: [],
      productID: "",
      productForm: {
        product_id: "",
        name: "",
        num: 1,
        price: 0,
        selling_price: 0,
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
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function (val) {
      val && this.getProduct(val);
      val && this.getDetailsPicture(val);
    },
  },
  deactivated() {
    this.fileList = [];
    this.productForm = {};
    this.productID = "";
  },
  methods: {
    //更新商品信息
    async submitForm() {
      //校验更新数据
      const msg = checkUpload(this.productForm);
      if (msg) {
        this.notifyError(msg);
        return;
      }
      //用formdata传递数据
      const formData = new FormData();
      //上传图片
      const file = this.$refs.upload.uploadFiles;
      const {
        saleType,
        name,
        num,
        price,
        selling_price,
        intro,
        title,
        deliveryType,
        product_id,
      } = this.productForm;
      //循环文件
      for (let i = 0; i < file.length; i++) {
        const suffix = file[i].name.split(".").pop();
        const reName = `${saleType}_${name}_${i + 1}.${suffix}`;

        const img = new Image();
        img.src = file[i].url;
        //转为指定图片格式
        const getImg = () => {
          return new Promise((res, rej) => {
            img.onload = function () {
              const base64 = getBase64Image(img);
              //Base64字符串转二进制
              res(dataURLtoBlob(base64));
            };
            img.onerror = () => {
              rej("");
            };
          });
        };
        if (file[i].isUpdate) {
          file[i].raw = await getImg();
        }
        const reFile = new File([file[i].raw], reName, {
          type: file[i].raw.type,
        });
        formData.append("file", reFile, reName);
      }
      const productsData = {
        product_name: name,
        product_id: product_id,
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
        .post("/product/updateProduct", formData)
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
    //改变图片钩子（添加图片）
    handleChange(file, fileList) {
      //添加前验证图片格式
      const msg = beforeAvatarUpload(file.raw);
      if (msg) {
        this.notifyError(msg);
        this.$refs.upload.uploadFiles.pop();
        return;
      }
      this.file = file.raw;
      this.fileName = file.name;
      if (fileList.length >= 1) {
        this.uploadDisabled = true;
      }
      //添加入文件列表
      this.fileList.push(file);
    },
    //删除图片钩子
    handleRemove(file) {
      this.uploadDisabled = false;
      this.fileList = this.fileList.filter((item) => item.name !== file.name);
    },
    getProduct(val) {
      this.$axios
        .post("/product/getDetails", {
          productID: val,
        })
        .then((res) => {
          const data = res.data.Product[0];
          const productForm = this.productForm;
          productForm.num = data.product_num;
          productForm.name = data.product_name;
          productForm.price = data.product_price;
          productForm.selling_price = data.product_selling_price;
          productForm.intro = data.product_intro;
          productForm.title = data.product_title;
          productForm.saleType = this.saleTypeOptions[
            data.category_id - 1
          ].value;
          productForm.deliveryType = data.deliveryType;
          productForm.product_id = data.product_id;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    getDetailsPicture(val) {
      this.$axios
        .post("/product/getDetailsPicture", {
          productID: val,
        })
        .then((res) => {
          let teamArr = [];
          res.data.ProductPicture.product_picture.forEach((item) => {
            const arr = item.split("\\");
            const name = arr[arr.length - 1];
            teamArr.push({
              name: name,
              url: item,
              isUpdate: true, //自定义标识符，表示原来存在在图片
            });
          });
          this.fileList = teamArr;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //下架操作
    returnProduct() {
      this.$axios
        .post("/product/returnProduct", {
          product_id: this.productID,
        })
        .then((res) => {
          if (res.data.code === "001") {
            this.notifySucceed(res.data.msg);
            this.fileList = [];
            this.productForm = {};
            this.productID = "";
            this.$router.push("/sale");
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
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
      .returnProduct {
        float: right;
        width: 200px;
        color: #ff6700;
        border: 1px solid #ff6700;
        margin-top: 20px;
      }
      .popover {
        display: block;
        width: 80%;
        height: 100%;
        position: relative;
        .el-popover {
          right: 0;
          top: 0;
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