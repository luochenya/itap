<template>
  <div class="PaymentMessage">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="PaymentMessage_box response">
      <div class="PaymentMessage_box_content">
        <h1 class="PaymentMessage_box_content_h1">
          {{ $t('PaymentMessage.Fillinyourpaymentinformation') }}
        </h1>
        <!-- 付款方式 -->
        <div class="PaymentMessage_box_content_div">
          <p class="PaymentMessage_box_content_div_p">
            {{ $t('PaymentMessage.paymentmethod') }}
          </p>
          <div class="PaymentMessage_box_content_div_checkout">
            <div @click="paymentMethodClick(0)">
              <img v-if="paymentMethod == 0" src="@/assets/img/PaymentMessageCheckout.png" alt="" />
              <img v-if="paymentMethod != 0" src="@/assets/img/PaymentMessageNotCheckout.png" alt="" />
              <p :class="paymentMethod == 0 ? 'p_active' : ''">{{ $t('PaymentMessage.creditcard') }}</p>
            </div>
            <div @click="paymentMethodClick(1)">
              <img v-if="paymentMethod == 1" src="@/assets/img/PaymentMessageCheckout.png" alt="" />
              <img v-if="paymentMethod != 1" src="@/assets/img/PaymentMessageNotCheckout.png" alt="" />
              <p :class="paymentMethod == 1 ? 'p_active' : ''">{{ $t('PaymentMessage.Transfer') }}</p>
            </div>
          </div>
        </div>
        <!-- 聯絡電話 -->
        <div class="PaymentMessage_box_content_div">
          <p class="PaymentMessage_box_content_div_p">{{ $t('PaymentMessage.Contactnumber') }}</p>
          <div class="PaymentMessage_box_content_div_input">
            <input type="text" :placeholder="$t('PaymentMessage.Pleaseenteryourphonenumber')" v-model="ContactNumber" />
          </div>
        </div>
        <!-- 發票類型 -->
        <div class="PaymentMessage_box_content_div">
          <p class="PaymentMessage_box_content_div_p">{{ $t('PaymentMessage.invoicetype') }}</p>
          <div class="PaymentMessage_box_content_div_checkout">
            <div @click="invoiceTypeClick(0)">
              <img v-if="invoiceType == 0" src="@/assets/img/PaymentMessageCheckout.png" alt="" />
              <img v-if="invoiceType != 0" src="@/assets/img/PaymentMessageNotCheckout.png" alt="" />
              <p :class="invoiceType == 0 ? 'p_active' : ''">{{ $t('PaymentMessage.Electronicinvoice') }}</p>
            </div>
            <div @click="invoiceTypeClick(1)">
              <img v-if="invoiceType == 1" src="@/assets/img/PaymentMessageCheckout.png" alt="" />
              <img v-if="invoiceType != 1" src="@/assets/img/PaymentMessageNotCheckout.png" alt="" />
              <p :class="invoiceType == 1 ? 'p_active' : ''">{{ $t('PaymentMessage.Tripleinvoice') }}</p>
            </div>
            <div @click="invoiceTypeClick(2)">
              <img v-if="invoiceType == 2" src="@/assets/img/PaymentMessageCheckout.png" alt="" />
              <img v-if="invoiceType != 2" src="@/assets/img/PaymentMessageNotCheckout.png" alt="" />
              <p :class="invoiceType == 2 ? 'p_active' : ''">{{ $t('PaymentMessage.Donationinvoice') }}</p>
            </div>
          </div>
          <!-- 公司名稱 -->
          <!-- 發票類型 == 三聯式發票 -->
          <div class="PaymentMessage_box_content_div_input inputTop" v-if="invoiceType == 1">
            <input type="text" :placeholder="$t('PaymentMessage.Pleaseentercompanyname')" v-model="companyName" />
          </div>
          <!-- 公司統一編號 -->
          <!-- 發票類型 == 三聯式發票 -->
          <div class="PaymentMessage_box_content_div_input inputTop" v-if="invoiceType == 1">
            <input type="text" :placeholder="$t('PaymentMessage.Pleaseenteruniformnumber')" v-model="companyNumber" />
          </div>
          <!-- 愛心代碼 -->
          <!-- 發票類型 == 捐贈發票 -->
          <div class="PaymentMessage_box_content_div_input inputTop" v-if="invoiceType == 2">
            <input type="text" :placeholder="$t('PaymentMessage.Pleaseenterthelovecode')" v-model="LoveCode" />
          </div>
        </div>
        <!-- 載具類型 -->
        <!-- 發票類型 == 電子發票 -->
        <div class="PaymentMessage_box_content_div" v-if="invoiceType == 0">
          <p class="PaymentMessage_box_content_div_p">{{ $t('PaymentMessage.Vehicletype') }}</p>
          <div class="PaymentMessage_box_content_div_select">
            <select v-model="VehicleType">
              <option value="0">{{ $t('PaymentMessage.Membervehicle') }}</option>
              <option value="1">{{ $t('PaymentMessage.Mobilevehicle') }}</option>
              <option value="2">{{ $t('PaymentMessage.Naturalpersoncertificate') }}</option>
            </select>
          </div>
        </div>
        <!-- 会员载具提示文字 -->
        <!-- 發票類型 == 電子發票 && 載具類型 == 會員載具 -->
        <h2 class="PaymentMessage_box_content_h2" v-if="invoiceType == 0 && VehicleType == 0">
          {{ $t('PaymentMessage.winnertohandletheprizecollection') }}
        </h2>
        <!-- 手機條碼 -->
        <!-- 發票類型 == 電子發票 && 載具類型 == 手機載具 -->
        <div class="PaymentMessage_box_content_div" v-if="invoiceType == 0 && VehicleType == 1">
          <p class="PaymentMessage_box_content_div_p">{{ $t('PaymentMessage.Mobilephonebarcode') }}</p>
          <div class="PaymentMessage_box_content_div_input">
            <input type="text" placeholder="//AB201C9" v-model="MobilePhoneBarcode" />
            <span>{{ $t('PaymentMessage.Formatcharacters') }}</span>
          </div>
        </div>
        <!-- 手機條碼 -->
        <!-- 發票類型 == 電子發票 && 載具類型 == 自然人憑證 -->
        <div class="PaymentMessage_box_content_div" v-if="invoiceType == 0 && VehicleType == 2">
          <p class="PaymentMessage_box_content_div_p">{{ $t('PaymentMessage.Mobilephonebarcode') }}</p>
          <div class="PaymentMessage_box_content_div_input">
            <input type="text" placeholder="TP03000001234567" v-model="MobilePhoneBarcodes" />
            <span>{{ $t('PaymentMessage.Formatdigits') }}</span>
          </div>
        </div>
      </div>
      <!-- 结账按钮 -->
      <div class="PaymentMessage_box_button">
        <button @click="BillClick()">{{ $t('PaymentMessage.Checkout') }}</button>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box">
          <img class="Popup_box_img" src="@/assets/img/Popup1.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('PaymentMessage.Orderisestablished') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('PaymentMessage.regardedasaninvalidorder') }}</h3>
          <div class="Popup_box_button">
            <button @click="popupDetermine()">{{ $t('PaymentMessage.Confirm') }}</button>
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

