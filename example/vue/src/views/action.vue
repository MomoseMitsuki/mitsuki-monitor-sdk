<script setup lang="ts"></script>

<template>
	<div class="row">
		<button data-tracker="true" class="button-primary" value="Button用户行为收集">Button</button>
		<div data-tracker="true" class="button-primary button">innerText 用户行为收集</div>
	</div>
</template>

<style scoped>
.row {
	width: 400px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
</style>
