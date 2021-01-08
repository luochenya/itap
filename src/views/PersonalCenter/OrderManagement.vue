<template>
  <div class="OrderManagement">
    <!-- 顶部导航组件 -->
    <Header />
    <div class="OrderManagement_box response">
      <!-- 左侧公用组件 -->
      <Left />
      <div class="OrderManagement_box_content">
        <h1 class="OrderManagement_box_content_h1">{{ $t('OrderManagement.Ordermanagement') }}</h1>
        <div class="OrderManagement_box_content_div">
          <div class="content_box">
            <div class="content_box_div" v-for="(item, index) in dataList" :key="index">
              <div class="content_box_div_header">
                <div class="header_div1">
                  <img src="@/assets/img/icon_time.png" alt="" />
                  {{item.order_time}}
                </div>
                <div class="header_div2">
                  {{ $t('OrderManagement.Ordernumber') }}：{{item.id}}
                </div>
                <div class="header_div3">
                  <div>
                    {{ $t('OrderManagement.total') }}：
                    <span>$ {{ $Thousands(item.total_amount) }}</span>
                  </div>
                  <img :class="!openStatusList[index] ? 'active' : ''" @click="openListClick(index)" src="@/assets/img/FAQ2.png" alt="" />
                </div>
              </div>
              <div v-if="openStatusList[index]">
                <div class="content_box_div_bottom" v-for="(items, indexs) in item.goods_list" :key="indexs">
                  <div class="bottom_div1">
                    <div>
                      <img v-if="items.pic" :src="items.pic[0]" alt="" />
                    </div>
                    <p>{{items.name}}</p>
                  </div>
                  <div class="bottom_div2">
                    x{{items.pro_model_num}}
                  </div>
                  <div class="bottom_div3">
                    $ {{ $Thousands(items.subtotal) }}
                  </div>
                </div>
              </div>
              <div class="content_box_div_button" v-if="openStatusList[index]">
                <button @click="cancelOrder(item)">{{ $t('OrderManagement.cancelorder') }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="OrderManagement_box_content_Pagination">
          <!-- 分页 -->
          <Pagination
            :currentPage="offset"
            :pageSize="limit"
            :total="total"
            :handleCurrentChange="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    
    <!-- 取消订单确认弹窗 -->
    <Popup v-if="confirmPopupStatus">
      <template slot="body">
        <div class="Popup_box Popup_boxs">
          <img class="Popup_box_imgs" src="@/assets/img/popup2.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('OrderManagement.Confirmtocanceltheorder') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('OrderManagement.chargedforordercancellation') }}</h3>
          <div class="Popup_box_buttons">
            <button class="Popup_box_buttons_left" @click="confirmPopupStatus = false">{{ $t('OrderManagement.Cancel') }}</button>
            <button class="Popup_box_buttons_right" @click="confirmCancel()">{{ $t('OrderManagement.Confirm') }}</button>
          </div>
        </div>
      </template>
    </Popup>

    <!-- 取消订单成功弹窗 -->
    <Popup v-if="successPopupStatus">
      <template slot="body">
        <div class="Popup_box">
          <img class="Popup_box_img" src="@/assets/img/Popup1.png" alt="" />
          <h2 class="Popup_box_h2">{{ $t('OrderManagement.Ordercancelledsuccessfully') }}</h2>
          <h3 class="Popup_box_h3">{{ $t('OrderManagement.pleasecontactus') }}</h3>
          <div class="Popup_box_button">
            <button @click="successPopupClose()">{{ $t('OrderManagement.Confirm') }}</button>
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
import Pagination from "@/components/Pagination.vue";
import { POST_MyOrder, POST_CancelOrder } from "@/api/api";

export default {
  name: "OrderManagement",
  components: {
    Header,
    Bottom,
    Left,
    Popup,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 10,
      total: 0,
      confirmPopupStatus: false,
      successPopupStatus: false,
      openStatusList: [],
      dataList: [],
      orderId: "",
    }
  },
  created() {
    this._MyOrder()
  },
  methods: {
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
      this._MyOrder()
    },
    // 获取订单管理列表
    _MyOrder() {
      const form = {
        page: this.offset,
        limit: this.limit
      }
      POST_MyOrder(form).then(res => {
        if (res.code == 200) {
          this.total = res.data.total
          this.dataList = res.data.order_list
          this.openStatusList = []
          this.dataList.forEach((item, index) => {
            this.openStatusList.splice(index, 0, false)
          })
        }
      })
    },
    // 打开列表
    openListClick(index) {
      this.openStatusList.splice(index, 1, !this.openStatusList[index])
    },
    // 取消订单
    cancelOrder(item) {
      this.confirmPopupStatus = true
      this.orderId = item.id
    },
    // 确认取消订单弹窗确定
    confirmCancel() {
      this.confirmPopupStatus = false
      const form = {
        order_id: this.orderId
      }
      POST_CancelOrder(form).then(res => {
        if (res.code == 200) {
          this.successPopupStatus = true
        }
      })
    },
    // 成功弹窗关闭
    successPopupClose() {
      this.successPopupStatus = false
      this._MyOrder()
    }
  }
};
</script>

