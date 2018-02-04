import Tone from 'tone'


new Tone.Player({
	url: "static/ambiance.mp3",
	loop: true,
	autostart: true
}).toMaster()

var synth = new Tone.Synth().toMaster()

let piano = new Tone.Sampler({
	'C4' : '0.wav',
	'C#4' : '1.wav',
	'D4' : '2.wav',
	'D#4' : '3.wav',
	'E4' : '4.wav',
	'F4' : '5.wav',
	'F#4' : '6.wav',
	'G4' : '7.wav',
	'G#4' : '8.wav',
	'A4' : '9.wav',
	'A#4' : '10.wav',
	'B4': '11.wav'
}, {
	'release' : 1,
	'baseUrl' : '/static/sounds/'
}).toMaster(); 

let error = new Tone.Player({
	url: "/static/error.wav"
}).toMaster()

let success = new Tone.Player({
	url: "/static/success.wav"
}).toMaster()

let warp = new Tone.Player({
	url: "/static/warp.wav"
}).toMaster()

export {piano, synth, error, success, warp}
