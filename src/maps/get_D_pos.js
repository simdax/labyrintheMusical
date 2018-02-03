export default (map) => {
	let x = 0
	let y = 0
	try{
		map.forEach(line => {
			line.split("").forEach(dot => {
				console.log(dot, dot == 'D')
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
