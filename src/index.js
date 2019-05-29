const core = require(__dirname + "/core.js");

core.rooter.findAndRequire("/src/*/hook/load.js").forEach(load => load(core));

const lifecycle = [
	"app:initialization",
	"app:dependencies",
	"app:connection",
	"app:preparation",
	"app:static-injection",
	"app:dynamic-injection",
	"app:pre-routing",
	"app:routing",
	"app:post-routing",
	"app:pre-deployment",
	"app:deployment",
	"app:post-deployment",
];

lifecycle.forEach(hook => core.hooker.initialize(hook));

core.hooker.trigger(lifecycle, core);

/*
------------------------------------------------
--- lifecycle:
	- bootstrap (core)
	- pluginization (plugins)
	- initialization (...)
	- dependencies (global dependencies)
	- connection (database)

	- preparation
	- static-injection (app-level middleware)
	- dynamic-injection (router-level middleware)
	- pre-routing
	- routing (routes)
	- post-routing

	- pre-deployment
	- deployment
	- post-deployment
	- finishing
------------------------------------------------
--- refreshing lifecycle:
	- reseting (empty plugins)
	- pluginization (plugins)

	- preparation
	- static-injection (app extensions)
	- dynamic-injection (app-level middleware)
	- pre-routing
	- routing (routes)
	- post-routing
------------------------------------------------

//*/