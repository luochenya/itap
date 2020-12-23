<template>
  <div class="ProductZone">
    <!-- 顶部导航组件 -->
    <Header />
    <!-- 顶部轮播 -->
    <div class="ProductZone_header">
      <div class="response">
        <div class="ProductZone_header_content">
          <div>
            <h2>Itap Stardust</h2>
            <h3>自我再創新。</h3>
            <h4>
              黑色星期五特賣享受
              <br />
              30％的折扣
            </h4>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品专区 -->
    <div class="ProductZone_content">
      <div class="ProductZone_content_response response">
        <h1 class="ProductZone_content_h1">{{ $t('ProductZone.ProductZone') }}</h1>
        <h2 class="ProductZone_content_h2">
          <button>{{ $t('ProductZone.Sort') }}</button>
          <button class="active">
            {{ $t('ProductZone.Popularity') }}
            <img src="@/assets/img/ProductZone_select.png" alt="" />
          </button>
        </h2>
        <div class="ProductZone_content_box">
          <div class="ProductZone_content_box_div" v-for="(item, index) in dataList" :key="index" @click="toProductDetalis(item)">
            <div class="ProductZone_content_box_div_img">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="ProductZone_content_box_div_price">
              <p>{{ item.title }}</p>
              <div>
                <h4 v-if="!item.price">$ {{ item.OriginalPrice }}</h4>
                <h5 v-if="item.price">$ {{ item.OriginalPrice }}</h5>
                <h6 v-if="item.price">$ {{ item.price }}</h6>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <Pagination
          :currentPage="offset"
          :pageSize="limit"
          :total="dataList.length"
          :handleCurrentChange="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 底部导航组件 -->
    <Bottom />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "ProductZone",
  components: {
    Header,
    Bottom,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 3,
      dataList: [
        {
          imgUrl: require("@/assets/img/ProductZone2.png"),
          title: "波普鑽石",
          price: "200",
          OriginalPrice: "300"
        },
        {
          imgUrl: require("@/assets/img/ProductZone3.png"),
          title: "波普鑽石",
          price: "200",
          OriginalPrice: "300"
        },
        {
          imgUrl: require("@/assets/img/ProductZone2.png"),
          title: "波普鑽石",
          price: "",
          OriginalPrice: "200"
        },
        {
          imgUrl: require("@/assets/img/ProductZone3.png"),
          title: "波普鑽石",
          price: "",
          OriginalPrice: "300"
        },
        {
          imgUrl: require("@/assets/img/ProductZone3.png"),
          title: "波普鑽石",
          price: "200",
          OriginalPrice: "300"
        },
        {
          imgUrl: require("@/assets/img/ProductZone2.png"),
          title: "波普鑽石",
          price: "",
          OriginalPrice: "200"
        },
        {
          imgUrl: require("@/assets/img/ProductZone3.png"),
          title: "波普鑽石",
          price: "",
          OriginalPrice: "300"
        },
        {
          imgUrl: require("@/assets/img/ProductZone3.png"),
          title: "波普鑽石",
          price: "200",
          OriginalPrice: "300"
        },
        {
          imgUrl: require("@/assets/img/ProductZone2.png"),
          title: "波普鑽石",
          price: "",
          OriginalPrice: "200"
        },
        {
          imgUrl: require("@/assets/img/ProductZone3.png"),
          title: "波普鑽石",
          price: "",
          OriginalPrice: "300"
        }
      ]
    }
  },
  methods: {
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
    },
    // 跳转到商品详情
    toProductDetalis(item) {
      this.$router.push("/ProductZoneDetails")
    }
  }
};
</script>

