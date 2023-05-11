<template>
	<ul>
		<li class="gray" v-for="item,index in test.list" @dragstart="$e => test.dragStart($e, index)" @dragenter.prevent
			@dragover.prevent @drop.prevent="test.handleDrop($event, item)" draggable="true">
			{{ item }}
		</li>
	</ul>
</template>
<script setup>
import { Test } from './class'
import { ref } from 'vue'
const test = ref(new Test([1,2,3,4,5]))
</script>
<style>
.gray {
	background-color: gray;
}
</style>