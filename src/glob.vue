<template>
<div>  
  <GlobalEvents
	@keydown.37="go(-1, 0)"
	@keydown.39="go(1, 0)"
	@keydown.38="go(0, -1)"
	@keydown.40="go(0, 1)"
	@mousedown="mouse($event)"
	@touchstart="debut($event)"
	@touchend="fin($event)"
	/>
  <div>
	<div id="map" v-for="line in mapPrint">
		{{line}}
	</div>
  </div>
</div>
</template>

<script>

import Hammer from 'hammerjs'
console.log(Hammer)

import GlobalEvents from 'vue-global-events'
import Tone from 'tone'
import map from '@/maps/decode'
import print from '@/maps/print_map'
import getD from '@/maps/get_D_pos'
import {synth, piano, error} from '@/music.js'
import melodie from '@/music/read_mel.js'
import go from '@/go'

 
function checkSolution() {
	let flag = 0
	this.vals.forEach(function(val, index) {
		if (this.sol[index] == val) {
			flag += 1
		}
	}.bind(this))
	if (flag == this.sol.length)
		this.win = 1
}

var ts

export default
{
	name: 'events',
	components: {GlobalEvents},
	data() {
		return {
			win: 0,
			sol: ["1","2","3"],
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
	debut(e){
		   ts = e.touches[0].clientY;

	},
	fin(e){
		   var te = e.changedTouches[0].clientY;

   if(ts > te+5){
console.log('do') 
  }else if(ts < te-5){
console.log('hi') 
   }
	},
	
	
	init (){
			let d = getD(this.map)
			this.cursor.x = d.x
			this.cursor.y = d.y
			this.play()
		},
		play(){
			let dur = melodie[melodie.length - 1].time
			new Tone.Part((time, val) => {
				this.playable = val
			}, [[0, false], [dur, true]]).start()
			new Tone.Part((time, event) => {
				piano.triggerAttackRelease(event.note, event.dur)
			}, melodie).start()
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
