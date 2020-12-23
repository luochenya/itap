<template>
  <div class="Popup">
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  name: "Popup"
}
</script>

<style lang="scss" scoped>
.Popup {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  .Popup_box {
    padding: 30px 33px;
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    .Popup_box_img {
      width: 106px;
      height: 154px;
    }
    .Popup_box_h2 {
      margin: 30px 0 13px;
      font-size: 15px;
      font-weight: bold;
      color: #0C0D0D;
      line-height: 17px;
    }
    .Popup_box_h3 {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
    }
    .Popup_box_button {
      margin-top: 44px;
      display: flex;
      justify-content: center;
      button {
        width: 240px;
        height: 50px;
        background: #00AD69;
        box-shadow: 0px 8px 20px 0px rgba(0, 173, 105, 0.3);
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 24px;
      }
    }
  }
  .Popup_boxs {
    padding: 30px;
    .Popup_box_imgs {
      width: 179px;
      height: 138px;
    }
    .Popup_box_buttons {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      .Popup_box_buttons_left {
        width: 158px;
        height: 50px;
        background: #00AD69;
        box-shadow: 0px 8px 20px 0px rgba(0, 173, 105, 0.3);
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 24px;
      }
      .Popup_box_buttons_right {
        width: 158px;
        height: 50px;
        background: #C8C8C8;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 24px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .Popup {
    .Popup_box {
      width: 90%;
      padding: 30px;
      .Popup_box_button {
        button {
          width: 100%;
        }
      }
    }
    .Popup_boxs {
      .Popup_box_buttons {
        .Popup_box_buttons_left {
          width: 45%;
        }
        .Popup_box_buttons_right {
          width: 45%;
        }
      }
    }
  }
}
</style>
