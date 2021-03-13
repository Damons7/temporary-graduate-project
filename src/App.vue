<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="top-bar">
        <div class="top-nav">
          <el-button type="text">
            <router-link to="/order" tag="div">我的订单</router-link>
          </el-button>
          <el-button type="text">
            <router-link to="/collect" tag="div">我的收藏</router-link>
          </el-button>

          <el-button type="text">
            <router-link to="/shoppingCart" tag="div">
              <i class="el-icon-shopping-cart-full"></i> 购物车
              <span class="num">({{ getNum }})</span>
            </router-link>
          </el-button>
        </div>

        <div class="top-nav" v-if="!this.$store.getters.getUser">
          <el-button type="text" @click="login">登录</el-button>
          <span class="top-sep">|</span>
          <el-button type="text" @click="register = true">注册</el-button>
        </div>
        <div v-else class="top-nav">
          <span class="top-nav-wecome">欢迎</span>
          <router-link to="/user" tag="div" class="top-nav-user">
            {{ this.$store.getters.getUser.userName }}
          </router-link>

          <el-popover
            placement="top"
            width="180"
            v-model="visible"
            class="top-nav-esc"
          >
            <p>确定退出登录吗？</p>
            <div style="text-align: right; margin: 10px 0 0">
              <el-button type="primary" size="mini" @click="logout"
                >确定</el-button
              >
              <el-button size="mini" type="default" @click="visible = false"
                >取消</el-button
              >
            </div>
            <el-button type="text" slot="reference">退出</el-button>
          </el-popover>
        </div>
      </div>

      <!-- 顶部导航栏END -->

      <!-- 顶栏容器 -->
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409eff"
          router
        >
          <div class="header-logo">
            <router-link to="/">
              <img src="./assets/imgs/logo2.png" alt />
            </router-link>
          </div>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/sale">我上架的</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <div class="header-search">
            <el-input
              placeholder="请输入搜索内容"
              autofocus="autofocus"
              v-model="search"
            >
              <template v-slot:append>
                <el-button icon="el-icon-search" @click="searchClick" />
              </template>
            </el-input>
          </div>
        </el-menu>
      </el-header>
      <!-- 顶栏容器END -->

      <!-- 登录模块 -->
      <Login></Login>
      <!-- 注册模块 -->
      <Register :register="register" @fromChild="isRegister"></Register>

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->

      <!-- 底栏容器 -->
      <el-footer>
        <div class="footer">
          <a
            class="footer-github"
            href="https://github.com/Damons7"
            target="_blank"
          >
            <div class="footer-github-but"></div>
          </a>
          <div class="footer-mod_help">
            <router-link to="/">首页</router-link>
            <span>|</span>
            <router-link to="/goods">全部商品</router-link>
            <span>|</span>
            <router-link to="/about">关于我们</router-link>
          </div>
          <p class="footer-coty">商城版权所有 &copy; 2012-2021</p>
        </div>
      </el-footer>
      <!-- 底栏容器END -->
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      register: false, // 是否显示注册组件
      visible: false, // 是否退出登录
    };
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("user")));
    }
    /* window.setTimeout(() => {
      this.$message({
        duration: 0,
        showClose: true,
        message: `
        <p>如果觉得这个项目还不错，</p>
        <p style="padding:10px 0">您可以给项目源代码仓库点Star支持一下，谢谢！</p>
        <p><a href="https://github.com/hai-27/vue-store" target="_blank">Github传送门</a></p>`,
        dangerouslyUseHTMLString: true,
        type: "success"
      });
    }, 1000 * 60); */
  },
  computed: {
    ...mapGetters(["getUser", "getNum"]),
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function (val) {
      if (val === "") {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        // 用户已经登录,获取该用户的购物车信息
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = this.getUser.token;

        this.$axios
          .post("/users/shoppingCart/getShoppingCart", {
            user_id: val.uuid,
          })
          .then((res) => {
            if (res.data.code === "001") {
              // 001 为成功, 更新vuex购物车状态
              this.setShoppingCart(res.data.shoppingCartData);
            } else {
              // 提示失败信息
              this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    },
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.setItem("user", "");
      // 清空vuex登录信息
      this.setUser("");
      this.notifySucceed("成功退出登录");
    },
    // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
    // 点击搜索按钮
    searchClick() {
      if (this.search != "") {
        // 跳转到全部商品页面,并传递搜索条件
        this.$router.push({ path: "/goods", query: { search: this.search } });
        this.search = "";
      }
    },
  },
};
</script>

<style lang='less'>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
  // box-sizing: border-box;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: 300px;
  padding: 20px 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.top-bar {
  height: 50px;
  background-color: #3d3d3d;
  display: flex;
  margin-bottom: 20px;
  .top-nav {
    display: flex;
    align-items: center;
    max-width: 1225px;
    margin: 0 auto;
    .top-nav-wecome {
      color: #b0b0b0;
      font-size: 14px;
      line-height: 14px;
      margin: 0 4px;
    }
    .top-nav-esc {
      margin-left: 20px;
    }
    .top-nav-user {
      cursor: pointer;
      color: #b0b0b0;
      font-size: 14px;
      &:hover {
        color: #fff;
      }
    }
    .el-button {
      cursor: pointer;
      color: #b0b0b0;
      font-size: 14px;
      &:hover {
        color: #fff;
      }
    }
    .top-sep {
      color: #b0b0b0;
      font-size: 12px;
      margin: 0 5px;
    }
  }
}
/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
  .header-logo {
    height: 60px;
    width: 190px;
    float: left;
    margin-right: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-search {
    margin-top: 10px;
    width: 350px;
    float: right;
  }
}
/* 顶栏容器CSS END */

/* 底栏容器CSS */
.footer {
  background: #2f2f2f;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #888;
  .footer-github {
    height: 70px;
    margin-top: 20px;
    .footer-github-but {
      width: 50px;
      height: 50px;
      background: url("./assets/imgs/github.png") no-repeat;
    }
  }
  .footer-mod_help {
    height: 40px;
    a {
      color: #888;
      text-decoration: none;
      &hover {
        color: #fff;
      }
    }
    span {
      padding: 0 18px;
    }
  }
  .footer-coty {
    height: 40px;
  }
}

/* 底栏容器CSS END */
</style>