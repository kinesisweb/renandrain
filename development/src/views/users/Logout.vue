<template>
	<div>
		<comp-parallax />
		<h1 class="text-center">{{ message }}</h1>
	</div>
</template>

<script>
	import CompParallax from '../../components/Parallax';

	export default {
		mounted() {
			if (!localStorage.getItem('accessToken')) return this.message = "Not currently logged in.";

			this.logout();

		},
		components: {
			CompParallax
		},
		data() {
			return {
				message: ""
			}
		},
		methods: {
			logout() {
				this.$api({
					url: '/api/user/logout'
				})
				.then(response => {
					if (response.event === "logged_out")  {
						this.message = "You are now logged out.";
						this.$store.commit('setJWT', '');
					}
					else {
						this.message = response.message;
						// Do the error thing
					}
				})
				.catch(e => {
					this.message = e.message;
				})

			}
		}
	}
</script>