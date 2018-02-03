import clean_map from './without_obs'

export default (map, position) => {
	let copy = clean_map(map)
	copy[position.y][position.x] = "@"
	return copy
}
