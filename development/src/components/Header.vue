<template>
	<div>
		<v-app-bar
			fixed
			flat
			:fade-img-on-scroll="!minimal"
			:color="backgroundColour"
			dark
			:shrink-on-scroll="!minimal"
			:elevation="2"
			:src="backgroundImage"
		>
			<v-toolbar-title class="glacial-bold text-uppercase" :class="{'minimised-title': minimal}">{{ title }}</v-toolbar-title>
			<v-spacer />
			<div v-if="$vuetify.breakpoint.mdAndUp" :class="{'align-self-end': !minimal}">
				<router-link v-for="link in links" :key="link.text" :to="link.href">
					<v-btn :x-small="minimal" text>{{ link.text }}</v-btn>
				</router-link>
			</div>
			<v-app-bar-nav-icon v-else @click="drawer = !drawer"></v-app-bar-nav-icon>
			<div v-if="loggedIn" class="align-self-end">
				<v-tooltip left :open-delay="1000">
					<template v-slot:activator="{ on }">
						<v-btn icon large v-on="on">
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</template>
					<span>Logged in as {{ user.email }}</span>
				</v-tooltip>
			</div>
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			fixed
			right
			temporary
		>
			<v-list
				nav
				dense
			>
					<v-list-item
						v-for="(link, i) in links"
						:key="i"
						link
						:to="link.href"
					>
						<v-list-item-icon>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ link.text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-sheet
			id="page-content"
			class="overflow-y-auto"
			:min-height="offset"
		>
		</v-sheet>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				on: false,
				drawer: false
			}
		},
		props: {
			backgroundImage: {
				type: String
			},
			backgroundColour: {
				type: String
			},
			title: {
				type: String
			},
			minimal: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			links() {
				return this.$store.state.navLinks;
			},
			loggedIn() {
				return this.$store.getters.loggedIn;
			},
			user() {
				return this.$store.state.userData;
			},
			offset() {
				return (this.minimal) ? 80 : 128;
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

	.minimised-title {
		padding-left: 20px;
		font-family: GlacialIndifferenceRegular !important;
		font-size: 2em;
		letter-spacing: 4px;
		font-weight: bold;
	}

</style>