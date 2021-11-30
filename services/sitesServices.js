//const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

class sitesServices {
	constructor() {
		//this.sites = [];
		//this.generate();
	}
	/*
	generate() {
		const limit = 100;
		for ( let index = 0; index < limit; index++ ) {
			this.productos.push( {
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt( faker.commerce.price(), 10 ),
				image: faker.image.imageUrl(),
			} );
		}
	}*/

	async create( data ) {
		const newProducto = {
			id: faker.datatype.uuid(),
			...data
		};
		this.productos.push( newProducto );
		return newProducto;
	}

	async find() {
		const producto = this.productos;
		if ( !producto ) {
			throw boom.notFound( 'Producto no encontrado' );
		}
		return producto;
	}

	async findOne( id ) {
		const producto = this.productos.find( item => item.id === id );
		if ( !producto ) {
			throw boom.notFound( 'Producto no encontrado' );
		}
		return producto;
	}

	async update( id, changes ) {
		const index = this.productos.findIndex( item => item.id === id );
		if ( index === -1 ) {
			throw boom.notFound( 'Producto no encontrado' );
		}
		const producto = this.productos[ index ];
		this.productos[ index ] = {
			...producto,
			...changes
		};
		return this.productos[ index ];
	}

	async delete( id ) {
		const index = this.productos.findIndex( item => item.id === id );
		if ( index === -1 ) {
			throw boom.notFound( 'Producto no encontrado' );
		}
		this.productos.splice( index, 1 );
		return { id };
	}
}

module.exports = sitesServices;
