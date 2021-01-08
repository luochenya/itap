<template>
  <div class="Registered">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="Registered_box">
      <h1 class="Registered_box_h1">{{ $t('Registered.ITapaccountregistration') }}</h1>
      <div class="Registered_box_content response">
        <h2 class="Registered_box_content_h2">{{ $t('Registered.yourinformation') }}</h2>
        <h3 class="Registered_box_content_h3">{{ $t('Registered.facilitateaccountcreation') }}</h3>
        <div class="Registered_box_content_input">
          <input type="text" :placeholder="$t('Registered.pleaseenterusername')" v-model="userName" />
        </div>
        <div class="Registered_box_content_input">
          <input type="text" :placeholder="$t('Registered.Pleaseentermailbox')" v-model="mailbox" />
        </div>
        <div class="Registered_box_content_input">
          <input type="text" :placeholder="$t('Registered.Pleaseenterpassword')" v-model="password" />
        </div>
        <div class="Registered_box_content_button">
          <button :class="buttonStatus ? 'active' : ''" @click="Submit()">{{ $t('Registered.Register') }}</button>
        </div>
        <p class="Registered_box_content_p">
          {{ $t('Registered.clickhere') }}
          <button @click="toLogin()">{{ $t('Registered.Signin') }}</button>
        </p>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box">
          <img class="Popup_box_img" src="@/assets/img/Popup1.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('Registered.registrationsuccess') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('Registered.pleaselogin') }}</h3>
          <div class="Popup_box_button">
            <button @click="toLogin()">{{ $t('Registered.Confirm') }}</button>
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
import { POST_Regedit } from "@/api/api";

export default {
  name: "Registered",
  components: {
    Header,
    Bottom,
    Popup
  },
  data() {
    return {
      buttonStatus: false,
      popupStatus: false,
      userName: "",
      mailbox: "",
      password: "",
    }
  },
  watch: {
    userName:function() {
      this.buttonChange()
    },
    mailbox:function() {
      this.buttonChange()
    },
    password:function() {
      this.buttonChange()
    }
  },
  methods: {
    // 判断显示注册按钮样式
    buttonChange() {
      if (this.userName && this.mailbox && this.password) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    },
    // 跳转到登录
    toLogin() {
      this.$router.push('/Login')
    },
    // 注册
    Submit() {
      if (!this.buttonStatus) {
        return false
      }
      const form = {
        nick_name: this.userName,
        email: this.mailbox,
        password: this.password
      }
      POST_Regedit(form).then(res => {
        if (res.code == 200) {
          this.popupStatus = true
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.Registered {
  width: 100%;
  background: #1A1B1D;
  .Registered_box {
    .Registered_box_h1 {
      height: 100px;
      border-bottom: 1px solid #353535;
      font-size: 30px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 100px;
      text-align: center;
    }
    .Registered_box_content {
      padding: 25px 0 300px;
      width: 410px;
      .Registered_box_content_h2 {
        font-size: 16px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 24px;
      }
      .Registered_box_content_h3 {
        font-size: 16px;
        font-weight: 500;
        color: #C8C8C8;
        line-height: 24px;
      }
      .Registered_box_content_input {
        margin-top: 20px;
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
      .Registered_box_content_button {
        margin: 60px 0 10px;
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
      .Registered_box_content_p {
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
  .Registered {
    .Registered_box {
      .Registered_box_h1 {
        font-size: 26px;
        height: 80px;
        line-height: 80px;
      }
      .Registered_box_content {
        padding: 25px 0 80px;
        width: 80%;
        .Registered_box_content_button {
          margin: 60px 0 10px;
        }
      }
    }
  }
}
</style>
