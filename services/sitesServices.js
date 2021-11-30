import boom from '@hapi/boom';
import { ObjectId } from 'mongodb';
import { getBD } from '../../DB/conexion.js';

class sitesServices {
	constructor() {
		//this.ventas = [];
		//this.generate();
	}

	async create(data) {
		const connection = getBD();
		const object = {
			idProduct: ObjectId(data.idProduct),
			vTotal: data.vTotal,
			amount: data.amount,
			price: data.price,
			dateV: data.dateV,
			state: data.state,
			idVendedor: ObjectId(data.idVendedor),
			nameC: data.nameC,
			Documento: data.Documento,
		}

		if (!data) {
			throw boom.badData('No se puede crear este objeto');
		}
		await connection.collection("ventas").insertOne(object);
	}

	async find() {
		const conexionBd = getBD();
		//implementar el codigo paa crar el producto en la BD
		const resultado = await conexionBd.collection('ventas').find({}).toArray();
		if (resultado.length === 0) {
			throw boom.notFound('No se encuentran ventas');
		}
		return resultado;
	}

	async findOne(_idVenta) {
		const connection = getBD(); //conexion a la db

		const id = {_id: ObjectId(_idVenta)};
		const res = await connection.collection('ventas').findOne(id);
		if(res === null){
			throw boom.notFound('Venta no encontrada');
		}
		return res;
	}

	async update(id, changes) {
		const conexionBd = getBD();
		const filtrarProducto = { _id: ObjectId(id) };
		const venta = await conexionBd.collection('ventas').find(filtrarProducto).toArray();
		if (venta.length === 0) {
			throw boom.notFound('Venta no encontrada');
		} else {
			const operacion = { $set: changes, };
			const updated = await conexionBd.collection('ventas').updateOne(filtrarProducto, operacion, { upsert: false, returnOriginal: true });
			const resultado = await conexionBd.collection('ventas').find(filtrarProducto).toArray();
			return resultado;
		}
	}

	async delete(id) {
		const conexionBd = getBD();
		const filtrarProducto = { _id: ObjectId(id) };
		const venta = await conexionBd.collection('ventas').find(filtrarProducto).toArray();
		if (venta.length === 0) {
			throw boom.notFound('Venta no encontrada');
		} else {
			const remove = await conexionBd.collection('ventas').deleteOne(filtrarProducto);
			return { id };
		}
	}
}

export default sitesServices;
