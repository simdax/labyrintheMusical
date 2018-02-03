import map from './0.txt'

let result = []
let j = 0
var lines = map.split('\n');
lines.forEach(line =>
{
	if (line[0])
		result.push(line)
})

export default result
