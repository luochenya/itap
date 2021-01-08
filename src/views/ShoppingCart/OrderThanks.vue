<template>
  <div class="OrderThanks">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="OrderThanks_div response">
      <h2>{{ $t('OrderThanks.purchasingourproducts') }}</h2>
      <h3>{{ $t('OrderThanks.pleasegotothepersonalcenter') }}</h3>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
export default {
  name: "OrderThanks",
  components: {
    Header,
    Bottom
  },
}
</script>

<style lang="scss" scoped>
.OrderThanks {
  height: 80vh;
  background: #0C0D0D;
  .OrderThanks_div {
    padding-top: 200px;
    text-align: center;
    h2 {
      margin-bottom: 24px;
      font-size: 22px;
      font-weight: 500;
      color: #f2f2f2;
      line-height: 30px;
    }
    h3 {
      font-size: 15px;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .OrderThanks {
    .OrderThanks_div {
      h2 {
        margin-top: 40px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>