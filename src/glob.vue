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

import GlobalEvents from 'vue-global-events'
import Tone from 'tone'

import print from '@/maps/print_map'
import decode from '@/maps/decode'
import getD from '@/maps/get_D_pos'
import get_mel from '@/music/read_mel.js'
import {synth, piano, error} from '@/music.js'
import go from '@/go'
import checkSolution from "./check.js"

export default
{
	name: 'events',
	components: {GlobalEvents},
	data() {
		return {
			win: 0,
			sol: ["1","2","3"],
			playable: true,
			map: [], melodie: [],
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
	created () {
		decode.bind(this)(0)
		get_mel.bind(this)(0)
		console.log(this.melodie)
		this.init()
	},
	methods:{
		init (){
			let d = getD(this.map)
			this.cursor.x = d.x
			this.cursor.y = d.y
			this.play()
		},
		play(){
			let dur = this.melodie[this.melodie.length - 2].time
			console.log(dur)
			new Tone.Part((time, val) => {
				this.playable = val
			}, [[0, false], [dur, true]]).start()
			new Tone.Part((time, event) => {
				try{	
					piano.triggerAttackRelease(event.note, event.dur)				
				} catch (e) {}
			}, this.melodie).start()
		},
		mouse(ev){
			console.log()
		},
		go (x, y) {
			if (this.playable)
			{
				go.bind(this)(x, y)
				checkSolution.bind(this)()			
				if (this.win)
					console.log("oh putain")
			}
		}
	}
}
</script>

<style>

</style>
