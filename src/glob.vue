<template>
<div>  
  <GlobalEvents
	@keydown.37="go(-1, 0)"
	@keydown.39="go(1, 0)"
	@keydown.38="go(0, -1)"
	@keydown.40="go(0, 1)"
	@keydown.space="init"
	/>
  <div>
	<div id="map" v-for="line in mapPrint">
	  {{line}}
	</div>
  </div>
  <div id='el'v-if="win">
	WIN
  </div>
</div>
</template>

<script>

import GlobalEvents from 'vue-global-events'
import Tone from 'tone'
import Vue from 'vue'
import print from '@/maps/print_map'
import decode from '@/maps/decode'
import getD from '@/maps/get_D_pos'
import get_mel from '@/music/read_mel.js'
import {synth, piano, error, success} from '@/music.js'
import go from '@/go'
import checkSolution from "./check.js"

export default
{
	name: 'events',
	components: {GlobalEvents},
	data() {
		return {
			win: 0,
			level: 0,
			playable: true,
			map: [], melodie: [], sol: [],
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
		this.create(0)			
	},
	methods:{
		create(){
			this.win = 0
			this.map = []
			this.melodie = []
			decode.bind(this)(this.level)
			get_mel.bind(this)(this.level)
			this.init()
		},
		init (){
			let d = getD(this.map)
			this.vals = []
			this.cursor.x = d.x
			this.cursor.y = d.y
			if (this.level == 0)
				Tone.Buffer.on('load', function() {
					this.play()
				}.bind(this))
			else
				Vue.nextTick(this.play, this)
		},
		play(){
			let dur = Tone.Time(this.melodie[this.melodie.length - 2].time).add("2n")
			new Tone.Part((time, val) => {
				this.playable = val
			}, [["0:0:0", false], [dur, true]]).start()
			new Tone.Part((time, event) => {
				try{	
					piano.triggerAttackRelease(event.note, event.dur)				
				} catch (e) {}
			}, this.melodie).start()
		},
		go (x, y) {
			if (this.playable)
			{
				go.bind(this)(x, y)
				checkSolution.bind(this)()			
				if (this.win)
				{
					new Tone.Part((t, val) => {
						if (val)
						{
							this.level += 1
							this.create()
						}
						else 
							success.start()
					}, [["0", 0], ["0:2:0", 1]]).start()
				}
			}
		}
	}
}
</script>

<style>
#el{
	font-size: 50px;
	color: red;
}
</style>
