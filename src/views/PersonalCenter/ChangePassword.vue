<template>
  <div class="ChangePassword">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="ChangePassword_box response">
      <!-- 左侧公用组件 -->
      <Left />
      <div class="ChangePassword_box_content">
        <h1 class="ChangePassword_box_content_h1">{{ $t('ChangePassword.Changepassword') }}</h1>
        <div class="ChangePassword_box_content_div">
          <h2 class="ChangePassword_box_content_div_h2">{{ $t('ChangePassword.Enteryouroriginalpassword') }}</h2>
          <h3 class="ChangePassword_box_content_div_h3">{{ $t('ChangePassword.Pleaseentertheoriginalpassword') }}</h3>
          <div class="ChangePassword_box_content_div_input">
            <input :placeholder="$t('ChangePassword.oldpassword')" v-model="password" v-if="passwordStatus" type="text" />
            <input :placeholder="$t('ChangePassword.oldpassword')" v-model="password" v-if="!passwordStatus" type="password" />
            <img @click="passwordStatus = !passwordStatus" src="@/assets/img/login1.png" alt="" />
          </div>
          <div class="ChangePassword_box_content_div_input">
            <input :placeholder="$t('ChangePassword.newpassword')" v-model="newPassword" v-if="newPasswordStatus" type="text" />
            <input :placeholder="$t('ChangePassword.newpassword')" v-model="newPassword" v-if="!newPasswordStatus" type="password" />
            <img @click="newPasswordStatus = !newPasswordStatus" src="@/assets/img/login1.png" alt="" />
          </div>
          <div class="ChangePassword_box_content_div_input">
            <input :placeholder="$t('ChangePassword.Enterthepasswordagain')" v-model="confirmPassword" v-if="confirmPasswordStatus" type="text" />
            <input :placeholder="$t('ChangePassword.Enterthepasswordagain')" v-model="confirmPassword" v-if="!confirmPasswordStatus" type="password" />
            <img @click="confirmPasswordStatus = !confirmPasswordStatus" src="@/assets/img/login1.png" alt="" />
          </div>
          <div class="ChangePassword_box_content_div_button">
            <button :class="buttonStatus ? 'active' : ''" @click="changePassword()">{{ $t('ChangePassword.Change') }}</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 弹窗组件 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box">
          <img class="Popup_box_img" src="@/assets/img/Popup1.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('ChangePassword.Passwordchangedsuccessfully') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('ChangePassword.Yourpasswordhasbeenchangedsuccessfully') }}</h3>
          <div class="Popup_box_button">
            <button @click="popupClose()">{{ $t('ChangePassword.Confirm') }}</button>
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
import Left from "@/components/Left.vue";
import Popup from "@/components/Popup.vue";

export default {
  name: "ChangePassword",
  components: {
    Header,
    Bottom,
    Left,
    Popup
  },
  data() {
    return {
      popupStatus: false,
      password: "",
      passwordStatus: false,
      newPassword: "",
      newPasswordStatus: false,
      confirmPassword: "",
      confirmPasswordStatus: false,
      buttonStatus: false
    }
  },
  watch: {
    password: function() {
      if (this.password && this.newPassword && this.confirmPassword) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    },
    newPassword: function() {
      if (this.password && this.newPassword && this.confirmPassword) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    },
    confirmPassword: function() {
      if (this.password && this.newPassword && this.confirmPassword) {
        this.buttonStatus = true
      } else {
        this.buttonStatus = false
      }
    }
  },
  methods: {
    // 变更密码
    changePassword() {
      if (!this.buttonStatus) {
        return false
      }
      this.popupStatus = true
    },
    // 变更密码成功弹窗关闭
    popupClose() {
      this.popupStatus = false
    }
  }
};
</script>

<style lang="scss" scoped>
.ChangePassword {
  width: 100%;
  background: #0C0D0D;
  .ChangePassword_box {
    padding: 0 40px;
    height: 749px;
    display: flex;
    .ChangePassword_box_content {
      width: calc(100% - 270px);
      height: 100%;
      background: #1A1B1D;
      .ChangePassword_box_content_h1 {
        padding: 30px 30px 21px 30px;
        font-size: 18px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 25px;
        border-bottom: 1px solid #353535;
      }
      .ChangePassword_box_content_div {
        padding: 30px;
        .ChangePassword_box_content_div_h2 {
          font-size: 16px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 24px;
        }
        .ChangePassword_box_content_div_h3 {
          font-size: 14px;
          font-weight: 500;
          color: rgba($color: #F2F2F2, $alpha: 0.5);
          line-height: 24px;
        }
        .ChangePassword_box_content_div_input {
          margin-top: 20px;
          width: 500px;
          height: 50px;
          position: relative;
          input {
            position: absolute;
            left: 0;
            top: 0;
            padding: 0 50px 0 20px;
            width: 100%;
            height: 100%;
            background: #1F2022;
            border-radius: 4px;
            border: 1px solid #1F2022;
            font-size: 15px;
            font-weight: 500;
            color: #F2F2F2;
            line-height: 21px;
            letter-spacing: 1px;
          }
          input::placeholder {
            color: #666666;
          }
          input:focus{
            border: 1px solid #FF3321;
          }
          img {
            cursor: pointer;
            position: absolute;
            right: 20px;
            top: 13px;
            width: 24px;
            height: 24px;
          }
        }
        .ChangePassword_box_content_div_button {
          margin-top: 150px;
          width: 500px;
          display: flex;
          justify-content: center;
          button {
            width: 300px;
            height: 50px;
            background: #00AD69;
            box-shadow: 0px 8px 20px 0px rgba(12, 13, 13, 0.3);
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
      }
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .ChangePassword {
    .ChangePassword_box {
      padding: 0;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .ChangePassword {
    .ChangePassword_box {
      padding: 0;
      .ChangePassword_box_content {
        width: calc(100% - 220px);
        .ChangePassword_box_content_div {
          .ChangePassword_box_content_div_input {
            width: 100%;
          }
          .ChangePassword_box_content_div_button {
            width: 100%;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .ChangePassword {
    .ChangePassword_box {
      padding: 0;
      height: auto;
      flex-wrap: wrap;
      .ChangePassword_box_content {
        width: 100%;
        .ChangePassword_box_content_h1 {
          text-align: center;
        }
        .ChangePassword_box_content_div {
          padding: 30px 20px;
          .ChangePassword_box_content_div_input {
            width: 100%;
          }
          .ChangePassword_box_content_div_button {
            margin-top: 30px;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
