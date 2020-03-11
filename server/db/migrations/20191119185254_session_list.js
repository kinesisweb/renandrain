
exports.up = function(knex) {
	return knex.schema.createTable('sessions', table => {
		table.increments('session_id').primary();
		table.boolean('active').defaultTo(true);
		table.integer('userid');
		table.string('token');
		table.string('ip');
		table.timestamp('start_time').defaultTo(knex.fn.now());
		table.timestamp('last_access').defaultTo(knex.fn.now());
		table.time('end_time');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('sessions');
};
