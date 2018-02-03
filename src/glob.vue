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

let mel = new Tone.Part((time, event) => {
	console.log(event)
	synth.triggerAttackRelease(event.note, event.dur)
}, melodie)

export default
{
	name: 'events',
	components: {GlobalEvents},
	data() {
		return {
			map: map,
			cursor: {x: 0, y: 0},
			print, piano, synth,
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
		mouse(ev){
			console.log()
		},
		go (x, y) {
			try {
				this.cursor.x += x
				this.cursor.y += y
				let val = this.map[this.cursor.y][this.cursor.x]
 				console.log("val =", val)
				if (val == 'D')
					mel.start(0)
				else if (val == '.') {
					console.log('wall!')
					throw('wall')
				}
				else if (val == 'X') {
					console.log('drowned!')
					throw('drowned')
				}
				else 
				{
					val = parseInt(val)
					//console.log(val, Tone.Frequency(60 + val, "midi").toNote())
			 		this.piano.triggerAttackRelease(
					Tone.Frequency(59 + val, "midi").toNote(), '8n')
					this.vals.push(val)
				}
			}
			catch (e) {
				error.start()
				console.log(e ? 'inconnu' : e)
					this.piano.triggerRelease()
					this.cursor.x -= x
					this.cursor.y -= y
				if (e == 'drowned') {
					this.init()
					this.vals = []
				}
			}
		}
	}
}
</script>

<style>
  #map{
	  z-index: 10
  }
</style>
