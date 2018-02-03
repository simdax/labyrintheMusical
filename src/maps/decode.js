import map from './0.txt'

let lines = map.split('\n').filter(
	line =>{return line[0]}
)

export default lines
