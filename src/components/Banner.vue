<template>
    <!-- 顶部banner图 -->
    <div class="Banner">
      <img :src="dataForm.pic" :alt="dataForm.name" :style="dataForm.url ? 'cursor: pointer;' : ''" @click="imgClick(dataForm.url)" />
      <!-- <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in dataList" :key="index">
          <img :src="imgUrl + item.pic" alt="" />
        </swiper-slide>
      </swiper> -->
    </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { POST_GetBanner } from "@/api/api";

export default {
  name: "Banner",
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  data() {
    return {
      dataForm: "",
      // 轮播图配置
      // swiperOption: {
      //   loop: true,
      //   autoplay: {
      //     delay: 3000,//1秒切换一次
      //     disableOnInteraction: false, // 切换后自动轮播
      //   },
      //   grabCursor: true,
      //   slidesPerView: "auto"
      // },
    }
  },
  created() {
    this._GetBanner()
  },
  methods: {
    _GetBanner() {
      POST_GetBanner().then(res => {
        if (res.code == 200) {
          this.dataForm = res.data
        }
      })
    },
    imgClick(url) {
      if (!url) {
        return false
      }
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.Banner {
  margin-bottom: -1px;
  width: 100%;
  img {
    width: 100%;
  }
}
</style>