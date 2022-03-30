<template>
  <div id="home">
    <Header></Header>
    <div class="container">
      <div id="memory" @click="$router.push('/memory')">
        <div class="r_zoom">
          <span class="eng">Memory</span>
          <span class="ch">记忆</span>
        </div>
      </div>
      <div class="zoom">
        <div id="presentation">
          <div class="p_zoom" @click="$router.push('/introduce')">
            <span class="eng">Introduce</span>
            <span class="ch">介绍</span>
          </div>
        </div>
        <div id="article">
          <div class="a_zoom" @click="$router.push('/article')">
            <span class="eng">Story</span>
            <span class="ch">故事</span>
          </div>
        </div>
        <div id="area">
          <div class="m_zoom" @click="$router.push('/area')">
            <span class="eng">Where</span>
            <span class="ch">在哪</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  name: "Home",
  mounted() {
    document.addEventListener("selectstart", function (e) {
      e.preventDefault();
    });
  },
  components: {
    Header,
  },
};
</script>

<style scoped lang="less">
#home {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/home_bgimg.jpg);
  background-size: cover;

  .container {
    margin: 0 auto;
    height: 100%;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    text-align: center;

    span {
      transition: all 0.5s;
      display: block;
      width: 100%;
    }

    #memory {
      position: relative;
      margin-top: 5%;
      background-color: rgba(255, 255, 255, 0.616);
      border-radius: 50%;
      width: 550px;
      height: 550px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: hidden;

      &:hover .eng {
        transform: translateX(-50px);
      }
      &:hover .ch {
        height: 100px;
        opacity: 1;
        transform: translateX(100px);
        border-top: 3px solid #00000067;
      }

      .eng {
        height: 120px;
        line-height: 120px;
        font-size: 100px;
        font-style: italic;
      }

      .ch {
        font-weight: 100;
        height: 0px;
        opacity: 0;
        line-height: 100px;
        font-size: 80px;
        border-top: 0px solid rgba(255, 255, 255, 0.616);
      }
    }

    .zoom {
      height: 100%;
      width: 600px;

      #presentation,
      #area,
      #article {
        position: relative;
        width: 100%;
        height: 300px;

        div {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.418);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.616);
          }
          &:hover .ch {
            height: 60px;
            opacity: 1;
          }
        }

        .p_zoom {
          left: 40px;
          top: 33px;
        }
        .a_zoom {
          right: 40px;
        }

        .m_zoom {
          top: -48px;
          left: -70px;
        }

        .eng {
          font-size: 50px;
          height: 80px;
          line-height: 80px;
        }

        .ch {
          height: 0px;
          opacity: 0;
          line-height: 60px;
          font-size: 26px;
          border-top: 2px solid rgba(255, 255, 255, 0.445);
        }
      }
    }
  }
}
</style>