<template>
  <div class="ResetPassword">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="ResetPassword_box">
      <h1 class="ResetPassword_box_h1">{{ $t('ResetPassword.resetPassword') }}</h1>
      <div class="ResetPassword_box_content response">
        <h2 class="ResetPassword_box_content_h2">{{ $t('ResetPassword.Fillinnewpassword') }}</h2>
        <h3 class="ResetPassword_box_content_h3">{{ $t('ResetPassword.loginagain') }}</h3>
        <div class="ResetPassword_box_content_input">
          <input v-if="passwordStatus" v-model="password" :placeholder="$t('ResetPassword.Pleaseenterpassword')" type="text" />
          <input v-if="!passwordStatus" v-model="password" :placeholder="$t('ResetPassword.Pleaseenterpassword')" type="password" />
          <img v-if="!passwordStatus" class="ResetPassword_box_content_input_img" src="@/assets/img/login1.png" @click="passwordStatus = !passwordStatus" alt="" />
          <img v-if="passwordStatus" class="ResetPassword_box_content_input_img" src="@/assets/img/login1Select.png" @click="passwordStatus = !passwordStatus" alt="" />
        </div>
        <div class="ResetPassword_box_content_input">
          <input v-if="confirmPasswordStatus" v-model="confirmPassword" :placeholder="$t('ResetPassword.Enterthepasswordagain')" type="text" />
          <input v-if="!confirmPasswordStatus" v-model="confirmPassword" :placeholder="$t('ResetPassword.Enterthepasswordagain')" type="password" />
          <img v-if="!confirmPasswordStatus" class="ResetPassword_box_content_input_img" src="@/assets/img/login1.png" @click="confirmPasswordStatus = !confirmPasswordStatus" alt="" />
          <img v-if="confirmPasswordStatus" class="ResetPassword_box_content_input_img" src="@/assets/img/login1Select.png" @click="confirmPasswordStatus = !confirmPasswordStatus" alt="" />
        </div>
        <div class="ResetPassword_box_content_button">
          <button :class="buttonStatus ? 'active' : ''" @click="Submit()">{{ $t('ResetPassword.Reset') }}</button>
        </div>
        <p class="ResetPassword_box_content_p">
          {{ $t('ResetPassword.Backto') }}
          <button @click="toLogin()">{{ $t('ResetPassword.login') }}</button>
        </p>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box">
          <img class="Popup_box_img" src="@/assets/img/Popup1.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('ResetPassword.Passwordresetsuccessfully') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('ResetPassword.withthenewpassword') }}</h3>
          <div class="Popup_box_button">
            <button @click="toLogin()">{{ $t('ResetPassword.Confirm') }}</button>
          </div>
        </div>
      </template>
    </Popup>

    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import Popup from "@/components/Popup.vue";
import { Message } from "element-ui";
import { POST_SetPassword } from "@/api/api";

export default {
  name: "ResetPassword",
  components: {
    Header,
    Bottom,
    Popup
  },
  data() {
    return {
      popupStatus: false,
      password: "",
      confirmPassword: "",
      passwordStatus: false,
      confirmPasswordStatus: false,
      buttonStatus: false
    }
  },
  watch: {
    password: function() {
      if (this.password && this.confirmPassword) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    },
    confirmPassword: function() {
      if (this.password && this.confirmPassword) {
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
    // 重置
    Submit() {
      if (!this.buttonStatus) {
        return false
      }
      if (this.password != this.confirmPassword) {
        return Message.error(this.$t("message.Thetwopasswordsareinconsistent"));
      }
      const form = {
        email: this.$route.query.mailbox,
        code: this.$route.query.code,
        password: this.password,
        code_token: this.$route.query.code_token
      }
      POST_SetPassword(form).then(res => {
        if (res.code == 200) {
          this.popupStatus = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.ResetPassword {
  width: 100%;
  background: #1A1B1D;
  .ResetPassword_box {
    .ResetPassword_box_h1 {
      height: 100px;
      border-bottom: 1px solid #353535;
      font-size: 30px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 100px;
      text-align: center;
    }
    .ResetPassword_box_content {
      padding: 25px 0 300px;
      width: 410px;
      .ResetPassword_box_content_h2 {
        font-size: 16px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 24px;
      }
      .ResetPassword_box_content_h3 {
        font-size: 16px;
        font-weight: 500;
        color: #C8C8C8;
        line-height: 24px;
      }
      .ResetPassword_box_content_input {
        margin-top: 20px;
        width: 100%;
        height: 50px;
        border-radius: 4px;
        position: relative;
        input {
          position: absolute;
          left: 0;
          padding: 0 50px 0 20px;
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
        .ResetPassword_box_content_input_img {
          cursor: pointer;
          width: 24px;
          height: 24px;
          position: absolute;
          top: 13px;
          right: 20px;
        }
      }
      .ResetPassword_box_content_button {
        margin: 60px 0 10px;
        display: flex;
        justify-content: center;
        button {
          width: 300px;
          height: 50px;
          background: #00AD69;
          box-shadow: 0px 8px 20px 0px rgba(0, 173, 105, 0.3);
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 24px;
          letter-spacing: 1px;
          opacity: 0.3;
        }
        .active {
          opacity: 1;
        }
      }
      .ResetPassword_box_content_p {
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
  .ResetPassword {
    .ResetPassword_box {
      .ResetPassword_box_h1 {
        font-size: 26px;
        height: 80px;
        line-height: 80px;
      }
      .ResetPassword_box_content {
        padding: 25px 0 80px;
        width: 80%;
        .ResetPassword_box_content_button {
          margin: 60px 0 10px;
        }
      }
    }
  }
}
</style>
