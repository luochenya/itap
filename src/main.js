import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/vue-i18n";
import {Thousands} from "./utils/Thousands";
import "@/assets/css/index.scss"; 
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Pagination,
  Upload
} from "element-ui";

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Pagination);
Vue.use(Upload);


Vue.prototype.$Thousands = Thousands; 

Vue.config.productionTip = false;

// 跳转路由回到页面顶部
router.afterEach(() => {
  window.scrollTo(0, 0);
});

// 資金流跳轉路径
if (process.env.NODE_ENV == "development") {
  Vue.prototype.$priceUrl = "http://itap.com.tw/";
} else {
  Vue.prototype.$priceUrl =
    window.location.protocol + "//" + window.location.host + "/";
}

// 彈出框禁止滑動
Vue.prototype.noScroll = function () {
  const mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止頁面滑動
}
// 彈出框可以滑動
Vue.prototype.canScroll = function () {
  const mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = '' // 出現滾動條
  document.removeEventListener('touchmove', mo, false)
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
