<template>
  <div class="Partner">
    <!-- 顶部导航组件 -->
    <Header />
    <!-- 顶部banner图 -->
    <Banner />
    <!-- 顶部轮播 -->
    <!-- <div class="Partner_header">
      <div class="response">
        <div class="Partner_header_content">
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
    </div> -->
    
    <!-- 合作伙伴 -->
    <div class="Partner_center response">
      <h1>{{ $t('Partner.Partner') }}</h1>
      <div>
        <img v-for="(item, index) in dataList" :key="index" :src="item.pic" :alt="item.name" :title="item.name" :style="item.url ? 'cursor: pointer;' : ''" @click="imgClick(item.url)" />
      </div>
      <h2>
        {{ $t('Partner.Welcometojoinus') }}
        <br />
        {{ $t('Partner.Pleasewriteto') }}
      </h2>
      <h3>cooperation@itap.com</h3>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import Banner from "@/components/Banner.vue";
import { POST_GetPartners } from "@/api/api";

export default {
  name: "Partner",
  components: {
    Header,
    Bottom,
    Banner
  },
  data() {
    return {
      dataList: []
    }
  },
  created() {
    this._GetPartners()
  },
  methods: {
    _GetPartners() {
      POST_GetPartners().then(res => {
        if (res.code == 200) {
          this.dataList = res.data.partners
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
};
</script>

<style lang="scss" scoped>
.Partner {
  width: 100%;
  .Partner_header {
    padding: 30px 0 22px;
    background: rgba(12, 13, 13);
    .response {
      display: flex;
      justify-content: center;
      .Partner_header_content {
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
      .Partner_header_content:before {
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
  .Partner_center {
    padding: 50px 90px 60px;
    text-align: center;
    h1 {
      font-size: 34px;
      font-weight: 500;
      color: #353535;
      line-height: 48px;
    }
    div {
      padding: 30px 0 60px;
      display: flex;
      flex-wrap: wrap;
      img {
        margin-top: 30px;
        margin-right: 50px;
        border-radius: 50%;
        width: 200px;
        height: 200px;
      }
      img:nth-child(5n + 5) {
        margin-right: 0;
      }
    }
    h2 {
      font-size: 22px;
      font-weight: 400;
      color: #666666;
      line-height: 32px;
    }
    h3 {
      margin-top: 15px;
      font-size: 30px;
      font-weight: 500;
      color: #353535;
      line-height: 42px;
    }
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1440px) {
  .Partner {
    .Partner_center {
      div {
        img {
          margin-right: 73.33px;
        }
        img:nth-child(4n + 4) {
          margin-right: 0;
        }
        img:nth-child(5n + 5) {
          margin-right: 73.33px;
        }
      }
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .Partner {
    .Partner_center {
    padding: 50px 0 60px;
      div {
        img {
          margin-right: 50.66px;
        }
        img:nth-child(4n + 4) {
          margin-right: 0;
        }
        img:nth-child(5n + 5) {
          margin-right: 50.66px;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .Partner {
    .Partner_center {
    padding: 50px 0 60px;
      div {
        img {
          margin-right: 64px;
        }
        img:nth-child(3n + 3) {
          margin-right: 0;
        }
        img:nth-child(5n + 5) {
          margin-right: 64px;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .Partner {
    .Partner_header {
      .response {
        .Partner_header_content {
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
    .Partner_center {
      padding: 40px 0 50px;
      h1 {
        font-size: 26px;
      }
      div {
        padding: 20px 0 40px;
        img {
          width: calc(47vw - 20px);
          height: calc(47vw - 20px);
          margin-right: 6vw;
          margin-top: 6vw;
        }
        img:nth-child(2n + 2) {
          margin-right: 0;
        }
        img:nth-child(5n + 5) {
          margin-right: 6vw;
        }
      }
      h2 {
        font-size: 18px;
        line-height: 26px;
      }
      h3 {
        font-size: 24px;
        line-height: 30px;
      }
    }
  }
}
</style>