export default {
  name: "PaymentMessage",
  components: {
    Header,
    Bottom,
    Popup
  },
  data() {
    return {
      // 弹窗状态
      popupStatus: false,
      // 付款方式
      paymentMethod: 0,
      // 联络电话
      ContactNumber: "",
      // 发票类型
      invoiceType: 0,
      // 公司名稱/三聯式發票
      companyName: "",
      // 公司統一編號/三聯式發票
      companyNumber: "",
      // 愛心代碼/捐贈發票
      LoveCode: "",
      // 载具类型
      VehicleType: 0,
      // 手机条码/手機載具
      MobilePhoneBarcode: "",
      // 手机条码/自然人憑證
      MobilePhoneBarcodes: "",
    }
  },
  watch: {
    // 发票类型切换监听
    invoiceType() {
      // 清空公司名称
      this.companyName = "";
      // 清空公司統一編號
      this.companyNumber = "";
      // 清空愛心代碼
      this.LoveCode = "";
      // 默认载具类型
      this.VehicleType = 0;
      // 清空手机条码
      this.MobilePhoneBarcode = "";
      // 清空手机条码
      this.MobilePhoneBarcodes = "";
    },
    // 载具类型切换监听
    VehicleType() {
      // 清空手机条码
      this.MobilePhoneBarcode = "";
      // 清空手机条码
      this.MobilePhoneBarcodes = "";
    }
  },
  methods: {
    // 付款方式切换
    paymentMethodClick(value) {
      this.paymentMethod = value
    },
    // 发票类型切换
    invoiceTypeClick(value) {
      this.invoiceType = value
    },
    // 结账
    BillClick() {
      this.popupStatus = true
    },
    // 弹窗确定
    popupDetermine() {
      this.popupStatus = false
    }
  }
};
</script>

