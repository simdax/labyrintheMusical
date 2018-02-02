<template>
<div class="hello">
  <button @click="msg += 'jfjd'">ma bite</button>
  <button @click="msg -= 'jfjd'"></button>
  <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'fhdsakjfhds'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
	background: hsl(150, 40%, 70%);
}

button{
	width: 10px;
	height: 10px;
}
</style>
