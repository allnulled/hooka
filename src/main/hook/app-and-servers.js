module.exports = (core) => {
	const { rooter, logger } = core;
	const fs = require("fs");
	const http = require("http");
	const https = require("https");
	const express = require("express");

	logger.debug("[*] @/src/main/hook/app-and-servers.js");

	logger.debug("[·] Importing secure credentials.");
	const secureOptions = {
		key: fs.readFileSync(rooter.resolve("/src/main/setting/security/key.pem")).toString(),
		cert: fs.readFileSync(rooter.resolve("/src/main/setting/security/cert.pem")).toString(),
		passphrase: process.env.SSL_PASSPHRASE
	};

	logger.debug("[ ] Creating express application.");
	const app = express();

	logger.debug("[ ] Creating http server.");
	const server = http.createServer(app);

	logger.debug("[ ] Creating https server.");
	const secureServer = https.createServer(secureOptions, app);

	logger.debug("[ ] Exporting app, server and secureServer to core.");
	core.main = { ...core.main, app, server, secureServer };
};
