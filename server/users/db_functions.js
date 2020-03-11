const knex = require('../db/knex.js');

const self = module.exports = {
	insertNewUser: function( { email, email_verification_code, first_name, last_name, password } ) {
		return new Promise((resolve,reject) => {
			knex('users')
			.insert({
				email,
				password,
				email_verification_code,
				first_name,
				last_name
			})
			.then(result => {
				resolve(result[0]);
			})
			.catch(reject);
		})
	},
	getDataByEmail: function(email) {
		return knex('users')
		.where('email', email)
		.select()
		.then(results => {
			return results[0];
		})
	},
	getDataByID: function(id) {
		return knex('users')
			.where('id', id)
			.select()
			.then(results => {
				return results[0];
			})
	},
	verifyEmail: function(custid) {
		return knex('users')
			.where({id: custid})
			.update({email_verified: true});
	},
	newSession: function( { userid, ip, token } ) {
		console.log("Running newSession");
		return knex('sessions')
			.insert({
				userid,
				token,
				ip
			})
	},
	endSession: function(session) {
		console.log("Ending session...");
		return knex('sessions')
			.where('token', session)
			.update({
				active: false,
				end_time: knex.fn.now()
			})
	},
	checkSession: function(refreshToken) {
		console.log("Checking session...");
		return knex('sessions')
			.select('active')
			.where({
				token: refreshToken
			})
			.then(results => {
				let result = (results[0] && results[0].session_id && results[0].active === true) ? results[0] : false;
				return result;
			})
			.catch(err => {
				console.log(err);
				return false;
			})
	}
}