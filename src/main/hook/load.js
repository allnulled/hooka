module.exports = (core) => {
	const { rooter, logger, hooker } = core;

	const chalk = require("chalk");

	core.main = {};

	hooker.add("app:dependencies", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:dependencies>"))});
	hooker.add("app:connection", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:connection>"))});
	hooker.add("app:preparation", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:preparation>"))});
	hooker.add("app:static-injection", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:static-injection>"))});
	hooker.add("app:dynamic-injection", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:dynamic-injection>"))});
	hooker.add("app:pre-routing", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:pre-routing>"))});
	hooker.add("app:routing", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:routing>"))});
	hooker.add("app:post-routing", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:post-routing>"))});
	hooker.add("app:pre-deployment", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:pre-deployment>"))});
	hooker.add("app:deployment", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:deployment>"))});
	hooker.add("app:post-deployment", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:post-deployment>"))});
	hooker.add("app:finishing", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:finishing>"))});
	hooker.add("app:reseting", () => {logger.debug(chalk.yellow.bold("[ ] Starting hook: <app:reseting>"))});

	hooker.add("app:dependencies",rooter.include("/src/main/hook/app-and-servers.js"));
	hooker.add("app:connection", rooter.include("/src/main/hook/db-connection.js"));
	hooker.add("app:preparation", () => {});
	hooker.add("app:static-injection", rooter.include("/src/main/hook/http-codes.js"));
	hooker.add("app:dynamic-injection", () => {});
	hooker.add("app:pre-routing", rooter.include("/src/main/hook/helmet-security.js"));
	hooker.add("app:routing", () => {});
	hooker.add("app:post-routing", () => {});
	hooker.add("app:pre-deployment", () => {});
	hooker.add("app:deployment", rooter.include("/src/main/hook/start-servers.js"));
	hooker.add("app:post-deployment", () => {});
	hooker.add("app:finishing", () => {});
	hooker.add("app:reseting", () => {});
};
