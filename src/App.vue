<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  text-align: center;
  color: #2c3e50;
  min-width: 315px !important;
  width: 100%;
  height: 100%;
  margin: 0;
  position: relative;
  z-index: 1;
  padding: 0;
}

@media screen and (max-width: 576px) {
  .base {
    overflow: scroll !important;
  }
}
</style>