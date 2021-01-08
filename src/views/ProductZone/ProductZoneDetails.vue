<template>
  <div class="ProductZoneDetails">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="ProductZoneDetails_box response">
      <div class="ProductZoneDetails_box_top">
        <div class="ProductZoneDetails_box_top_left">
          <div class="big_img" @click="bigImgStatus = true">
            <img :src="bigImgUrl" alt="" />
          </div>
          <div class="small_img">
            <button class="small_img_left" @click="smallImgLeft()">
              <img src="@/assets/img/ProductZoneDetailsLeft.png" alt="" />
            </button>
            <div class="small_img_center" ref="smallImg">
              <button v-for="(item, index) in dataForm.pic" ref="smallImgButton" :class="item == bigImgUrl ? 'active' : ''" :key="index" @click="smallImgClick(item)">
                <img :src="item" alt="" draggable="false">
                <div></div>
              </button>
            </div>
            <button class="small_img_right" @click="smallImgRight()">
              <img src="@/assets/img/ProductZoneDetailsRight.png" alt="" />
            </button>
          </div>
        </div>
        <div class="ProductZoneDetails_box_top_right">
          <h1 class="ProductZoneDetails_box_top_right_h1">{{ dataForm.name }}</h1>
          <h2 class="ProductZoneDetails_box_top_right_h2">
            <span v-if="dataForm.good_price">$ {{ $Thousands(dataForm.good_price) }}</span>
            <em v-if="dataForm.good_price">$ {{ $Thousands(dataForm.price) }}</em>
            <i v-if="!dataForm.good_price">$ {{ $Thousands(dataForm.price) }}</i>
          </h2>
          <h3 class="ProductZoneDetails_box_top_right_h3">
            {{ $t('ProductZone.productmanual') }}：
          </h3>
          <h4 class="ProductZoneDetails_box_top_right_h4">
            <i v-html="dataForm.pro_info"></i>
          </h4>
          <!-- <h4 class="ProductZoneDetails_box_top_right_h4">
            <p>{{ $t('ProductZone.Antennafrequency') }}：</p>
            <span>13 .56 MHz</span>
          </h4>
          <h4 class="ProductZoneDetails_box_top_right_h4">
            <p>{{ $t('ProductZone.NFCspecifications') }}：</p>
            <span>ISO/IEC 14443-3規格，通用於市售之具有NFC功能之Android手機</span>
          </h4>
          <h4 class="ProductZoneDetails_box_top_right_h4">
            <p>{{ $t('ProductZone.Sensingdistance') }}：</p>
            <span>1公分以內</span>
          </h4>
          <h4 class="ProductZoneDetails_box_top_right_h4">
            <p>{{ $t('ProductZone.waterprooflevel') }}：</p>
            <span>取得IP68防水認證，可在30公尺水深，浸泡一個小時</span>
          </h4>
          <h4 class="ProductZoneDetails_box_top_right_h4">
            <p>{{ $t('ProductZone.Dustlevel') }}：</p>
            <span>取得IP68防塵認證，完全防塵</span>
          </h4> -->
          <div class="ProductZoneDetails_box_top_right_input">
            <input type="text" v-model="num" />
            <img class="imgAdd" @click="numAddClick()" src="@/assets/img/ProductZoneDetailsAdd.png" alt="" />
            <img class="imgLess" @click="numLessClick()" src="@/assets/img/ProductZoneDetailsLess.png" alt="" />
          </div>
          <button class="ProductZoneDetails_box_top_right_button" @click="addShoppingCart(dataForm.id)">
            <img src="@/assets/img/ProductZoneDetailsCart.png" alt="" />
            {{ $t('ProductZone.addtoShoppingCart') }}
          </button>
        </div>
      </div>

      <div class="ProductZoneDetails_box_bottom">
        <h1 class="ProductZoneDetails_box_bottom_h1">
          <img src="@/assets/img/ProductZoneDetails4.png" alt="" />
          {{ $t('ProductZone.Recommendforyou') }}
        </h1>
        <div class="ProductZoneDetails_box_bottom_swiper">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide
              class="ProductZoneDetails_box_bottom_swiper_content"
              v-for="(item, index) in swiperList"
              :key="index"
            >
              <div class="ProductZoneDetails_box_bottom_swiper_content_img">
                <img :src="item.pic[0]" alt="" />
                <div class="ProductZoneDetails_box_bottom_swiper_content_img_hover">
                  <button @click="toProductDetalis(item)">
                    <img class="img1" src="@/assets/img/ProductZone_hover1.png" alt="" />
                    <img class="img2" src="@/assets/img/ProductZone_hover1s.png" alt="" />
                  </button>
                  <button @click="toShoppingCart(item)">
                    <img class="img1" src="@/assets/img/ProductZone_hover2.png" alt="" />
                    <img class="img2" src="@/assets/img/ProductZone_hover2s.png" alt="" />
                  </button>
                </div>
              </div>
              <div class="ProductZoneDetails_box_bottom_swiper_content_price">
                <p :title="item.name">{{ item.name }}</p>
                <div>
                  <h4 v-if="!item.good_price">$ {{ $Thousands(item.price) }}</h4>
                  <h5 v-if="item.good_price">$ {{ $Thousands(item.price) }}</h5>
                  <h6 v-if="item.good_price">$ {{ $Thousands(item.good_price) }}</h6>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="ProductZoneDetails_box_bottom_button">
          <button @click="toProductZone()">{{ $t('ProductZone.Backtocommodityarea') }}</button>
        </div>
      </div>
    </div>

    <!-- 查看大图 -->
    <div class="ProductZoneDetails_bigImg" v-if="bigImgStatus" @click="bigImgStatus = false">
      <div class="ProductZoneDetails_bigImg_box" @click.stop="">
        <img :src="bigImgUrl" alt="">
      </div>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Message } from "element-ui";
