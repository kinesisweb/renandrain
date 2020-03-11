const { promisify } = require('util');
const { parse, resolve: pResolve, basename, dirname: pathDir } = require('path');
const fs = require('fs');
const animated = require('animated-gif-detector');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const sharp = require('sharp');
const db = require('./db_functions.js');
const settings = require('../../settings.json');

const self = module.exports = {
	optimise: async function(galleryID = null) {
			if (!galleryID) throw new Error("No gallery specified");
			const {galleryInfo, galleryImages} = await db.getGallery({id:galleryID});

			const rootPath = pResolve(__basedir + settings.galleryDir + galleryInfo[0].category + galleryInfo[0].path);
			const filelist = galleryImages.map(image => {
				return `${rootPath}/${image.filename}.${image.file_type}`;
			})

			const deleted = await self.deleteOptimised( { root: rootPath, files: galleryImages } );
			const optimised = await self.createOptimised( { options: galleryInfo[0], root: rootPath, files: galleryImages } );

			return optimised;
	},
	deleteOptimised: function( { root,files } ) {
		return new Promise((resolve,reject) => {
			const promises = [];
			files.forEach(file => {
				const filePath = `${root}/${file.filename}.optimised.${file.file_type}`;
				console.log(filePath);
				const promise = new Promise((resolve,reject) => {
					fs.unlink(filePath, () => {
						resolve();
					})
				})
				promises.push(promise);
			})
			Promise.all(promises)
			.then(res => {
				resolve("done");
			})
		})
	},
	createOptimised: function({root,files,options}) {
		return new Promise((resolve,reject) => {
			console.log(options);
			const promises = [];
			files.forEach(file => {
				const original = `${root}/${file.filename}.${file.file_type}`;
				const optimised = `${root}/${file.filename}.optimised.${file.file_type}`;
				const prom = self.optimiseImage({original,optimised,options});
				promises.push(prom);
			});
			Promise.all(promises)
			.then(() => {
				resolve(promises.length + " files optimised");
			})
		})
	},
	optimiseImage: function( { original, optimised, options = {} } ) {
		return new Promise((resolve,reject) => {
			if (animated(fs.readFileSync(original))) {
				return fs.copyFile(original,optimised, (err) => {
					resolve(original);
				})
			}
			sharp(original)
				.resize( { 
					height: options.height,
					width: options.width,
					fit: sharp.fit.cover,
					position: sharp.strategy.entropy
				} )
				.toFile(optimised)
				.then(res => {
					resolve(original);
				})
		})
	}
}