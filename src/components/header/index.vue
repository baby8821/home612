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
          <img src="@/assets/612door.jpg" alt="" width="100%" height="100%" />
        </div>
        <router-link to="/login" v-show="!token" @click="goLogin"
          >login</router-link
        >
        <a class="userinfo" v-show="token">{{ name }}</a>
        <ul class="userlist" v-if="token" :style="display">
          <li @click="signOut">退出登录</li>
          <li @click="AvatarDisplay = 'display: block'">更换头像</li>
        </ul>
      </div>
    </div>
    <div class="selectFile" :style="AvatarDisplay">
      <input type="text" name="name" :value="name" style="display: none" />
      <div class="title">更换头像</div>
      <div class="select">
        <input type="file" @change="getfile($event)" />
      </div>
      <div class="showAvatar"></div>
      <div class="isSure">
        <button class="sure" @click="upload">确定</button>
        <button class="cancel" @click="AvatarDisplay = 'display: none'">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/api/uploadAvatar";
export default {
  name: "Header",
  data() {
    return {
      display: "display: none",
      AvatarDisplay: "display: none",
      file: null,
      showAvatar: null,
    };
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.showAvatar = document.getElementsByClassName("showAvatar")[0];
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    name() {
      return this.$store.state.name;
    },
  },
  methods: {
    signOut() {
      this.$store.commit("DELETETOKEN");
      this.$router.push({ path: "/" });
    },
    goLogin() {
      this.$router.push({ path: "/" });
    },
    getfile(e) {
      this.file = e.target.files[0];
      let image = document.createElement("img");
      image.src = URL.createObjectURL(this.file);
      image.style.height = "100%";

      this.removeUploadImage();
      console.log(this.showAvatar);
      this.showAvatar.insertAdjacentElement("beforeend", image);
    },
    upload() {
      let forms = new FormData();
      forms.append("file", this.file);
      forms.append("name", "youbo");

      request
        .post("/uploadAvatar", forms, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          this.removeUploadImage();
        });
    },
    removeUploadImage() {
      if (this.showAvatar.children.length !== 0) {
        this.showAvatar.removeChild(this.showAvatar.children[0]);
      }
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
      width: auto;
      // background-color: pink;
      padding: 0 5px;
      align-items: center;
      line-height: 50px;
      font-size: 30px;
      display: flex;
      justify-content: center;

      & > a {
        color: rgba(255, 255, 255, 0.685);
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        transition: all 0.5s;

        &:hover {
          color: #b07942;
          text-decoration: none;
          cursor: pointer;
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
          cursor: pointer;

          &:hover {
            background-color: #f1cbaa;
            color: #422e25;
          }
        }
      }
    }
  }

  .selectFile {
    width: 300px;
    height: 300px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    left: 50%;
    transform: translate(-50%, 80%);
    box-shadow: #ccc 0px 0px 10px;

    .title {
      height: 40px;
      width: 100%;
      line-height: 40px;
      font-size: 18px;
    }

    .showAvatar {
      background-color: #ccc;
      width: 170px;
      height: 170px;
      margin: 10px auto;
      overflow: hidden;

      & > img {
        width: 100%;
        height: 100%;
      }
    }

    .isSure {
      width: 100%;

      button {
        width: 60px;
        height: 30px;
        margin: 0 20px;
        cursor: pointer;
        transition: all 0.5s;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;

        &:hover {
          color: white;
          background: linear-gradient(to right, #fc99f2, #c2d0fb);
        }
      }
    }
  }
}
</style>