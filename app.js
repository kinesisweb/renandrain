const express = require('express'),
	path = require('path'),
	history = require('connect-history-api-fallback'),
	ren = express.Router(),
	routes = require('./server/routes.js'),
	isAuth = routes.user.isAuth,
	logUserData = require('./server/users/log.js'),
	paymentAdd = require('./server/payment/add.js'),
	webhooks = require('./server/payment/webhooks.js'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	fs = require('fs');

ren.use(express.static(path.join(__dirname, 'client')));

ren.use(cookieParser(process.env.REN_COOKIE_SECRET));
ren.use(logUserData.requestData);

ren.post('/api/webhook', bodyParser.raw({type: 'application/json'}), webhooks);
ren.post('/api/contact', routes.general.contact)

ren.get('/api/content/galleries/:category/:id?', routes.galleries.getGallery);

ren.get('/api/user/payment/add', (req,res) => {
	res.send("Saving card information");
})

ren.use('/static/optimise/:id', routes.galleries.optimise);

ren.use('/static', express.static(path.join(__dirname, '/static')));

ren.get('/api/user/payment/public-key', routes.payment.getStripePublicKey);

ren.post('/api/user/create', routes.user.create);
ren.post('/api/user/init', isAuth(['user']), routes.user.init);
ren.post('/api/user/login', routes.user.login);
ren.post('/api/user/logout', isAuth(['user']), routes.user.logout);
ren.post('/api/user/verify-email', routes.user.verify);
ren.post('/api/user/payment/create-setup-intent', paymentAdd.createSetupIntent);

ren.use(history());

module.exports = ren;