const { Router } = require("express");
const express = require("express");
const sitesServices = require('../services/sitesServices');
const validatorHandler = require('../middlewares/validator.handler');
const { createSitesSchema, updateSitesSchema, getSitesSchema } = require('../schemas/sites.schema');

const router = express.Router();
const service = new sitesServices();

router.get('/', async (req, res, next) => {
	try {
		const sites = await service.find();
		res.status(200).json(sites);
	} catch (error) {
		next(error);
	}
});

router.get('/:id',
	validatorHandler(getSitesSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const site = await service.findOne(id);
			res.json(site);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
	validatorHandler(createSitesSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newSite = await service.create(body);
			res.status(201).json(newSite);
		} catch (error) {
			next(error);
		}
	});

router.patch('/:id',
	validatorHandler(getSitesSchema, 'params'),
	validatorHandler(updateSitesSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const sites = await service.update(id, body);
			res.json(sites);
		} catch (error) {
			next(error);
		}
	});

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const rta = await service.delete(id);
		res.status(500).json(rta);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
