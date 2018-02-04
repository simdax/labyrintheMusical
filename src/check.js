export default function checkSolution() {
	let flag = 0
	this.vals.forEach(function(val, index) {
		if (this.sol[index] == val) {
			flag += 1
		}
	}.bind(this))
	if (flag == this.sol.length)
		this.win = 1
}
