<!--
 * @Description: 首页组件
 * @Author: lihongzhi
 -->
<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="home-swiper">
      <el-carousel height="462px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <img
            style="height: 100%"
            :src="$target + item.imgPath"
            :alt="item.describes"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->

    <div class="home-main-box">
      <div class="home-main">
        <!-- 书籍商品展示区域 -->
        <div class="book">
          <div class="box-head">
            <div class="box-title">书籍</div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <router-link to>
                <img :src="$target + 'public/imgs/book/book.jpg'" />
              </router-link>
            </div>
            <div class="box-list">
              <Item :list="bookList" :isMore="true"></Item>
            </div>
          </div>
        </div>
        <!-- 书籍商品展示区域END -->

        <!-- 电子设备商品展示区域 -->
        <div class="appliance" id="promo-menu">
          <div class="box-head">
            <div class="box-title">电子设备</div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <ul>
                <li>
                  <img
                    :src="$target + 'public/imgs/appliance2/appliance1.jpg'"
                  />
                </li>
                <li>
                  <img
                    :src="$target + 'public/imgs/appliance2/appliance2.jpg'"
                  />
                </li>
              </ul>
            </div>
            <div class="box-list">
              <Item :list="applianceList" :isMore="true"></Item>
            </div>
          </div>
        </div>
        <!-- 电子设备商品展示区域END -->

        <!-- 娱乐商品展示区域 -->
        <div class="amusement" id="promo-menu">
          <div class="box-head">
            <div class="box-title">娱乐</div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <ul>
                <li>
                  <img
                    :src="$target + 'public/imgs/amusement/amusement1.jpg'"
                    alt
                  />
                </li>
                <li>
                  <img
                    :src="$target + 'public/imgs/amusement/amusement2.jpg'"
                    alt
                  />
                </li>
              </ul>
            </div>
            <div class="box-list">
              <Item :list="amusementList" :isMore="true"></Item>
            </div>
          </div>
        </div>
        <!-- 娱乐商品展示区域END -->

        <!-- 其他宝藏 -->
        <div class="amusement" id="promo-menu">
          <div class="myTest">
            <img :src="$target + 'public/imgs/accessory.jpg'" alt="" />
          </div>
          <div class="box-head">
            <div class="box-title">其他宝藏</div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <ul>
                <li>
                  <img
                    :src="$target + 'public/imgs/accessory/accessory1.jpg'"
                    alt
                  />
                </li>
                <li>
                  <img
                    :src="$target + 'public/imgs/accessory/accessory2.jpg'"
                    alt
                  />
                </li>
              </ul>
            </div>
            <div class="box-list">
              <Item :list="accessoryList" :isMore="true"></Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carousel: [], // 轮播图数据
      bookList: [], // 书籍商品列表
      miTvList: [], // 小米电视商品列表
      applianceList: [], // 家电商品列表
      applianceHotList: [], //热门家电商品列表
      amusementList: [], //配件商品列表
      amusementHotList: [], //热门配件商品列表
      protectingShellList: [], // 保护套商品列表
      accessoryList: [], //其他宝藏列表
      chargerList: [], //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      amusementActive: 1, // 配件当前选中的商品分类
    };
  },
  watch: {
    // 家电当前选中的商品分类，响应不同的商品数据
    applianceActive: function (val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.applianceHotList == "") {
        this.applianceHotList = this.applianceList;
      }
      if (val == 1) {
        // 1为热门商品
        this.applianceList = this.applianceHotList;
        return;
      }
      if (val == 2) {
        // 2为电视商品
        this.applianceList = this.miTvList;
        return;
      }
    },
    amusementActive: function (val) {
      // 页面初始化的时候把amusementHotList(热门配件商品列表)直接赋值给amusementList(配件商品列表)
      // 所以在切换商品列表时判断amusementHotList是否为空,为空则是第一次切换,把amusementList赋值给amusementHotList
      if (this.amusementHotList == "") {
        this.amusementHotList = this.amusementList;
      }
      if (val == 1) {
        // 1为热门商品
        this.amusementList = this.amusementHotList;
        return;
      }
      if (val == 2) {
        // 2为保护套商品
        this.amusementList = this.protectingShellList;
        return;
      }
      if (val == 3) {
        //3 为充电器商品
        this.amusementList = this.chargerList;
        return;
      }
    },
  },
  created() {
    this.carousel = [
      {
        carousel_id: "1",
        imgPath: "public/imgs/cms1.jpg",
      },
      {
        carousel_id: "2",
        imgPath: "public/imgs/cms2.jpg",
      },
      {
        carousel_id: "3",
        imgPath: "public/imgs/cms3.jpg",
      },
    ];

    this.miTvList = this.bookList; // 小米电视商品列表
    // this.applianceList = this.bookList; // 家电商品列表
    this.applianceHotList = this.bookList; //热门家电商品列表
    this.amusementList = this.bookList; //配件商品列表
    this.amusementHotList = this.bookList; //热门配件商品列表
    this.protectingShellList = this.bookList; // 保护套商品列表
    this.chargerList = this.bookList; //充电器商品列表

    this.getPromo("书籍", "bookList");
    this.getPromo("娱乐", "amusementList");
    this.getPromo("电子设备", "applianceList");
    this.getPromo("其他宝藏", "accessoryList");
  },
  // created() {
  //   // 获取轮播图数据
  //   this.$axios
  //     .post("/api/resources/carousel", {})
  //     .then(res => {
  //       this.carousel = res.data.carousel;
  //     })
  //     .catch(err => {
  //       return Promise.reject(err);
  //     });
  //   // 获取各类商品数据
  //   this.getPromo("书籍", "bookList");
  //   this.getPromo("电视机", "miTvList");
  //   this.getPromo("保护套", "protectingShellList");
  //   this.getPromo("充电器", "chargerList");
  //   this.getPromo(
  //     ["电视机", "空调", "洗衣机"],
  //     "applianceList",
  //     "/api/product/getHotProduct"
  //   );
  //   this.getPromo(
  //     ["保护套", "保护膜", "充电器", "充电宝"],
  //     "amusementList",
  //     "/api/product/getHotProduct"
  //   );
  // },
  methods: {
    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.applianceActive = val;
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.amusementActive = val;
    },
    // 获取各类商品数据方法封装
    getPromo(categoryName, val, api) {
      api = api != undefined ? api : "/product/getPromoProduct";
      this.$axios
        .post(api, {
          categoryName,
        })
        .then((res) => {
          this[val] = res.data.Product;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>
<style lang='less'>
@import "../assets/css/index.less";
</style>