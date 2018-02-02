<template>
  <GlobalEvents
	@keydown.37="go(-1, 0)"
	@keydown.38="go(0, 1)"
	@keydown.39="go(1, 0)"
	@keydown.40="go(0, -1)"
>	</GlobalEvents>  
</template>

<script>

import GlobalEvents from 'vue-global-events';
import map from '@/map';

export default
{
	name: 'events',
	components: {GlobalEvents},
	data(){
		return {
			map: map,
			cursor: {x:0, y:0},
			val: 0
		}
	},
	methods:{
		go (x, y) {
			try {
				this.cursor.x += x
				this.cursor.y += y
				this.val = this.map[this.cursor.y][this.cursor.x]
				console.log(this.cursor.x, this.cursor.y, this.val)
			}
			catch (error) {
				console.log("FUCK OFF", error)
			}
			finally {
				this.cursor.x = 0;
				this.cursor.y = 0;
			}
		}
	}
}
</script>
