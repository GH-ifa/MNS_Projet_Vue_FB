<template>
  <div id="app">
    <header-comp></header-comp>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
export default {
  name: "App",
  components: {
    HeaderComp
  },
};
</script>

<style>
html {
  background-color: #E5E5E5;
}
</style>