<template>
  <div class="FAQ">
    <!-- 顶部导航组件 -->
    <Header />
    <!-- 顶部轮播 -->
    <div class="FAQ_header">
      <div class="response">
        <div class="FAQ_header_content">
          <div>
            <h2>Itap Stardust</h2>
            <h3>自我再創新。</h3>
            <h4>
              黑色星期五特賣享受
              <br />
              30％的折扣
            </h4>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="FAQ_content response">
      <h1 class="FAQ_content_h1">{{ $t('FAQ.Videohelp') }}</h1>
      <div class="FAQ_content_swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide
            class="FAQ_content_swiper_swiperSlide"
            v-for="(item, index) in swiperList"
            :key="index"
          >
            <div class="FAQ_content_swiper_swiperSlide_img">
              <img class="img1" :src="item.imgUrl" alt="" />
              <img class="img2" src="@/assets/img/Home_application.png" alt="" />
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
      <div class="FAQ_content_box">
        <div class="FAQ_content_box_left">
          <h1>{{ $t('FAQ.Troubleshoot') }}</h1>
          <h2>{{ $t('FAQ.Solveproblemseveryday') }}</h2>
          <button :class="buttonActive == 0 ? 'active' : ''" @click="buttonClick(0)">{{ $t('FAQ.Register') }}</button>
          <button :class="buttonActive == 1 ? 'active' : ''" @click="buttonClick(1)">{{ $t('FAQ.Shopping') }}</button>
          <button :class="buttonActive == 2 ? 'active' : ''" @click="buttonClick(2)">{{ $t('FAQ.Member') }}</button>
        </div>
        <div class="FAQ_content_box_right">
          <div class="scroll">
            <div class="box" v-for="(item, index) in FAQList" :key="index">
              <div class="box_title">
                <div class="box_title_left">
                  <img src="@/assets/img/FAQ1.png" alt="" />
                  <p>{{item.title}}</p>
                </div>
                <img class="box_title_right" :class="!FAQStatusList[index] ? 'active' : ''" @click="FAQClick(index)" src="@/assets/img/FAQ2.png" alt="" />
              </div>
              <div class="box_content" v-if="FAQStatusList[index]">
                {{item.content}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: "FAQ",
  components: {
    Header,
    Bottom,
    swiper,
    swiperSlide
  },
  data() {
    return {
      buttonActive: 0,
      FAQList: [
        {
          title: "用戶註冊需要錢錢嗎？",
          content: "不用喔，且註冊成為會員後，將能更便利的管理帳戶"
        },
        {
          title: "註冊要錢嗎？",
          content: "不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶不用喔，且註冊成為會員後，將能更便利的管理帳戶"
        },
        {
          title: "用戶註冊需要錢錢嗎？",
          content: "不用喔，且註冊成為會員後，將能更便利的管理帳戶"
        }
      ],
      FAQStatusList: [],
      swiperList: [
        {
          imgUrl: require("@/assets/img/FAQSwiper.png")
        },
        {
          imgUrl: require("@/assets/img/FAQSwiper.png")
        },
        {
          imgUrl: require("@/assets/img/FAQSwiper.png")
        },
        {
          imgUrl: require("@/assets/img/FAQSwiper.png")
        }
      ],
      // 轮播图配置
      swiperOption: {
        // spaceBetween: 40, // 间隔
        grabCursor: true,
        slidesPerView: "auto",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
      },
    }
  },
  mounted() {
    this.FAQList.forEach((item, index) => {
      this.FAQStatusList.splice(index, 0, false)
    })
  },
  methods: {
    buttonClick(num) {
      this.buttonActive = num
    },
    FAQClick(index) {
      this.FAQStatusList.splice(index, 1, !this.FAQStatusList[index])
    }
  }
};
</script>

