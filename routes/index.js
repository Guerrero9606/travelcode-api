const express = require('express');
const sitesRouter = require('./sitesRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/sites', sitesRouter);
}

module.exports = routerApi;
