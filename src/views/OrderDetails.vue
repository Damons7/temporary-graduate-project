<!--
 * @Description: 订单详情页面组件
 * @Author: 李鸿智
 -->
<template>
  <div class="orderDetails">
    <!-- 头部 -->
    <div class="orderDetails-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-goods"></i>
        </p>
        <p>订单详情</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <ul
        v-for="item in ordersList"
        :key="item[0].order_id + item[0].product_id"
      >
        <!-- 我的订单表头 -->
        <li class="order-info">
          <div class="order-id">订单编号: {{ item[0].order_id }}</div>
        </li>
        <li class="header">
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
        </li>
        <!-- 我的订单表头END -->
        <!-- 订单列表 -->
        <li
          class="product-list"
          v-for="(item2, index) in item"
          :key="index + item2.order_id + item2.product_id"
        >
          <div class="pro-img">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item2.product_id },
              }"
            >
              <img :src="item2.product_img" />
            </router-link>
          </div>
          <div class="pro-name">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item2.product_id },
              }"
              >{{ item2.product_name }}</router-link
            >
          </div>
          <div class="pro-price">{{ item2.product_price }}元</div>
          <div class="pro-num">{{ item2.product_num }}</div>
          <div class="pro-total pro-total-in">
            {{ item2.product_num * item2.product_price }}元
          </div>
        </li>

        <!-- 配送方式 -->
        <div class="section-shipment">
          <p class="title">配送方式</p>
          <p class="shipment">包邮</p>
        </div>
        <!-- 配送方式END -->

        <div class="order-address">
          <div class="order-address-title">收件人信息</div>
          <div class="order-address-info">
            <div>姓名 ： {{ item[0].address.name }}</div>
            <div>联系方式 {{ item[0].address.phone }}</div>
            <div>收件地址 {{ item[0].address.address }}</div>
          </div>
        </div>
      </ul>

      <div class="section-bar">
        <div class="btn">
          <div class="btn-base btn-return" @click="goBack">返回</div>
        </div>
      </div>
    </div>
    <!-- 主要内容容器END -->
  </div>
</template>
<script>
export default {
  name: "OrderDetails",
  data() {
    return {
      ordersList: [],
      delivery: "",
    };
  },
  activated() {
    if (this.$route.query.delivery != undefined) {
      this.delivery = this.$route.query.delivery;
    }
  },
  watch: {
    // 监听delivery的变化，请求后端获取数据
    delivery: function (val) {
      this.getOrderDetails(val);
    },
  },
  methods: {
    //返回上一页
    goBack() {
      window.history.go(-1);
    },
    getOrderDetails() {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;

      this.$axios
        .post("/users/order/orderDetails", {
          from_user: this.$store.getters.getUser.uuid,
          order_state: this.delivery,
        })
        .then((res) => {
          this.ordersList = res.data.orders;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>
<style lang='less'>
.orderDetails {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  /* 头部CSS */
  .orderDetails-header {
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
    ul {
      background-color: #fff;
      color: #424242;
      line-height: 85px;
      /* 我的订单表头CSS */
      .order-info {
        height: 60px;
        line-height: 60px;
        padding: 0 26px;
        color: #424242;
        border-bottom: 1px solid #ff6700;
        .order-id {
          float: left;
          color: #ff6700;
        }
      }
      .header {
        height: 85px;
        padding-right: 26px;
        color: #424242;
      }
      /* 订单列表CSS */
      .product-list {
        height: 85px;
        padding: 15px 26px 15px 0;
        border-top: 1px solid #e0e0e0;
      }
      .pro-img {
        float: left;
        height: 85px;
        width: 120px;
        padding-left: 80px;
        img {
          height: 80px;
          width: 80px;
        }
      }
      .pro-name {
        float: left;
        width: 380px;
        a {
          color: #424242;
          &:hover {
            color: #ff6700;
          }
        }
      }
      .pro-price {
        float: left;
        width: 160px;
        padding-right: 18px;
        text-align: center;
      }
      .pro-num {
        float: left;
        width: 190px;
        text-align: center;
      }
      .pro-total {
        float: left;
        width: 160px;
        padding-right: 81px;
        text-align: right;
      }
      .pro-total-in {
        color: #ff6700;
      }
    }
    .order-address {
      margin: 0 80px;
      padding: 25px 0;
      border-bottom: 1px solid #e0e0e0;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      color: #333;
      .order-address-title {
        font-size: 18px;
      }
      .order-address-info {
        color: #777;
        margin-left: 50px;
        font-size: 18px;
      }
    }
    /* 配送方式CSS */
    .section-shipment {
      margin: 0 80px;
      padding: 25px 0;
      border-bottom: 1px solid #e0e0e0;
      overflow: hidden;
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
    }
    /* 配送方式CSS END */

    /* 返回 */
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
          cursor: pointer;
          color: rgba(0, 0, 0, 0.27);
          border-color: rgba(0, 0, 0, 0.27);
        }
      }
    }
    /* 返回CSS */
  }
  /* 主要内容容器CSS END */

  .el-form-item__content {
    position: relative;
    .add-address-ok {
      position: absolute;
      right: -4px;
      top: 0;
    }
  }
}
</style>