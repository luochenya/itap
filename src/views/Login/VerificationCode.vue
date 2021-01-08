<template>
  <div class="VerificationCode">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="VerificationCode_box">
      <h1 class="VerificationCode_box_h1">{{ $t('ForgetPassword.forgetpassword') }}</h1>
      <div class="VerificationCode_box_content response">
        <h2 class="VerificationCode_box_content_h2">{{ $t('ForgetPassword.Enterconfirmationcode') }}</h2>
        <h3 class="VerificationCode_box_content_h3">{{ $t('ForgetPassword.resetthepassword') }}</h3>
        <div class="VerificationCode_box_content_input">
          <input type="text" :placeholder="$t('ForgetPassword.pleaseenterverificationcode')" v-model="code" />
          <button @click="getCode()">{{ $t('ForgetPassword.Reacquire') }}({{count}}s)</button>
          <p v-if="status">
            <img src="@/assets/img/login2.png" alt="" />
            {{ $t('ForgetPassword.Verificationcodeerror') }}
          </p>
          <div v-if="codeStatus">
            {{ $t('ForgetPassword.beensentto') }} {{this.$route.query.mailbox}}{{ $t('ForgetPassword.mailboxtoreceiveit') }}
            <span></span>
          </div>
        </div>
        <div class="VerificationCode_box_content_button">
          <button :class="buttonStatus ? 'active' : ''" @click="toResetPassword()">{{ $t('ForgetPassword.Nextstep') }}</button>
        </div>
        <p class="VerificationCode_box_content_p">
          {{ $t('ForgetPassword.Backto') }}
          <button @click="toLogin()">{{ $t('ForgetPassword.login') }}</button>
        </p>
      </div>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import { POST_ToEmailForget, POST_EmailForgetVerification } from "@/api/api";

export default {
  name: "VerificationCode",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      show: false,
      count: 60,
      timer: null,
      code: "",
      buttonStatus: false,
      status: false,
      timers: null,
      codeNum: 3,
      codeStatus: true
    }
  },
  watch: {
    code:function() {
      if (this.code) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    }
  },
  created() {
    this.closeCodeTitle()
    this.getCode()
  },
  methods: {
    // 跳转到登录
    toLogin() {
      this.$router.push('/Login')
    },
    // 下一步
    toResetPassword() {
      if (!this.buttonStatus) {
        return false
      }
      const form = {
        email: this.$route.query.mailbox,
        code: this.code
      }
      POST_EmailForgetVerification(form).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: "/ResetPassword",
            query: {
              mailbox: this.$route.query.mailbox,
              code: this.code,
              code_token: res.data.code_token
            }
          })
        } else {
          this.status = true
        }
      })
    },
    // 验证码倒计时
    getCode(){
      if (this.show) {
        const form = {
          email: this.$route.query.mailbox
        }
        POST_ToEmailForget(form).then(res => {})
      }
      const TIME_COUNT = 59;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            this.count = 60
          }
        }, 1000)
      }
    },
    // 三秒后关闭code提示
    closeCodeTitle(){
      const TIME_COUNT = 3;
      if (!this.timers) {
        this.timers = setInterval(() => {
          if (this.codeNum > 0 && this.codeNum <= TIME_COUNT) {
            this.codeNum--;
          } else {
            clearInterval(this.timers);
            // 到时间关闭code提示
            this.codeStatus = false
          }
        }, 1000)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.VerificationCode {
  width: 100%;
  background: #1A1B1D;
  .VerificationCode_box {
    .VerificationCode_box_h1 {
      height: 100px;
      border-bottom: 1px solid #353535;
      font-size: 30px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 100px;
      text-align: center;
    }
    .VerificationCode_box_content {
      padding: 25px 0 300px;
      width: 410px;
      .VerificationCode_box_content_h2 {
        font-size: 16px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 24px;
      }
      .VerificationCode_box_content_h3 {
        font-size: 16px;
        font-weight: 500;
        color: #C8C8C8;
        line-height: 24px;
      }
      .VerificationCode_box_content_input {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-radius: 4px;
        position: relative;
        input {
          position: absolute;
          left: 0;
          padding: 0 125px 0 20px;
          width: 100%;
          height: 100%;
          background: #0C0D0D;
          border: 1px solid #0C0D0D;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 21px;
          letter-spacing: 1px;
        }
        input::placeholder {
          font-size: 15px;
          font-weight: 400;
          color: #666666;
          line-height: 21px;
          letter-spacing: 1px;
        }
        input:focus{
          border: 1px solid #FF3321;
        }
        button {
          position: absolute;
          right: 20px;
          top: 13px;
          font-size: 14px;
          font-weight: 400;
          color: #007DFF;
          line-height: 24px;
        }
        p {
          display: flex;
          align-items: center;
          position: absolute;
          top: 55px;
          left: 0;
          font-size: 13px;
          font-weight: 400;
          color: #FF3321;
          line-height: 18px;
          img {
            width: 24px;
            height: 24px;
            margin-right: 5px;
          }
        }
        div {
          position: absolute;
          bottom: 64px;
          left: 50%;
          transform: translateX(-50%);
          padding: 16px 20px;
          width: 290px;
          background: #FFFFFF;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          font-size: 14px;
          font-weight: 400;
          color: #353535;
          line-height: 24px;
          span {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border: 5px solid;
            border-color: #FFFFFF transparent transparent;
          }
        }
      }
      .VerificationCode_box_content_button {
        margin: 120px 0 10px;
        display: flex;
        justify-content: center;
        button {
          width: 300px;
          height: 50px;
          background: #00AD69;
          box-shadow: 0px 8px 20px 0px rgba(0, 173, 105, 0.3);
          border-radius: 4px;
          opacity: 0.3;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 24px;
          letter-spacing: 1px;
        }
        .active {
          opacity: 1;
        }
      }
      .VerificationCode_box_content_p {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #C8C8C8;
        line-height: 24px;
        button {
          color: #007DFF;
          line-height: 24px;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .VerificationCode {
    .VerificationCode_box {
      .VerificationCode_box_h1 {
        font-size: 26px;
        height: 80px;
        line-height: 80px;
      }
      .VerificationCode_box_content {
        padding: 25px 0 80px;
        width: 80%;
        .VerificationCode_box_content_input {
          div {
            width: 80%;
          }
        }
        .VerificationCode_box_content_button {
          margin: 60px 0 10px;
        }
      }
    }
  }
}
</style>
