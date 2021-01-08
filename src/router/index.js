import Vue from "vue";
import VueRouter from "vue-router";
import routeMap from "@/router/routes";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "Home",
    component: routeMap["Home"]
  },
  // 产品专区
  {
    path: "/ProductZone",
    name: "ProductZone",
    component: routeMap["ProductZone"]
  },
  // 产品详情
  {
    path: "/ProductZoneDetails",
    name: "ProductZoneDetails",
    component: routeMap["ProductZoneDetails"]
  },
  // 合作伙伴
  {
    path: "/Partner",
    name: "Partner",
    component: routeMap["Partner"]
  },
  // 常见问题
  {
    path: "/FAQ",
    name: "FAQ",
    component: routeMap["FAQ"]
  },
  // 登录
  {
    path: "/Login",
    name: "Login",
    component: routeMap["Login"]
  },
  // 注册
  {
    path: "/Registered",
    name: "Registered",
    component: routeMap["Registered"]
  },
  // 忘记密码
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: routeMap["ForgetPassword"]
  },
  // 重置密码
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    component: routeMap["ResetPassword"]
  },
  // 验证码
  {
    path: "/VerificationCode",
    name: "VerificationCode",
    component: routeMap["VerificationCode"]
  },
  // 购物车
  {
    path: "/ShoppingCart",
    name: "ShoppingCart",
    component: routeMap["ShoppingCart"]
  },
  // 付款讯息
  {
    path: "/PaymentMessage",
    name: "PaymentMessage",
    component: routeMap["PaymentMessage"]
  },
  // 付款完成
  {
    path: "/OrderThanks",
    name: "OrderThanks",
    component: routeMap["OrderThanks"]
  },
  
  // 資料編輯
  {
    path: "/DataEditing",
    name: "DataEditing",
    component: routeMap["DataEditing"]
  },
  // 變更密碼
  {
    path: "/ChangePassword",
    name: "ChangePassword",
    component: routeMap["ChangePassword"]
  },
  // 訂單管理
  {
    path: "/OrderManagement",
    name: "OrderManagement",
    component: routeMap["OrderManagement"]
  },
  
  // 个人信息
  {
    path: "/Access",
    name: "Access",
    component: routeMap["Access"]
  },

  // 404
  {
    path: "/404",
    component: routeMap["404"]
  },
  {
    path: "*",
    redirect: "/404"
  }
  // 404
];

const router = new VueRouter({
  routes
});

export default router;
