<template>
  <div id="mypage">
    <div class="pageContainer">
      <div class="leftPage">
        <div class="about">
          <div class="avatar"></div>
          <div class="nickname">最爱裸睡阿福</div>
          <div class="name">甄印福</div>
        </div>
      </div>
      <div class="rightPage">
        <div class="main">
          <div class="title">
            <h3>基本信息:</h3>
          </div>
          <div class="form">
            <form class="message">
              <div class="nickname">
                <span>绰号: </span>
                <input type="text" />
              </div>
              <div class="telephone">
                <span>联系方式: </span>
                <input type="text" class="tel" />
              </div>
              <div class="birth">
                <span>华诞: </span>
                <input type="date" />
              </div>
              <div class="livePlace">
                <span>府邸: </span>
                <input type="text" />
              </div>
              <div class="habits">
                <span>癖好: </span>
                <div class="showHabits"></div>
              </div>
              <div class="avatar"></div>
              <div class="result">
                <button @click="ensure">保存</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/api";
export default {
  name: "mypage",
  mounted() {
    // request({
    // url: "/mypage?username=",
    // });
  },
  methods: {
    ensure() {},
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
        }

        .nickname {
          font-size: 34px;
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

          // .change {
          //   position: absolute;
          //   right: 20px;
          //   top: 0px;
          //   font-size: 22px;
          //   font-weight: 700;
          //   color: rgb(145, 110, 110);
          //   cursor: pointer;
          //   transition: all 0.5s;

          //   &:hover {
          //     color: rgba(255, 255, 255, 0.678);
          //   }
          // }
        }

        .form {
          width: 100%;
          margin-top: 20px;
          height: calc(100% - 70px);

          .message {
            height: 100%;
            width: calc(100% - 50px);
            margin-left: 50px;
            // background-color: rgba(255, 192, 203, 0.671);

            div {
              width: 100%;
              height: 50px;
              margin-bottom: 1px;
              text-align: left;
              line-height: 50px;
              font-size: 20px;
              // background-color: rgba(255, 255, 255, 0.63);

              span {
                display: inline-block;
                width: 100px;
                height: 100%;
                // background-color: pink;
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
            }
          }
        }
      }
    }
  }
}
</style>