<style lang="scss" scoped>
.ProductZone {
  width: 100%;
  .ProductZone_header {
    padding: 30px 0 22px;
    background: rgba(12, 13, 13);
    .response {
      display: flex;
      justify-content: center;
      .ProductZone_header_content {
        width: 380px;
        height: 425px;
        position: relative;
        background: url("../../assets/img/ProductZone1.png") no-repeat;
        background-size: cover;
        div {
          z-index: 2;
          position: relative;
          text-align: center;
          padding-top: 75px;
          h2 {
            font-size: 60px;
            font-weight: 500;
            color: #F2F2F2;
            line-height: 84px;
          }
          h3 {
            margin: 8px 0 10px;
            font-size: 38px;
            font-weight: 400;
            color: #C8C8C8;
            line-height: 53px;
          }
          h4 {
            font-size: 20px;
            font-weight: 400;
            color: #666666;
            line-height: 28px;
          }
        }
      }
      .ProductZone_header_content:before {
        content: "";
        background: #0C0D0D;
        opacity: 0.7;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        z-index: 1;
      }
    }
  }
  .ProductZone_content {
    background: #1A1B1D;
    .ProductZone_content_response {
      padding: 50px 40px 85px;
    }
    .ProductZone_content_h1 {
      text-align: center;
      font-size: 34px;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 48px;
    }
    .ProductZone_content_h2 {
      margin-top: 30px;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      button {
        margin-left: 40px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 25px;
        img {
          margin-left: 5px;
          width: 30px;
          height: 30px;
        }
      }
      .active {
        font-size: 18px;
        color: #F2F2F2;
      }
    }
    .ProductZone_content_box {
      padding: 50px 0 40px;
      display: flex;
      flex-wrap: wrap;
      .ProductZone_content_box_div {
        cursor: pointer;
        width: 300px;
        margin-right: 33px;
        margin-bottom: 33px;
        background: #252525;
        box-shadow: 0px 10px 20px 0px rgba(12, 13, 13, 0.2);
        border-radius: 4px;
        .ProductZone_content_box_div_img {
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
        }
        .ProductZone_content_box_div_price {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 18px;
            font-weight: 500;
            color: #F2F2F2;
            line-height: 25px;
          }
          div {
            padding: 6px 13px;
            background: #1A1B1D;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            font-size: 18px;
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
      .ProductZone_content_box_div:nth-child(4n + 4) {
        margin-right: 0;
      }
      .ProductZone_content_box_div:hover {
        .ProductZone_content_box_div_img {
          background: #1A1B1D;
        }
      }
    }
    .ProductZone_content_box:after {
      content: "";
      flex: auto;
    }
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1440px) {
  .ProductZone {
    .ProductZone_content {
      .ProductZone_content_box {
        .ProductZone_content_box_div {
          width: 350px;
          margin-right: 33px;
        }
        .ProductZone_content_box_div:nth-child(4n + 4) {
          margin-right: 33px;
        }
        .ProductZone_content_box_div:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
  }
}
@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .ProductZone {
    .ProductZone_content {
      .ProductZone_content_response {
        padding: 50px 0 85px;
      }
      .ProductZone_content_box {
        .ProductZone_content_box_div {
          width: 300px;
          margin-right: 26px;
        }
        .ProductZone_content_box_div:nth-child(4n + 4) {
          margin-right: 26px;
        }
        .ProductZone_content_box_div:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .ProductZone {
    .ProductZone_content {
      .ProductZone_content_response {
        padding: 50px 0 85px;
      }
      .ProductZone_content_box {
        .ProductZone_content_box_div {
          width: 347px;
          margin-right: 34px;
        }
        .ProductZone_content_box_div:nth-child(4n + 4) {
          margin-right: 0;
        }
        .ProductZone_content_box_div:nth-child(2n + 2) {
          margin-right: 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .ProductZone {
    .ProductZone_header {
      .response {
        .ProductZone_header_content {
          width: 100%;
          height: 370px;
          div {
            h2 {
              font-size: 40px;
              line-height: 54px;
            }
            h3 {
              font-size: 30px;
              line-height: 40px;
            }
            h4 {
              font-size: 16px;
              line-height: 22px;
            }
          }
        }
      }
    }
    .ProductZone_content {
      .ProductZone_content_response {
        padding: 50px 0 85px;
      }
      .ProductZone_content_h1 {
        font-size: 26px;
        line-height: 38px;
      }
      .ProductZone_content_h2 {
        button {
          margin-left: 20px;
          img {
            margin-left: 5px;
            width: 25px;
            height: 25px;
          }
        }
        .active {
          font-size: 16px;
        }
      }
      .ProductZone_content_box {
        .ProductZone_content_box_div {
          width: 100%;
          margin-right: 0;
        }
        .ProductZone_content_box_div:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
