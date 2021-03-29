<!--
 * @Description: 确认订单页面组件
 * @Author: 李鸿智
 -->
<template>
  <div class="confirmOrder">
    <!-- 头部 -->
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order"></i>
        </p>
        <p>确认订单</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <!-- 选择地址 -->
      <div class="section-address">
        <el-popover
          class="address-popover"
          width="180"
          v-model="delAddressVisible"
        >
          <p>确定删除地址？</p>
          <div style="text-align: right; margin: 10px 0 0">
            <el-button type="primary" size="mini" @click="delAddress()"
              >确定</el-button
            >
            <el-button
              size="mini"
              type="default"
              @click="delAddressVisible = false"
              >取消</el-button
            >
          </div>
        </el-popover>
        <p class="title">收货地址</p>
        <div class="address-body">
          <ul>
            <li
              :class="
                index == confirmAddress ? 'in-section address-li' : 'address-li'
              "
              v-for="(item, index) in address"
              :key="item._id"
              @click="chooseOne($event, index)"
            >
              <div v-if="!item.isShowAddressIn">
                <div
                  class="address-edit address-com"
                  @click="
                    item.isShowAddressIn = true;
                    updateAddress = { ...item };
                  "
                >
                  编辑
                </div>
                <div
                  class="address-delete address-com"
                  @click="delAddressVisible = true"
                >
                  删除
                </div>
                <h2>{{ item.name }}</h2>
                <p class="phone">{{ item.phone }}</p>
                <p class="address">{{ item.address }}</p>
              </div>
              <div v-else>
                <Form
                  :addressForms="updateAddress"
                  @setIsShowAddressIn="setIsShowUpdate"
                  @OnOKAddress="updateAddressFun"
                ></Form>
              </div>
            </li>

            <li
              class="add-address"
              v-if="!isShowAddressIn"
              @click="isShowAddressIn = true"
            >
              <i class="el-icon-circle-plus-outline"></i>
              <p>添加新地址</p>
            </li>
            <li v-else class="add-address-in">
              <Form
                :addressForms="addressForm"
                @setIsShowAddressIn="setIsShowAdd"
                @OnOKAddress="addAddress"
              ></Form>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择地址END -->

      <!-- 商品及优惠券 -->
      <div class="section-goods">
        <p class="title">商品及优惠券</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.id">
              <img :src="$target + item.productImg" />
              <span class="pro-name">{{ item.productName }}</span>
              <span class="pro-price"
                >{{ item.selling_price }}元 x {{ item.num }}</span
              >
              <span class="pro-status"></span>
              <span class="pro-total"
                >{{ item.selling_price * item.num }}元</span
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品及优惠券END -->

      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">配送方式</p>
        <p class="shipment">包邮</p>
      </div>
      <!-- 配送方式END -->

      <!-- 发票 -->
      <div class="section-invoice">
        <p class="title">发票</p>
        <p class="invoice">电子发票</p>
        <p class="invoice">个人</p>
        <p class="invoice">商品明细</p>
      </div>
      <!-- 发票END -->

      <!-- 结算列表 -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{ getCheckNum }}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{ getTotalPrice }}元</span>
            </li>
            <li>
              <span class="title">活动优惠：</span>
              <span class="value">-{{ getSelling }}元</span>
            </li>
            <li>
              <span class="title">优惠券抵扣：</span>
              <span class="value">-0元</span>
            </li>
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{ getTotalPrice }}</span
                >元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结算列表END -->

      <!-- 结算导航 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/shoppingCart" class="btn-base btn-return"
            >返回购物车</router-link
          >
          <a
            href="javascript:void(0);"
            @click="addOrder"
            class="btn-base btn-primary"
            >结算</a
          >
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Form from "../components/Form.vue";
export default {
  components: { Form },
  name: "",
  data() {
    return {
      confirmAddress: 0, // 选择的地址id,地址高亮区域
      // 地址列表
      address: [],
      //更新地址列表
      updateAddress: {},
      //删除地址确认弹框
      delAddressVisible: false,
      //新增地址信息
      addressForm: {
        name: "",
        isDefault: false,
        phone: "",
        address: "",
      },
      //是否显示添加地址表单
      isShowAddressIn: false,
    };
  },
  created() {
    // 如果没有勾选购物车商品直接进入确认订单页面,提示信息并返回购物车
    if (this.getCheckNum < 1) {
      this.notifyError("请勾选商品后再结算");
      this.$router.push({ path: "/shoppingCart" });
    }
    //获取地址
    this.getAddress();
  },
  computed: {
    // 结算的商品数量; 结算商品总计; 结算商品信息
    ...mapGetters(["getCheckNum", "getTotalPrice", "getCheckGoods"]),
    getSelling() {
      return this.getCheckGoods.reduce(
        (acc, cur) => cur.price - cur.selling_price + acc,
        0
      );
    },
  },
  methods: {
    ...mapActions(["deleteShoppingCart"]),
    //添加订单
    addOrder() {
      if (this.address.length<1) {
        this.notifyError("请填写地址");
        return;
      }
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      this.$axios
        .post("/users/order/addOrder", {
          user_id: this.$store.getters.getUser.uuid,
          products: this.getCheckGoods,
          address: this.address[this.confirmAddress],
        })
        .then((res) => {
          let products = this.getCheckGoods;
          switch (res.data.code) {
            // “001”代表结算成功
            case "001":
              for (let i = 0; i < products.length; i++) {
                const temp = products[i];
                // 删除已经结算的购物车商品
                this.deleteShoppingCart(temp.id);
              }
              // 提示结算结果
              this.notifySucceed(res.data.msg);
              // 跳转我的订单页面
              this.$router.push({ path: "/order" });
              break;
            default:
              // 提示失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    chooseOne(e, index) {
      this.confirmAddress = index;
    },
    setIsShowAdd() {
      this.isShowAddressIn = false;
    },
    setIsShowUpdate() {
      this.address[this.confirmAddress].isShowAddressIn = false;
    },
    //获取地址
    getAddress() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      this.$axios
        .post("/users/getAddress", {
          user_id: this.$store.getters.getUser.uuid,
        })
        .then((res) => {
          this.address = res.data.address?.map((item) => {
            item.isShowAddressIn = false;
            return item;
          });
          this.address = this.address ? this.address : [];
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //添加地址
    addAddress() {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;

      this.$axios
        .post("/users/addAddress", {
          user_id: this.$store.getters.getUser.uuid,
          addressInfos: this.addressForm,
        })
        .then((res) => {
          // 成功
          if (res.data.code === "001") {
            this.address.push(
              ...res.data.address.map((item) => {
                item.isShowAddressIn = false;
                return item;
              })
            );
            this.confirmAddress = this.address.length - 1;
            this.isShowAddressIn = false;
            this.notifySucceed(res.data.msg);
          } else {
            // 弹出通知框提示失败信息
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // //删除地址
    delAddress() {
      const addressID = this.address[this.confirmAddress]._id;
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;

      this.$axios
        .post("/users/delAddress", {
          _id: addressID,
        })
        .then((res) => {
          // 成功
          if (res.data.code === "001") {
            this.address = this.address.filter(
              (item) => item._id !== addressID
            );
            this.confirmAddress = 0;
            this.notifySucceed(res.data.msg);
            this.delAddressVisible = false;
          } else {
            // 弹出通知框提示失败信息
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // //更新地址
    updateAddressFun() {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.getUser.token;
      const _updateAddress = { ...this.updateAddress };
      this.$axios
        .post("/users/updateAddress", {
          _id: this.address[this.confirmAddress]._id,
          addressInfos: this.updateAddress,
        })
        .then((res) => {
          // 成功
          if (res.data.code === "001") {
            const _thisAddress = this.address[this.confirmAddress];
            _thisAddress.name = _updateAddress.name;
            _thisAddress.phone = _updateAddress.phone;
            _thisAddress.address = _updateAddress.address;
            _thisAddress.isDefault = _updateAddress.isDefault;
            _thisAddress.updateDate = _updateAddress.updateDate;
            _thisAddress.isShowAddressIn = false;
            this.notifySucceed(res.data.msg);
          } else {
            // 弹出通知框提示失败信息
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
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  /* 头部CSS */
  .confirmOrder-header {
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
    /* 选择地址CSS */
    .section-address {
      margin: 0 48px;
      overflow: hidden;
      .address-popover {
        position: fixed;
        z-index: 999;
        top: 32%;
        right: 56%;
      }
      .title {
        color: #333;
        font-size: 18px;
        line-height: 20px;
        margin-bottom: 20px;
      }
    }
    .address-body {
      li {
        float: left;
        color: #333;
        width: 220px;
        height: 178px;
        border: 1px solid #e0e0e0;
        padding: 15px 24px 0;
        margin-right: 17px;
        margin-bottom: 24px;
        h2 {
          font-size: 18px;
          font-weight: normal;
          line-height: 30px;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          color: #757575;
        }
        .address {
          padding: 10px 0;
          max-width: 180px;
          max-height: 88px;
          line-height: 22px;
          overflow: hidden;
        }
      }
      .in-section {
        border: 1px solid #ff6700;
      }
      .address-li {
        position: relative;
        .address-com {
          position: absolute;
          top: 12px;
          color: #d0d0d0;
          font-size: 14px;
          &:hover {
            color: #999;
            cursor: pointer;
          }
        }
        .address-edit {
          right: 50px;
        }
        .address-delete {
          right: 10px;
        }
      }
      .add-address {
        text-align: center;
        line-height: 30px;
        i {
          font-size: 30px;
          padding-top: 50px;
          text-align: center;
        }
      }
      .add-address-in {
        width: 400px;
      }
    }
    /* 选择地址CSS END */

    /* 商品及优惠券CSS */
    .section-goods {
      margin: 0 48px;
      p.title {
        color: #333;
        font-size: 18px;
        line-height: 40px;
      }
      .goods-list {
        padding: 5px 0;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        li {
          padding: 10px 0;
          color: #424242;
          overflow: hidden;
          img {
            float: left;
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          .pro-name {
            float: left;
            width: 650px;
            line-height: 30px;
          }
          .pro-price {
            float: left;
            width: 150px;
            text-align: center;
            line-height: 30px;
          }
          .pro-status {
            float: left;
            width: 99px;
            height: 30px;
            text-align: center;
            line-height: 30px;
          }
          .pro-total {
            float: left;
            width: 190px;
            text-align: center;
            color: #ff6700;
            line-height: 30px;
          }
        }
      }
    }
    /* 商品及优惠券CSS END */

    /* 配送方式CSS */
    .section-shipment {
      margin: 0 48px;
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

    /* 发票CSS */
    .section-invoice {
      margin: 0 48px;
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
      .invoice {
        float: left;
        line-height: 38px;
        font-size: 14px;
        margin-right: 20px;
        color: #ff6700;
      }
    }
    /* 发票CSS END */

    /* 结算列表CSS */
    .section-count {
      margin: 0 48px;
      padding: 20px 0;
      overflow: hidden;
      .money-box {
        float: right;
        text-align: right;
        .title {
          float: left;
          width: 126px;
          height: 30px;
          display: block;
          line-height: 30px;
          color: #757575;
        }
        .value {
          float: left;
          min-width: 105px;
          height: 30px;
          display: block;
          line-height: 30px;
          color: #ff6700;
        }
        .total {
          .title {
            padding-top: 15px;
          }
          .value {
            padding-top: 10px;
          }
        }
        .total-price {
          font-size: 30px;
        }
      }
    }
    /* 结算列表CSS END */

    /* 结算导航CSS */
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
    /* 结算导航CSS */
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