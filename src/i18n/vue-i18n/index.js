// 国际化设置
import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "../en";
import zh from "../zh";

Vue.use(VueI18n);
const i18n = new VueI18n({
  // 当前语言环境
  // 设置语言
  // this.$i18n.locale
  locale: localStorage.getItem("locale") || 'zh',
  messages: { zh, en}
});

export default i18n;
