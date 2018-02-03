export default (map) => {
	return map.map(line => {
		try {
			return line.split('')
		}
		catch (e) { }
	}).filter(e => e)
}
