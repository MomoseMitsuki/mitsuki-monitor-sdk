<script lang="ts" setup>
import { useTemplateRef } from "vue";
const imgRef = useTemplateRef("resource");

function jsErrorFn() {
	// TypeError
	const str = null as any;
	console.log(str.length);
}
function promiseErrorFn() {
	Promise.reject(Error("promise error"));
}
function resourceErrorFn() {
	imgRef.value?.setAttribute("src", "https://xxx.png");
}
</script>

<template>
	<div class="row">
		<button id="jsError" @click="jsErrorFn" class="button-primary">js错误</button>
		<button id="promiseError" @click="promiseErrorFn" class="button-primary">promise错误</button>
		<button id="resourceError" @click="resourceErrorFn" class="button-primary">资源加载错误</button>
		<img src="../assets/logo.svg" ref="resource" class="resource" />
	</div>
</template>

<style scoped>
.row {
	width: 700px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.resource {
	margin: 10px;
	display: block;
	width: 80px;
	height: 80px;
}
</style>
