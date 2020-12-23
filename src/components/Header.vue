<template>
  <div class="Header">
    <!-- PC版 -->
    <div class="Header_box response">
      <div class="Header_box_left">
        <img :title="$t('header.Home')" @click="toRouter('/')" src="@/assets/img/logo.png" alt="I TAP" />
        <button v-if="routeStatus" @click="toRouter('/')" :class="$route.path == '/' ? 'active' : ''">{{ $t('header.Home') }}</button>
        <button v-if="routeStatus" @click="toRouter('/ProductZone')" :class="$route.path == '/ProductZone' ? 'active' : ''">{{ $t('header.ProductZone') }}</button>
        <button v-if="routeStatus" @click="toRouter('/Partner')" :class="$route.path == '/Partner' ? 'active' : ''">{{ $t('header.Partner') }}</button>
        <button v-if="routeStatus" @click="toRouter('/FAQ')" :class="$route.path == '/FAQ' ? 'active' : ''">{{ $t('header.FAQ') }}</button>
      </div>
      <div class="Header_box_right">
        <button v-if="routeStatus" class="Header_box_right_shoppingCart" @click="toRouter('/ShoppingCart')">
          <img v-if="$route.path != '/ShoppingCart' && $route.path != '/PaymentMessage'" :title="$t('header.ShoppingCart')" class="defaultImg" src="@/assets/img/shoppingCart.png" alt="" />
          <img v-if="$route.path != '/ShoppingCart' && $route.path != '/PaymentMessage'" :title="$t('header.ShoppingCart')" class="selectImg" src="@/assets/img/shoppingCartSelect.png" alt="" />
          <img v-if="$route.path == '/ShoppingCart' || $route.path == '/PaymentMessage'" :title="$t('header.ShoppingCart')" src="@/assets/img/shoppingCartSelect.png" alt="" />
          <div v-if="cartCount > 0">{{cartCount > 99 ? '99+' : cartCount}}</div>
        </button>

        <button v-if="routeStatus">
          <el-dropdown placement="bottom" @command="handleCommand">
            <span class="el-dropdown-link">
              <img :title="$t('header.Personalcenter')" class="defaultImg" src="@/assets/img/PersonalCenter.png" alt="" />
              <img :title="$t('header.Personalcenter')" class="selectImg" src="@/assets/img/PersonalCenterSelect.png" alt="" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- 有token -->
              <el-dropdown-item command="1">{{ $t('header.Personalcenter') }}</el-dropdown-item>
              <el-dropdown-item command="2" divided>
                <span class="loginOut">{{ $t('header.Signout') }}</span>
              </el-dropdown-item>
              <!-- 无token -->
              <!-- <el-dropdown-item command="3">{{ $t('header.Signin') }}</el-dropdown-item>
              <el-dropdown-item command="4" divided>{{ $t('header.registered') }}</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </button>

        <button :class="LanguageSwitchStatus ? 'active' : ''">
          <el-dropdown placement="bottom" @command="handleCommands" @visible-change="LanguageSwitchOpen">
            <span class="el-dropdown-link LanguageSwitch">
              繁中
              <img v-if="!LanguageSwitchStatus" src="@/assets/img/LanguageSwitch.png" alt="" />
              <img v-if="LanguageSwitchStatus" src="@/assets/img/LanguageSwitchSelect.png" alt="" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">繁體中文</el-dropdown-item>
              <el-dropdown-item command="2">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </button>
      </div>
    </div>
    <!-- 手机版 -->
    <div class="Header_phone">
      <img class="Header_phone_logo" @click="toRouter('/')" src="@/assets/img/logo.png" alt="I TAP" />
      <div class="Header_phone_menu" v-if="status">
        <p v-if="routeStatus" @click="toRouter('/')">{{ $t("header.Home") }}</p>
        <p v-if="routeStatus" @click="toRouter('/ProductZone')">{{ $t("header.ProductZone") }}</p>
        <p v-if="routeStatus" @click="toRouter('/Partner')">{{ $t("header.Partner") }}</p>
        <p v-if="routeStatus" @click="toRouter('/FAQ')">{{ $t("header.FAQ") }}</p>
        <p v-if="routeStatus" @click="toRouter('/ShoppingCart')">{{ $t("header.ShoppingCart") }}</p>
        <!-- 有token -->
        <p v-if="routeStatus" @click="toRouter('/DataEditing')">{{ $t("header.Personalcenter") }}</p>
        <p v-if="routeStatus" @click="popupStatus = true">{{ $t("header.Signout") }}</p>
        <!-- 无token -->
        <!-- <p v-if="routeStatus" @click="toRouter('/Login')">{{ $t("header.Signin") }}</p>
        <p v-if="routeStatus" @click="toRouter('/Registered')">{{ $t("header.registered") }}</p> -->
        <p @click="handleCommands(1)">繁體中文</p>
        <p @click="handleCommands(2)">English</p>
      </div>
      <i
        class="Header_phone_icon el-icon-s-fold"
        v-if="!status"
        @click="status = true"
      ></i>
      <i
        class="Header_phone_icon el-icon-s-unfold"
        v-if="status"
        @click="status = false"
      ></i>
    </div>
    
    <!-- 弹窗组件 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box Popup_boxs">
          <img class="Popup_box_imgs" src="@/assets/img/popup2.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('header.Suretologout') }}</h2>
          <div class="Popup_box_buttons">
            <button class="Popup_box_buttons_left" @click="popupStatus = false">{{ $t('header.Cancel') }}</button>
            <button class="Popup_box_buttons_right" @click="SignoutClick()">{{ $t('header.Confirm') }}</button>
          </div>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue";
