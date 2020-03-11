const path = require("path");

if (!process.env.DB_HOST) {
	delete process.env.DB_USER;
	require("dotenv").config({
		path: path.resolve("../../../.env")
	});
}

module.exports = {
	development: {
		client: "mysql",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: "renandrain",
			socketPath: process.env.DB_SOCKET
		},
		pool: {
			min: 0,
			max: 20
		},
		migrations: {
			directory: __dirname + "/migrations"
		},
		seeds: {
			directory: __dirname + "/seeds"
		}
	},

	production: {
		client: "mysql",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: "renandrain",
			socketPath: process.env.DB_SOCKET
		},
		pool: {
			min: 0,
			max: 20
		},
		migrations: {
			directory: __dirname + "/migrations"
		},
		seeds: {
			directory: __dirname + "/seeds"
		}
	}
};
