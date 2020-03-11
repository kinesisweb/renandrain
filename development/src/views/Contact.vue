<template>
	<div>
		<comp-header 
			:background-image="require('../assets/images/wavesgrid.png')"
			background-colour="#5B7D87"
			title="Contact Ren & Rain"
		/>
		<v-form ref="contact-form" @submit.prevent="submitForm">
			<v-container class="my-8">
				<v-row>
					<v-col cols="12" md="8" offset-md="2">
						<v-card>
							<v-card-title>Get in touch</v-card-title>
							<v-card-subtitle>If you have any questions, or require any further information about our services, please don't hesitate to contact us.</v-card-subtitle>
							<v-card-text>
								<v-row>
									<v-col cols="6">
										<v-text-field
											label="First name"
											prepend-icon="mdi-account"
											outlined
											:rules="[...Object.values(rules.general)]"
											v-model="form.firstName"
										></v-text-field>
									</v-col>
									<v-col cols="6">
										<v-text-field
											label="Last name"
											outlined
											:rules="[...Object.values(rules.general)]"
											v-model="form.lastName"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field
											label="Email address"
											prepend-icon="mdi-at"
											outlined
											:rules="[...Object.values(rules.email)]"
											v-model="form.email"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-textarea
											label="Your message"
											counter
											auto-grow
											outlined
											rows="4"
											row-height="25"
											:rules="[...Object.values(rules.general)]"
											v-model="form.message"
										></v-textarea>
									</v-col>
									<v-col cols="12">
										<v-file-input 
											small-chips 
											multiple 
											label="Attach files"
											counter
											show-size
											v-model="files"
										>
											<template v-slot:selection="{ text }">
												<v-chip
													small
													label
													color="primary"
												>
												{{ text }}
												</v-chip>
											</template>
										</v-file-input>
									</v-col>
									<v-col cols="12" class="text-center">
										<v-btn large color="primary" dark type="submit">Send message</v-btn>
									</v-col>
								</v-row>
								<slide-up-down :active="percentShow">
									<v-progress-linear
										:value="percent"
										color="blue-grey"
										height="25"
										reactive
									>
										<template v-slot="{ value }">
											<strong>{{ Math.ceil(value) }}%</strong>
										</template>
									</v-progress-linear>
								</slide-up-down>
								<slide-up-down
									:active="alert.show"
								>
									<div>
										<v-alert
											:type="alert.type"
										>
											{{ alert.message }}
										</v-alert>
									</div>
								</slide-up-down>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			rules: {
				email: {
					required: v => !!v || 'Required',
					validate: v => /\w+@\w+\.\w{2,}/.test(v) || 'Not a valid email address'
				},
				general: {
					required: v => !!v || 'Required',
				}
			},
			form: {
				firstName: "Craig",
				lastName: "Riley",
				email: "floodlitworld@gmail.com",
				message: "Testing this"
			},
			files: null,
			percent: 0,
			percentShow: false,
			alert: {
				show: false,
				type: 'error',
				message: null
			}
		}
	},
	methods: {
		submitForm() {
			if (!this.$refs['contact-form'].validate()) return false;
			this.percent = 0;
			if (this.files) this.percentShow = true;
			const form = new FormData();
			for (let [key,value] of Object.entries(this.form)) {
				form.append(key,value);
			}
			if (this.files) {
				for (let file of this.files) {
					form.append('files', file, file.name);
				}
			}
			axios.post('/api/contact',
				form,
				{
					headers: {
					'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: ev => {
						this.percent = parseInt( Math.round( ( ev.loaded / ev.total) * 100 ));
					}
				}
			)
			.then(() => {
				this.alert.type = "success";
				this.alert.message = "Your message has been sent.";
			})
			.catch(err => {
				this.alert.type = "error";
				this.alert.message = err.response.data;
			})
			.finally(() => {
				const success = this.alert.type === "success";
				this.percentShow = false;
				this.alert.show = true;
				if (success) this.resetForm();
				setTimeout(() => {
					this.alert.show = false;
				}, 5000)
			})
		},
		resetForm() {
			this.files = null;
			this.form = {
				firstName: "",
				lastName: "",
				email: "",
				message: ""
			}
			this.$refs['contact-form'].resetValidation();
		}
	}
}
</script>