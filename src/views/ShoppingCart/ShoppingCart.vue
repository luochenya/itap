<template>
  <div class="ShoppingCart">
    <!-- 顶部导航组件 -->
    <Header />
    <!-- 有数据 -->
    <div v-if="dataList && dataList.length > 0" class="ShoppingCart_box response">
      <h1 class="ShoppingCart_box_h1">
        {{ $t('ShoppingCart.Totalofyourshoppingcart') }}
        <span>$ {{TotalPrice}}</span>
      </h1>
      <h2 class="ShoppingCart_box_h2" @click="toProductZone()">{{ $t('ShoppingCart.continueshopping') }}></h2>
      <div class="ShoppingCart_box_content">
        <div class="content_top">
          <div class="content_top_big">{{ $t('ShoppingCart.product') }}</div>
          <div>{{ $t('ShoppingCart.unitprice') }}</div>
          <div>{{ $t('ShoppingCart.quantity') }}</div>
          <div>{{ $t('ShoppingCart.subtotal') }}</div>
        </div>
        <div class="content_center" v-for="(item, index) in dataList" :key="index">
          <div class="content_center_big">
            <div class="content_center_big_img">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="content_center_big_title">
              <p :title="item.title">{{item.title}}</p>
              <img @click="openPopup(index)" src="@/assets/img/ShoppingCartDelete.png" alt="" />
            </div>
          </div>
          <div class="content_center_small small1">
            <p v-if="item.OriginalPrice">$ {{item.OriginalPrice}}</p>
            <span v-if="item.OriginalPrice">$ {{item.price}}</span>
            <em v-if="!item.OriginalPrice">$ {{item.price}}</em>
          </div>
          <div class="content_center_small">
            <div class="content_center_small_input">
              <input type="text" disabled v-model="item.Quantity">
              <img class="add" @click="numAdd(index)" src="@/assets/img/ShoppingCartAdd.png" alt="" />
              <img class="less" @click="numLess(index)" src="@/assets/img/ShoppingCartLess.png" alt="" />
            </div>
          </div>
          <div class="content_center_small">$ {{item.Subtotal}}</div>
        </div>
        <div class="content_bottom">
          <div class="content_bottom_big">
            <img src="@/assets/img/ShoppingCart2.png" alt="" />
            <p>{{ $t('ShoppingCart.DiscountCode') }}</p>
            <input type="text" :placeholder="$t('ShoppingCart.Optional')" v-model="DiscountCode" />
          </div>
          <div>{{ $t('ShoppingCart.total') }}</div>
          <div>$ {{TotalPrice}}</div>
        </div>
      </div>
      <div class="ShoppingCart_box_button">
        <button @click="toPaymentMessage()">{{ $t('ShoppingCart.Nextstep') }}</button>
      </div>
    </div>

    <!-- 空数据 -->
    <div v-else class="ShoppingCart_null response">
      <h1 class="ShoppingCart_null_h1">{{ $t('ShoppingCart.Therearenoproducts') }}</h1>
      <img class="ShoppingCart_null_img" src="@/assets/img/ShoppingCartNull.png" alt="" />
      <div class="ShoppingCart_null_button">
        <button @click="toProductZone()">{{ $t('ShoppingCart.Goshopping') }}</button>
      </div>
    </div>

    <!-- 删除商品弹窗 -->
    <Popup v-if="popupStatus">
      <template slot="body">
        <div class="Popup_box Popup_boxs">
          <img class="Popup_box_imgs" src="@/assets/img/popup2.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('ShoppingCart.confirmdelete') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('ShoppingCart.Afterdeleting') }}</h3>
          <div class="Popup_box_buttons">
            <button class="Popup_box_buttons_left" @click="popupStatus = false">{{ $t('ShoppingCart.Cancel') }}</button>
            <button class="Popup_box_buttons_right" @click="deleteProduct()">{{ $t('ShoppingCart.Confirm') }}</button>
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
  name: "ShoppingCart",
  components: {
    Header,
    Bottom,
    Popup
  },
  data() {
    return {
      // 删除弹窗
      popupStatus: false,
      // 删除商品ID
      deteleId: "",
      dataList: [
        {
          imgUrl: require("@/assets/img/ShoppingCart1.png"),
          title: "波普鑽石",
          price: "2000",
          OriginalPrice: "3000",
          Quantity: 1,
          Subtotal: "2000"
        },
        {
          imgUrl: require("@/assets/img/ShoppingCart1.png"),
          title: "波普鑽石波普鑽石波普鑽石波普鑽石",
          price: "300",
          OriginalPrice: "1000",
          Quantity: 3,
          Subtotal: "900"
        },
        {
          imgUrl: require("@/assets/img/ShoppingCart1.png"),
          title: "波普鑽石波普鑽石波普鑽石波普鑽石波普鑽石波普鑽石波普鑽石波普鑽石",
          price: "2000",
          OriginalPrice: "",
          Quantity: 1,
          Subtotal: "2000"
        }
      ],
      // 总价
      TotalPrice: 0,
      // 折扣码
      DiscountCode: ""
    }
  },
  mounted() {
    this.dataList.forEach(item => {
      this.TotalPrice += Number(item.Subtotal)
    });
  },
  methods: {
    // 继续购物
    toProductZone() {
      this.$router.push("/ProductZone")
    },
    // 数量增加
    numAdd(index) {
      this.dataList[index].Quantity++
      this.dataList[index].Subtotal = Number(this.dataList[index].price * this.dataList[index].Quantity)
      this.TotalPrice = 0
      this.dataList.forEach(item => {
        this.TotalPrice += Number(item.Subtotal)
      });
    },
    // 数量减少
    numLess(index) {
      if (this.dataList[index].Quantity == 1) {
        return false
      }
      this.dataList[index].Quantity--
      this.dataList[index].Subtotal = Number(this.dataList[index].price * this.dataList[index].Quantity)
      this.TotalPrice = 0
      this.dataList.forEach(item => {
        this.TotalPrice += Number(item.Subtotal)
      });
    },
    // 打开删除弹窗
    openPopup(index) {
      this.deteleId = index
      this.popupStatus = true
    },
    // 删除商品
    deleteProduct() {
      console.log("删除：" + this.deteleId)
      this.popupStatus = false
    },
    // 下一步
    toPaymentMessage() {
      if (this.DiscountCode) {
        this.$router.push({
          path: "/PaymentMessage",
          query: {
            DiscountCode: this.DiscountCode
          }
        })
      } else {
        this.$router.push("/PaymentMessage")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ShoppingCart {
  width: 100%;
  background: #1A1B1D;
  .ShoppingCart_box {
    padding: 50px 90px 130px;
    .ShoppingCart_box_h1 {
      text-align: center;
      font-size: 34px;
      font-weight: 400;
      color: #F2F2F2;
      line-height: 48px;
      span {
        margin-left: 10px;
      }
    }
    .ShoppingCart_box_h2 {
      cursor: pointer;
      margin: 10px 0 30px;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #007DFF;
      line-height: 25px;
    }
    .ShoppingCart_box_content {
      .content_top {
        padding: 0 85px;
        margin-bottom: 5px;
        width: 100%;
        height: 80px;
        background: #1F2022;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 4px 4px 0px 0px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #C8C8C8;
        line-height: 22px;
        div {
          text-align: right;
          width: 20%;
        }
        .content_top_big {
          text-align: left;
          width: 40%;
        }
      }
      .content_center {
        padding: 13px 85px;
        margin-bottom: 5px;
        width: 100%;
        background: #1F2022;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
        display: flex;
        font-size: 18px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 25px;
        .content_center_big {
          text-align: left;
          width: 40%;
          display: flex;
          .content_center_big_img {
            margin-right: 13px;
            width: 134px;
            height: 134px;
            background: #1A1B1D;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 100%;
            }
          }
          .content_center_big_title {
            width: calc(100% - 147px);
            p {
              margin-top: 22px;
              margin-bottom: 15px;
              font-size: 18px;
              font-weight: 500;
              color: #F2F2F2;
              line-height: 25px;
              height: 50px;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            img {
              cursor: pointer;
              width: 30px;
              height: 30px;
            }
          }
        }
        .content_center_small {
          padding-top: 22px;
          text-align: right;
          width: 20%;
          p {
            text-decoration: line-through;
          }
          span {
            color: #00AD69;
          }
          .content_center_small_input {
            margin-left: auto;
            width: 100px;
            height: 50px;
            position: relative;
            input {
              position: absolute;
              left: 0;
              top: 0;
              padding: 0 30px 0 10px;
              width: 100%;
              height: 100%;
              background: #1A1B1D;
              border-radius: 4px;
              border: 1px solid #666666;
              font-size: 20px;
              font-weight: 500;
              color: #F2F2F2;
              line-height: 28px;
            }
            input:focus {
              border: 1px solid #F2F2F2;
            }
            .add {
              cursor: pointer;
              width: 13px;
              height: 6px;
              position: absolute;
              right: 10px;
              top: 13px;
            }
            .less {
              cursor: pointer;
              width: 13px;
              height: 6px;
              position: absolute;
              right: 10px;
              bottom: 13px;
            }
          }
        }
      }
      .content_bottom {
        padding: 0 85px;
        width: 100%;
        height: 80px;
        background: #1F2022;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 0px 0px 4px 4px;
        display: flex;
        align-items: center;
        div {
          width: 20%;
          text-align: right;
          font-size: 20px;
          font-weight: 400;
          color: #00AD69;
          line-height: 28px;
        }
        .content_bottom_big {
          padding-left: 50px;
          width: 60%;
          display: flex;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
          }
          p {
            margin: 0 20px 0 5px;
            font-size: 16px;
            font-weight: 400;
            color: #C8C8C8;
            line-height: 22px;
          }
          input {
            padding: 0 20px;
            width: 230px;
            height: 40px;
            background: #1A1B1D;
            border: 1px solid #1A1B1D;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 400;
            color: #F2F2F2;
            line-height: 21px;
          }
          input:focus{
            border: 1px solid #FF3321;
          }
          input::placeholder {
            color: #666666;
          }
        }
      }
    }
    .ShoppingCart_box_button {
      margin-top: 34px;
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
  .ShoppingCart_null {
    padding: 140px 0 250px;
    text-align: center;
    .ShoppingCart_null_h1 {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 25px;
    }
    .ShoppingCart_null_img {
      margin: 25px 0 30px;
      width: 255px;
      height: 221px;
    }
    .ShoppingCart_null_button {
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
@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .ShoppingCart {
    .ShoppingCart_box {
      padding: 50px 0 120px;
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .ShoppingCart {
    .ShoppingCart_box {
      padding: 50px 0 120px;
      .ShoppingCart_box_content {
        .content_top {
          padding: 0 30px;
        }
        .content_center {
          padding: 13px 30px;
        }
        .content_bottom {
          padding: 0 30px;
          .content_bottom_big {
            padding-left: 0;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .ShoppingCart {
    .ShoppingCart_box {
      padding: 50px 0 100px;
      .ShoppingCart_box_h1 {
        font-size: 26px;
        line-height: 36px;
      }
      .ShoppingCart_box_h2 {
        font-size: 18px;
        line-height: 22px;
      }
      .ShoppingCart_box_content {
        .content_top {
          display: none;
        }
        .content_center {
          padding: 15px;
          flex-wrap: wrap;
          align-items: center;
          .content_center_big {
            width: 100%;
            .content_center_big_img {
              margin-right: 10px;
              width: 100px;
              height: 100px;
            }
            .content_center_big_title {
              width: calc(100% - 110px);
              p {
                margin-top: 0;
                font-size: 16px;
                margin-bottom: 20px;
              }
            }
          }
          .content_center_small {
            width: 33%;
            .content_center_small_input {
              width: 100%;
            }
          }
          .small1 {
            text-align: left;
          }
        }
        .content_bottom {
          padding: 15px;
          height: auto;
          flex-wrap: wrap;
          justify-content: flex-end;
          div {
            margin-top: 20px;
            width: 33%;
          }
          .content_bottom_big {
            margin-top: 0;
            width: 100%;
            padding-left: 0;
            input {
              width: calc(100% - 100px);
            }
          }
        }
      }
      .ShoppingCart_box_button {
        button {
          width: 150px;
          height: 50px;
        }
      }
    }
  }
}
</style>
