<template>
	<div class="vue-modal-container" v-if="value === true" @click="modalClick">
		<div class="vue-modal-close-button">
			<v-btn
				icon
				large
				color="white"
				@click="$emit('close')"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Boolean,
				required: true
			}
		},
		methods: {
			modalClick(ev) {
				const target = ev.target.classList.contains('vue-modal-container');
				if (target === true) this.$emit('close');
			}
		}
	}

</script>

<style scoped>
	.vue-modal-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.vue-modal-close-button {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>