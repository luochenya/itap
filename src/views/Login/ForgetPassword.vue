<template>
  <div class="ForgetPassword">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="ForgetPassword_box">
      <h1 class="ForgetPassword_box_h1">{{ $t('ForgetPassword.forgetpassword') }}</h1>
      <div class="ForgetPassword_box_content response">
        <h2 class="ForgetPassword_box_content_h2">{{ $t('ForgetPassword.Enteryourmailbox') }}</h2>
        <h3 class="ForgetPassword_box_content_h3">{{ $t('ForgetPassword.resetyourpassword') }}</h3>
        <div class="ForgetPassword_box_content_input">
          <input type="text" :placeholder="$t('ForgetPassword.Pleaseenteryourmailbox')" v-model="mailbox" />
        </div>
        <div class="ForgetPassword_box_content_button">
          <button :class="buttonStatus ? 'active' : ''" @click="toVerificationCode()">{{ $t('ForgetPassword.Nextstep') }}</button>
        </div>
        <p class="ForgetPassword_box_content_p">
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
import { POST_ToEmailForget } from "@/api/api";

export default {
  name: "ForgetPassword",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      mailbox: "",
      buttonStatus: false
    }
  },
  watch: {
    mailbox:function() {
      if (this.mailbox) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    }
  },
  methods: {
    // 跳转到登录
    toLogin() {
      this.$router.push('/Login')
    },
    // 下一步
    toVerificationCode() {
      if (!this.buttonStatus) {
        return false
      }
      const form = {
        email: this.mailbox
      }
      POST_ToEmailForget(form).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: "/VerificationCode",
            query: {
              mailbox: this.mailbox
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.ForgetPassword {
  width: 100%;
  background: #1A1B1D;
  .ForgetPassword_box {
    .ForgetPassword_box_h1 {
      height: 100px;
      border-bottom: 1px solid #353535;
      font-size: 30px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 100px;
      text-align: center;
    }
    .ForgetPassword_box_content {
      padding: 25px 0 300px;
      width: 410px;
      .ForgetPassword_box_content_h2 {
        font-size: 16px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 24px;
      }
      .ForgetPassword_box_content_h3 {
        font-size: 16px;
        font-weight: 500;
        color: #C8C8C8;
        line-height: 24px;
      }
      .ForgetPassword_box_content_input {
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-radius: 4px;
        input {
          padding: 0 20px;
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
      }
      .ForgetPassword_box_content_button {
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
      .ForgetPassword_box_content_p {
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
  .ForgetPassword {
    .ForgetPassword_box {
      .ForgetPassword_box_h1 {
        font-size: 26px;
        height: 80px;
        line-height: 80px;
      }
      .ForgetPassword_box_content {
        padding: 25px 0 80px;
        width: 80%;
        .ForgetPassword_box_content_button {
          margin: 60px 0 10px;
        }
      }
    }
  }
}
</style>
