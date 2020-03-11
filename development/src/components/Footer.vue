<template>
	<v-footer
		padless
		:style="{backgroundImage: `url('${banner}')`, backgroundSize: 'cover'}"
		class="footer justify-center py-6"
	>
		<v-card
			flat
			tile
			class="transparent text-center"
		>
			<v-card-text>
				<template v-for="link in links">
					<router-link :to="link.href" :key="link.text">
						<v-btn text small class="white--text">{{ link.text }}</v-btn>
					</router-link>
				</template>
			</v-card-text>

			<v-card-text>
				<v-btn
					v-for="icon in icons"
					:key="icon"
					icon
					text
					class="mx-4 white--text transparent"
				>
					<v-icon size="24px">{{ icon }}</v-icon>
				</v-btn>
			</v-card-text>

			<v-card-text>
				<span class="white--text">Ren Riley – All Rights Reserved – Yada yada yada</span>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
	import banner from '../assets/images/topbanner.png';

	export default {
		name: "page-footer",
		data() {
			return {
				banner,
				icons: [
					'fab fa-facebook',
					'fab fa-instagram',
					'fab fa-linkedin',
					'mdi-mail'
				]
			}
		},
		computed: {
			links() {
				return this.$store.state.navLinks;
			}
		}
	}
</script>

<style scoped>
	a {
		text-decoration: none;
	}

	a.router-link-exact-active {
		display: none;
	}

	.footer {
		color: white;
	}

	.transparent {
		background-color: transparent !important;
	}
</style>