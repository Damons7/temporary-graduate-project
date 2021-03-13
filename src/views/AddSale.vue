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
          <el-select v-model="saleType" placeholder="请选择">
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
          <el-select v-model="deliveryType" placeholder="请选择">
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
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>

      <!-- 上架确认 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/sale" class="btn-base btn-return">返回</router-link>
          <a href="javascript:void(0);" class="btn-base btn-primary">上架</a>
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
        price: 0,
        selling_price: 0,
        intro: "",
        title: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

       saleTypeOptions: [{
          value: '选项1',
          label: '书籍'
        }, {
          value: '选项2',
          label: '电子设备'
        }, {
          value: '选项3',
          label: '娱乐'
        }, {
          value: '选项4',
          label: '其他宝藏'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        saleType: '',
           deliveryTypeOptions: [{
          value: '选项1',
          label: '配送'
        }, {
          value: '选项2',
          label: '自提'
        }],
        deliveryType: ''
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