module.exports = (core) => {
	const { logger, main: { app, server, secureServer }} = core;

	const chalk = require("chalk");
	
	logger.debug("[*] @/src/main/hook/start-servers.js");
	
	logger.debug("[ ] Starting http server.");
	server.listen(process.env.NODE_PORT, () => {
		const address = server.address();
		const serverUrl = chalk.underline.green.bold(`http://${address.address === "::" ? "localhost" : address.address}:${address.port}`);
		logger.debug(`[✓] Successfully started http server at:`);
		logger.debug(`[✓]    - ${serverUrl}`)
	});

	logger.debug("[ ] Starting https server.");
	secureServer.listen(process.env.NODE_SECURE_PORT, () => {
		const secureAddress = secureServer.address();
		const secureServerUrl = chalk.underline.green.bold(`https://${secureAddress.address === "::" ? "localhost" : secureAddress.address}:${secureAddress.port}`);
		logger.debug(`[✓] Successfully started http server at:`);
		logger.debug(`[✓]    - ${secureServerUrl}`)
	});

};
