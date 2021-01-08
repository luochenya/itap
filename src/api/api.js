import { post, update, get } from "./request";

// 图片上传
// 图片上传
// 图片上传
export const POST_FileUploadUserHead = p => update("/web/Member/file_upload_user_head", p);
// 图片上传

// 登录
// 登录
export const POST_Login = p => post("/web/Overt/login", p);
// 登录

// 注册
// 注册
export const POST_Regedit = p => post("/web/Overt/regedit", p);
// 注册

// 获取邮箱验证码
// 获取邮箱验证码
export const POST_ToEmailForget = p => post("/web/Overt/to_email_forget", p);
// 获取邮箱验证码

// 验证邮箱验证码
// 验证邮箱验证码
export const POST_EmailForgetVerification = p => post("/web/Overt/email_forget_verification", p);
// 验证邮箱验证码

// 邮箱验证成功 修改密码
// 邮箱验证成功 修改密码
export const POST_SetPassword = p => post("/web/Overt/set_password", p);
// 邮箱验证成功 修改密码

// 个人中心 修改密码
// 个人中心 修改密码
export const POST_UpdatePassword = p => post("/web/Member/update_password", p);
// 个人中心 修改密码

// 个人中心 更新个人资料
// 个人中心 更新个人资料
export const POST_SetUserInfo = p => post("/web/Member/set_user_info", p);
// 个人中心 更新个人资料

// 个人中心 获取订单管理
// 个人中心 获取订单管理
export const POST_MyOrder = p => post("/web/Member/my_order", p);
// 个人中心 获取订单管理

// 个人中心 取消订单
// 个人中心 取消订单
export const POST_CancelOrder = p => post("/web/Member/cancel_order", p);
// 个人中心 取消订单

// 获取banner
// 获取banner
export const POST_GetBanner = p => post("/web/Overt/get_banner", p);
// 获取banner

// 产品专区 获取产品列表
// 产品专区 获取产品列表
export const POST_GetProductList = p => post("/web/Overt/get_product_list", p);
// 产品专区 获取产品列表

// 产品专区 获取推荐产品列表
// 产品专区 获取推荐产品列表
export const POST_GetRecommendProductList = p => post("/web/Overt/get_recommend_product_list", p);
// 产品专区 获取推荐产品列表

// 合作伙伴 获取合作伙伴
// 合作伙伴 获取合作伙伴
export const POST_GetPartners = p => post("/web/Overt/get_partners", p);
// 合作伙伴 获取合作伙伴

// 常见问题 获取常见问题
// 常见问题 获取常见问题
export const POST_GetFqas = p => post("/web/Overt/get_faqs", p);
// 常见问题 获取常见问题

// 社群资料 根据用户id获取社群资料
// 社群资料 根据用户id获取社群资料
export const POST_GetUserCommunityList = p => post("/web/Overt/get_user_community_list/" + p);
// 社群资料 根据用户id获取社群资料

// 获取购物车
// 获取购物车
export const POST_GetCart = p => post("/web/Member/get_cart",  p);
// 获取购物车

// 更新购物车
// 更新购物车
export const POST_UpdateCart = p => post("/web/Member/update_cart",  p);
// 更新购物车

// 移除购物车
// 移除购物车
export const POST_RemoveCart = p => post("/web/Member/remove_cart",  p);
// 移除购物车

// 加入购物车
// 加入购物车
export const POST_AddCart = p => post("/web/Member/add_cart",  p);
// 加入购物车

// 验证折扣码
// 验证折扣码
export const POST_CheckDiscount = p => post("/web/Member/check_discount",  p);
// 验证折扣码

// 订单下单
// 订单下单
export const POST_AddOrder = p => post("/web/Member/add_order",  p);
// 订单下单