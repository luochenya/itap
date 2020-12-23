<template>
  <div class="Left">
    <h1>{{ $t('left.Personalcenter') }}</h1>
    <button :class="$route.path == '/DataEditing' ? 'active' : ''" @click="toRouter('/DataEditing')">
      <img v-if="$route.path == '/DataEditing'" src="@/assets/img/DataEditing_selected.png" alt="" />
      <img v-else src="@/assets/img/DataEditing_default.png" alt="" />
      {{ $t('left.Dataediting') }}
    </button>
    <button :class="$route.path == '/ChangePassword' ? 'active' : ''" @click="toRouter('/ChangePassword')">
      <img v-if="$route.path == '/ChangePassword'" src="@/assets/img/ChangePassword_selected.png" alt="" />
      <img v-else src="@/assets/img/ChangePassword_default.png" alt="" />
      {{ $t('left.Changepassword') }}
    </button>
    <button :class="$route.path == '/OrderManagement' ? 'active' : ''" @click="toRouter('/OrderManagement')">
      <img v-if="$route.path == '/OrderManagement'" src="@/assets/img/OrderManagement_selected.png" alt="" />
      <img v-else src="@/assets/img/OrderManagement_default.png" alt="" />
      {{ $t('left.Ordermanagement') }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Left",
  methods: {
    toRouter(route) {
      if (route == this.$route.path) {
        return false
      }
      this.$router.push(route)
    }
  }
};
</script>

<style lang="scss" scoped>
.Left {
  margin-right: 20px;
  width: 250px;
  height: 100%;
  background: #1A1B1D;
  padding: 34px 25px;
  h1 {
    text-align: center;
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #C8C8C8;
    line-height: 37px;
  }
  button {
    margin-top: 35px;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(242,242,242, 0.3);
    line-height: 22px;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .active {
    background: #00AD69;
    color: rgba(242,242,242, 1);
    box-shadow: 0px 10px 10px 0px #0C0D0D;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .Left {
    width: 200px;
  }
}

@media only screen and (max-width: 768px) {
  .Left {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>
