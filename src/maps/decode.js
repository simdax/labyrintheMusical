import map0 from '../db/00.txt'
import map1 from '../db/01.txt'
import map2 from '../db/02.txt'
import map3 from '../db/03.txt'
import map4 from '../db/04.txt'
import map5 from '../db/05.txt'
import map6 from '../db/06.txt'
import map7 from '../db/07.txt'
import map8 from '../db/08.txt'
import map9 from '../db/09.txt'

let maps = [map0, map1, map2, map3, map4, map5, map6, map7, map8, map9]

export default function (i) {
	let result = []
	let j = 0
	var lines = maps[i].split('\n');
	lines.forEach(line => {
		if (line[0])
			this.map.push(line)
	})
}
