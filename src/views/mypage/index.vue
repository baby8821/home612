<template>
  <div id="mypage">
    <Header></Header>
    <div class="pageContainer">
      <div class="leftPage">
        <div class="about">
          <div class="avatar">
            <img :src="myInfo.avatarPath" alt="" width="100%" height="100%" />
          </div>
          <label for="change">
            <span
              class="iconfont icon-xiugai3 changeAvatar"
              title="更换头像"
            ></span>
          </label>
          <input
            type="file"
            id="change"
            @change="getfile($event)"
            style="display: none"
            accept=".jpg,.png,.webp,.jpeg,.gif"
          />
          <div class="nickname">{{ myInfo.nickname }}</div>
          <div class="name">{{ myInfo.name }}</div>
        </div>
      </div>

      <div class="rightPage">
        <div class="main">
          <div class="title">
            <h3>基本信息:</h3>
            <span
              class="iconfont icon-xiugai1 edit"
              v-show="isEdit"
              @click="isEdit = !isEdit"
            ></span>
          </div>
          <div class="form">
            <form class="message">
              <div class="nickname">
                <span>绰号: </span>
                <input
                  type="text"
                  :disabled="isEdit"
                  v-model="myInfo.nickname"
                />
              </div>
              <div class="telephone">
                <span>联系方式: </span>
                <input
                  type="text"
                  class="tel"
                  :disabled="isEdit"
                  v-model="myInfo.tel"
                />
              </div>
              <div class="birth">
                <span>华诞: </span>
                <input type="date" :disabled="isEdit" v-model="myInfo.birth" />
              </div>
              <div class="livePlace">
                <span>府邸: </span>
                <input
                  type="text"
                  :disabled="isEdit"
                  v-model="myInfo.livePlace"
                />
              </div>
              <div class="habits">
                <span>癖好: </span>
                <span class="showHabits">
                  <span
                    v-for="(h, index) in myInfo.habits"
                    :key="index"
                    class="habit"
                    >{{ h }}
                    <span
                      class="iconfont icon-guanbi"
                      v-show="!isEdit"
                      @click="delHabit(index)"
                    ></span>
                  </span>
                  <span
                    class="iconfont icon-jia add"
                    v-show="myInfo.habits.length < maxHabitsNum && !isEdit"
                    @click="isAdd = !isAdd"
                  ></span>
                  <span class="addContain" v-show="isAdd">
                    <input
                      type="text"
                      v-model="addText"
                      @blur="addHabit"
                      @keyup.enter="addHabit"
                    />
                  </span>
                </span>
              </div>
              <div class="result">
                <button @mouseup="ensure" v-show="!isEdit">保存</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="selectAvatar" v-show="changeAva">
        <UploadAvatar :updateAvatar="updateAvatar"></UploadAvatar>
      </div>
    </div>
    <div class="mask" v-show="changeAva"></div>
  </div>
</template>

<script>
import Header from "@/components/header";
import request from "@/api";
import UploadAvatar from "@/components/uploadAvatar";

export default {
  name: "mypage",
  data() {
    return {
      myInfo: {
        habits: [],
      },
      isEdit: true,
      file: null,
      maxHabitsNum: 3,
      addText: null,
      isAdd: false,
    };
  },
  mounted() {
    request({
      url: "/user/myInfo/get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("myPage response", res);
      if (res.isOK == true) {
        this.myInfo = res.data;
        this.myInfo.birth = this.myInfo.birth.slice(0, 10);
        this.myInfo.habits = this.myInfo.habits.split(";");
        this.myInfo.habits.pop();
      } else {
        this.$router.replace("/login");
      }
    });
  },
  computed: {
    changeAva() {
      return this.$store.state.changeAva;
    },
  },
  methods: {
    getfile(e) {
      this.$store.commit("CHANGE", true);
      // 获取选取的图片
      this.file = e.target.files[0];
      console.log(this.file);
      this.$store.commit("ADDUPLOADIMG", this.file);
    },
    delHabit(index) {
      this.myInfo.habits.splice(index, 1);
    },
    addHabit() {
      this.isAdd = false;
      if (this.addText) {
        console.log("add habit", this.addText);
        this.myInfo.habits.push(this.addText);
      }
      this.addText = null;
    },
    ensure() {
      console.log("保存结果");
      this.isEdit = true;
      let _data = JSON.stringify(this.myInfo);
      let data = JSON.parse(_data);
      data.habits = data.habits.join(";") + ";";
      request({
        url: "/user/myInfo/update",
        method: "post",
        data,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log("mypage upload response", res);
        if (res.isOK) {
          console.log("upload success");
        }
      });
    },
    updateAvatar(newPath) {
      this.myInfo.avatarPath = newPath;
    },
  },
  components: {
    Header,
    UploadAvatar,
  },
};
</script>