import { POST_GetRecommendProductList, POST_AddCart } from "@/api/api";

export default {
  name: "ProductZoneDetails",
  components: {
    Header,
    Bottom,
    swiper,
    swiperSlide
  },
  data() {
    return {
      num: 1,
      bigImgStatus: false,
      bigImgUrl: JSON.parse(this.$route.query.data).pic[0],
      dataForm: JSON.parse(this.$route.query.data),
      // imgList: [
      //   require("@/assets/img/ProductZoneDetails1.png"),
      //   require("@/assets/img/ProductZoneDetails2.png"),
      //   require("@/assets/img/ProductZoneDetails3.png")
      // ],
      swiperList: [],
      // 轮播图配置
      swiperOption: {
        // spaceBetween: 40, // 间隔
        grabCursor: true,
        slidesPerView: "auto"
      },
    }
  },
  watch: {
    num: function(newValue, oldValue) {
      if(!(/(^[1-9]\d*$)/.test(this.num))){
        this.num = oldValue
      }
    }
  },
  created() {
    this._GetRecommendProductList()
  },
  methods: {
    _GetRecommendProductList() {
      POST_GetRecommendProductList().then(res => {
        if (res.code == 200) {
          this.swiperList = res.data.product_list
        }
      })
    },
    // 加入购物车
    addShoppingCart(id) {
      const form = {
        pro_id: id,
        qty: this.num
      }
      POST_AddCart(form).then(res => {
        if (res.code == 200) {
          this.$store.commit("cart/setCartCount", res.data.total_items);
          // this.$router.push("/ShoppingCart")
          return Message.success(this.$t("message.Joinsuccessfully"));
        }
      })
    },
    // 返回商品专页
    toProductZone() {
      this.$router.push("/ProductZone")
    },
    // 小图片点击
    smallImgClick(item) {
      this.bigImgUrl = item
    },
    // 小图片左切换
    smallImgLeft() {
      this.$refs.smallImg.scrollLeft -= 130
    },
    // 小图片右切换
    smallImgRight() {
      this.$refs.smallImg.scrollLeft += 130
    },
    // 商品数量增加
    numAddClick() {
      this.num++
    },
    // 商品数量减少
    numLessClick() {
      if (this.num <= 1) {
        return false
      }
      this.num--
    },
    // 跳转到商品详情
    toProductDetalis(item) {
      this.$router.push({
        path: "/ProductZoneDetails",
        query: {
          data: JSON.stringify(item)
        }
      })
      window.location.reload();
    },
    // 购买商品
    toShoppingCart(item) {
      const form = {
        pro_id: item.id,
        qty: 1
      }
      POST_AddCart(form).then(res => {
        if (res.code == 200) {
          this.$store.commit("cart/setCartCount", res.data.total_items);
          return Message.success(this.$t("message.Joinsuccessfully"));
        }
      })
    }
  }
};
</script>