<style lang="scss" scoped>
.PaymentMessage {
  width: 100%;
  background: #1A1B1D;
  .PaymentMessage_box {
    padding: 50px 300px 100px;
    .PaymentMessage_box_content {
      width: 500px;
      margin: 0 auto;
      .PaymentMessage_box_content_h1 {
        text-align: center;
        font-size: 34px;
        font-weight: 400;
        color: #F2F2F2;
        line-height: 48px;
      }
      .PaymentMessage_box_content_div {
        margin-top: 35px;
        .PaymentMessage_box_content_div_p {
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
        }
        .PaymentMessage_box_content_div_checkout {
          padding: 0 20px;
          display: flex;
          div {
            cursor: pointer;
            width: 33%;
            display: flex;
            align-items: center;
            img {
              width: 24px;
              height: 24px;
            }
            p {
              margin-left: 5px;
              font-size: 15px;
              font-weight: 400;
              color: #666666;
              line-height: 21px;
            }
            .p_active {
              font-weight: 500;
              color: #F2F2F2;
            }
          }
        }
        .PaymentMessage_box_content_div_input {
          width: 100%;
          height: 50px;
          background: #1F2022;
          border-radius: 4px;
          position: relative;
          input {
            position: absolute;
            left: 0;
            top: 0;
            padding: 0 20px;
            width: 100%;
            height: 100%;
            background: #1F2022;
            border: 1px solid #1F2022;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 400;
            color: #F2F2F2;
            line-height: 21px;
          }
          input::placeholder {
            color: #666666;
          }
          input:focus{
            border: 1px solid #FF3321;
          }
          span {
            position: absolute;
            left: 20px;
            bottom: -23px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 18px;
          }
        }
        .inputTop {
          margin-top: 15px;
        }
        .PaymentMessage_box_content_div_select {
          width: 100%;
          height: 50px;
          background: #1F2022;
          border-radius: 4px;
          select {
            padding: 0 20px;
            width: 100%;
            height: 100%;
            background: #1F2022;
            border: 1px solid #1F2022;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 400;
            color: #F2F2F2;
            line-height: 21px;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            cursor: pointer;
            background: #1F2022 url(../../assets/img/select.png) no-repeat;
            background-size: 30px 30px;
            background-position: calc(100% - 20px) 10px;
          }
          select::placeholder {
            color: #666666;
          }
          select:focus{
            border: 1px solid #FF3321;
          }
        }
      }
      .PaymentMessage_box_content_h2 {
        padding: 0 20px;
        margin-top: 25px;
        text-align: center;
        font-size: 13px;
        font-weight: 400;
        color: #666666;
        line-height: 18px;
      }
    }
    .PaymentMessage_box_button {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;
      button {
        width: 220px;
        height: 68px;
        background: linear-gradient(180deg, #22CD8A 0%, #00AD69 100%);
        box-shadow: 0px 10px 10px 0px #0C0D0D;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 25px;
        letter-spacing: 1px;
      }
    }
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1440px) {
  .PaymentMessage {
    .PaymentMessage_box {
      padding: 50px 200px 100px;
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .PaymentMessage {
    .PaymentMessage_box {
      padding: 50px 100px 100px;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .PaymentMessage {
    .PaymentMessage_box {
      padding: 50px 0 100px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .PaymentMessage {
    .PaymentMessage_box {
      padding: 50px 0 100px;
      .PaymentMessage_box_content {
        width: 100%;
        .PaymentMessage_box_content_h1 {
          font-size: 26px;
          line-height: 34px;
        }
        .PaymentMessage_box_content_div {
          margin-top: 20px;
          .PaymentMessage_box_content_div_checkout {
            padding: 0;
          }
        }
      }
      .PaymentMessage_box_button {
        justify-content: center;
        button {
          width: 80%;
          height: 50px;
        }
      }
    }
  }
}
</style>
