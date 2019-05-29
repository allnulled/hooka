module.exports = (core) => {
	const { logger, db } = core;
	const express = require("express");

	logger.debug("[*] @/src/main/hook/db-connection.js");

	logger.debug("[#] Connecting to database...");
	return new Promise((resolve, reject) => {
		return db
			.then((db) => {
				logger.debug("[✓] Successfully connected to database.");

				logger.debug("[ ] Inject db to express.");
				express.response.db = db;

				return resolve();
			})
			.catch((err) => {
				logger.error("[!] Error on database connection.", err);
				logger.error("[!] Aborting execution.");
				return reject();
			});
	});
};
