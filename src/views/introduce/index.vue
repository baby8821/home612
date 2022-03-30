<template>
  <div id="introduce">
    <Header></Header>
    <div class="container">
      <span
        class="goLeft iconfont icon-zuo"
        v-show="left"
        @click="goLeft"
      ></span>

      <transition name="cards" appear>
        <div class="cards">
          <div
            class="card"
            v-for="p in peopleList"
            :key="p.name"
            @mousedown="($event) => $event.preventDefault()"
          >
            <div class="pic">
              <img :src="p.picturePath" alt="" width="100%" />
            </div>
            <table class="msg">
              <tr>
                <th colspan="2">
                  {{ p.nickname }}
                </th>
              </tr>
              <tr>
                <td>名讳:</td>
                <td>{{ p.name }}</td>
              </tr>
              <tr>
                <td>年芳:</td>
                <td>{{ p.age }}</td>
              </tr>
              <tr>
                <td>华诞:</td>
                <td>{{ p.birth.slice(0, 10) }}</td>
              </tr>
              <tr>
                <td>府邸:</td>
                <td>{{ p.livePlace }}</td>
              </tr>
              <tr>
                <td>癖好:</td>
                <td>{{ p["habits"].replace(",", " ") }}</td>
              </tr>
            </table>
          </div>
        </div>
      </transition>

      <span
        class="goRight iconfont icon-you"
        v-show="right"
        @click="goRight"
      ></span>
    </div>
  </div>
</template>

<script>
import request from "@/api";
import Header from "@/components/header";

export default {
  name: "introduce",
  data() {
    return {
      left: false,
      right: true,
      peopleList: [],
      isDrag: false,
      m_x: 0,
    };
  },
  mounted() {
    // 禁止文字选中
    document.addEventListener("selectstart", function (e) {
      e.preventDefault();
    });

    // 发送请求
    request({
      url: "/user/getAllBriefInfo",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("Introduce reponse", res);
      if (res.isOK == true) {
        this.peopleList = res.data;
      }
    });
  },
  methods: {
    goLeft() {
      let box = document.querySelector(".cards");
      box.scrollTo({ left: 0, behavior: "smooth" });
      this.left = false;
      this.right = true;
    },
    goRight() {
      let box = document.querySelector(".cards");
      let container = document.querySelector("#introduce > .container");
      let container_width = window.getComputedStyle(container).width;
      let min = container_width.slice(0, container_width.length - 2);
      let differ = 2040 - Number(min);
      box.scrollTo({ left: differ, behavior: "smooth" });
      this.right = false;
      this.left = true;
    },
  },
  components: {
    Header,
  },
};
</script>

<style scoped lang="less">
#introduce {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/home_bgimg.jpg);

  .container {
    position: absolute;
    left: 10px;
    width: calc(100% - 20px);
    height: 760px;
    background-color: rgba(255, 255, 255, 0.562);
    top: 80px;
    border-radius: 40px;
    // overflow: hidden;

    .cards {
      display: flex;
      align-items: center;
      height: 100%;
      overflow: hidden;
      transition: all 1s;

      .card {
        float: left;
        position: relative;
        height: 658px;
        min-width: 300px;
        width: 300px;
        margin: 0 20px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0px 0px 5px rgba(138, 132, 132, 0.5);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0px 0px 20px rgba(61, 57, 57, 0.5);
        }

        .pic {
          position: absolute;
          width: 100%;
          height: 414.8px;
          overflow: hidden;

          img {
            // transform: translateY(-10%);
          }
        }
        .msg {
          position: absolute;
          width: 100%;
          height: 263.2px;
          bottom: 0px;
          background-color: rgb(255, 255, 255);
          font-size: 18px;
          border-radius: 20px 20px 0 0;
        }
      }
    }
    .goLeft,
    .goRight {
      position: absolute;
      top: 50%;
      font-size: 100px;
      color: #ccc;
      cursor: pointer;
      z-index: 10;
      transform: translateY(-50%);

      &:hover {
        color: #fff;
        text-shadow: 0 0 20px rgb(255, 255, 255);
      }
    }

    .goLeft {
      left: 0px;
    }
    .goRight {
      right: 0px;
    }
  }

  .cards-enter-active,
  .cards-leave-active {
    transition: all 1s;
  }

  .cards-enter,
  .cards-leave-to {
    transform: translateX(15%);
    opacity: 0.4;
  }
}
</style>