<style scoped lang="less">
#mypage {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/home_bgimg.jpg);

  .pageContainer {
    position: absolute;
    top: 80px;
    width: 100%;
    min-width: 1200px;
    height: calc(100% - 100px);
    background-color: rgba(216, 205, 205, 0.767);
    border-radius: 40px;
    overflow: hidden;

    .leftPage {
      position: absolute;
      height: 100%;
      width: 400px;
      left: 40px;
      border-radius: 10px;

      .about {
        width: 400px;
        height: calc(100% - 100px);
        position: absolute;
        top: 50px;
        border-right: 2px dashed rgb(119, 110, 110);

        .avatar {
          position: relative;
          width: 300px;
          height: 300px;
          background-color: rgb(95, 92, 92);
          margin: 10px auto 20px auto;
          border-radius: 150px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .changeAvatar {
          position: absolute;
          font-size: 22px;
          right: 30px;
          top: 20px;
          color: rgb(145, 110, 110);
          cursor: pointer;

          &:hover {
            color: rgba(255, 255, 255, 0.678);
          }
        }

        .nickname {
          font-size: 36px;
          font-weight: 700;
          margin: 10px auto;
        }

        .name {
          font-size: 22px;
          margin: 10px auto;
        }
      }
    }

    .rightPage {
      width: calc(100% - 500px);
      height: 100%;
      position: absolute;
      left: 470px;

      .main {
        width: 100%;
        height: calc(100% - 100px);
        margin-top: 50px;

        .title {
          position: relative;
          width: calc(100% - 20px);
          height: 50px;
          text-align: left;
          border-bottom: 1px solid rgba(238, 105, 28, 0.932);
          line-height: 50px;
          padding-left: 20px;

          h3 {
            font-size: 26px;
            font-weight: 500;
            color: rgba(8, 255, 255, 0.795);
            text-shadow: 0 0 4px rgb(119, 114, 114);
          }

          .edit {
            position: absolute;
            right: 20px;
            top: 0px;
            font-size: 22px;
            font-weight: 700;
            color: rgb(145, 110, 110);
            cursor: pointer;
            transition: all 0.5s;

            &:hover {
              color: rgba(255, 255, 255, 0.678);
            }
          }
        }

        .form {
          width: 100%;
          margin-top: 20px;
          height: calc(100% - 70px);

          .message {
            height: 100%;
            width: calc(100% - 50px);
            margin-left: 50px;

            div {
              width: 100%;
              height: 50px;
              margin-bottom: 1px;
              text-align: left;
              line-height: 50px;
              font-size: 20px;
              position: relative;

              span {
                display: inline-block;
                width: 100px;
                height: 100%;
              }

              input {
                background-color: transparent;
                outline: none;
                border: 1px solid #27272771;
                border-radius: 5px;
                height: 38px;
                padding-left: 10px;
                caret-color: rgb(255, 255, 255);

                &:hover,
                &:focus {
                  border: 1px solid #b5784b;
                  outline: 1px solid #c49778;
                }
              }

              .showHabits {
                display: inline-block;
                width: calc(100% - 100px);

                .habit {
                  width: auto;
                  height: 38px;
                  margin: 6px 12px 6px 0;
                  padding: 0 15px;
                  border-radius: 8px;
                  position: relative;
                  border: 1px solid rgb(255, 255, 255);
                  text-align: center;
                  line-height: 38px;
                  color: #fff;
                  cursor: default;

                  span {
                    width: 10px;
                    height: 10px;
                    font-size: 10px;
                    line-height: 10px;
                    position: absolute;
                    right: -2px;
                    top: -2px;
                    transition: all 0.5s;
                    cursor: pointer;
                    color: rgba(0, 0, 0, 0.514);

                    &:hover {
                      color: rgba(255, 255, 255, 0.541);
                      transform: scale(1.5);
                    }
                  }

                  &:nth-child(1) {
                    background-color: rgba(50, 218, 50, 0.815);
                    box-shadow: 0 0 5px green;
                  }

                  &:nth-child(2) {
                    background-color: rgba(240, 148, 43, 0.815);
                    box-shadow: 0 0 5px rgb(228, 142, 29);
                  }

                  &:nth-child(3) {
                    background-color: rgba(236, 63, 20, 0.815);
                    box-shadow: 0 0 5px rgb(231, 61, 19);
                  }
                }

                .add {
                  color: #b5784b;
                  font-size: 22px;
                  cursor: pointer;
                }
              }
            }

            .habits > span {
              float: left;
            }

            .result {
              margin-top: 70px;

              button {
                width: 100px;
                height: 38px;
                background-color: rgba(36, 211, 36, 0.877);
                font-size: 18px;
                border-radius: 10px;
                border: 1px solid rgb(145, 135, 135);
                color: #fff;
                cursor: pointer;
                box-shadow: 0 0 2px #fff;

                &:hover {
                  box-shadow: 0 0 5px rgb(97, 96, 96);
                }
              }
            }
          }
        }
      }
    }

    .selectAvatar {
      position: absolute;
      left: calc(50% - 260px);
      top: calc(50% - 260px);
      width: 520px;
      height: 520px;
      background-color: #fff;
      z-index: 100;
    }
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(109, 106, 106, 0.76);
  }
}
</style>