<style lang="scss" scoped>
.FAQ {
  width: 100%;
  background: #1A1B1D;
  .FAQ_header {
    padding: 30px 0 22px;
    background: rgba(12, 13, 13);
    .response {
      display: flex;
      justify-content: center;
      .FAQ_header_content {
        width: 380px;
        height: 425px;
        position: relative;
        background: url("../../assets/img/ProductZone1.png") no-repeat;
        background-size: cover;
        div {
          z-index: 2;
          position: relative;
          text-align: center;
          padding-top: 75px;
          h2 {
            font-size: 60px;
            font-weight: 500;
            color: #F2F2F2;
            line-height: 84px;
          }
          h3 {
            margin: 8px 0 10px;
            font-size: 38px;
            font-weight: 400;
            color: #C8C8C8;
            line-height: 53px;
          }
          h4 {
            font-size: 20px;
            font-weight: 400;
            color: #666666;
            line-height: 28px;
          }
        }
      }
      .FAQ_header_content:before {
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
    }
  }
  .FAQ_content {
    padding: 50px 40px 100px;
    .FAQ_content_h1 {
      margin-bottom: 40px;
      text-align: center;
      font-size: 34px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 48px;
    }
    .FAQ_content_swiper {
      position: relative;
      .FAQ_content_swiper_swiperSlide {
        width: 422px;
        height: 238px;
        background: rgba(19, 19, 19, 0);
        margin-right: 17px;
        .FAQ_content_swiper_swiperSlide_img {
          width: 100%;
          height: 100%;
          position: relative;
          .img1 {
            width: 100%;
            height: 100%;
          }
          .img2 {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 76px;
            height: 76px;
          }
        }
      }
      .FAQ_content_swiper_swiperSlide:last-child {
        margin-right: 0;
      }
      .swiper-button-next {
        position: absolute;
        right: -42px;
        width: 84px;
        height: 84px;
        background: url("../../assets/img/FAQSwiperRight.png") no-repeat;
        background-position: 0 0;
        background-size: 100%;
      }
      .swiper-button-prev {
        position: absolute;
        left: -42px;
        width: 84px;
        height: 84px;
        background-position: 0 0;
        background: url("../../assets/img/FAQSwiperLeft.png") no-repeat;
        background-size: 100%;
      }
      .swiper-button-prev.swiper-button-disabled,
      .swiper-button-next.swiper-button-disabled {
        opacity: 1;
      }
    }
    .FAQ_content_box {
      margin-top: 50px;
      width: 100%;
      height: 550px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .FAQ_content_box_left {
        padding: 30px 25px;
        width: 250px;
        background: #1F2022;
        border-radius: 4px;
        text-align: center;
        h1 {
          margin-bottom: 11px;
          font-size: 26px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 37px;
        }
        h2 {
          font-size: 10px;
          font-weight: 400;
          color: #9B9B9B;
          line-height: 14px;
        }
        button {
          margin-top: 40px;
          width: 100%;
          height: 50px;
          font-size: 18px;
          font-weight: 500;
          line-height: 25px;
          color: #666666;
        }
        .active {
          color: #F2F2F2;
          background: #00AD69;
          box-shadow: 0px 10px 10px 0px #0C0D0D;
          border-radius: 4px;
        }
      }
      .FAQ_content_box_right {
        width: calc(100% - 270px);
        background: #1F2022;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        .scroll {
          padding: 15px 40px 40px;
          position: absolute;
          left: 0;
          top: 0;
          right: -17px;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          .box {
            padding: 25px 0;
            border-bottom: 1px solid #353535;
            .box_title {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              .box_title_left {
                width: calc(100% - 40px);
                display: flex;
                align-items: flex-start;
                img {
                  margin-right: 10px;
                  width: 24px;
                  height: 24px;
                }
                p {
                  font-size: 20px;
                  font-weight: 500;
                  color: #FFFFFF;
                  line-height: 28px;
                }
              }
              .box_title_right {
                cursor: pointer;
                width: 30px;
                height: 30px;
              }
              .active {
                transform: rotate(180deg);
              }
            }
            .box_content {
              margin-top: 15px;
              width: 100%;
              min-height: 140px;
              background: #1A1B1D;
              border-radius: 4px;
              padding: 30px;
              font-size: 16px;
              font-weight: 400;
              color: #C8C8C8;
              line-height: 29px;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1440px) {
.FAQ {
  .FAQ_content {
    .FAQ_content_swiper {
      .FAQ_content_swiper_swiperSlide {
        width: 362px;
      }
    }
  }
}
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
.FAQ {
  .FAQ_content {
    padding: 50px 0 100px;
    .FAQ_content_swiper {
      .FAQ_content_swiper_swiperSlide {
        width: 306px;
        height: 172px;
      }
      .swiper-button-next {
        width: 60px;
        height: 60px;
        right: -30px;
      }
      .swiper-button-prev {
        width: 60px;
        height: 60px;
        left: -30px;
      }
    }
  }
}
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
.FAQ {
  .FAQ_content {
    padding: 50px 0 100px;
    .FAQ_content_swiper {
      .FAQ_content_swiper_swiperSlide {
        width: 355.5px;
        height: 200.5px;
      }
      .swiper-button-next {
        width: 60px;
        height: 60px;
        right: -30px;
      }
      .swiper-button-prev {
        width: 60px;
        height: 60px;
        left: -30px;
      }
    }
    .FAQ_content_box {
      margin-top: 30px;
      .FAQ_content_box_left {
        width: 200px;
      }
      .FAQ_content_box_right {
        width: calc(100% - 220px);
      }
    }
  }
}
}

@media only screen and (max-width: 768px) {
  .FAQ {
    .FAQ_header {
      .response {
        .FAQ_header_content {
          width: 100%;
          height: 370px;
          div {
            h2 {
              font-size: 40px;
              line-height: 54px;
            }
            h3 {
              font-size: 30px;
              line-height: 40px;
            }
            h4 {
              font-size: 16px;
              line-height: 22px;
            }
          }
        }
      }
    }
    .FAQ_content {
      padding: 30px 0 70px;
      .FAQ_content_h1 {
        margin-bottom: 30px;
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 34px;
      }
      .FAQ_content_swiper {
        .FAQ_content_swiper_swiperSlide {
          width: 100%;
          height: auto;
          .FAQ_content_swiper_swiperSlide_img {
            .img2 {
              width: 50px;
              height: 50px;
            }
          }
        }
        .swiper-button-next {
          display: none;
        }
        .swiper-button-prev {
          display: none;
        }
      }
      .FAQ_content_box {
        margin-top: 30px;
        height: auto;
        .FAQ_content_box_left {
          width: 100%;
          button {
            margin-top: 20px;
          }
        }
        .FAQ_content_box_right {
          margin-top: 20px;
          width: 100%;
          height: 400px;
          .scroll {
            padding: 5px 20px 20px;
            .box {
              padding: 15px 0;
              .box_title {
                .box_title_left {
                  p {
                    font-size: 18px;
                    line-height: 24px;
                  }
                }
              }
              .box_content {
                margin-top: 10px;
                min-height: 100px;
                padding: 15px;
                font-size: 14px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
