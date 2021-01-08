<template>
  <div class="Login">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="Login_box">
      <img class="Login_box_logoImg" src="@/assets/img/login_logo.png" alt="" />
      <p class="Login_box_title">{{ $t('login.mailboxandpassword') }}</p>
      <div class="Login_box_content">
        <h1 class="Login_box_content_title">{{ $t('login.Accountlogin') }}</h1>
        <div class="Login_box_content_input">
          <input type="text" :placeholder="$t('login.yourmailbox')" v-model="mailbox" />
        </div>
        <div class="Login_box_content_input">
          <input v-if="inputStatus" v-model="password" type="text" :placeholder="$t('login.yourpassword')" />
          <input v-if="!inputStatus" v-model="password" type="password" :placeholder="$t('login.yourpassword')" />
          <img v-if="!inputStatus" class="Login_box_content_input_img" src="@/assets/img/login1.png" @click="inputStatus = !inputStatus" alt="" />
          <img v-if="inputStatus"  class="Login_box_content_input_img" src="@/assets/img/login1Select.png" @click="inputStatus = !inputStatus" alt="" />
          <!-- <p class="Login_box_content_input_p" v-if="status">
            <img src="@/assets/img/login2.png" alt="" />
            {{ $t('login.Incorrectaccountorpassword') }}
          </p> -->
        </div>
        <div class="Login_box_content_button">
          <button :class="buttonStatus ? 'active' : ''" @click="SigninClick()">{{ $t('login.Signin') }}</button>
        </div>
        <div class="Login_box_content_operating">
          <button @click="toRegistered()">{{ $t('login.registered') }}</button>
          <span>|</span>
          <button @click="toForgetPassword()">{{ $t('login.forgetpassword') }}</button>
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
import { POST_Login } from "@/api/api";

export default {
  name: "Login",
  components: {
    Header,
    Bottom
  },
  data() {
    return {
      mailbox: "",
      password: "",
      inputStatus: false,
      status: false,
      buttonStatus: false
    }
  },
  watch: {
    mailbox: function() {
      if (this.mailbox && this.password) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    },
    password: function() {
      if (this.mailbox && this.password) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    }
  },
  methods: {
    // 跳转到登录
    toRegistered() {
      this.$router.push('/Registered')
    },
    // 跳转到忘记密码
    toForgetPassword() {
      this.$router.push('/ForgetPassword')
    },
    // 登录
    SigninClick() {
      if (!this.buttonStatus) {
        return false
      }
      const form = {
        username: this.mailbox,
        password: this.password
      }
      POST_Login(form).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.user_info));
          this.status = false
          // 判断有无传值，跳转到之前的页面
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
        } else if (res.code == 101) {
          this.status = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  background: url("../../assets/img/loginBjImg.png") no-repeat;
  background-size: cover;
  .Login_box {
    padding: 108px 0 130px;
    width: 100%;
    text-align: center;
    .Login_box_logoImg {
      width: 98px;
      height: 33px;
    }
    .Login_box_title {
      margin: 5px 0 40px;
      font-size: 16px;
      font-weight: 400;
      color: #C8C8C8;
      line-height: 22px;
    }
    .Login_box_content {
      margin: 0 auto;
      padding: 50px 55px 56px;
      width: 410px;
      background: #1A1B1D;
      box-shadow: 0px 0px 30px 0px #000000;
      border-radius: 4px;
      .Login_box_content_title {
        font-size: 34px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 48px;
        letter-spacing: 2px;
        padding-bottom: 15px;
      }
      .Login_box_content_input {
        margin-top: 15px;
        width: 100%;
        height: 50px;
        background: #0C0D0D;
        border-radius: 4px;
        position: relative;
        input {
          padding: 0 50px 0 30px;
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0C0D0D;
          border-radius: 4px;
          border: 1px solid #0C0D0D;
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
        .Login_box_content_input_img {
          cursor: pointer;
          width: 24px;
          height: 24px;
          position: absolute;
          top: 13px;
          right: 20px;
        }
        .Login_box_content_input_p {
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
      }
      .Login_box_content_button {
        margin-top: 70px;
        margin-bottom: 50px;
        width: 100%;
        height: 50px;
        button {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #22CD8A 0%, #00AD69 100%);
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 22px;
          letter-spacing: 2px;
          opacity: 0.3;
        }
        .active {
          opacity: 1;
        }
      }
      .Login_box_content_operating {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          font-size: 15px;
          font-weight: 500;
          color: #007DFF;
          line-height: 21px;
          letter-spacing: 1px;
        }
        span {
          padding: 0 10px;
          font-size: 12px;
          font-weight: 400;
          color: #C8C8C8;
          line-height: 17px;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .Login {
    .Login_box {
      padding: 38px 0 60px;
      .Login_box_content {
        width: 80%;
        padding: 25px 20px;
        .Login_box_content_title {
          font-size: 26px;
          line-height: 30px;
          padding-bottom: 10px;
        }
        .Login_box_content_input {
          input {
            padding: 0 40px 0 20px;
            font-size: 14px;
          }
          input::placeholder {
            font-size: 14px;
          }
          .Login_box_content_input_img {
            right: 10px;
          }
        }
        .Login_box_content_button {
          margin: 60px 0 30px;
        }
      }
    }
  }
}
</style>
