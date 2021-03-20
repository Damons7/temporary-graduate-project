<!--
 * @Description: 我上架的页面组件
 * @Author: 李鸿智
 -->
<template>
  <div class="sale">
    <!-- 标题 -->
    <div class="sale-header">
      <div class="sale-title">
        <i class="el-icon-loading" style="color: #ff6700"></i>
        我上架的
        <router-link to="/sale/AddSale">
          <div class="sale-add">
            上架新品
            <i class="el-icon-circle-plus-outline" style="color: #ff6700"></i>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 标题 END-->

    <!-- 主体区域 -->
    <div class="content">
      <!-- 正在上架 -->
      <div class="sale-state">
        <i class="el-icon-sell" style="color: #ff6700"></i>
        正在上架
      </div>

      <div class="goods-list" v-if="saleList.length > 0">
        <Item :list="saleList" :isDelete="true"></Item>
      </div>
      <!-- 上架列表为空的时候显示的内容 -->
      <div v-else class="sale-empty">
        <div class="empty">
          <h2>您上架列表还是空的！</h2>
          <p>快去上架吧！</p>
        </div>
      </div>
      <!--  上架列表为空的时候显示的内容END -->
      <!-- 正在上架 END-->

      <!-- 待发货 -->
      <div class="sale-state">
        <i class="el-icon-sold-out" style="color: #ff6700"></i>
        待发货
      </div>
      <!-- 待发货订单主要内容 -->

      <div v-if="delivery.length">
        <div
          class="ToBeDelivered-content"
          v-for="(item, index) in delivery"
          :key="index + item[0].order_id + item[0].product_id"
        >
          <ul>
            <!-- 我的订单表头 -->
            <li class="order-info">
              <div class="order-id">订单编号: {{ item[0].order_id }}</div>
              <div class="order-time">
                <router-link
                  :to="{
                    path: '/order/orderDetails',
                    query: { delivery: item[0].order_state },
                  }"
                >
                  <el-button>订单详情</el-button>
                </router-link>
                <el-button
                  @click="deliveryFun(item[0].order_id, item[index].product_id)"
                  >去发货</el-button
                >
              </div>
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
              v-for="item2 in item"
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
          </ul>
        </div>
      </div>
      <div v-else class="notList">暂无待发货</div>
      <!-- 待发货订单主要内容END -->
      <!-- 待发货 END-->

      <!-- 发货中 -->
      <div class="sale-state">
        <i class="el-icon-sold-out" style="color: #ff6700"></i>
        发货中
      </div>
      <!-- 发货中订单主要内容 -->
      <div v-if="delivering.length">
        <div
          class="ToBeDelivered-content"
          v-for="item in delivering"
          :key="index + item[0].order_id + item[0].product_id"
        >
          <ul>
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
          </ul>
        </div>
      </div>
      <div v-else class="notList">暂无发货中</div>
      <!-- 发货中订单主要内容END -->
      <!-- 发货中 END-->
    </div>
    <!-- 主体区域END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: [{ A: 1 }],
      orders: [{ B: 2 }],
      ToBeDelivered: [],
      saleList: [],
      saleList2: [], //上架订单数据
      delivery: [], //待发货订单数据
      delivering: [], //发货中订单数据
      delivered: [], //已发货订单数据
    };
  },
  activated() {
    // 获取收藏数据
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = this.$store.getters.getUser.token;
    this.$axios
      .post("/users/collect/getCollect", {
        user_id: this.$store.getters.getUser.uuid,
      })
      .then((res) => {
        if (res.data.code === "001") {
          this.saleList = res.data.collectList;
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });

    this.$axios
      .post("/sale/getDelivery", {
        from_user: this.$store.getters.getUser.uuid,
      })
      .then((res) => {
        if (res.data.code === "001") {
          const saleList = res.data.orders;
          let delivery = [], //待发货订单数据
            delivering = [], //发货中订单数据
            delivered = []; //已发货订单数据
          saleList.forEach((item) => {
            switch (item[0].order_state) {
              case "待发货":
                delivery.push(item);
                break;
              case "发货中":
                delivering.push(item);
                break;
              case "已收货":
                delivered.push(item);
                break;
            }
          });
          this.delivery = delivery;
          this.delivering = delivering;
          this.delivered = delivered;
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
  methods: {
    deliveryFun(order_id, product_id) {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      this.$axios
        .post("/sale/delivery", {
          from_user: this.$store.getters.getUser.uuid,
          order_id: order_id,
          product_id: product_id,
        })
        .then((res) => {
          if (res.data.code === "001") {
            this.notifySuccess(res.data.msg);
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
.sale {
  background-color: #f5f5f5;
  .sale-header {
    height: 64px;
    background-color: #fff;
    border-bottom: 2px solid #ff6700;
    .sale-title {
      width: 1225px;
      margin: 0 auto;
      height: 64px;
      line-height: 58px;
      font-size: 28px;
      .sale-add {
        color:#666;
        font-size: 24px;
        float: right;
      }
    }
  }
  .content {
    padding: 20px 0;
    width: 1225px;
    margin: 0 auto;

    .notList {
      margin-left: 100px;
      height: 40px;
      line-height: 40px;
      color: #999;
    }
    .sale-state {
      height: 60px;
      line-height: 60px;
      padding: 0 26px;
      color: #ff6700;
      font-size: 20px;
    }

    .goods-list {
      margin-left: -13.7px;
      overflow: hidden;
    }

    .ToBeDelivered-content {
      margin-bottom: 40px;
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
          .order-time {
            float: right;
            .el-button {
              border: transparent;
            }
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
    }
  }
  /* 收藏列表为空的时候显示的内容CSS */
  .sale-empty {
    width: 1225px;
    margin: 0 auto;
    .empty {
      height: 300px;
      padding: 0 0 130px 558px;
      margin: 65px 0 0;
      background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
      color: #b0b0b0;
      overflow: hidden;
      h2 {
        margin: 70px 0 15px;
        font-size: 36px;
      }
      p {
        margin: 0 0 20px;
        font-size: 20px;
      }
    }
  }
  /* 收藏列表为空的时候显示的内容CSS END */
}
</style>