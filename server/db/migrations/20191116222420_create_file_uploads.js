
exports.up = function(knex) {
	return knex.schema.createTable('file_uploads', table => {
		table.increments('file_id').primary();
		table.integer('user_id');
		table.string('filename');
		table.string('file_type', 10);
		table.integer('file_size');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('file_uploads'); 
};
