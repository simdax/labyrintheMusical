export default function checkSolution() {
	let flag = 0
	console.log("ta grosse mere")
	this.vals.forEach(function(val, index) {
		if (this.sol[flag] == val) {
			flag += 1
        } else flag = + (this.sol[0] == val)
        if (flag == this.sol.length){
            this.win = 1
            console.log('win')
            return
		}
	}.bind(this))
}
