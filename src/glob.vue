<template>
<div>  
  <GlobalEvents
	@keydown.37="go(-1, 0)"
	@keydown.39="go(1, 0)"
	@keydown.38="go(0, -1)"
	@keydown.40="go(0, 1)"
	@mousedown="mouse($event)"
	/>
  <div>
	<div id="map" v-for="line in mapPrint">
		{{line}}
	</div>
  </div>
</div>
</template>

<script>

import GlobalEvents from 'vue-global-events';
import Tone from 'tone'
import map from '@/maps/decode';
import print from '@/maps/print_map'
import getD from '@/maps/get_D_pos'
import {synth, piano, error} from '@/music.js'
import melodie from '@/music/read_mel.js'
import go from '@/go'

let mel = new Tone.Part((time, event) => {
	console.log(event)
	synth.triggerAttackRelease(event.note, event.dur)
}, melodie).start(0)

export default
{
	name: 'events',
	components: {GlobalEvents},
	data() {
		return {
			playable: true,
			map: map,
			cursor: {x: 0, y: 0},
			print, piano, synth, error,
			vals: []
		}
	},
	computed: {
		mapPrint(){
			return this.print(this.map, this.cursor)
		}
	},
	mounted () {
		this.init()
	},
	methods:{
		init (){
			let d = getD(this.map)
			this.cursor.x = d.x
			this.cursor.y = d.y
		},
		play(){
			let dur = melodie[melodie.length - 1].time
			new Tone.Part((time, val) => {
				this.playable = val
			}, [[0, false], [dur, true]]).start()
			new Tone.Part((time, event) => {
				synth.triggerAttackRelease(event.note, event.dur)
			}, melodie).start()
		},
		mouse(ev){
			console.log()
		},
		go (x, y) {
			if (this.playable)
				go.bind(this)(x, y)
		}
	}
}
</script>

<style>
  #map{
	  z-index: 10
  }
</style>
