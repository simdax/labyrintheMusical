<template>
<div id="app" >
  <events></events>
  <router-view/>
  <div id="mask"
	   @click="alpha -= 0.1"
	   :style="{background:'rgba(0, 0, 0, ' + alpha + ')'}">
	Swipe to move. Space to restart.
  </div>
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
	data(){
		return {
			alpha: 0
		}
	},
	components: {Events}
}
</script>

<style>
#mask{
	z-index: 99;
	color: white;
	font-size: 20px;
	position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;	
}

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
