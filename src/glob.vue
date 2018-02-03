<template>
  <GlobalEvents
	@keydown.37="go(-1, 0)"
	@keydown.38="go(0, 1)"
	@keydown.39="go(1, 0)"
	@keydown.40="go(0, -1)"
	@mousedown="mouse($event)"
>	</GlobalEvents>  
</template>

<script>

import GlobalEvents from 'vue-global-events';
import map from '@/maps/decode';
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
			val: 0
		}
	},
	methods:{
		mouse(ev){
			console.log()
		},
		go (x, y) {
			try {
				this.cursor.x += x
				this.cursor.y += y
				this.val = this.map[this.cursor.y][this.cursor.x]
				this.piano.triggerAttackRelease(
					Tone.Frequency(59 + this.val, "midi").toNote(), '8n')
			}
			catch (e) {
				error.start()
				console.log("pas de note a", this.val)// error)
				this.piano.triggerRelease()
				this.val = 0
				this.cursor.x = 0;
				this.cursor.y = 0;
			}
			finally {
//				this.
			}
		}
	}
}
</script>
