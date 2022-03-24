<template>
  <div id="login">
    <div class="container">
      <video src="@/assets/612door.mp4" height="100%" muted />
      <audio src="@/assets/bgm/bensound-cute.mp3" autoplay hidden></audio>
      <div :class="loginBox">
        <div class="title">Login</div>
        <div :class="username">
          User:
          <input
            type="text"
            v-model="user"
            spellcheck="false"
            @click="cancelError"
            @keydown.enter="keyFocus"
            autofocus
          />
        </div>
        <div :class="password">
          Key:
          <input
            type="password"
            v-model="pwd"
            spellcheck="false"
            @click="cancelError"
            @keydown.enter="login"
          />
        </div>
        <button class="check" @click="login">Go</button>
      </div>
      <div
        class="info animate__animated animate__fadeInDown"
        v-show="isShow"
        :style="color"
      >
        <span class="iconfont icon-chenggong icon" v-show="success"></span>
        <span class="iconfont icon-shibai icon" v-show="!success"></span>
        <span class="msg">{{ info }}</span>
      </div>
      <span
        class="iconfont icon-51yinliang"
        v-show="music"
        @click="changeVolume"
      ></span>
      <span
        class="iconfont icon-52jingyin"
        v-show="!music"
        @click="changeVolume"
      ></span>
    </div>
  </div>
</template>

<script>
import request from "@/api";
import "animate.css";

export default {
  name: "Login",
  data() {
    return {
      user: null,
      pwd: null,
      username: ["username"],
      password: ["password"],
      loginBox: ["login_box"],
      isShow: false,
      success: false,
      info: "密码错误",
      color: "color: green",
      music: true,
    };
  },
  mounted() {
    let audio = document.querySelector("audio");
    audio.play();
    audio.volume = 0.2;
  },
  methods: {
    login() {
      if (this.user) {
        if (this.pwd) {
          request({
            url: "/login",
            method: "post",
            data: JSON.stringify({ userName: this.user, password: this.pwd }),
          }).then((res) => {
            console.log("sign in", res);
            if (res.isOK === true) {
              // 登录成功
              this.isShow = true;
              this.success = true;
              this.color = "color: green";
              this.info = "欢迎回来~ " + res.data.name;
              this.loginBox.push("hidden");
              setTimeout(() => {
                this.isShow = false;
              }, 2000);

              // 将token保存在LocalStorage
              localStorage.setItem("token", res.data.token);
              // 登录框消失
              this.display = "display: none";
              // 播放视频
              let video = document.querySelector("video");
              video.className = "playing";
              video.play();
              // 路由跳转
              setTimeout(() => {
                this.$router.push("/home");
              }, 1000);
            } else {
              // 密码错误
              this.pwd = null;
              this.password.push("error");
              this.errInfo("密码错误");
            }
          });
        } else {
          this.password.push("error");
          this.errInfo("请输入密码");
        }
      } else {
        this.username.push("error");
        this.errInfo("请输入用户名");
      }
    },
    keyFocus() {
      let pwd = document.querySelector(".password>input");
      pwd.focus();
    },
    cancelError() {
      this.username = this.username.slice(0, 1);
      this.password = this.password.slice(0, 1);
      this.error = false;
      this.right = false;
    },
    errInfo(info) {
      this.isShow = true;
      this.success = false;
      this.color = "color: red";
      this.info = info;
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    },
    changeVolume() {
      let audio = document.querySelector("audio");
      if (this.music) {
        audio.pause();
      } else {
        audio.play();
      }
      this.music = !this.music;
    },
  },
};
</script>

<style scoped lang="less">
#login {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/login_bg.jpg);
  background-position: -350px;

  .container {
    position: relative;
    width: auto;
    height: 100%;

    & > span {
      font-size: 30px;
      color: rgba(255, 255, 255, 0.589);
      position: absolute;
      right: 80px;
      top: 40px;
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, 0.788);
        text-shadow: 0 0 3px #ccc;
      }
    }

    video {
      position: absolute;
      filter: blur(5px);
      transition: all 6s;
      left: 50%;
      transform: translate(-50%);
    }

    .playing {
      filter: blur(0px);
      transform: translateX(-50%) scale(1.5);
    }

    .login_box {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%);
      width: 400px;
      height: 300px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgb(160, 150, 150);
      color: white;

      .title {
        margin-top: 7%;
        font-size: 36px;
      }
      .username,
      .password {
        font-size: 24px;
        margin: 25px;
        display: flex;
        justify-content: space-between;

        input {
          border: none;
          border-bottom: 1px solid white;
          background-color: transparent;
          outline: none;
          color: white;
          padding: 2px 5px;
          width: 77%;
          font-size: 18px;
        }
      }

      .error {
        color: red;

        input {
          border-bottom: 1px solid rgb(255, 0, 0);
        }
      }

      button {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        cursor: pointer;
        border: none;
        font-size: 20px;
        transition: all 2s;
        color: rgb(53, 230, 253);

        &:hover {
          color: white;
          background: linear-gradient(to right, #fc99f2, #c2d0fb);
        }
      }
    }

    .info {
      width: 333px;
      margin: 0 auto;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.623);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 10px 10px;
      transition: all 1s;

      span {
        font-size: 16px;
        margin: 0 5px;
      }
    }
  }

  .hidden {
    display: none;
  }
}
</style>