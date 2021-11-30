const joi = require('joi');

const id = joi.string().hex();
const title = joi.string().min(3).max(50);
const descriptionShort = joi.string().min(3).max(500);
const descriptionLarge = joi.string().min(3).max(5000);
const location = joi.string().min(3).max(500);
const temperature = joi.string().min(3).max(10);
const recommendedSites = joi.string().min(3).max(500)
const image = joi.string().uri();

const createSitesSchema = joi.object({
	title: title.required(),
	descriptionShort: descriptionShort.required(),
	descriptionLarge: descriptionLarge.required(),
	location: location.required(),
	temperature: temperature.required(),
	recommendedSites: recommendedSites.required(),
	image: image.required()
});

const updateSitesSchema = joi.object({
	title: title,
	descriptionShort: descriptionShort,
	descriptionLarge: descriptionLarge,
	location: location,
	temperature: temperature,
	recommendedSites: recommendedSites,
	image: image
});

const getSitesSchema = joi.object({
	id: id.required()
});

module.exports = { createSitesSchema, updateSitesSchema, getSitesSchema };
