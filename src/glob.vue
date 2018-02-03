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
	<div id="map" v-for="line in map">
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

export default
{
	name: 'events',
	components: {GlobalEvents},
	data(){
		return {
			map: map,
			cursor: {x:0, y:0},
			piano, synth,
			vals: []
		}
	},
	mounted (){
		//print(this.map, this.cursor)
	},
	methods:{
		mouse(ev){
			console.log()
		},
		go (y, x) {
			try {
				this.cursor.x += x
				this.cursor.y += y
				print(this.map, this.cursor)
				let val = this.map[this.cursor.y][this.cursor.x]
				if (this.val == '.')
					throw("un mur!")
				this.piano.triggerAttackRelease(
					Tone.Frequency(59 + val, "midi").toNote(), '8n')
				this.vals.push(val)
			}
			catch (e) {
				error.start()
				console.log(e ? e : "pas de note a", this.val)
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
