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
import map from '@/maps/decode'
import print from '@/maps/print_map'
import getD from '@/maps/get_D_pos'
import {synth, piano, error} from '@/music.js'
import melodie from '@/music/read_mel.js'
import go from '@/go'

let mel = new Tone.Part((time, event) => {
	console.log(event)
	synth.triggerAttackRelease(event.note, event.dur)
}, melodie).start(0)

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
			try {
				this.cursor.x += x
				this.cursor.y += y
				let val = this.map[this.cursor.y][this.cursor.x]
				console.log("val =", val)
				if (val == '.') {
					console.log('wall!')
					throw('wall')
				}
				if (val == 'X') {
					console.log('drowned!')
					throw('drowned')
				}
			 	this.piano.triggerAttackRelease(
					Tone.Frequency(59 + val, "midi").toNote(), '8n')
				this.vals.push(val)
			}
			catch (e) {
				error.start()
				console.log(e ? 'oups' : e)
					this.piano.triggerRelease()
					this.cursor.x -= x
					this.cursor.y -= y
				if (e == 'drowned') {
					this.cursor.x = 0
					this.cursor.y = 0
					this.vals = []
				}
			}
			checkSolution.bind(this)()			
				if (this.win)
					console.log("oh putain")
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
