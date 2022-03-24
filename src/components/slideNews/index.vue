<template>
  <div id="slideNews">
    <div class="slide">
      <!-- 左边的喇叭 -->
      <div class="laba">
        <span>最新消息</span>
        <span class="iconfont icon-laba labaicon"></span>
      </div>

      <!-- 右边的滚动条 -->
      <div class="slidebor">
        <div class="things">
          <!-- currentNews是每次滚动内容的源对象 -->
          <a
            class="content"
            href="javascript:;"
            target="black"
            @click="goArticle(currentNews.id)"
            >{{ currentNews.title }}</a
          >
          <span class="iconfont icon-new new"></span>
        </div>
      </div>
      <span class="iconfont icon-guanbi close" @click="close($event)"></span>
    </div>
  </div>
</template>

<script>
import request from "@/api";
export default {
  name: "SlideNews",
  data() {
    return {
      // 当前滚动内容的源对象
      currentNews: {},
      // 请求后获取的新闻列表
      newsList: [],
      // 当前滚动内容的源对象的索引
      index: 0,
    };
  },
  mounted() {
    // 发送请求，将获取的数据传给 newsList
    request({
      url: "/article/getAll",
    })
      .then((data) => {
        console.log("getSlideArticles", data.articles);
        this.newsList = data.articles;
      })
      .catch((err) => console.log(err));
  },
  watch: {
    // 监视 newsList 的变化，发生变化触发 showNews 事件
    newsList: function (newValue, oldValue) {
      this.showNews();
    },
  },
  methods: {
    // 展示方法
    showNews() {
      // 获取信息列表的长度
      let len = this.newsList.length;
      // 渲染当前需要滚动的内容
      this.currentNews = this.newsList[this.index];
      // 每 8s 切换一次索引, 与滚动动画循环时间 8s 相对应
      setInterval(() => {
        if (++this.index >= len) {
          this.index = 0;
        }
        this.currentNews = this.newsList[this.index];
      }, 8000);
    },
    close(e) {
      e.target.parentNode.parentNode.style = "opacity: 0";
    },
  },
};
</script>

<style scoped lang="less">
#slideNews {
  position: absolute;
  width: 600px;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  top: 50px;
  border-radius: 15px 5px 15px 5px;
  line-height: 30px;
  transition: all 0.5s;

  .laba {
    float: left;
    width: 20%;
    display: flex;
    justify-content: space-around;
    border-radius: 15px 0 0 5px;
    background-color: rgba(238, 227, 78, 0.616);
    font-size: 16px;
    color: rgb(240, 40, 33);

    .labaicon {
      color: orange;
      font-size: 30px;
    }
  }
  .slidebor {
    position: absolute;
    left: 20%;
    width: 80%;
    background-color: rgba(247, 227, 53, 0.288);
    border-radius: 0 5px 15px 0;
    overflow: hidden;

    /* 滚动内容的动画 */
    @keyframes slide {
      0% {
        left: 120%;
      }
      100% {
        left: -70%;
      }
    }

    .things {
      position: relative;
      left: 110%;
      color: red;
      animation: slide 8s linear infinite;

      .content {
        float: left;
        font-size: 16px;
        color: red;

        &:hover {
          text-decoration: underline;
        }
      }
      .new {
        float: left;
        transform: translateY(-4px);
        font-size: 25px;
        margin: 0 0 0 2px;
      }
    }
  }

  .close {
    position: absolute;
    right: -16px;
    top: -12px;
    font-size: 10px;
    color: rgba(206, 204, 204, 0.466);
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      transform: rotate(180deg);
      color: rgb(240, 0, 0);
    }
  }
}
</style>