const bcrypt = require('bcryptjs'),
	saltRounds = 10,
	key = process.env.REN_EMAIL_HASH_KEY,
	common = require('../../../lib/common.js'),
	settings = require('../../settings.json'),
	db = require('./db_functions.js'),
	jwt = require('jsonwebtoken'),
	jwtSecret = process.env.REN_JWT_SECRET,
	refreshSecret = process.env.REN_JWT_REFRESH;

const self = module.exports = {
	checkRole: function(roles = [],role = "") {
		console.log("Checking role...");
		if (role && roles.includes(role)) return true;
		else return false;
	},
	generateToken: function(user) {
		console.log("Generating access token...");
		const payload = {
			id: user.id,
			role: user.role,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			verified: user.email_verified
		}

		const expiration = "5m";
		return jwt.sign( { ...payload }, jwtSecret, { expiresIn: expiration } );
	},
	verifyToken: function(token) {
		console.log("Verifying access token...");
		return new Promise((resolve,reject) => {
			jwt.verify(token,jwtSecret, function(err, decoded) {
				if (err && err.name === "TokenExpiredError") resolve("expired");
				else if (err) resolve("invalid");
				else resolve(decoded);
			})
		})
	},
	generateRefresh: function(userid) {
		console.log("Generating refresh token...");
		const payload = {
			id: userid
		}

		const expiration = "7d";
		// Should start a new session here
		return jwt.sign( {...payload}, refreshSecret, { expiresIn: expiration } );
	},
	verifyRefresh: function(refresh) {
		console.log("Verifying refresh token...");
		return new Promise((resolve,reject) => {
			jwt.verify(refresh,refreshSecret, (err,decoded) => {
				if (err && err.name === "TokenExpiredError") resolve("expired");
				else if (err) resolve("invalid");
				else resolve(decoded);
			})
		})
	},
	getNewAccessToken: async function(refreshToken) {
		console.log("Getting new access token...");
		let refresh = await self.verifyRefresh(refreshToken);
		const activeSession = await db.checkSession(refreshToken);

		if (refresh === "invalid" || activeSession === false) return false;
		else if (refresh === "expired") {
			const deleteSession = await db.endSession(refreshToken);
			return false;
		}
		
		const refreshID = refresh.id;
		const sessionID = activeSession.userid;
		if (!refreshID || refreshID !== sessionID) return false;

		const { id, role, email_verified, first_name, last_name, email } = await db.getDataByID(refreshID);
		const accessToken = self.generateToken({ id, role, email_verified, first_name, last_name, email });
		const decodedAccessToken = await self.verifyToken(accessToken);

		return {decodedAccessToken,accessToken};
	},
	logoutSession: async function() {

	},
	createPasswordHash: function(password) {
		return new Promise((resolve,reject) => {
			bcrypt.hash(password, saltRounds, (err, hash) => {
				if (err) return reject(err);
				else resolve(hash);
			})
		})
	},
	checkPassword({email,password}) {
		return new Promise((resolve,reject) => {
			db.getDataByEmail(email)
			.then(data => {
				bcrypt.compare(password, data.password, (err, res) => {
					if (err) reject("Error");
					else if (res === true) resolve(data);
					else resolve(false);
				})
			})
		})
	},
	emailVerificationCode: function(email) {
		return new Promise((resolve,reject) => {
			const emailString = key + email;
			bcrypt.genSalt(saltRounds, (err, salt) => {
				if (err) reject(err);
				bcrypt.hash(emailString, salt, (err, hash) => {
					if (err) reject(err);
					else resolve(hash.replace(/\D/g,""));
				})
			})
		})
	},
	sendVerificationEmail: function(user) {
		return new Promise((resolve,reject) => {
			const link = `${process.env.CLIENT_HOST}/user/register/verify/${user.email}/${user.email_verification_code}`;
			const message = {
				to: user.email,
				from: settings.admin_email,
				subject: "Please verify your email for Ren & Rain Marketing",
				html: `
					<table style="width: 100%">
						<tr>
							<td style="width: 100%; background-color: #91b3bc; padding: 10px;">
								<img src="https://renandrain.com/static/img/email_logo.png">
							</td>
						</tr>
						<tr>
							<td><br><br><b>Hi ${user.first_name},</b><br></td>
						</tr>
						<tr>
							<td><p>To confirm creation of your Ren & Rain Marketing account, please copypaste the below code into the email verification field.</p></td>
						</tr>
						<tr>
							<td style="font-weight: bold; font-size: 16px; text-align: center;"><br><br>${user.email_verification_code}</td>
						</tr>
						<tr>
							<td><br><br>Or click the following link: ${link}
						</tr>
					</table>
				`
			}
			common.sendMail(message)
			.then(resolve);
		})
	}
}