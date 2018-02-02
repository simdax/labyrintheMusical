<template>
<div id="app" >
  <events></events>
  <img src="./assets/logo.png">
  <comp></comp>
  <!-- <router-view/> -->
  <video controls loop autoplay src="static/fog.mp4"></video>
  </div>
</template>

<script>

import comp from '@/components/compo2'
import EventBus from './event-bus.js';
import Events from '@/glob.vue';

export default {
	name: 'App',
	components: {comp, Events}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
