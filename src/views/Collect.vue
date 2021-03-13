<!--
 * @Description: 我的收藏页面组件
 * @Author: 李鸿智
 -->
<template>
  <div class="collect">
    <!-- Add a static page for my favorite module -->
    <div class="collect-header">
      <div class="collect-title">
        <i class="el-icon-collection-tag" style="color: #ff6700"></i>
        我的收藏
      </div>
    </div>
    <div class="content">
      <div class="goods-list" v-if="collectList.length > 0">
        <Item :list="collectList" :isDelete="true"></Item>
      </div>
      <!-- 收藏列表为空的时候显示的内容 -->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>您的收藏还是空的！</h2>
          <p>快去购物吧！</p>
        </div>
      </div>
      <!--  收藏列表为空的时候显示的内容END -->
    </div>
  </div>
</template>
<script>
import Item from "../components/Item.vue";
export default {
  components: { Item },
  data() {
    return {
      collectList: [],
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
          this.collectList = res.data.collectList;
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
};
</script>
<style lang='less'>
.collect {
  background-color: #f5f5f5;
  .collect-header {
    height: 64px;
    background-color: #fff;
    border-bottom: 2px solid #ff6700;
    .collect-title {
      width: 1225px;
      margin: 0 auto;
      height: 64px;
      line-height: 58px;
      font-size: 28px;
    }
  }
  .content {
    padding: 20px 0;
    width: 1225px;
    margin: 0 auto;
    .goods-list {
      margin-left: -13.7px;
      overflow: hidden;
    }
  }
  /* 收藏列表为空的时候显示的内容CSS */
  .collect-empty {
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