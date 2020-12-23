<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
// 顶部导航样式适配
#app {
  padding-top: 120px;
}
@media only screen and (max-width: 768px) {
  #app {
    padding-top: 60px;
  }
}
</style>
