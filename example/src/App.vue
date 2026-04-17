<script setup lang="ts"></script>

<template>
	<nav>
		<RouterLink class="item" to="/error">错误监控</RouterLink>
		<RouterLink class="item" to="/performance">性能监控</RouterLink>
		<RouterLink class="item" to="/api">请求数据采集</RouterLink>
		<RouterLink class="item" to="/action">用户行为采集</RouterLink>
		<RouterLink class="item" to="/behavior">页面痕迹采集</RouterLink>
	</nav>
	<RouterView />
</template>

<style scoped>
.nav {
	display: flex;
	height: 50px;
	justify-content: space-evenly;
	align-items: center;
}

.active {
	border-bottom: 3px solid hsla(160, 100%, 37%, 1);
}
</style>
