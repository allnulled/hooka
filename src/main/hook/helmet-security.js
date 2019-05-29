module.exports = (core) => {
	const { main: { app }, logger } = core;
	const helmet = require("helmet");
	
	logger.debug("[*] @/src/main/hook/helmet-security.js");
	
	logger.debug("[ ] Hidding 'Powered-by' header.");
	app.use(helmet.hidePoweredBy());

};