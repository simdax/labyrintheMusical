<template>
<div>  
  <GlobalEvents
	@keydown.37="go(-1, 0)"
	@keydown.39="go(1, 0)"
	@keydown.38="go(0, -1)"
	@keydown.40="go(0, 1)"
	@keydown.space="create_zero"
	@touchstart="debut($event)"
	@touchend="fin($event)"
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
import {synth, piano, error, success, warp, big_warp, plouf} from '@/music.js'
import go from '@/go'
import checkSolution from "./check.js"

var ys, xs

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
			print,
			piano, synth, error, warp, big_warp, plouf,
			vals: []
		}
	},
	computed: {
		mapPrint() {
			return this.print(this.map, this.cursor)
		}
	},
	created () {
		this.create()
		Tone.Buffer.on('load', function() {
			// console.log("io")
			// plouf.start()
			this.play_start();
		}.bind(this))
	},
	methods:{
		play_start(){
			new Tone.Part((time, val) => {
				if (val)
					big_warp.start()
				else
					Vue.nextTick(this.play, this)
			}, [["0:0:0", 1], ["0:2:0", 0]]).start()
		},
		create_zero(){
			this.level = 0
			this.create()
			Vue.nextTick(this.play_start, this)
		},
		debut(e){
            ys = e.touches[0].clientY;
            xs = e.touches[0].clientX;
        },
        fin(e){
            var xe = e.changedTouches[0].clientX;
            var ye = e.changedTouches[0].clientY;
            if (Math.abs(xs - xe) > 5 || Math.abs(ys - ye))
            {
                if (Math.abs(xs - xe) > Math.abs(ys - ye))
                {
                    if (xs > xe) {
                        this.go(-1, 0);
                    }
                    else
                        this.go(1, 0);
                }
                else
                {
                    if (ys > ye)
                        this.go(0, -1);
                    else
                        this.go(0, 1);
                }
            }
        },
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
			if (this.level != 0)
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