<style lang="scss" scoped>
.OrderManagement {
  width: 100%;
  background: #0C0D0D;
  .OrderManagement_box {
    padding: 0 40px;
    height: 749px;
    display: flex;
    .OrderManagement_box_content {
      width: calc(100% - 270px);
      height: 100%;
      background: #1A1B1D;
      .OrderManagement_box_content_h1 {
        padding: 30px 30px 21px 30px;
        font-size: 18px;
        font-weight: 500;
        color: #F2F2F2;
        line-height: 25px;
        border-bottom: 1px solid #353535;
      }
      .OrderManagement_box_content_div {
        height: calc(100% - 147px);
        position: relative;
        overflow: hidden;
        .content_box {
          padding: 30px 40px;
          position: absolute;
          top: 0;
          right: -17px;
          left: 0;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          .content_box_div {
            margin-bottom: 24px;
            width: 100%;
            background: #1F2022;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            .content_box_div_header {
              padding: 25px 30px 25px 40px;
              width: 100%;
              background: #1F2022;
              display: flex;
              align-items: center;
              .header_div1 {
                width: 40%;
                display: flex;
                align-items: center;
                font-size: 16px;
                font-weight: 500;
                color: #F2F2F2;
                line-height: 22px;
                img {
                  width: 24px;
                  height: 24px;
                  margin-right: 6px;
                }
              }
              .header_div2 {
                width: 20%;
                text-align: right;
                font-size: 16px;
                font-weight: 400;
                color: #C8C8C8;
                line-height: 22px;
              }
              .header_div3 {
                width: 40%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                div {
                  padding: 0 22px;
                  height: 36px;
                  background: #1A1B1D;
                  border-radius: 4px;
                  font-size: 16px;
                  font-weight: 400;
                  color: #C8C8C8;
                  line-height: 36px;
                  span {
                    color: #007DFF;
                  }
                }
                img {
                  margin-left: 40px;
                  width: 30px;
                  height: 30px;
                  cursor: pointer;
                }
                .active {
                  transform: rotate(180deg);
                }
              }
            }
            .content_box_div_bottom {
              padding: 20px 30px 20px 40px;
              background: #1A1B1D;
              display: flex;
              .bottom_div1 {
                width: 40%;
                display: flex;
                div {
                  margin-right: 10px;
                  width: 100px;
                  height: 100px;
                  img {
                    max-width: 100%;
                    max-height: 100%;
                  }
                }
                p {
                  width: calc(100% - 130px);
                  font-size: 18px;
                  font-weight: 500;
                  color: #F2F2F2;
                  line-height: 25px;
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 4;
                  line-clamp: 4;
                  -webkit-box-orient: vertical;
                }
              }
              .bottom_div2 {
                width: 20%;
                text-align: right;
                font-size: 18px;
                font-weight: 400;
                color: #F2F2F2;
                line-height: 25px;
              }
              .bottom_div3 {
                width: 40%;
                text-align: right;
                font-size: 18px;
                font-weight: 500;
                color: #F2F2F2;
                line-height: 25px;
              }
            }
            .content_box_div_button {
              padding: 0 30px 0 40px;
              height: 58px;
              width: 100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              button {
                background: #1F2022;
                font-size: 15px;
                font-weight: 400;
                color: #FF3321;
                line-height: 21px;
              }
            }
          }
        }
      }
      .OrderManagement_box_content_Pagination {
        border-top: 1px solid #353535;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .OrderManagement {
    .OrderManagement_box {
      padding: 0;
      .OrderManagement_box_content {
        .OrderManagement_box_content_div {
          .content_box {
            padding: 30px;
            .content_box_div {
              .content_box_div_header {
                padding: 20px 30px;
                flex-wrap: wrap;
                .header_div1 {
                  width: 50%;
                }
                .header_div2 {
                  width: 50%;
                }
                .header_div3 {
                  margin-top: 20px;
                  width: 100%;
                }
              }
              .content_box_div_bottom {
                padding: 20px 30px;
                flex-wrap: wrap;
                .bottom_div1 {
                  width: 50%;
                  flex-wrap: wrap;
                  justify-content: center;
                  p {
                    margin-top: 10px;
                    width: 100%;
                    text-align: center;
                  }
                }
                .bottom_div2 {
                  width: 20%;
                }
                .bottom_div3 {
                  width: 30%;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .OrderManagement {
    .OrderManagement_box {
      padding: 0;
      .OrderManagement_box_content {
        width: calc(100% - 220px);
        .OrderManagement_box_content_div {
          .content_box {
            padding: 30px;
            .content_box_div {
              .content_box_div_header {
                padding: 20px 30px;
                flex-wrap: wrap;
                .header_div1 {
                  width: 40%;
                }
                .header_div2 {
                  width: 60%;
                }
                .header_div3 {
                  margin-top: 20px;
                  width: 100%;
                }
              }
              .content_box_div_bottom {
                padding: 20px 30px;
                flex-wrap: wrap;
                .bottom_div1 {
                  width: 50%;
                  flex-wrap: wrap;
                  justify-content: center;
                  p {
                    margin-top: 10px;
                    width: 100%;
                    text-align: center;
                  }
                }
                .bottom_div2 {
                  width: 20%;
                }
                .bottom_div3 {
                  width: 30%;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .OrderManagement {
    .OrderManagement_box {
      padding: 0;
      height: auto;
      flex-wrap: wrap;
      .OrderManagement_box_content {
        width: 100%;
        height: 700px;
        .OrderManagement_box_content_h1 {
          text-align: center;
        }
        .OrderManagement_box_content_div {
          .content_box {
            right: 0;
            padding: 30px 20px;
            .content_box_div {
              .content_box_div_header {
                padding: 20px;
                flex-wrap: wrap;
                .header_div1 {
                  justify-content: flex-end;
                  width: 100%;
                }
                .header_div2 {
                  margin-top: 20px;
                  width: 100%;
                }
                .header_div3 {
                  margin-top: 20px;
                  width: 100%;
                }
              }
              .content_box_div_bottom {
                padding: 20px;
                flex-wrap: wrap;
                .bottom_div1 {
                  width: 100%;
                  flex-wrap: wrap;
                  justify-content: center;
                  p {
                    margin-top: 10px;
                    width: 100%;
                    text-align: center;
                  }
                }
                .bottom_div2 {
                  margin-top: 10px;
                  width: 100%;
                }
                .bottom_div3 {
                  margin-top: 10px;
                  width: 100%;
                }
              }
              .content_box_div_button {
                padding: 0 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
