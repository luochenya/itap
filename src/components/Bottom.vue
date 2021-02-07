<template>
  <div class="Bottom">
    <div class="Bottom_box response">
      <div class="Bottom_box_smallLogo">
        <img src="@/assets/img/bottomLogo.png" alt="" />
      </div>
      <div class="Bottom_box_left">
        <h1>{{ $t('bottom.contactus') }}</h1>
        <h2>
          <img src="@/assets/img/bottom1.png" alt="" />
          {{ $t('bottom.Address') }}
        </h2>
        <h2>
          <img src="@/assets/img/bottom2.png" alt="" />
          {{ $t('bottom.Contactnumber') }}
        </h2>
        <h2>
          <img src="@/assets/img/bottom3.png" alt="" />
          {{ $t('bottom.email') }}
        </h2>
      </div>
      <div class="Bottom_box_center">
        <img src="@/assets/img/bottomLogo.png" alt="" />
      </div>
      <div class="Bottom_box_right">
        <div>
          <button @click="toPrivacyPolicy()">
            {{ $t('bottom.PrivacyPolicy') }}
          </button>
          <button @click="toMembershipterms()">
            {{ $t('bottom.Membershipterms') }}
          </button>
          <p>
            <img src="@/assets/img/bottom4.png" alt="" />
            <img src="@/assets/img/bottom5.png" alt="" />
            <img src="@/assets/img/bottom6.png" alt="" />
          </p>
        </div>
      </div>
    </div>
    <p class="Bottom_bottom">
      {{ $t('bottom.ItapAllrightsreserved') }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  methods: {
    // 隐私条款
    toPrivacyPolicy() {
      let value = localStorage.getItem("locale") == 'zh' ? 'tw' : localStorage.getItem("locale")
      window.open("https://itap.com.tw/Front/htmlview/7?lang=" + value)
    },
    // 会员条款
    toMembershipterms() {
      let value = localStorage.getItem("locale") == 'zh' ? 'tw' : localStorage.getItem("locale")
      window.open("https://itap.com.tw/Front/htmlview/6?lang=" + value)
    }
  }
}
</script>

<style lang="scss" scoped>
.Bottom {
  width: 100%;
  background: #0C0D0D;
  border-top: 1px solid #1A1B1D;
  .Bottom_box {
    padding-top: 24px;
    height: 160px;
    display: flex;
    justify-content: space-between;
    .Bottom_box_smallLogo {
      display: none;
    }
    .Bottom_box_left {
      width: 33%;
      h1 {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #C8C8C8;
        line-height: 20px;
      }
      h2 {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
        img {
          margin-right: 5px;
          width: 24px;
          height: 24px;
        }
      }
    }
    .Bottom_box_center {
      width: 33%;
      text-align: center;
      padding-top: 10px;
      img {
        width: 154px;
        height: 52px;
      }
    }
    .Bottom_box_right {
      display: flex;
      justify-content: flex-end;
      width: 33%;
      button {
        padding-bottom: 10px;
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
      }
      button:hover {
        font-weight: 500;
        color: #C8C8C8;
        span {
          color: #007DFF;
        }
      }
      p {
        margin-top: 27px;
        img {
          margin-left: 30px;
          cursor: pointer;
          width: 30px;
          height: 30px;
        }
        img:first-child {
          margin-left: 0;
        }
      }
    }
  }
  .Bottom_bottom {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(26, 27, 29, 0.5);
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1440px) {}
@media only screen and (min-width: 992px) and (max-width: 1200px) {}
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .Bottom {
    .Bottom_box {
      flex-wrap: wrap;
      height: auto;
      padding: 20px 0;
      .Bottom_box_smallLogo {
        display: block;
        width: 100%;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 20px;
        img {
          width: 154px;
          height: 52px;
        }
      }
      .Bottom_box_left {
        width: 60%;
      }
      .Bottom_box_center {
        display: none;
      }
      .Bottom_box_right {
        width: 40%;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .Bottom {
    .Bottom_box {
      flex-wrap: wrap;
      height: auto;
      padding: 20px 0;
      .Bottom_box_smallLogo {
        display: block;
        width: 100%;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 20px;
        img {
          width: 154px;
          height: 52px;
        }
      }
      .Bottom_box_left {
        width: 100%;
      }
      .Bottom_box_center {
        display: none;
      }
      .Bottom_box_right {
        margin-top: 20px;
        width: 100%;
        display: block;
        button {
          width: 100%;
          text-align: center;
        }
        p {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>