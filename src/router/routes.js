const routes = {
  // 首页
  Home: () =>
    import(
      /* webpackChunkName: "Home" */
      "@/views/Home/Home.vue"
    ),
  // 产品专区
  ProductZone: () =>
    import(
      /* webpackChunkName: "ProductZone" */
      "@/views/ProductZone/ProductZone.vue"
    ),
  // 产品详情
  ProductZoneDetails: () =>
    import(
      /* webpackChunkName: "ProductZoneDetails" */
      "@/views/ProductZone/ProductZoneDetails.vue"
    ),
  // 合作伙伴
  Partner: () =>
    import(
      /* webpackChunkName: "Partner" */
      "@/views/Partner/Partner.vue"
    ),
  // 常见问题
  FAQ: () =>
    import(
      /* webpackChunkName: "FAQ" */
      "@/views/FAQ/FAQ.vue"
    ),
  // 登录
  Login: () =>
    import(
      /* webpackChunkName: "Login" */
      "@/views/Login/Login.vue"
    ),
  // 注册
  Registered: () =>
    import(
      /* webpackChunkName: "Registered" */
      "@/views/Login/Registered.vue"
    ),
  // 忘记密码
  ForgetPassword: () =>
    import(
      /* webpackChunkName: "ForgetPassword" */
      "@/views/Login/ForgetPassword.vue"
    ),
  // 重设密码
  ResetPassword: () =>
    import(
      /* webpackChunkName: "ResetPassword" */
      "@/views/Login/ResetPassword.vue"
    ),
  // 验证码
  VerificationCode: () =>
    import(
      /* webpackChunkName: "VerificationCode" */
      "@/views/Login/VerificationCode.vue"
    ),
  // 购物车
  ShoppingCart: () =>
    import(
      /* webpackChunkName: "ShoppingCart" */
      "@/views/ShoppingCart/ShoppingCart.vue"
    ),
  // 付款讯息
  PaymentMessage: () =>
    import(
      /* webpackChunkName: "PaymentMessage" */
      "@/views/ShoppingCart/PaymentMessage.vue"
    ),
  // 付款完成
  OrderThanks: () =>
    import(
      /* webpackChunkName: "OrderThanks" */
      "@/views/ShoppingCart/OrderThanks.vue"
    ),

  // 資料編輯
  DataEditing: () =>
    import(
      /* webpackChunkName: "DataEditing" */
      "@/views/PersonalCenter/DataEditing.vue"
    ),
  // 變更密碼
  ChangePassword: () =>
    import(
      /* webpackChunkName: "ChangePassword" */
      "@/views/PersonalCenter/ChangePassword.vue"
    ),
  // 訂單管理
  OrderManagement: () =>
    import(
      /* webpackChunkName: "OrderManagement" */
      "@/views/PersonalCenter/OrderManagement.vue"
    ),

  // 访客
  Access: () =>
    import(
      /* webpackChunkName: "Access" */
      "@/views/Access/Access.vue"
    ),
  // 404
  404: () =>
    import(
      /* webpackChunkName: '404' */
      "@/views/404/404.vue"
    )
  // 404
};

export default routes;
