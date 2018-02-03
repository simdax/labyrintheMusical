export default (map, position) => {
	let copy =  map.map(line => line.split(''))
	copy[position.x][position.y] = "@"
	copy.forEach(line  => {
		console.log(line.join(""))
	})
}
