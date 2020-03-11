<template>
	<v-form
		@submit.prevent="login"
		lazy-validation
		ref="login-form"
	>
		<comp-parallax />
		<v-container>
			<v-row justify="center"><v-col cols="12" md="6">
				<v-card>
					<v-card-title class="glacial-bold">Login</v-card-title>
					<v-card-text v-if="!loggedIn">
						<v-container>
							<v-row justify="center">
								<v-col>
									<v-text-field
										v-model="email.value"
										label="Email"
										prepend-icon="mdi-at"
										:rules="[...Object.values(email.rules)]"
										clearable
									/>
								</v-col>
							</v-row>
							<v-row justify="center">
								<v-col>
									<v-text-field
										v-model="password.value"
										label="Password"
										:type="password.show ? 'text' : 'password'"
										prepend-icon="mdi-shield-lock"
										:rules="[...Object.values(password.rules)]"
										:append-icon="password.show ? 'mdi-eye-off' : 'mdi-eye'"
										@click:append="password.show = !password.show"
									/>
								</v-col>
							</v-row>
							<v-row justify="center">
								<v-col cols="12" md="6">
									<v-btn
										:loading="submitting"
										block
										color="primary"
										type="submit"
									>Login</v-btn>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-text v-else>
						<v-container>
							<v-row justify="center">
								<v-col>
									Already logged in
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
				</v-card>
			</v-col></v-row>
		</v-container>
	</v-form>
</template>

<script>
	import CompParallax from '../../components/Parallax';

	export default {
		data() {
			return {
				submitting: false,
				email: {
					value: "",
					rules: {
						required: v => !!v || "Required"
					}
				},
				password: {
					value: "",
					show: false,
					rules: {
						required: v => !!v || 'Required',
						min: v => v.length >= 8 || 'Min 8 characters',
						oneUppercase: v => /[A-Z]/.test(v) || "At least one uppercase character",
						oneNumber: v => /\d/.test(v) || "At least one number"
					}
				}
			}
		},
		computed: {
			loggedIn() {
				return this.$store.getters.loggedIn;
			}
		},
		components: {
			CompParallax
		},
		methods: {
			login() {
				if (!this.$refs['login-form'].validate()) return false;

				const form = {
					email: this.email.value,
					password: this.password.value
				}

				this.$api({
					url: '/api/user/login',
					body: form
				})
				.then(() => {
					// Do stuff
				})
				.catch(() => {
					// Do stuff
				})
			}
		},
		created() {
			if (this.loggedIn) this.$router.push('/pricing');
		}
	}

</script>

