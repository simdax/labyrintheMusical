import Tone from 'tone'
import Vue from 'vue'

export default function (x, y) {
	try {
		this.cursor.x += x
		this.cursor.y += y
		let val = this.map[this.cursor.y][this.cursor.x]
		if (val == 'D')
		{
			new Tone.Part(function (time, val) {
				console.log(val)
				if (val)
					this.warp.start()
				else
					Vue.nextTick(this.play, this)
			}.bind(this), [["0", 1], ["0:0:3", 0]]).start()
		}
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
			this.piano.triggerAttackRelease(
				Tone.Frequency(48 + val, "midi").toNote(), '8n')
			this.vals.push(val)
		}
	}
	catch (e) {
		this.error.start()
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
