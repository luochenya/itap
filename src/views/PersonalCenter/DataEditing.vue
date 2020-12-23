<template>
  <div class="DataEditing">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="DataEditing_box response">
      <!-- 左侧公用组件 -->
      <Left />
      <div class="DataEditing_box_content">
        <h1 class="DataEditing_box_content_h1">{{ $t('DataEditing.Personalmessage') }}</h1>
        <div class="DataEditing_box_content_div">
          <div class="headerImg">
            <div class="headerImg_update">
              <el-upload action="" :http-request="fileChange">
                  <img class="img" src="@/assets/img/headerImg.png" alt="" />
                  <img class="imgUpdate" src="@/assets/img/headerImgUpdate.png" alt="" />
              </el-upload>
            </div>
            <div class="headerImg_userName">
              <p>Devin Tucker</p>
              <span>ID：850010332@qq.com</span>
            </div>
          </div>
          <div class="userData">
            <div class="userData_left">
              <p class="userData_left_p">{{ $t('DataEditing.username') }}</p>
              <input class="userData_left_input" type="text" v-model="userName" />
              <p class="userData_left_p">{{ $t('DataEditing.aboutme') }}</p>
              <textarea class="userData_left_textarea" v-model="aboutMe"></textarea>
            </div>
            <div class="userData_right">
              <p class="userData_right_p">{{ $t('DataEditing.Publicaccount') }}</p>
              <div class="userData_right_button">
                <button :class="accountStatus ? 'active' : ''" @click="accountClick(true)">
                  <img v-if="accountStatus" src="@/assets/img/PublicAccount_selected.png" alt="" />
                  <img v-else src="@/assets/img/PublicAccount_default.png" alt="" />
                  {{ $t('DataEditing.public') }}
                </button>
                <button :class="!accountStatus ? 'active' : ''" @click="accountClick(false)">
                  <img v-if="!accountStatus" src="@/assets/img/PublicAccount_selected.png" alt="" />
                  <img v-else src="@/assets/img/PublicAccount_default.png" alt="" />
                  {{ $t('DataEditing.private') }}
                </button>
              </div>
              <h3 class="userData_right_h3">{{ $t('DataEditing.Aftermakingitpublic') }}</h3>
              <h4 class="userData_right_h4" @click="toWebsite()">itapme.com/wow</h4>
            </div>
          </div>
          <div class="storeButton">
            <button @click="storeClick()">{{ $t('DataEditing.Store') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box">
          <img class="Popup_box_img" src="@/assets/img/Popup1.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('DataEditing.Datasavedsuccessfully') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('DataEditing.pleaserefreshthepage') }}</h3>
          <div class="Popup_box_button">
            <button @click="popupClose()">{{ $t('DataEditing.Confirm') }}</button>
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
  name: "DataEditing",
  components: {
    Header,
    Bottom,
    Left,
    Popup
  },
  data() {
    return {
      popupStatus: false,
      userName: "22222111",
      aboutMe: "22222",
      accountStatus: true
    }
  },
  methods: {
    // 账户公开不公开
    accountClick(falg) {
      this.accountStatus = falg
    },
    // 储存
    storeClick() {
      this.popupStatus = true
    },
    // 储存成功弹窗关闭
    popupClose() {
      this.popupStatus = false
    },
    // 跳转外部网页
    toWebsite() {
      window.open("https://www.itapme.com/wow")
    },
    // 头像上传
    fileChange(file) {
      const isJPG = "jpg,jpeg,bmp,png";
      const name = file.file.name.split(".");
      const imgName = name[name.length - 1];
      if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
        Message.error(this.$t("Message.uploadedprofile"));
        return false;
      }
      const isLt2M = file.file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        Message.error(this.$t("Message.Uploadimagesize"));
        return false;
      }
      console.log(file.file);
      var UploadData = new FormData();
      UploadData.append("file", file.file);
      UploadData.append("type", 1);
      POST_FileUpload(UploadData).then(res => {
        if (res.code == "200") {
          this.$nextTick(function() {
            this.dataForm.headimg = res.data.img;
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.DataEditing {
  width: 100%;
  background: #0C0D0D;
  .DataEditing_box {
    padding: 0 40px;
    height: 749px;
    display: flex;
    .DataEditing_box_content {
      width: calc(100% - 270px);
      height: 100%;
      background: #1A1B1D;
      .DataEditing_box_content_h1 {
        padding: 30px 30px 21px 30px;
        font-size: 18px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 25px;
        border-bottom: 1px solid #353535;
      }
      .DataEditing_box_content_div {
        padding: 30px;
        .headerImg {
          display: flex;
          .headerImg_update {
            cursor: pointer;
            margin-right: 15px;
            width: 80px;
            height: 80px;
            position: relative;
            .img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            .imgUpdate {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              box-shadow: 0px 3px 15px -6px rgba($color: #000000, $alpha: 0.3);
            }
          }
          .headerImg_userName {
            p {
              margin: 10px 0;
              font-size: 15px;
              font-weight: 500;
              color: #F2F2F2;
              line-height: 21px;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              color: #C8C8C8;
              line-height: 20px;
            }
          }
        }
        .userData {
          display: flex;
          justify-content: space-between;
          .userData_left {
            width: 500px;
            .userData_left_p {
              margin: 30px 0 10px;
              font-size: 15px;
              font-weight: 400;
              color: #C8C8C8;
              line-height: 21px;
            }
            .userData_left_input {
              padding: 0 20px;
              width: 100%;
              height: 50px;
              background: #1F2022;
              border: 1px solid #1F2022;
              border-radius: 4px;
              font-size: 15px;
              font-weight: 500;
              color: #F2F2F2;
              line-height: 21px;
            }
            .userData_left_input::placeholder {
              color: #666666;
            }
            .userData_left_input:focus{
              border: 1px solid #FF3321;
            }
            .userData_left_textarea {
              padding: 15px 20px;
              width: 100%;
              height: 140px;
              background: #1F2022;
              border: 1px solid #1F2022;
              border-radius: 4px;
              font-size: 15px;
              font-weight: 400;
              color: #F2F2F2;
              line-height: 21px;
            }
            .userData_left_textarea:focus{
              border: 1px solid #FF3321;
            }
          }
          .userData_right {
            width: 300px;
            .userData_right_p {
              margin: 30px 0 10px;
              font-size: 15px;
              font-weight: 400;
              color: #C8C8C8;
              line-height: 21px;
            }
            .userData_right_button {
              display: flex;
              justify-content: space-around;
              button {
                font-size: 15px;
                font-weight: 400;
                color: #666666;
                line-height: 21px;
                display: flex;
                align-items: center;
                img {
                  margin-right: 5px;
                  width: 24px;
                  height: 24px;
                }
              }
              .active {
                font-weight: 500;
                color: #F2F2F2;
              }
            }
            .userData_right_h3 {
              margin-top: 10px;
              font-size: 14px;
              font-weight: 400;
              color: #666666;
              line-height: 20px;
              text-align: center;
            }
            .userData_right_h4 {
              cursor: pointer;
              font-size: 14px;
              font-weight: 400;
              color: #007DFF;
              line-height: 20px;
              text-align: center;
            }
          }
        }
        .storeButton {
          margin-top: 80px;
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
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1440px) {
  .DataEditing {
    .DataEditing_box {
      .DataEditing_box_content {
        .DataEditing_box_content_div {
          .userData {
            .userData_left {
              width: 400px;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .DataEditing {
    .DataEditing_box {
      padding: 0;
      .DataEditing_box_content {
        .DataEditing_box_content_div {
          .userData {
            .userData_left {
              width: 300px;
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .DataEditing {
    .DataEditing_box {
      padding: 0;
      .DataEditing_box_content {
        width: calc(100% - 220px);
        .DataEditing_box_content_div {
          .userData {
            flex-wrap: wrap;
            .userData_left {
              width: 100%;
            }
            .userData_right {
              width: 300px;
            }
          }
          .storeButton {
            margin-top: 30px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .DataEditing {
    .DataEditing_box {
      padding: 0;
      height: auto;
      flex-wrap: wrap;
      .DataEditing_box_content {
        width: 100%;
        .DataEditing_box_content_h1 {
          text-align: center;
        }
        .DataEditing_box_content_div {
          padding: 30px 20px;
          .headerImg {
            .headerImg_update {
              margin-right: 10px;
              width: 60px;
              height: 60px;
            }
            .headerImg_userName {
              p {
                margin: 5px 0;
              }
            }
          }
          .userData {
            flex-wrap: wrap;
            .userData_left {
              width: 100%;
            }
            .userData_right {
              width: 100%;
            }
          }
          .storeButton {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
