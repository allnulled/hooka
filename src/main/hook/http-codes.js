module.exports = (core) => {
	const { logger } = core;
	const express = require("express");
	const expressHttp = require("express-http-codes");
	
	logger.debug("[*] @/src/main/hook/http-codes.js");
	
	logger.debug("[ ] Injecting response http codes.");
	expressHttp(express);

};
