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
import map from '@/maps/decode';
import print from '@/maps/print_map'
import {synth, piano, error} from '@/music.js'
import Tone from 'tone'
import melodie from '@/music/read_mel.js'

console.log(melodie)
// var part = new Tone.Part(function(time, note){
// 	//the notes given as the second element in the array
// 	//will be passed in as the second argument
// 	console.log(note)
// 	synth.triggerAttackRelease(note, "8n", time);
// }, [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]).start(1);

let mel = new Tone.Part((time, event) => {
	console.log(event)
	synth.triggerAttackRelease(event.note, event.dur)
}, melodie).start(0)

// console.log(mel)

export default
{
	name: 'events',
	components: {GlobalEvents},
	data() {
		return {
			map: map,
			cursor: {x:0, y:0},
			print, piano, synth,
			vals: []
		}
	},
	computed: {
		mapPrint(){
			return this.print(this.map, this.cursor)
		}
	},
	mounted (){
	},
	methods:{
		mouse(ev){
			console.log()
		},
		go (x, y) {
			try {
				this.cursor.x += x
				this.cursor.y += y
				let val = this.map[this.cursor.y][this.cursor.x]
//				console.log(this.map)
				if (val == '.')
					throw("un mur!")
				this.piano.triggerAttackRelease(
					Tone.Frequency(59 + val, "midi").toNote(), '8n')
				this.vals.push(val)
			}
			catch (e) {
				error.start()
				console.log("outside", this.val)
				this.piano.triggerRelease()
				this.cursor.x -= x
				this.cursor.y -= y
			}
			finally {
				//				this.
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
