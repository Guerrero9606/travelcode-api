const joi = require('joi');

const id = joi.string().hex();
const title = joi.string().min(3).max(50);
const descriptionShort = joi.string().min(3).max(500);
const descriptionLarge = joi.string().min(3).max(5000);
const location = joi.string().min(3).max(500);
const temperature = joi.string().min(3).max(10);
const recommendedSites = joi.string().min(3).max(500)
const image = joi.string().uri();
const score = joi.number().min(1).max(100);
const longitud = joi.number().min(-990000000).max(990000000);
const latitud = joi.number().min(-990000000).max(990000000);

const createSitesSchema = joi.object({
	title: title.required(),
	descriptionShort: descriptionShort.required(),
	descriptionLarge: descriptionLarge.required(),
	location: location.required(),
	temperature: temperature.required(),
	recommendedSites: recommendedSites.required(),
	image: image.required(),
	score: score.required(),
	latitud: latitud.required(),
	longitud: longitud.required()
});

const updateSitesSchema = joi.object({
	title: title,
	descriptionShort: descriptionShort,
	descriptionLarge: descriptionLarge,
	location: location,
	temperature: temperature,
	recommendedSites: recommendedSites,
	image: image,
	score: score,
	latitud: latitud,
	longitud: longitud
});

const getSitesSchema = joi.object({
	id: id.required()
});

module.exports = { createSitesSchema, updateSitesSchema, getSitesSchema };
