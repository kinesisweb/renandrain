const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookKey = process.env.STRIPE_WEBHOOK_SECRET;
const paymentAdd = require('./add.js');

const self = module.exports = async (req,res) => {
	let data, eventType;

	if (webhookKey) {
		let event,
			signature = req.headers['stripe-signature'];

		try {
			event = await stripe.webhooks.constructEvent(
				req.body,
				signature,
				webhookKey
			);
		}
		catch (err) {
			console.log(err);
			return res.sendStatus(400);
		}

		({ data, type: eventType } = event);
		data = event.data;
		eventType = event.type;
	}
	else ({ data, type: eventType } = req.body);

	switch (eventType) {
		case "setup_intent.succeeded": 
			paymentAdd.setupIntentSucceeded(data);
		break;
	}

	res.sendStatus(200);
}