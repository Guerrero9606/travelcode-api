const express = require('express');
const cors = require('cors');
const { connectBD } = require('./DB/conexion.js');
const routerApi = require('./routes');
const dotenv = require('dotenv');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

dotenv.config({ path: './.env' });

const app = express();
//const port = 3002;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const main = () => {
	return app.listen(process.env.PORT, () => {
		console.log(`Escuchando puerto ${process.env.PORT}`);
	});
};

app.get('/', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.send('Bienvenido a TravelCode');
	next();
});

connectBD(main);
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
