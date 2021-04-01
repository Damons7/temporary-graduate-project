<!--
 * @Description: 我的订单页面组件
 * @Author: 李鸿智
 -->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i
            class="el-icon-s-order"
            style="font-size: 30px; color: #ff6700"
          ></i>
          我的订单
        </p>
      </div>
    </div>
    <!-- 我的订单头部END -->
    <div class="order-menu">
      <el-menu default-active="1" mode="horizontal" active-text-color="#ff6700">
        <el-menu-item index="1" @click="selectOrder(1)">全部订单</el-menu-item>
        <el-menu-item index="2" @click="selectOrder(2)">待发货</el-menu-item>
        <el-menu-item index="3" @click="selectOrder(3)">待收货</el-menu-item>
        <el-menu-item index="4" @click="selectOrder(4)">已收货</el-menu-item>
        <el-menu-item index="5" @click="selectOrder(5)">已退货</el-menu-item>
      </el-menu>
    </div>

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length > 0">
      <div class="content" v-for="(item, index) in orders" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">订单编号: {{ item[0].order_id }}</div>
            <div class="order-time">订单时间: {{ item[0].updateDate }}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
            <div class="pro-state">状态</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li class="product-list" v-for="(product, i) in item" :key="i">
            <div class="pro-img">
              <router-link
                :to="{
                  path: '/goods/details',
                  query: { productID: product.product_id },
                }"
              >
                <img :src="$target + product.product_picture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{
                  path: '/goods/details',
                  query: { productID: product.product_id },
                }"
                >{{ product.product_name }}</router-link
              >
            </div>
            <div class="pro-price">{{ product.product_price }}元</div>
            <div class="pro-num">{{ product.product_num }}</div>
            <div class="pro-total pro-total-in">
              {{ product.product_price * product.product_num }}元
            </div>
            <div class="pro-state">{{ product.order_state }}</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{ total[index].totalNum }}</span>
              件商品
            </span>
          </div>
          <div
            class="order-bar-right"
            v-show="
              item[0].order_state === '已收货' ||
              item[0].order_state === '已退货'
                ? false
                : true
            "
          >
            <div
              class="operate"
              @click="
                isOperateOK = true;
                orderIndex = index;
              "
            >
              确认收货
            </div>
            <div
              class="operate"
              @click="
                isOperateReturn = true;
                orderIndex = index;
              "
            >
              退货
            </div>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{ total[index].totalPrice }}元</span>
            </span>
          </div>

          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top: -40px"></div>
    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>您的订单还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->

    <!-- 确认收货弹窗 -->
    <el-popover
      placement="top"
      width="180"
      v-model="isOperateOK"
      class="popover"
    >
      <div>确定收货？</div>
      <div style="text-align: right; margin: 10px 10px">
        <el-button type="primary" size="mini" @click="operateOK"
          >确定</el-button
        >
        <el-button size="mini" type="default" @click="isOperateOK = false"
          >取消</el-button
        >
      </div>
    </el-popover>
    <!-- 确认收货弹窗END -->

    <!-- 确认退货弹窗 -->
    <el-popover
      placement="top"
      width="180"
      v-model="isOperateReturn"
      class="popover"
    >
      <div>确定退货？</div>
      <div style="text-align: right; margin: 10px 10px">
        <el-button type="primary" size="mini" @click="operateReturn"
          >确定</el-button
        >
        <el-button size="mini" type="default" @click="isOperateReturn = false"
          >取消</el-button
        >
      </div>
    </el-popover>
    <!-- 确认退货弹窗END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderIndex: 0,
      isOperateOK: false, //是否确认收货弹窗
      isOperateReturn: false, //是否确认退货弹窗
      activeIndex: "", // 订单选中的标签
      orders: [], // 订单列表
      ordersTemp: [], // 订单列表临时存储
      total: [], // 每个订单的商品数量及总价列表
    };
  },
  methods: {
    //确认收货
    operateOK() {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      const index = this.orderIndex;
      const order = this.orders[index][0];
      this.$axios
        .post("/users/order/onOKOrder", {
          order_id: order.order_id,
          product_id: order.product_id,
          from_user: order.from_user,
        })
        .then((res) => {
          if (res.data.code === "001") {
            this.notifySucceed(res.data.msg);
            this.isOperateOK = false;
            this.orders[index] = this.orders[index].map((item) => {
              item.order_state = "已收货";
              return item;
            });
            this.ordersTemp[index] = this.ordersTemp[index].map((item) => {
              item.order_state = "已收货";
              return item;
            });
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //退货操作
    operateReturn() {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      const index = this.orderIndex;
      const order = this.orders[index][0];
      this.$axios
        .post("/users/order/ReturnOrder", {
          order_id: order.order_id,
          product_id: order.product_id,
          from_user: order.from_user,
        })
        .then((res) => {
          if (res.data.code === "001") {
            this.notifySucceed(res.data.msg);
            this.isOperateReturn = false;
            this.orders[index] = this.orders[index].map((item) => {
              item.order_state = "已退货";
              return item;
            });
            this.ordersTemp[index] = this.ordersTemp[index].map((item) => {
              item.order_state = "已退货";
              return item;
            });
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //订单类型选择
    selectOrder(index) {
      switch (index) {
        case 1:
          this.orders = [...this.ordersTemp];
          break;
        case 2:
          this.orders = this.ordersTemp.filter(
            (item) => item[0].order_state === "待发货"
          );
          break;
        case 3:
          this.orders = this.ordersTemp.filter(
            (item) => item[0].order_state === "待收货"
          );
          break;
        case 4:
          this.orders = this.ordersTemp.filter(
            (item) => item[0].order_state === "已收货"
          );
          break;
        case 5:
          this.orders = this.ordersTemp.filter(
            (item) => item[0].order_state === "已退货"
          );
          break;
        default:
          this.orders = [...this.ordersTemp];
          break;
      }
    },
  },
  activated() {
    // 获取订单数据
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = this.$store.getters.getUser.token;
    this.$axios
      .post("/users/order/getOrder", {
        user_id: this.$store.getters.getUser.uuid,
      })
      .then((res) => {
        if (res.data.code === "001") {
          this.orders = res.data.orders;
          this.ordersTemp = res.data.orders;
          console.log(this.orders);
        } else {
          this.notifyError(res.data.msg);
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
  watch: {
    // 通过订单信息，计算出每个订单的商品数量及总价
    orders: function (val) {
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.product_num;
          totalPrice += temp.product_price * temp.product_num;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    },
  },
};
</script>
<style lang='less'>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  /* 订单菜单导航CSS */
  .order-menu {
    width: 1225px;
    margin: 0 auto;
  }
  /* 订单菜单导航CSS END*/

  /* 我的订单头部CSS */
  .order-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
    .order-header-content {
      width: 1225px;
      margin: 0 auto;
    }
    p {
      font-size: 28px;
      line-height: 58px;
      float: left;
      font-weight: normal;
      color: #424242;
    }
  }
  /* 我的订单头部CSS END */

  .content {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 50px;
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
        }
      }
      .header {
        height: 85px;
        padding-right: 26px;
        color: #424242;
      }
      /* 我的订单表头CSS END */

      /* 订单列表CSS */
      .product-list {
        height: 85px;
        padding: 15px 26px 15px 0;
        border-top: 1px solid #e0e0e0;
      }
      .pro-img {
        float: left;
        height: 85px;
        width: 150px;
        padding-left: 60px;
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
        width: 150px;
        text-align: center;
      }
      .pro-num {
        float: left;
        width: 150px;
        text-align: center;
      }
      .pro-total {
        float: left;
        width: 150px;
        text-align: center;
      }
      .pro-total-in {
        color: #ff6700;
      }
      .pro-state {
        float: left;
        width: 150px;
        text-align: center;
      }
    }
  }

  .order-bar {
    width: 1185px;
    padding: 0 20px;
    border-top: 1px solid #ff6700;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    .order-bar-left {
      float: left;
      .order-total {
        color: #757575;
      }
      .order-total-num {
        color: #ff6700;
      }
    }
    .order-bar-right {
      float: right;
      margin-right: 20px;
      display: flex;
      .total-price-title {
        color: #ff6700;
        font-size: 14px;
      }
      .total-price {
        color: #ff6700;
        font-size: 30px;
      }
      .operate {
        margin-right: 14px;
        cursor: pointer;
        color: #777;
        text-decoration: underline;
      }
    }
  }
  /* 订单列表CSS END */

  /* 订单为空的时候显示的内容CSS */
  .order-empty {
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
  /* 订单为空的时候显示的内容CSS END */

  /*确认弹窗 */
  .popover {
    position: fixed;
    top: 50%;
    left: 60%;
  }
}
</style>