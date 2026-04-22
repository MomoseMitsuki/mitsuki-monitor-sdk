<script setup lang="ts">
function xhrRequest() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3001/test");
	xhr.send();
	xhr.onloadend = () => {
		console.log(xhr.responseText);
	};
}
function fetchRequest() {
	fetch("http://localhost:3001/test")
		.then(res => res.text())
		.then(console.log);
}
</script>

<template>
	<div class="center">
		<button class="button-primary item" @click="xhrRequest">xhr发送数据</button>
		<button class="button-primary item" @click="fetchRequest">fetch发送数据</button>
	</div>
</template>

<style scoped>
.center {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.item {
	margin: 0 40px;
}
</style>
