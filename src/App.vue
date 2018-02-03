<template>
<div id="app" >
  <events></events>
  <router-view/>
  <video id="video" loop autoplay src="static/fog.mp4"></video>
</div>
</template>

<script>

import EventBus from './event-bus.js';
import Events from '@/glob.vue';
import Tone from 'tone'

require('@/music/read_mel.js')

export default {
	name: 'App',
	components: {Events}
}
</script>

<style>
#video{
	position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
