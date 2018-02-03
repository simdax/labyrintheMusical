export default (map, position) => {
	let copy =  map.map(line => line.split(''))
	copy[position.y][position.x] = "@"
	// copy.forEach(line  => {
	// 	console.log(line.join(""))
	// })
	return copy
}