<style lang="scss">
.ProductZoneDetails {
  width: 100%;
  background: #1A1B1D;
  .ProductZoneDetails_box {
    padding: 50px 40px 140px;
    .ProductZoneDetails_box_top {
      display: flex;
      .ProductZoneDetails_box_top_left {
        width: 500px;
        .big_img {
          cursor: pointer;
          margin-bottom: 10px;
          width: 100%;
          height: 500px;
          background: #1F2022;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 300px;
            height: 300px;
          }
        }
        .small_img {
          width: 100%;
          display: flex;
          .small_img_left {
            margin-right: 15px;
            width: 45px;
            height: 120px;
            background: #1F2022;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .small_img_center {
            width: calc(100% - 120px);
            // display: flex;
            // justify-content: space-between;
            white-space: nowrap;
            overflow-y: hidden;
            overflow-x: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
            button {
              opacity: 0.8;
              margin-right: 10px;
              width: 120px;
              height: 120px;
              position: relative;
              div {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #1A1B1D;
                opacity: 0.3;
              }
              img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
            button:last-child {
              margin-right: 0;
            }
            .active {
              div {
                opacity: 0;
              }
            }
          }
          .small_img_right {
            margin-left: 15px;
            width: 45px;
            height: 120px;
            background: #1F2022;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
      .ProductZoneDetails_box_top_right {
        width: calc(100% - 540px);
        margin-left: 40px;
        .ProductZoneDetails_box_top_right_h1 {
          padding: 20px 0 40px;
          font-size: 26px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 37px;
        }
        .ProductZoneDetails_box_top_right_h2 {
          padding-bottom: 20px;
          border-bottom: 1px solid #353535;
          display: flex;
          align-items: center;
          span {
            font-size: 40px;
            font-weight: 500;
            color: #00AD69;
            line-height: 56px;
          }
          em {
            margin-left: 30px;
            font-size: 18px;
            font-weight: 500;
            color: #666666;
            line-height: 30px;
            text-decoration: line-through;
          }
          i {
            font-size: 40px;
            font-weight: 500;
            color: #007DFF;
            line-height: 56px;
          }
        }
        .ProductZoneDetails_box_top_right_h3 {
          padding: 25px 0 10px;
          font-size: 18px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 25px;
        }
        .ProductZoneDetails_box_top_right_h4 {
          font-size: 16px;
          font-weight: 400;
          color: #666666;
          line-height: 35px;
          // display: flex;
          // p {
          //   width: 165px;
          //   font-size: 16px;
          //   font-weight: 500;
          //   color: #C8C8C8;
          //   line-height: 35px;
          // }
          // span {
          //   width: calc(100% - 165px);
          //   font-size: 16px;
          //   line-height: 35px;
          //   font-weight: 400;
          //   color: #666666;
          // }
        }
        .ProductZoneDetails_box_top_right_input {
          margin: 36px 0 15px;
          width: 270px;
          height: 50px;
          background: #1A1B1D;
          position: relative;
          border-radius: 4px;
          input {
            padding: 0 40px 0 30px;
            border-radius: 4px;
            border: 1px solid #F2F2F2;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            font-size: 20px;
            font-weight: 500;
            color: #F2F2F2;
            line-height: 28px;
          }
          input:focus {
            border: 1px solid #FF3321;
          }
          .imgAdd {
            cursor: pointer;
            position: absolute;
            right: 18px;
            top: 13px;
            width: 13px;
            height: 6px;
          }
          .imgLess {
            cursor: pointer;
            position: absolute;
            right: 18px;
            bottom: 13px;
            width: 13px;
            height: 6px;
          }
        }
        .ProductZoneDetails_box_top_right_button {
          width: 270px;
          height: 50px;
          background: linear-gradient(180deg, #22CD8A 0%, #00AD69 100%);
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 24px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            margin-right: 10px;
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .ProductZoneDetails_box_bottom {
      margin-top: 120px;
      .ProductZoneDetails_box_bottom_h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 45px;
        img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
        }
      }
      .ProductZoneDetails_box_bottom_swiper {
        width: 100%;
        margin-top: 40px;
        .ProductZoneDetails_box_bottom_swiper_content {
          width: 300px;
        }
        .ProductZoneDetails_box_bottom_swiper_content {
          cursor: pointer;
          width: 300px;
          margin-right: 33px;
          background: #252525;
          box-shadow: 0px 10px 20px 0px rgba(12, 13, 13, 0.2);
          border-radius: 4px;
          .ProductZoneDetails_box_bottom_swiper_content_img {
            width: 100%;
            height: 270px;
            background: #1F2022;
            border-radius: 4px 4px 0px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
            .ProductZoneDetails_box_bottom_swiper_content_img_hover {
              display: none;
              button {
                .img1 {
                  display: block;
                }
                .img2 {
                  display: none;
                }
              }
              button:hover {
                .img1 {
                  display: none;
                }
                .img2 {
                  display: block;
                }
              }
            }
          }
          .ProductZoneDetails_box_bottom_swiper_content_price {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              font-size: 18px;
              font-weight: 500;
              color: #F2F2F2;
              line-height: 25px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
            }
            div {
              padding: 6px 10px;
              background: #1A1B1D;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
              h4 {
                color: #007DFF;
              }
              h5 {
                margin-right: 15px;
                color: #666666;
                text-decoration: line-through;
              }
              h6 {
                color: #00AD69;
              }
            }
          }
        }
        .ProductZoneDetails_box_bottom_swiper_content:last-child {
          margin-right: 0;
        }
        .ProductZoneDetails_box_bottom_swiper_content:hover {
          .ProductZoneDetails_box_bottom_swiper_content_img {
          position: relative;
          .ProductZoneDetails_box_bottom_swiper_content_img_hover {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba($color: #1A1B1D, $alpha: 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              margin: 0 12.5px;
              width: 40px;
              height: 40px;
            }
          }
          }
        }
      }
      .ProductZoneDetails_box_bottom_button {
        padding-top: 80px;
        display: flex;
        justify-content: center;
        button {
          width: 140px;
          height: 50px;
          background: #00AD69;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          color: #F2F2F2;
          line-height: 22px;
        }
      }
    }
  }
  .ProductZoneDetails_bigImg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    .ProductZoneDetails_bigImg_box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      width: 600px;
      height: 600px;
      background: #1F2022;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 400px;
        height: 400px;
      }
    }
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1440px) {
  .ProductZoneDetails {
    .ProductZoneDetails_box {
      .ProductZoneDetails_box_bottom {
        .ProductZoneDetails_box_bottom_swiper {
          .ProductZoneDetails_box_bottom_swiper_content {
            width: 350px;
            margin-right: 33px;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
.ProductZoneDetails {
    .ProductZoneDetails_box {
      padding: 50px 0 140px;
      .ProductZoneDetails_box_bottom {
        .ProductZoneDetails_box_bottom_swiper {
          .ProductZoneDetails_box_bottom_swiper_content {
            width: 300px;
            margin-right: 26px;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
.ProductZoneDetails {
    .ProductZoneDetails_box {
      padding: 50px 0 140px;
      .ProductZoneDetails_box_top {
        .ProductZoneDetails_box_top_left {
          width: 370px;
          .big_img {
            height: 370px;
            img {
              width: 200px;
              height: 200px;
            }
          }
        }
        .ProductZoneDetails_box_top_right {
          width: calc(100% - 390px);
          margin-left: 20px;
        }
      }
      .ProductZoneDetails_box_bottom {
        .ProductZoneDetails_box_bottom_swiper {
          .ProductZoneDetails_box_bottom_swiper_content {
            width: 347px;
            margin-right: 34px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
.ProductZoneDetails {
    .ProductZoneDetails_box {
      padding: 50px 0 100px;
      .ProductZoneDetails_box_top {
        flex-wrap: wrap;
        .ProductZoneDetails_box_top_left {
          width: 100%;
          .big_img {
            height: 90vw;
            img {
              width: 70vw;
              height: 70vw;
            }
          }
          .small_img {
            .small_img_left {
              display: none;
            }
            .small_img_center {
              width: 100%;
              button {
                width: 30%;
                height: auto;
                margin-right: 5%;
              }
            }
            .small_img_right {
              display: none;
            }
          }
        }
        .ProductZoneDetails_box_top_right {
          width: 100%;
          margin-left: 0;
          margin-top: 20px;
          .ProductZoneDetails_box_top_right_h1 {
            font-size: 22px;
            line-height: 30px;
            padding: 20px 0 20px;
          }
          .ProductZoneDetails_box_top_right_h2 {
            span {
              font-size: 30px;
              line-height: 40px;
            }
            em {
              margin-left: 20px;
              font-size: 14px;
              line-height: 24px;
            }
            i {
              font-size: 30px;
              line-height: 40px;
            }
          }
          .ProductZoneDetails_box_top_right_h3 {
            padding: 20px 0 10px;
            font-size: 16px;
            line-height: 20px;
          }
          .ProductZoneDetails_box_top_right_h4 {
            // display: flex;
            // p {
            //   width: 145px;
            //   font-size: 14px;
            //   line-height: 30px;
            // }
            // span {
            //   width: calc(100% - 145px);
            //   font-size: 14px;
            //   line-height: 30px;
            // }
          }
          .ProductZoneDetails_box_top_right_input {
            width: 100%;
          }
          .ProductZoneDetails_box_top_right_button {
            width: 100%;
          }
        }
      }
      .ProductZoneDetails_box_bottom {
        margin-top: 80px;
        .ProductZoneDetails_box_bottom_h1 {
          font-size: 26px;
          line-height: 35px;
          img {
            width: 26px;
            height: 26px;
            margin-right: 10px;
          }
        }
        .ProductZoneDetails_box_bottom_swiper {
          .ProductZoneDetails_box_bottom_swiper_content {
            width: 100%;
            margin-right: 33px;
          }
        }
        .ProductZoneDetails_box_bottom_button {
          padding-top: 60px;
        }
      }
    }
    .ProductZoneDetails_bigImg {
      .ProductZoneDetails_bigImg_box {
        width: 90vw;
        height: 90vw;
        img {
          width: 90vw;
          height: 90vw;
        }
      }
    }
  }
}
</style>
