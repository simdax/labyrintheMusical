import sound0 from '../db/music00.txt'
import sound1 from '../db/music01.txt'
import sound2 from '../db/music02.txt'
import sound3 from '../db/music03.txt'
import sound4 from '../db/music04.txt'
import sound5 from '../db/music05.txt'
import sound6 from '../db/music06.txt'
import sound7 from '../db/music07.txt'
import sound8 from '../db/music08.txt'
import sound9 from '../db/music09.txt'

import Tone from 'tone'

let mels = [sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9]

export default function (i) {
	let melodie = mels[i]
	let mel = melodie.split('\n')
	let notes = mel[0].split(" ")
	let rythmes = mel[1].split(" ")
	let begin = new Tone.Time(0)
	notes.forEach ((note, i) => {
		let abs = begin.toBarsBeatsSixteenths()
		begin.add(rythmes[i])
		this.melodie.push({note, dur: rythmes[i], time: abs})
	})
}
