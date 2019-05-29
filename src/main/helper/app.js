const fs = require("fs");
const http = require("http");
const https = require("https");
const helmet = require("helmet");
const mongoose = require("mongoose");
const expressHttp = require("express-http-codes");
const express = expressHttp(require("express"));

require(__dirname + "/env.js");
require(__dirname + "/models.js");

const secureOptions = {
	key: fs.readFileSync(__dirname + "/security/key.pem").toString(),
	cert: fs.readFileSync(__dirname + "/security/cert.pem").toString(),
	passphrase: process.env.SSL_PASSPHRASE
};

///////////////////////////////////////////////////////////////////////
///////////////////// STATIC DEPENDENCY INJECTION /////////////////////
///////////////////////////////////////////////////////////////////////

const app = express();
const server = http.createServer(app);
const secureServer = https.createServer(secureOptions, app);
const routerInjections = { express };

var router = require(__dirname + "/router.js")(routerInjections);

// Helmet for basic security:
app.use(helmet.hidePoweredBy());
/*
app.use(helmet.noCache());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.hsts({ maxAge: 60 * 60 * 24 * 365 })); // seconds * minutes * hours * days
app.use(helmet.referrerPolicy({ policy: ['no-referrer', 'unsafe-url'] }));
//*/
// 

///////////////////////////////////////////////////////////////////////
//////////////////// DYNAMIC DEPENDENCY INJECTION /////////////////////
///////////////////////////////////////////////////////////////////////

// (...it is better to put it on the router.js file directly... )

///////////////////////////////////////////////////////////////////////
/////////////////////////// TURN ON SERVERS ///////////////////////////
///////////////////////////////////////////////////////////////////////

mongoose.connect(process.env.DB_STRING, (error, database) => {

	if(error) {
		console.log("# ERROR IN DATABASE CONNECTION.");
		console.log("# Aborting application...");
		process.exit(0);
	}

	// Inject database connection to express response...:
	express.response.db = database;

	console.log("# Connected to database.");

	server.listen(process.env.NODE_PORT || 9998, () => {
		console.log(`# Server listening at:\n - ${server.address().address}:${server.address().port}`);
	});

	secureServer.listen(process.env.NODE_SECURE_PORT || 9999, () => {
		console.log(`# Secure server listening at:\n  - ${secureServer.address().address}:${secureServer.address().port}`);
	});

})

///////////////////////////////////////////////////////////////////////
//////////////////////// DEVELOPMENT ADDONS ///////////////////////////
///////////////////////////////////////////////////////////////////////

if ((process.env.NODE_ENV !== "development") && (process.env.NODE_ENV !== "test")) {
	app.use(router);
} else {
	app.use((...args) => router(...args));
	const importFresh = require("import-fresh");
	const chokidar = require("chokidar");
	chokidar.watch([__dirname + "/**/*", "!" + __dirname + "/app.js"]).on("change", () => {
		console.log("# Updating changes, please wait...");
		try {
			router = importFresh(__dirname + "/router.js")({...routerInjections, importFresh });
			console.log("# OK. Updated successfully.");
		} catch (error) {
			console.log("# ERROR ##############################################");
			console.log(error);
			console.log("# Not updated.");
		}
	});
}
