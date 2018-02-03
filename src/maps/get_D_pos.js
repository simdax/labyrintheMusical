export default (map) => {
	let x = 0
	let y = 0
	try{
		map.forEach(line => {
			x = 0
			line.split("").forEach(dot => {
				if (dot == 'D')
					throw BreakException
				x += 1
			})
			y += 1
		})
	}
	catch (e) {}
	return {x, y}
}
