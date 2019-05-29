const fs = require("fs");
const importFresh = require("import-fresh");
const mongoose = require("mongoose");
require(__dirname + "/../src/model/loader.js");
require(__dirname + "/../src/model/loader.js");
mongoose.connect(process.env.DB_STRING, (error, database) => {
	require("chokidar").watch(__dirname + "/db:shell/*.js").on("change", (file) => {
		try {
			importFresh(file)(database);
		} catch(error) {
			console.log("[!] ERROR:", error);
		}
	});
});