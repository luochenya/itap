<template>
  <div class="Home">
    <!-- 顶部导航组件 -->
    <Header />
    <!-- 顶部banner图 -->
    <Banner />
    <!-- 顶部BANNER图 -->
    <!-- <div class="Home_banner">
      <div class="response">
        <h1>Itap Stardust</h1>
        <h2>自我再創新。</h2>
        <h3>
          黑色星期五特賣享受
          <br>
          30％的折扣
        </h3>
        <img src="@/assets/img/home1.png" alt="" />
      </div>
    </div> -->
    <!-- 轮播图 -->
    <div class="Home_swiper">
      <div class="response">
        <div class="Home_swiper_title">
          <h1>產品特色</h1>
          <h6>FEATURES</h6>
        </div>
        <h2 class="Home_swiper_h2">
          首先，NFC是一種提供輕鬆、安全、迅速的通信的無線連接技術，其傳輸範圍比RFID小，RFID的傳輸範圍可以達到幾米
          <br />
          甚至幾十米，但由於NFC探取了獨特的信號衰減技術，相對於RFID來說NFC具有距離近、帶寬高、能耗低等特點。
        </h2>
        <!-- 大屏 -->
        <div class="carousel-card-page">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrapper">
            <swiper-slide v-for="(item, index) in imgList" :key="index">
              <div class="swiper-item">
                <img :src="item.imgUrl" alt="">
                <h2>{{item.title}}</h2>
                <h3>{{item.content}}</h3>
              </div>
            </swiper-slide>
          </swiper>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <!-- 分享平台 -->
    <div class="Home_platform">
      <div class="response">
        <div class="Home_platform_title">
          <h1>分享平台</h1>
          <h6>SHARE</h6>
        </div>
        <h2 class="Home_platform_h2">
          首先，NFC是一種提供輕鬆、安全、迅速的通信的無線連接技術，其傳輸範圍比RFID小
          <br />
          RF相對於RFID來說NFC具有距離近、帶寬高、能耗低等特點。
        </h2>
        <div class="Home_platform_img">
          <img src="@/assets/img/Home_platform1.png" alt="" />
          <img src="@/assets/img/Home_platform1.png" alt="" />
          <img src="@/assets/img/Home_platform1.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 生活运用 -->
    <div class="Home_application">
      <div class="response">
        <div class="Home_application_title">
          <h1>生活運用</h1>
          <h6>APPLICATION</h6>
        </div>
        <h2 class="Home_application_h2">
          有i Tap，沒有什麼能夠阻擋你和我
        </h2>
      </div>
      <div class="Home_application_img">
        <img class="Home_application_img_bg" src="@/assets/img/Home_application1.png" alt="" />
        <!-- 播放按钮 -->
        <!-- <img class="Home_application_img_button" src="@/assets/img/Home_application.png" alt=""> -->
      </div>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import Banner from "@/components/Banner.vue";

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "Home",
  components: {
    Header,
    Bottom,
    Banner,
    swiper,
    swiperSlide
  },
  data() {
    return {
      imgList: [
        {
          imgUrl: require("@/assets/img/swiper1.png"),
          title: "凌靜鑰匙扣",
          content: "·精緻、美觀·"
        },
        {
          imgUrl: require("@/assets/img/swiper1.png"),
          title: "波普三重奏",
          content: "·便捷、安全、美觀·"
        },
        {
          imgUrl: require("@/assets/img/swiper1.png"),
          title: "黑色鑰匙扣",
          content: "·精緻、美觀、精緻·"
        }
      ],
      swiperOption: {
        loop: true,
        autoplay: {
            delay: 3000,//1秒切换一次
            disableOnInteraction: false, // 切换后自动轮播
        },
        grabCursor: true,
        initialSlide: 1,
        effect: "coverflow",
        slidesPerView: 'auto', 
        centeredSlides: true, // 选中slides 居中
        clickable: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 100,
          depth: 400,
          modifier: 1,
          slideShadows: false
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
      },
    }
  }
};
</script>

