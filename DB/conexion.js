const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const stringconexion = process.env.DATABASE_URL;

const Client = new MongoClient (stringconexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let conexionBd;

const connectBD = (callback) =>{

    Client.connect((err, db) => {
        if (err) {
            console.error('Error conectando a la base de datos');
            return 'error';
        }
        conexionBd = db.db('touristsites');
        console.log('Conexion Exitosa');
        return callback();
    });
};

const getBD =() => {
    return conexionBd;
};

module.exports = {connectBD, getBD};
