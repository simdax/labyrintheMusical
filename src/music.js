import Tone from 'tone'

var synth = new Tone.Synth().toMaster()
//play a middle 'C' for the duration of an 8th note

let piano = new Tone.Sampler({
	'0' : '0.wav',
	'1' : '1.wav',
	'2' : '2.wav',
	'3' : '3.wav',
	'4' : '4.wav',
	'5' : '5.wav',
	'6' : '6.wav',
	'7' : '7.wav',
	'8' : '8.wav',
	'9' : '9.wav',
	'10' : '10.wav',
	'11': '11.wav'
}, {
	'release' : 1,
	'baseUrl' : 'static/sounds/'
}).toMaster(); 

export default synth
