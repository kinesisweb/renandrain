const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const self = module.exports = {
	createSetupIntent: async function(req,res) {
		res.send(await stripe.setupIntents.create());
	},
	setupIntentSucceeded: async function(data) {
		console.log("Running setupIntentSucceeded()");
		const paymentMethod = await stripe.paymentMethods.retrieve(
			data.object.payment_method
		)

		console.log(paymentMethod);

		const customer = await stripe.customers.create({
			payment_method: data.object.payment_method,
			email: paymentMethod.billing_details.email
		})

		console.log(customer);
	}
}