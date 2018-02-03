import clean_map from './without_obs'

export default (map, position) => {
	let copy = clean_map(map)
	console.log(position.y, position.x)
	copy[position.y][position.x] = "@"
	return copy
}
