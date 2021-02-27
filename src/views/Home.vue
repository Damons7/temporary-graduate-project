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
          <img style="height: 100%" :src="item.imgPath" :alt="item.describes" />
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
                <img :src="$target + 'public/imgs/phone/phone.png'" />
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
            <div class="box-more" id="box-more">
              <Tabs :val="2" @fromChild="getChildMsg">
                <template v-slot:1>
                  <span>手机</span>
                </template>
                <template v-slot:2>
                  <span>电脑</span>
                </template>
              </Tabs>
            </div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <ul>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/appliance/appliance-promo1.png'
                    "
                  />
                </li>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/appliance/appliance-promo2.png'
                    "
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
            <div class="box-more" id="box-more">
              <Tabs :val="3" @fromChild="getChildMsg2">
                <template v-slot:1>
                  <span>热门</span>
                </template>
                <template v-slot:2>
                  <span>保护套</span>
                </template>
                <template v-slot:3>
                  <span>充电器</span>
                </template>
              </Tabs>
            </div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <ul>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/accessory/accessory-promo1.png'
                    "
                    alt
                  />
                </li>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/accessory/accessory-promo2.png'
                    "
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

        <!-- test -->
        <div class="amusement" id="promo-menu">
          <div class="myTest">
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/59e8fc8ba9718c266882719fb4bbcedd.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt="">
          </div>
          <div class="box-head">
            <div class="box-title">test</div>
            <div class="box-more" id="box-more">
              <Tabs :val="3" @fromChild="getChildMsg2">
                <template v-slot:1>
                  <span>热门</span>
                </template>
                <template v-slot:2>
                  <span>保护套</span>
                </template>
                <template v-slot:3>
                  <span>充电器</span>
                </template>
              </Tabs>
            </div>
          </div>
          <div class="box-body">
            <div class="box-promo-list">
              <ul>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/accessory/accessory-promo1.png'
                    "
                    alt
                  />
                </li>
                <li>
                  <img
                    :src="
                      $target + 'public/imgs/accessory/accessory-promo2.png'
                    "
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
        imgPath:
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ef4160c861b998239bce9adb82341e7.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
      },
      {
        carousel_id: "2",
        imgPath:
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4de7a3d707e49a2931d4cd4b4f5c7ed2.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
      },
      {
        carousel_id: "3",
        imgPath:
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b5ed5762d5298d772f55eae0915ed983.jpg?w=2452&h=920",
      },
    ];
    this.bookList = [
      {
        category_id: 1,
        product_id: 1,
        product_intro:
          "120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC",
        product_name: "Redmi K30",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 2000,
        product_sales: 0,
        product_selling_price: 2000,
        product_title: "120Hz流速屏，全速热爱",
      },
      {
        category_id: 1,
        product_id: 2,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NF",
        product_name: "Redmi K30 5G",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 3000,
        product_sales: 0,
        product_selling_price: 3000,
        product_title: "双模5G,120Hz流速屏",
      },
      {
        category_id: 1,
        product_id: 3,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NF",
        product_name: "Redmi K30 5G3",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 3555,
        product_sales: 0,
        product_selling_price: 1599,
        product_title: "双模5G,120Hz流速屏",
      },
      {
        category_id: 1,
        product_id: 4,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NF",
        product_name: "Redmi K30 5G4",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 4000,
        product_sales: 0,
        product_selling_price: 1899,
        product_title: "双模5G,120Hz流速屏",
      },
      {
        category_id: 1,
        product_id: 5,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NF",
        product_name: "Redmi K30 5G5",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 4500,
        product_sales: 0,
        product_selling_price: 4000,
        product_title: "双模5G,120Hz流速屏",
      },
      {
        category_id: 1,
        product_id: 6,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NF",
        product_name: "Redmi K30 5G6",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 4899,
        product_sales: 0,
        product_selling_price: 4000,
        product_title: "双模5G,120Hz流速屏",
      },
      {
        category_id: 1,
        product_id: 7,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NF",
        product_name: "Redmi K30 5G7",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30.png",
        product_price: 5999,
        product_sales: 0,
        product_selling_price: 5999,
        product_title: "双模5G,120Hz流速屏",
      },
    ];
    this.miTvList = this.bookList; // 小米电视商品列表
    this.applianceList = this.bookList; // 家电商品列表
    this.applianceHotList = this.bookList; //热门家电商品列表
    this.amusementList = this.bookList; //配件商品列表
    this.amusementHotList = this.bookList; //热门配件商品列表
    this.protectingShellList = this.bookList; // 保护套商品列表
    this.chargerList = this.bookList; //充电器商品列表

    // this.getPromo("书籍", "bookList");
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