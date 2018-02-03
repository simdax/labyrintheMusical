export default (map) => {
	return map.map(line => {
		console.log(line)
		return line.split('')//.filter(e => e)
	})
}