export default {
  name: "Header",
  components: {
    Popup
  },
  data() {
    return {
      popupStatus: false,
      status: false,
      LanguageSwitchStatus: false,
      routeStatus: false
    }
  },
  computed: {
    cartCount() {
      return this.$store.state.cart.cartCount;
    }
  },
  watch: {
    status: function() {
      if (this.status) {
        this.noScroll()
      } else {
        this.canScroll()
      }
    }
  },
  mounted() {
    if (
      this.$route.path == '/Login' ||
      this.$route.path == '/Registered' ||
      this.$route.path == '/ResetPassword' ||
      this.$route.path == '/ForgetPassword' ||
      this.$route.path == '/VerificationCode'
    ) {
      this.routeStatus = false
    } else {
      this.routeStatus = true
    }
  },
  methods: {
    // 登出
    SignoutClick() {
      this.$router.push('/Login')
    },
    // 个人中心
    handleCommand(command) {
      if (command == 1) {
        this.$router.push("/DataEditing")
      } else if (command == 2) {
        this.popupStatus = true
      } else if (command == 3) {
        this.$router.push("/Login")
      } else if (command == 4) {
        this.$router.push("/Registered")
      }
    },
    // 语言切换
    handleCommands(command) {
      if (command == 2) {
        this.$i18n.locale = "en";
        localStorage.setItem("locale", "en");
      } else {
        this.$i18n.locale = "zh";
        localStorage.setItem("locale", "zh");
      }
      window.location.reload();
    },
    // 下拉框状态
    LanguageSwitchOpen(flag) {
      this.LanguageSwitchStatus = flag
    },
    // 路由跳转
    toRouter(route) {
      this.status = false;
      if (route == this.$route.path) {
        return false;
      }
      if (route == '/ShoppingCart' && this.$route.path == '/PaymentMessage') {
        return false;
      }
      this.$router.push(route);
    }
  }
}
</script>

<style lang="scss">
.el-dropdown-menu {
  width: 166px !important;
  text-align: center !important;
  .loginOut {
    color: #FF3321;
  }
}
.Header {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 120px;
  background: #0C0D0D;
  border-bottom: 1px solid #1F2022;
  .Header_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Header_box_left {
      display: flex;
      align-items: center;
      img {
        cursor: pointer;
        margin-right: 100px;
        width: 98px;
        height: 33px;
      }
      button {
        margin-right: 86px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(242, 242, 242, 0.6);
        line-height: 35px;
      }
      button:hover {
        border-bottom: 1px solid #F2F2F2;
        color: rgba(242, 242, 242, 1);
      }
      .active {
        font-weight: bold;
        border-bottom: 1px solid #F2F2F2;
        color: rgba(242, 242, 242, 1);
      }
      button:last-child {
        margin-right: 0;
      }
    }
    .Header_box_right {
      display: flex;
      align-items: center;
      button {
        margin-left: 100px;
        img {
          width: 30px;
          height: 30px;
        }
        .defaultImg {
          display: block;
        }
        .selectImg {
          display: none;
        }
        .LanguageSwitch {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          display: flex;
          align-items: center;
        }
      }
      // 购物车数字
      .Header_box_right_shoppingCart {
        position: relative;
        div {
          position: absolute;
          top: -4px;
          right: -4px;
          padding: 0 4px;
          height: 16px;
          border-radius: 8px;
          background: #007DFF;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
          font-size: 12px;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 16px;
        }
      }
      button:hover {
        .defaultImg {
          display: none;
        }
        .selectImg {
          display: block;
        }
      }
      // button选中状态
      .active {
        .defaultImg {
          display: none;
        }
        .selectImg {
          display: block;
        }
        .LanguageSwitch {
          color: #F2F2F2;
        }
      }
      button:first-child {
        margin-left: 0;
      }
    }
  }
  .Header_phone {
    display: none;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1440px) {
  .Header {
    .Header_box {
      .Header_box_left {
        img {
          margin-right: 80px;
        }
        button {
          margin-right: 66px;
        }
      }
      .Header_box_right {
        button {
          margin-left: 80px;
        }
      }
    }
  }
}
@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .Header {
    .Header_box {
      .Header_box_left {
        img {
          margin-right: 50px;
        }
        button {
          margin-right: 40px;
        }
      }
      .Header_box_right {
        button {
          margin-left: 50px;
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .Header {
    .Header_box {
      .Header_box_left {
        img {
          margin-right: 30px;
        }
        button {
          margin-right: 20px;
        }
      }
      .Header_box_right {
        button {
          margin-left: 30px;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .Header {
    height: 60px;
    .Header_box {
      display: none;
    }
    .Header_phone {
      padding: 0 20px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .Header_phone_logo {
        cursor: pointer;
        width: 98px;
        height: 33px;
      }
      .Header_phone_menu {
        padding: 20px;
        width: 100%;
        height: 100%;
        background: #0C0D0D;
        position: fixed;
        left: 0;
        top: 60px;
        p {
          font-size: 16px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 35px;
        }
      }
      .Header_phone_icon {
        font-size: 30px;
        color: #ffffff;
      }
    }
  }
}
</style>