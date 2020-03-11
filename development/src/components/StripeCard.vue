<template>
	<form>
		<v-card
			class="pa-4"
			:elevation="elevation"
		>
			<v-card-text>
				<div class="stripe-card-container"></div>
			</v-card-text>
			<v-card-actions>
				<v-btn block color="success"
					:loading="loading"
					:disabled="disabled"
					@click.stop="addPayment"
				>Link Payment Information to Account</v-btn>
			</v-card-actions>
		</v-card>
	</form>
</template>

<script>
export default {
	props: ['email'],
	mounted() {
		this.getPublicKey()
		.then(() => this.getSetupIntent())
		.then(() => this.stripeElements())
		.then(() => {
			// Do stuff
		})
	},
	data() {
		return {
			card: {},
			stripe: null,
			elements: null,
			publicKey: null,
			intent: null,
			elevation: 0,
			loading: false,
			error: null,
			disabled: false
		}
	},
	methods: {
		paymentError(msg) {
			this.disabled = false;
			this.loading = false;
			this.error = msg;
		},
		setupComplete() {
			this.loading = false;
		},
		addPayment() {
			this.loading = true;
			this.disabled = true;
			this.stripe.confirmCardSetup(this.intent['client_secret'], {
				payment_method: {
					card: this.card,
					billing_details: {
						email: this.email
					}
				}
			})
			.then(result => {
				if (result.error) this.paymentError(result.error.message);
				else {
					this.setupComplete();
				}
			})
		},
		stripeElements() {
			this.stripe = window.Stripe(this.publicKey);
			this.elements = this.stripe.elements();

			const style = {
				base: {
					fontFamily: 'GlacialIndifferenceRegular',
					fontSmoothing: 'antialiased'
				}
			}

			this.card = this.elements.create('card', { style });
			const el = document.createElement('div');
			this.card.mount(el);
			document.querySelector('.stripe-card-container').appendChild(el);
			this.card.on('focus', () => this.elevation = 5);
			this.card.on('blur', () => this.elevation = 0);
		},
		getSetupIntent() {
			return fetch('/api/user/payment/create-setup-intent', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(setupIntent => {
					this.intent = setupIntent;
				})		
		},
		getPublicKey() {
			return fetch('/api/user/payment/public-key', {
				method: 'get',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(response => {
					this.publicKey = response.body.publicStripeKey;
				})		
		}
	}
}

</script>