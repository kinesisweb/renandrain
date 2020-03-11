<template>
	<span class="underlink" :style="'--underlink-color:' + color + '; --underlink-duration:' + duration + 'ms'">
		<slot></slot>
	</span>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: "white"
		},
		duration: {
			type: Number,
			default: 300
		}
	}
}
</script>

<style scoped>
	.underlink {
		position: relative;
		cursor: pointer;
	}

	.underlink::after {
		border-bottom: 1px solid var(--underlink-color);
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		transform: scale(0);
		transform-origin: bottom;
		transition: transform var(--underlink-duration) ease-in-out;
		will-change: transform;
		content: "";
	}

	.underlink:hover::after {
		transform: scale(1);
	}
</style>