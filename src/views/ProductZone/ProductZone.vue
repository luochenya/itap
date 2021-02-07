<template>
  <div class="ProductZone">
    <!-- 顶部导航组件 -->
    <Header />
    <!-- 顶部banner图 -->
    <Banner />
    <!-- 顶部轮播 -->
    <!-- <div class="ProductZone_header">
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
    </div> -->
    <!-- 产品专区 -->
    <div class="ProductZone_content">
      <div class="ProductZone_content_response response">
        <h1 class="ProductZone_content_h1">{{ $t('ProductZone.ProductZone') }}</h1>
        <h2 class="ProductZone_content_h2">


          <button>
            {{ $t('ProductZone.Sort') }}
          </button>


          <button>
            <el-dropdown placement="bottom" class="button2" @command="handleCommand" @visible-change="LanguageSwitchOpen">
              <span class="el-dropdown-link" :class="LanguageSwitchStatus ? 'active' : ''">
                {{ sortTitle }}
                <img src="@/assets/img/ProductZone_select.png" alt="" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- 有token -->
                <el-dropdown-item command="1">
                  <p class="ProductZone_content_h2_p">{{ $t('ProductZone.Popularity') }}：{{ $t('ProductZone.Hightolow') }}</p>
                </el-dropdown-item>
                <el-dropdown-item command="2">
                  <p class="ProductZone_content_h2_p">{{ $t('ProductZone.Popularity') }}：{{ $t('ProductZone.Lowtohigh') }}</p>
                </el-dropdown-item>
                <el-dropdown-item command="3">
                  <p class="ProductZone_content_h2_p">{{ $t('ProductZone.Addedtime') }}：{{ $t('ProductZone.Fromnewtoold') }}</p>
                </el-dropdown-item>
                <el-dropdown-item command="4">
                  <p class="ProductZone_content_h2_p">{{ $t('ProductZone.Addedtime') }}：{{ $t('ProductZone.Fromoldtonew') }}</p>
                </el-dropdown-item>
                <el-dropdown-item command="5">
                  <p class="ProductZone_content_h2_p">{{ $t('ProductZone.Productprice') }}：{{ $t('ProductZone.Hightolow') }}</p>
                </el-dropdown-item>
                <el-dropdown-item command="6">
                  <p class="ProductZone_content_h2_p">{{ $t('ProductZone.Productprice') }}：{{ $t('ProductZone.Lowtohigh') }}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </button>
        </h2>
        <div class="ProductZone_content_box">
          <div class="ProductZone_content_box_div" v-for="(item, index) in dataList" :key="index">
            <div class="ProductZone_content_box_div_img">
              <img :src="item.pic[0]" alt="" />
              <div class="ProductZone_content_box_div_hover">
                <button @click="toProductDetalis(item)" class="">
                  <img class="img1" src="@/assets/img/ProductZone_hover1.png" alt="" />
                  <img class="img2" src="@/assets/img/ProductZone_hover1s.png" alt="" />
                </button>
                <button @click="toShoppingCart(item)">
                  <img class="img1" src="@/assets/img/ProductZone_hover2.png" alt="" />
                  <img class="img2" src="@/assets/img/ProductZone_hover2s.png" alt="" />
                </button>
              </div>
            </div>
            <div class="ProductZone_content_box_div_price">
              <p :title="item.name">{{ item.name }}</p>
              <div>
                <h4 v-if="item.is_good_price == '0'">$ {{ $Thousands(item.price) }}</h4>
                <h5 v-if="item.is_good_price == '1'">$ {{ $Thousands(item.price) }}</h5>
                <h6 v-if="item.is_good_price == '1'">$ {{ $Thousands(item.good_price) }}</h6>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <Pagination
          :currentPage="offset"
          :pageSize="limit"
          :total="total"
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
import Banner from "@/components/Banner.vue";
import Pagination from "@/components/Pagination.vue";
import { Message } from "element-ui";
import { POST_GetProductList, POST_AddCart } from "@/api/api";

export default {
  name: "ProductZone",
  components: {
    Header,
    Bottom,
    Banner,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 12,
      total: 0,
      sort: 1,
      sortTitle: this.$t('ProductZone.Popularity') + '：' + this.$t('ProductZone.Hightolow'),
      LanguageSwitchStatus: false,
      dataList: [],
    }
  },
  created() {
    this._GetProductList()
  },
  methods: {
    _GetProductList() {
      const form = {
        page: this.offset,
        limit: this.limit,
        sort: this.sort
      }
      POST_GetProductList(form).then(res => {
        if (res.code == 200) {
          this.dataList = res.data.product_list
          this.total = res.data.total
        }
      })
    },
    // 排序下拉框状态
    LanguageSwitchOpen(flag) {
      this.LanguageSwitchStatus = flag
    },
    // 排序切换
    handleCommand(command) {
      this.sort = command
      if (command == 1) {
        this.sortTitle = this.$t('ProductZone.Popularity') + '：' + this.$t('ProductZone.Hightolow')
      } else if (command == 2) {
        this.sortTitle = this.$t('ProductZone.Popularity') + '：' + this.$t('ProductZone.Lowtohigh')
      } else if (command == 3) {
        this.sortTitle = this.$t('ProductZone.Addedtime') + '：' + this.$t('ProductZone.Fromnewtoold')
      } else if (command == 4) {
        this.sortTitle = this.$t('ProductZone.Addedtime') + '：' + this.$t('ProductZone.Fromoldtonew')
      } else if (command == 5) {
        this.sortTitle = this.$t('ProductZone.Productprice') + '：' + this.$t('ProductZone.Hightolow')
      } else if (command == 6) {
        this.sortTitle = this.$t('ProductZone.Productprice') + '：' + this.$t('ProductZone.Lowtohigh')
      }
      this._GetProductList()
    },
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
      this._GetProductList()
    },
    // 跳转到商品详情
    toProductDetalis(item) {
      this.$router.push({
        path: "/ProductZoneDetails",
        query: {
          data: JSON.stringify(item)
        }
      })
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
      .button2 {
        margin-left: 40px;
        font-weight: 400;
        line-height: 25px;
        font-size: 16px;
        color: #F2F2F2;
        span {
          display: flex;
          align-items: center;
          img {
            margin-left: 5px;
            width: 30px;
            height: 30px;
          }
        }
        .active {
          img {
            transform: rotate(180deg);
          }
        }
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
          .ProductZone_content_box_div_hover {
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
        .ProductZone_content_box_div_price {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            width: 45%;
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
            padding: 6px 8px;
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
              margin-right: 10px;
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
          position: relative;
          .ProductZone_content_box_div_hover {
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
