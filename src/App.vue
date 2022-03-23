<template>
  <div id="app">
    <Header v-if="this.$route.path !== '/login'"></Header>
    <router-view></router-view>
    <SlideNews></SlideNews>
  </div>
</template>

<script>
import Header from "@/components/header";
import SlideNews from "@/components/slideNews";

export default {
  name: "App",
  components: {
    Header,
    SlideNews,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  position: relative;
}
</style>
