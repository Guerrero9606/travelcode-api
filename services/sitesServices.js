const boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');
const { getBD } = require('../DB/conexion.js');

class sitesServices {
	constructor() {
		//this.ventas = [];
		//this.generate();
	}

	async create(data) {
		const connection = getBD();
		const object = {
			title: data.title,
			descriptionShort: data.descriptionShort,
			descriptionLarge: data.descriptionLarge,
			location: data.location,
			temperature: data.temperature,
			recommendedSites: data.recommendedSites,
			image: data.image,
		}

		if (!data) {
			throw boom.badData('No se puede crear este objeto');
		}
		await connection.collection("Sites").insertOne(object);
	}

	async find() {
		const conexionBd = getBD();
		//implementar el codigo paa crar el producto en la BD
		const resultado = await conexionBd.collection('Sites').find({}).toArray();
		if (resultado.length === 0) {
			throw boom.notFound('No se encuentran sitios');
		}
		return resultado;
	}

	async findOne(_idSite) {
		const connection = getBD(); //conexion a la db

		const id = {_id: ObjectId(_idSite)};
		const res = await connection.collection('Sites').findOne(id);
		if(res === null){
			throw boom.notFound('Sitio no encontrado');
		}
		return res;
	}

	async update(id, changes) {
		const conexionBd = getBD();
		const filtrarSite = { _id: ObjectId(id) };
		const sitio = await conexionBd.collection('Sites').find(filtrarSite).toArray();
		if (sitio.length === 0) {
			throw boom.notFound('Sitio no encontrado');
		} else {
			const operacion = { $set: changes, };
			const updated = await conexionBd.collection('Sites').updateOne(filtrarSite, operacion, { upsert: false, returnOriginal: true });
			const resultado = await conexionBd.collection('Sites').find(filtrarSite).toArray();
			return resultado;
		}
	}

	async delete(id) {
		const conexionBd = getBD();
		const filtrarSite = { _id: ObjectId(id) };
		const sitio = await conexionBd.collection('Sites').find(filtrarSite).toArray();
		if (sitio.length === 0) {
			throw boom.notFound('Sitio no encontrado');
		} else {
			const remove = await conexionBd.collection('Sites').deleteOne(filtrarSite);
			return { id };
		}
	}
}

module.exports = sitesServices;
