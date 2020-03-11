
exports.up = function(knex) {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary();
		table.string('role').notNullable().defaultTo("user");
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.string('first_name');
		table.string('last_name');
		table.string('phone');
		table.string('address_line1');
		table.string('address_line2');
		table.string('address_city');
		table.string('address_state');
		table.string('address_postal_code');
		table.string('address_country');
		table.string('email_verification_code');
		table.boolean('email_verified').notNullable().defaultTo(false);
		table.string('stripe_customer_id');
		table.string('preferred_currency', 3);
		table.timestamps(true,true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users'); 
};
