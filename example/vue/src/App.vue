<script setup lang="ts"></script>

<template>
	<nav>
		<div style="margin: auto">
			<RouterLink class="item" to="/error">错误监控</RouterLink>
			<RouterLink class="item" to="/api">请求数据采集</RouterLink>
			<RouterLink class="item" to="/action">用户行为采集</RouterLink>
		</div>
	</nav>
	<RouterView />
</template>

<style scoped>
nav {
	width: 100%;
	display: flex;
	height: 50px;
	align-items: center;
	padding: 0 300px;
	margin-bottom: 50px;
	background-color: #545c64;
}

a {
	display: inline-block;
	color: white;
	text-decoration: none;
	font-weight: lighter;
	margin: 0 40px;
	height: 50px;
	line-height: 50px;
}
.router-link-active {
	color: #ffd04b;
	border-bottom: 3px solid #ffd04b;
}
</style>
