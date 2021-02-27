<!--
 * @Description: 全部商品页面组件(包括全部商品,商品分类,商品搜索)
 * @Author: lihongzhi
 * @Date: 2020-12-27 20:11:20
 * @LastEditors:lihongzhi
 * @LastEditTime: 2021-01-21 12:10:55
 -->
<template>
  <div class="goods">
    <!-- 面包屑 -->
    <div class="goods-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{ search }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="goods-nav">
      <div class="goods-product-nav">
        <div class="goods-nav-title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :name="'' + item.category_id"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="goods-main">
      <div class="goods-list">
        <Item :list="product" v-if="product.length > 0"></Item>
        <div v-else class="goods-none-product">
          抱歉没有找到相关的商品，请看看其他的商品
        </div>
      </div>
      <!-- 分页 -->
      <div class="goods-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      categoryList: [], //分类列表
      categoryID: [], // 分类id
      product: [], // 商品列表
      productList: "",
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "-1", // 分类列表当前选中的id
      search: "", // 搜索条件
    };
  },
  created() {
    // 获取分类列表
    // this.getCategory();
 this.getCategoryTestFromLHZ();//测试
    //TEST lihongzhi
    this.product = [
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
        product_selling_price: 1599,
        product_title: "120Hz流速屏，全速热爱",
      },
      {
        category_id: 1,
        product_id: 2,
        product_intro:
          "双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NFC",
        product_name: "Redmi K30 5G",
        product_num: 10,
        product_picture: "public/imgs/phone/Redmi-k30-5G.png",
        product_price: 2599,
        product_sales: 0,
        product_selling_price: 2599,
        product_title: "双模5G,120Hz流速屏",
      },
      {
        category_id: 1,
        product_id: 3,
        product_intro:
          "1亿像素主摄 / 全场景五摄像头 / 四闪光灯 / 3200万自拍 / 10 倍混合光学变焦，50倍数字变焦 / 5260mAh ⼤电量 / 标配 30W疾速快充 / ⼩米⾸款超薄屏下指纹 / 德国莱茵低蓝光认证 / 多功能NFC / 红外万能遥控 / 1216超线性扬声器",
        product_name: "小米CC9 Pro",
        product_num: 20,
        product_picture: "public/imgs/phone/Mi-CC9.png",
        product_price: 2799,
        product_sales: 0,
        product_selling_price: 2599,
        product_title: "1亿像素,五摄四闪",
      },
      {
        category_id: 1,
        product_id: 4,
        product_intro: "5000mAh超长续航 / 高通骁龙439八核处理器 / 4GB+64GB",
        product_name: "Redmi 8",
        product_num: 20,
        product_picture: "public/imgs/phone/Redmi-8.png",
        product_price: 799,
        product_sales: 0,
        product_selling_price: 699,
        product_title: "5000mAh超长续航",
      },
      {
        category_id: 1,
        product_id: 5,
        product_intro:
          "5000mAh超长续航 / 高通骁龙439八核处理器 / 4GB+64GB / 1200万AI后置相机",
        product_name: "Redmi 8A",
        product_num: 20,
        product_picture: "public/imgs/phone/Redmi-8A.png",
        product_price: 599,
        product_sales: 0,
        product_selling_price: 699,
        product_title: "5000mAh超长续航",
      },
      {
        category_id: 1,
        product_id: 6,
        product_intro: "6400万四摄小金刚拍照新旗舰超强解析力，超震撼",
        product_name: "Redmi Note8 Pro",
        product_num: 20,
        product_picture: "public/imgs/phone/Redmi-Note8-pro.png",
        product_price: 1399,
        product_sales: 0,
        product_selling_price: 1199,
        product_title: "6400万全场景四摄",
      },
      {
        category_id: 1,
        product_id: 7,
        product_intro: "千元4800万四摄 | 高通骁龙665 | 小金刚品质保证",
        product_name: "Redmi Note8",
        product_num: 20,
        product_picture: "public/imgs/phone/Redmi-Note8.png",
        product_price: 999,
        product_sales: 0,
        product_selling_price: 999,
        product_title: "千元4800万四摄",
      },
      {
        category_id: 1,
        product_id: 8,
        product_intro:
          "小巧大电量，持久又流畅骁龙8核高性能处理器 | 4000mAh超长续航 | AI人脸解锁 | 整机防泼溅",
        product_name: "Redmi 7A",
        product_num: 20,
        product_picture: "public/imgs/phone/Redmi-7A.png",
        product_price: 599,
        product_sales: 0,
        product_selling_price: 539,
        product_title: "小巧大电量 持久流畅",
      },
      {
        category_id: 2,
        product_id: 9,
        product_intro:
          "小米电视4A 32英寸 | 64位四核处理器 | 1GB+4GB大内存 | 人工智能系统",
        product_name: "小米电视4A 32英寸",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-4A-32.png",
        product_price: 799,
        product_sales: 0,
        product_selling_price: 799,
        product_title: "人工智能系统，高清液晶屏",
      },
      {
        category_id: 2,
        product_id: 10,
        product_intro:
          "全面屏设计 | 内置小爱同学 | 4K + HDR | 杜比DTS | PatchWall | 海量内容 | 2GB + 8GB大存储 | 64位四核处理器",
        product_name: "小米全面屏电视E55A",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-E55A.png",
        product_price: 2099,
        product_sales: 0,
        product_selling_price: 1899,
        product_title: "全面屏设计，人工智能语音",
      },
      {
        category_id: 2,
        product_id: 11,
        product_intro:
          "人工智能语音系统 | 海量影视内容 | 4K 超高清屏 | 杜比音效 | 64位四核处理器 | 2GB + 8GB大存储",
        product_name: "小米全面屏电视E65A",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-E65A.png",
        product_price: 3999,
        product_sales: 0,
        product_selling_price: 2799,
        product_title: "全面屏设计，人工智能语音",
      },
      {
        category_id: 2,
        product_id: 12,
        product_intro:
          "人工智能语音系统 | FHD全高清屏 | 64位四核处理器 | 海量片源 | 1GB+8GB大内存 | 钢琴烤漆",
        product_name: "小米电视4X 43英寸",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-4X-43.png",
        product_price: 1499,
        product_sales: 0,
        product_selling_price: 1299,
        product_title: "FHD全高清屏，人工智能语音",
      },
      {
        category_id: 2,
        product_id: 13,
        product_intro:
          "人工智能 | 大内存 | 杜比音效 | 超窄边 | 4K HDR | 海量片源 | 纤薄机身| 钢琴烤漆",
        product_name: "小米电视4C 55英寸",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-4C-55.png",
        product_price: 1999,
        product_sales: 0,
        product_selling_price: 1799,
        product_title: "4K HDR，人工智能系统",
      },
      {
        category_id: 2,
        product_id: 14,
        product_intro:
          "人工智能 | 大内存 | 杜比音效 | 超窄边 | 4K HDR | 海量片源 | 纤薄机身| 钢琴烤漆",
        product_name: "小米电视4A 65英寸",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-4A-65.png",
        product_price: 2999,
        product_sales: 0,
        product_selling_price: 2799,
        product_title: "4K HDR，人工智能系统",
      },
      {
        category_id: 2,
        product_id: 15,
        product_intro:
          "纯平背板 | 通体13.9mm | 远场语音 | 4K+HDR | 杜比+DTS | 画框模式 | 内置小爱同学 | PatchWall | SoundBar+低音炮 | 四核处理器+大存储",
        product_name: "小米壁画电视 65英寸",
        product_num: 10,
        product_picture: "public/imgs/appliance/MiTv-ArtTv-65.png",
        product_price: 6999,
        product_sales: 0,
        product_selling_price: 6999,
        product_title: "壁画外观，全面屏，远场语音",
      },
    ];
    this.categoryList = [
      { category_id: 1, category_name: "手机" },
      { category_id: 2, category_name: "电视机" },
      { category_id: 3, category_name: "空调" },
      { category_id: 4, category_name: "洗衣机" },
      { category_id: 5, category_name: "保护套" },
      { category_id: 6, category_name: "保护膜" },
      { category_id: 7, category_name: "充电器" },
      { category_id: 8, category_name: "充电宝" },
    ];
    this.total = 500;
    this.pageSize = 15;
  },
  activated() {
    this.activeName = "-1"; // 初始化分类列表当前选中的id为-1
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    // 如果路由传递了categoryID，则显示对应的分类商品
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.categoryID;
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function (val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        this.categoryID = [Number(val)];
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/goods",
        query: { categoryID: this.categoryID },
      });
    },
    // 监听搜索条件，响应相应的商品
    search: function (val) {
      if (val != "") {
        this.getProductBySearch(val);
      }
    },
    // 监听分类id，响应相应的商品
    categoryID: function () {
      this.getData();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function (val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
      }
    },
  },
  methods: {
    // 返回顶部
    backtop() {
      const timer = setInterval(function () {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBySearch();
      } else {
        this.getData();
      }
      this.backtop();
    },
    // 向后端请求分类列表数据
    getCategory() {
      this.$axios
        .post("/api/product/getCategory", {})
        .then((res) => {
          const val = {
            category_id: 0,
            category_name: "全部",
          };
          const cate = res.data.category;
          cate.unshift(val);
          this.categoryList = cate;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
     // 向后端请求分类列表数据（测试接口）
    getCategoryTestFromLHZ() {
      this.$axios
        .get("/api/admin")
        .then(res => {
         console.log(res,'成功')
        })
        .catch(err => {
            console.log(err,'失败')
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
      const api =
        this.categoryID.length == 0
          ? "/api/product/getAllProduct"
          : "/api/product/getProductByCategory";
      this.$axios
        .post(api, {
          categoryID: this.categoryID,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 通过搜索条件向后端请求商品数据
    getProductBySearch() {
      this.$axios
        .post("/api/product/getProductBySearch", {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>

<style scoped lang='less'>
.goods {
  background-color: #f5f5f5;
  /* 面包屑CSS */
  .goods-breadcrumb {
    height: 50px;
    background-color: white;
    .el-breadcrumb {
      width: 1225px;
      line-height: 30px;
      font-size: 16px;
      margin: 0 auto;
    }
  }
  /* 面包屑CSS END */

  /* 分类标签CSS */
  .goods-nav {
    background-color: white;
    .goods-product-nav {
      width: 1225px;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      .goods-nav-title {
        width: 50px;
        font-size: 16px;
        font-weight: 700;
        float: left;
      }
    }
  }
  /* 分类标签CSS END */

  /* 主要内容区CSS */
  .goods-main {
    margin: 0 auto;
    max-width: 1225px;
    .goods-list {
      min-height: 650px;
      padding-top: 14.5px;
      margin-left: -13.7px;
      overflow: auto;
    }
    .goods-pagination {
      height: 50px;
      text-align: center;
    }
    .goods-none-product {
      color: #333;
      margin-left: 13.7px;
    }
  }
  /* 主要内容区CSS END */
}
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
</style>