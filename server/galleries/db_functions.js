const knex = require('../db/knex.js');

const self = module.exports = {
	getGallery: async function( { category, id = null } ) {
		if (!id) {
			const catResults = await knex('galleries').select('gallery_id').where('category', category);
			id = catResults[0].gallery_id;
		}
		const galleryInfo = await knex('galleries').select().where('gallery_id', id);
		const galleryImages = await knex('gallery_images').select().where('gallery_id', id);

		return {galleryInfo, galleryImages};
	}


}