<style lang="scss">
.Home {
  width: 100%;
  .Home_banner {
    background: #0C0D0D;
    padding-top: 105px;
    height: 900px;
    text-align: center;
    h1 {
      font-size: 60px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 84px;
    }
    h2 {
      margin: 8px 0 10px;
      font-size: 38px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #C8C8C8;
      line-height: 53px;
    }
    h3 {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 28px;
    }
    img {
      margin-top: 40px;
      width: 472px;
      height: 438px;
    }
  }
  .Home_swiper {
    background: #ffffff;
    width: 100%;
    padding: 90px 0 110px;
    text-align: center;
    background: url("../../assets/img/swiperBac.png") no-repeat;
    background-size: cover;
    .Home_swiper_title {
      height: 70px;
      h1 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        font-size: 34px;
        font-weight: bold;
        color: #353535;
        line-height: 48px;
      }
      h6 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 13px;
        font-size: 50px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 70px;
      }
    }
    .Home_swiper_h2 {
      margin-bottom: 70px;
      font-size: 16px;
      font-weight: 400;
      color: #666666;
      line-height: 30px;
    }
    .carousel-card-page {
      width: 100%;
      height: 560px;
      position: relative;
      .swiper-wrapper {
        width: 100%;
        height: 480px;
        padding-bottom: 80px;
        .swiper-slide {
          width: 745px;
          height: 480px;
          background: #FFFFFF;
          box-shadow: 0 8px 30px #ddd;
          border-radius: 4px;
          .swiper-item {
            width: 100%;
            height: 100%;
            padding-top: 40px;
            img {
              width: 380px;
              height: 380px;
            }
            h2 {
              margin-top: -60px;
              margin-bottom: 5px;
              font-size: 34px;
              font-weight: 500;
              color: #353535;
              line-height: 48px;
            }
            h3 {
              font-size: 18px;
              font-weight: 500;
              color: #007DFF;
              line-height: 25px;
            }
          }
        }
      }
      .swiper-pagination {
        width: auto;
        left: 50%;
        transform: translateX(-50%);
        bottom: -30px;
        font-size: 34px;
        font-weight: 400;
        color: #666666;
        line-height: 48px;
        .swiper-pagination-current {
          font-size: 34px;
          font-weight: 500;
          color: #353535;
          line-height: 48px;
        }
        .swiper-pagination-total {
          font-size: 24px;
          font-weight: 400;
          color: #666666;
          line-height: 33px;
        }
      }
      .swiper-button-next {
        position: absolute;
        top: auto;
        bottom: -15px;
        left: 55%;
        right: auto;
        width: 32px;
        height: 20px;
        background: url("../../assets/img/swiperRight.png") no-repeat;
        background-position: 0 0;
        background-size: 100%;
      }
      .swiper-button-prev {
        position: absolute;
        top: auto;
        bottom: -15px;
        left: auto;
        right: 55%;
        width: 32px;
        height: 20px;
        background-position: 0 0;
        background: url("../../assets/img/swiperLeft.png") no-repeat;
        background-size: 100%;
      }
    }

  }
  .Home_platform {
    width: 100%;
    padding: 90px 0 130px;
    position: relative;
    background: url("../../assets/img/Home_platform_bg.png") no-repeat;
    background-size: cover;
    background-attachment: fixed;
    .response {
      position: relative;
      z-index: 2;
    }
    .Home_platform_title {
      height: 70px;
      text-align: center;
      h1 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        font-size: 34px;
        font-weight: bold;
        color: #F2F2F2;
        line-height: 48px;
      }
      h6 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 13px;
        font-size: 50px;
        font-weight: 500;
        color: rgba($color: #F2F2F2, $alpha: 0.2);
        line-height: 70px;
      }
    }
    .Home_platform_h2 {
      text-align: center;
      margin-bottom: 70px;
      font-size: 16px;
      font-weight: 400;
      color: #C8C8C8;
      line-height: 30px;
    }
    .Home_platform_img {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 30.87%;
        border-radius: 4px;
      }
    }
  }
  .Home_platform:before {
    content: "";
    background: #0C0D0D;
    opacity: 0.7;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: 1;
  }
  .Home_application {
    width: 100%;
    background: #0C0D0D;
    .response {
      padding: 90px 0 70px;
    }
    .Home_application_title {
      height: 70px;
      text-align: center;
      h1 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        font-size: 34px;
        font-weight: bold;
        color: #F2F2F2;
        line-height: 48px;
      }
      h6 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 13px;
        font-size: 50px;
        font-weight: 500;
        color: rgba($color: #F2F2F2, $alpha: 0.2);
        line-height: 70px;
      }
    }
    .Home_application_h2 {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #C8C8C8;
      line-height: 30px;
    }
    .Home_application_img {
      width: 100%;
      position: relative;
      .Home_application_img_bg {
        width: 100%;
      }
      .Home_application_img_button {
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .Home {
    .Home_swiper {
      .carousel-card-page {
        .swiper-button-next {
          left: 60%;
        }
        .swiper-button-prev {
          right: 60%;
        }
      }
    }
    .Home_application {
      .Home_application_img {
        .Home_application_img_button {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .Home {
    .Home_banner {
      padding: 80px 0 40px;
      height: auto;
      h1 {
        font-size: 30px;
        line-height: 42px;
      }
      h2 {
        font-size: 19px;
        line-height: 26px;
      }
      h3 {
        font-size: 14px;
        line-height: 24px;
      }
      img {
        margin-top: 20px;
        width: 70%;
        height: auto;
      }
    }
    .Home_swiper {
      padding: 60px 0 110px;
      .Home_swiper_title {
        height: 60px;
        h1 {
          font-size: 30px;
        }
        h6 {
          margin-top: 5px;
          font-size: 40px;
        }
      }
      .Home_swiper_h2 {
        margin-bottom: 0;
        font-size: 14px;
        line-height: 26px;
      }
      .carousel-card-page {
        .swiper-wrapper {
          .swiper-slide {
            width: 100%;
            .swiper-item {
              img {
                width: 100%;
                height: auto;
              }
              h2 {
                margin-top: -40px;
                margin-bottom: 5px;
                font-size: 30px;
                font-weight: 500;
                color: #353535;
                line-height: 40px;
              }
              h3 {
                font-size: 16px;
                font-weight: 500;
                color: #007DFF;
                line-height: 25px;
              }
            }
          }
        }
        .swiper-button-next {
          left: 70%;
        }
        .swiper-button-prev {
          right: 70%;
        }
      }
    }
    .Home_platform {
      padding: 60px 0 110px;
      .Home_platform_title {
        height: 60px;
        h1 {
          font-size: 30px;
        }
        h6 {
          margin-top: 5px;
          font-size: 40px;
        }
      }
      .Home_platform_h2 {
        margin-bottom: 0;
        font-size: 14px;
        line-height: 26px;
      }
      .Home_platform_img {
        flex-wrap: wrap;
        img {
          margin-top: 20px;
          width: 100%;
        }
      }
    }
    .Home_application {
      .response {
        padding: 60px 30px;
      }
      .Home_application_title {
        height: 60px;
        h1 {
          font-size: 30px;
        }
        h6 {
          margin-top: 5px;
          font-size: 40px;
        }
      }
      .Home_application_h2 {
        font-size: 14px;
        line-height: 26px;
      }
      .Home_application_img {
        .Home_application_img_button {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>