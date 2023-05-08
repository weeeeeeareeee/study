<template>
	<ul>
		<li class="gray" v-for="item in test.list" @dragstart="$e => test.dragStart($e,item)" draggable="true">{{ item }}</li>
	</ul>
</template>
<script setup>
import { Test } from './class'
const test = new Test()
console.log(window);
</script>
<style>
.gray {
	background-color: gray;
}
</style>