const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const fs = require("fs");

module.exports = ({ express, importFresh = require }) => {
	const router = express.Router();
	const controller = {
		auth: {
			login: importFresh(`${__dirname}/controller/auth/login.js`),
			logout: importFresh(`${__dirname}/controller/auth/logout.js`),
			register: importFresh(`${__dirname}/controller/auth/register.js`),
			unregister: importFresh(`${__dirname}/controller/auth/unregister.js`),
		},
		store: {
			schema: importFresh(`${__dirname}/controller/store/apiSchema.js`),
			product: importFresh(`${__dirname}/controller/store/product.js`),
			cart: importFresh(`${__dirname}/controller/store/cart.js`),
			coin: importFresh(`${__dirname}/controller/store/coin.js`),
			pricing: importFresh(`${__dirname}/controller/store/pricing.js`),
		},
		error: {
			notFound: importFresh(`${__dirname}/controller/error/404.js`)
		}
	};
	const middleware = {
		logged: importFresh(`${__dirname}/middleware/auth/logged.js`),
		role: importFresh(`${__dirname}/middleware/auth/role.js`)
	};
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({ extended: true }));
	router.get("/store/api/v1", controller.store.schema);
	router.get("/store/api/v1/product/:id", controller.store.product.one.GET);
	router.get("/store/api/v1/product", controller.store.product.many.GET);
	///////////////////////////////////////////////
	router.post("/auth/api/v1/register", controller.auth.register);
	router.post("/auth/api/v1/unregister", controller.auth.unregister);
	router.post("/auth/api/v1/login", controller.auth.login);
	router.post("/auth/api/v1/logout", controller.auth.logout);
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	///////////////////////////////////////////////
	router.use(controller.error.notFound);
	return router;
};
