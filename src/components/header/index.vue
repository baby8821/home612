<template>
  <div id="header">
    <div class="container">
      <div class="home">
        <router-link to="/home">I'm 612</router-link>
      </div>
      <div
        class="login"
        @mouseenter="display = 'display: block'"
        @mouseleave="display = 'display: none'"
      >
        <div class="avatar">
          <img :src="avatarPath" width="100%" height="100%" />
        </div>
        <a class="userinfo">{{ name }}</a>
        <ul class="userlist" v-if="name" :style="display">
          <li @click="goMyPage">我的主页</li>
          <li @click="signOut">退出登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/api";

export default {
  name: "Header",
  data() {
    return {
      display: "display: none",
      avatarPath: "",
      name: "",
    };
  },
  mounted() {
    request({
      url: "/avatar/get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("header success reponse", res);
      if (res.isOK) {
        this.name = res.name;
        this.avatarPath = res.avatarPath;
      } else {
        this.$router.replace("/login");
      }
    });
  },
  methods: {
    goMyPage() {
      this.$router.push("/mypage");
    },
    signOut() {
      // request({
      //   url: "/signOut",
      // });
      localStorage.removeItem("token");
      this.$router.replace({ path: "/" });
    },
  },
};
</script>

<style scoped lang="less">
#header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: transparent;
  float: left;
  z-index: 100;

  .container {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    & > div {
      position: relative;
      height: 50px;
      align-items: center;
      line-height: 50px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      cursor: pointer;

      & > a {
        color: rgba(255, 255, 255, 0.685);
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        transition: all 0.5s;

        &:hover {
          color: #b07942;
          text-decoration: none;
        }
      }

      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 20px;
        overflow: hidden;
      }

      .userlist {
        position: absolute;
        top: 50px;
        border-radius: 4px;
        overflow: hidden;

        li {
          width: 100px;
          height: 35px;
          line-height: 35px;
          font-size: 18px;
          background-color: #fde9cd;
          transition: all 0.3s;

          &:hover {
            background-color: #f1cbaa;
            color: #422e25;
          }
        }
      }
    }
  }
}
</style>