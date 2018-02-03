import Tone from 'tone'

export default function (x, y) {
	try {
		this.cursor.x += x
		this.cursor.y += y
		let val = this.map[this.cursor.y][this.cursor.x]
 		console.log("val =", val)
		if (val == 'D')
			this.play()
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
				Tone.Frequency(59 + val, "midi").toNote(), '8n')
			console.log("add note")
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
