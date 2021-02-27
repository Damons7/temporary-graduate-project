<!--
 * @Description: 商品详情页面组件
 * @Author: lihongzhi
 * @Date: 2021-01-10 18:55:44
 * @LastEditors:lihongzhi
 * @LastEditTime: 2021-01-10 21:06:11
 -->
<template>
  <div id="details">
    <!-- 头部 -->
    <div class="details-page-header">
      <div class="details-page-title">
        <p>{{ productDetails.product_name }}</p>
        <div class="details-page-list">
          <ul>
            <li>
              <router-link to>概述</router-link>
            </li>
            <li>
              <router-link to>参数</router-link>
            </li>
            <li>
              <router-link to>用户评价</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="details-main">
      <!-- 左侧商品轮播图 -->
      <div class="details-swiper">
        <el-carousel height="560px" v-if="productPicture.length > 1">
          <el-carousel-item v-for="item in productPicture" :key="item.id">
            <img
              style="height: 560px"
              :src="$target + item.product_picture"
              :alt="item.intro"
            />
          </el-carousel-item>
        </el-carousel>
        <div v-if="productPicture.length == 1">
          <img
            style="height: 560px"
            :src="$target + productPicture[0].product_picture"
            :alt="productPicture[0].intro"
          />
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="details-content">
        <h1 class="details-content-name">{{ productDetails.product_name }}</h1>
        <p class="details-content-intro">{{ productDetails.product_intro }}</p>
        <p class="details-content-store">小米自营</p>
        <div class="details-content-price">
          <span>{{ productDetails.product_selling_price }}元</span>
          <span
            v-show="
              productDetails.product_price !=
              productDetails.product_selling_price
            "
            class="details-content-del"
            >{{ productDetails.product_price }}元</span
          >
        </div>
        <div class="details-pro-list">
          <span class="details-pro-name">{{ productDetails.product_name }}</span>
          <span class="details-pro-price">
            <span>{{ productDetails.product_selling_price }}元</span>
            <span
              v-show="
                productDetails.product_price !=
                productDetails.product_selling_price
              "
              class="details-pro-del"
              >{{ productDetails.product_price }}元</span
            >
          </span>
          <p class="details-price-sum">
            总计 : {{ productDetails.product_selling_price }}元
          </p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="details-button">
          <el-button class="details-shop-cart" :disabled="dis" @click="addShoppingCart"
            >加入购物车</el-button
          >
          <el-button class="details-like" @click="addCollect">喜欢</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="details-pro-policy">
          <ul>
            <li><i class="el-icon-circle-check"></i> 小米自营</li>
            <li><i class="el-icon-circle-check"></i> 小米发货</li>
            <li><i class="el-icon-circle-check"></i> 7天无理由退货</li>
            <li><i class="el-icon-circle-check"></i> 7天价格保护</li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      productDetails: "", // 商品详细信息
      productPicture: "", // 商品图片
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function (val) {
      // this.getDetails(val);
      // this.getDetailsPicture(val);
      console.log(val);
      //lihongzhi
      this.productDetails = {
        category_id: 1,
        product_id: 1,
        product_intro:
          "120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC",
        product_name: "Redmi K30",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 2000,
        product_sales: 0,
        product_selling_price: 1599,
        product_title: "120Hz流速屏，全速热爱",
      };
      this.productPicture = [
        {
          id: 1,
          intro: null,
          product_id: 1,
          product_picture: "public/imgs/phone/picture/Redmi-k30-1.png",
        },
        {
          id: 2,
          intro: null,
          product_id: 1,
          product_picture: "public/imgs/phone/picture/Redmi-k30-2.png",
        },
        {
          id: 3,
          intro: null,
          product_id: 1,
          product_picture: "public/imgs/phone/picture/Redmi-k30-3.png",
        },
        {
          id: 4,
          intro: null,
          product_id: 1,
          product_picture: "public/imgs/phone/picture/Redmi-k30-4.png",
        },
        {
          id: 5,
          intro: null,
          product_id: 1,
          product_picture: "public/imgs/phone/picture/Redmi-k30-5.png",
        },
      ];
    },
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
    // 获取商品详细信息
    getDetails(val) {
      this.$axios
        .post("/api/product/getDetails", {
          productID: val,
        })
        .then((res) => {
          this.productDetails = res.data.Product[0];
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 获取商品图片
    getDetailsPicture(val) {
      this.$axios
        .post("/api/product/getDetailsPicture", {
          productID: val,
        })
        .then((res) => {
          this.productPicture = res.data.ProductPicture;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/shoppingCart/addShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productID,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // 新加入购物车成功
              this.unshiftShoppingCart(res.data.shoppingCartData[0]);
              this.notifySucceed(res.data.msg);
              break;
            case "002":
              // 该商品已经在购物车，数量+1
              this.addShoppingCartNum(this.productID);
              this.notifySucceed(res.data.msg);
              break;
            case "003":
              // 商品数量达到限购数量
              this.dis = true;
              this.notifyError(res.data.msg);
              break;
            default:
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/collect/addCollect", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productID,
        })
        .then((res) => {
          if (res.data.code == "001") {
            // 添加收藏成功
            this.notifySucceed(res.data.msg);
          } else {
            // 添加收藏失败
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

#details {
  /* 头部CSS */
  .details-page-header {
    height: 64px;
    margin-top: -20px;
    z-index: 4;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    .details-page-title {
      width: 1225px;
      height: 64px;
      line-height: 64px;
      font-size: 18px;
      font-weight: 400;
      color: #212121;
      margin: 0 auto;
      p {
        float: left;
      }
      .details-page-list {
        height: 64px;
        float: right;
        li{
          float: left;
          margin-left: 20px;
          a {
            font-size: 14px;
            color: #616161;
            &:hover {
              font-size: 14px;
              color: #ff6700;
            }
          }
        }
      }
    }
  }
  /* 头部CSS END */

  /* 主要内容CSS */
  .details-main {
    width: 1225px;
    height: 560px;
    padding-top: 30px;
    margin: 0 auto;
    .details-swiper {
      float: left;
      width: 560px;
      height: 560px;
    }
    .details-content {
      float: left;
      margin-left: 25px;
      width: 640px;
      .details-content-name {
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        font-weight: normal;
        color: #212121;
      }
      .details-content-intro {
        color: #b0b0b0;
        padding-top: 10px;
      }
      .details-content-store {
        color: #ff6700;
        padding-top: 10px;
      }
      .details-content-price {
        display: block;
        font-size: 18px;
        color: #ff6700;
        border-bottom: 1px solid #e0e0e0;
        padding: 25px 0 25px;
        .details-content-del {
          font-size: 14px;
          margin-left: 10px;
          color: #b0b0b0;
          text-decoration: line-through;
        }
      }
      .details-pro-list {
        background: #f9f9fa;
        padding: 30px 60px;
        margin: 50px 0 50px;
        span {
          line-height: 30px;
          color: #616161;
        }
        .details-pro-price {
          float: right;
          .details-pro-del {
            margin-left: 10px;
            text-decoration: line-through;
          }
        }
        .details-price-sum {
          color: #ff6700;
          font-size: 24px;
          padding-top: 20px;
        }
      }
      .details-button {
        height: 55px;
        margin: 10px 0 20px 0;
        .el-button {
          float: left;
          height: 55px;
          font-size: 16px;
          color: #fff;
          border: none;
          text-align: center;
        }
        .details-shop-cart {
          width: 340px;
          background-color: #ff6700;
          &:hover {
            background-color: #f25807;
          }   
        }
        .details-like {
          width: 260px;
          margin-left: 40px;
          background-color: #b0b0b0;
          &:hover {
            background-color: #757575;
          }
        }
      }
      .details-pro-policy {
        li {
          float: left;
          margin-right: 20px;
          color: #b0b0b0;
        }
      }
    }
  }
}
.el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8); 
}
/* 主要内容CSS END */
</style>