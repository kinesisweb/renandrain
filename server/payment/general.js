const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const self = module.exports = {
	getStripePublicKey: function(req,res) {
		return process.env.STRIPE_PUBLIC_KEY;
	}
}