<template>
  <div class="Access">
    <div class="response">
      <div class="Access_box">
        <div class="Access_box_header">
          <img :title="Language.home" @click="toRouter('/')" src="@/assets/img/logo.png" alt="I TAP" />
        </div>
        <div class="Access_box_userInfo">
          <img class="img" v-if="!userInfo.user_head" src="@/assets/img/headerImg.png" alt="" />
          <img class="img" v-if="userInfo.user_head" :src="userInfo.user_head" alt="" />
          <div>
            <p>{{userInfo.nick_name}}</p>
            <span>{{userInfo.about}}</span>
          </div>
        </div>
        <div class="Access_box_people">
          <div>
            <img src="@/assets/img/icon_eyes.png" alt="" />
            {{ Language.Numbervisitors }}
          </div>
          <p>{{visitors}}{{ Language.people }}</p>
        </div>
        <div class="Access_box_bottom">
          <div class="Access_box_bottom_div" v-for="(item, index) in communityUserList" :key="index">
            <div @click="imgClick(item.url)">
              <img :src="item.pic" alt="" />
            </div>
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { POST_GetUserCommunityList } from "@/api/api";
import axios from "axios";

export default {
  name: "Access",
  data() {
    return {
      userInfo: {},
      communityUserList: [],
      visitors: 0,
      Language: {
        home: "",
        Numbervisitors: "",
        people: "",
      }
    }
  },
  mounted() {
    if (this.$route.query.lang == 'en') {
      this.Language.home = 'Home'
      this.Language.Numbervisitors = 'Number of visitors'
      this.Language.people = 'People'
    } else {
      this.Language.home = '首頁'
      this.Language.Numbervisitors = '造訪人數'
      this.Language.people = '人'
    }
  },
  created() {
    this._GetUserCommunityList()
  },
  methods: {
    _GetUserCommunityList() {
      axios.defaults.headers.post["lang"] = this.$route.query.lang;
      axios.post('/web/Overt/get_user_community_list/' + this.$route.query.id).then(res => {
        if (res.data.code == 200) {
          this.communityUserList = res.data.data.community_user_list
          this.userInfo = res.data.data.users_info
          this.visitors = res.data.data.visitors
        }
      })
      // POST_GetUserCommunityList(this.$route.query.id).then(res => {
      //   if (res.code == 200) {
      //     this.communityUserList = res.data.community_user_list
      //     this.userInfo = res.data.users_info
      //     this.visitors = res.data.visitors
      //   }
      // })
    },
    imgClick(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.Access {
  margin-top: -120px;
  min-width: 100vw;
  min-height: 100vh;
  background: #0C0D0D;
  .Access_box {
    margin: 0 auto;
    padding: 30px;
    width: 768px;
    .Access_box_header {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 98px;
        height: 33px;
      }
    }
    .Access_box_userInfo {
      margin-top: 30px;
      display: flex;
      align-items: center;
      img {
        border-radius: 50%;
        margin-right: 20px;
        width: 100px;
        height: 100px;
      }
      div {
        p {
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: 600;
          color: #F2F2F2;
          line-height: 21px;
        }
        span {
          font-size: 18px;
          font-weight: 400;
          color: #C8C8C8;
          line-height: 21px;
        }
      }
    }
    .Access_box_people {
      margin: 30px 0;
      padding: 0 30px;
      width: 100%;
      height: 50px;
      background: #1F2022;
      border-radius: 1px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-size: 16px;
        font-weight: 400;
        color: #C8C8C8;
        line-height: 20px;
        display: flex;
        align-items: center;
        img {
          margin-right: 8px;
          width: 30px;
          height: 30px;
        }
      }
      p {
        font-size: 18px;
        font-weight: 600;
        color: #F2F2F2;
        line-height: 20px;
      }
    }
    .Access_box_bottom {
      display: flex;
      flex-wrap: wrap;
      .Access_box_bottom_div {
        margin-top: 20px;
        margin-right: 34px;
        width: 150px;
        text-align: center;
        div {
          cursor: pointer;
          width: 150px;
          height: 150px;
          padding: 20px;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        p {
          font-size: 15px;
          font-weight: 400;
          color: #C8C8C8;
          line-height: 20px;
        }
      }
      .Access_box_bottom_div:nth-child(4n + 4) {
        margin-right: 0;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .Access {
    margin-top: -60px;
    width: 100%;
    height: 100%;
    .Access_box {
      padding: 30px 0;
      width: 100%;
      .Access_box_userInfo {
        padding: 0 10px;
        img {
          margin-right: 10px;
          width: 70px;
          height: 70px;
        }
        div {
          p {
            margin-bottom: 5px;
            font-size: 16px;
          }
          span {
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
      .Access_box_people {
        margin: 30px 0;
        padding: 0 20px;
        height: 40px;
        div {
          font-size: 12px;
          img {
            margin-right: 5px;
            width: 24px;
            height: 24px;
          }
        }
        p {
          font-size: 14px;
        }
      }
      .Access_box_bottom {
        .Access_box_bottom_div {
          margin-right: 7.5vw;
          width: 25vw;
          div {
            width: 25vw;
            height: 25vw;
            padding: 10px;
          }
          p {
            font-size: 13px;
          }
        }
        .Access_box_bottom_div:nth-child(4n + 4) {
          margin-right: 7.5vw;
        }
        .Access_box_bottom_div:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>