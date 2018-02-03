import Tone from 'tone'
import melodie from './music_codes/music_strings.txt'

let mel = melodie.split('\n')
let notes = mel[0].split(" ")
let rythmes = mel[1].split(" ")
let result = []
let begin = new Tone.Time(0)
notes.forEach ((note, i) => {
	let abs = begin.toBarsBeatsSixteenths()
	if (i)
		begin.add(rythmes[i])
	result.push({note, dur: rythmes[i], time: abs})
})

export default result
