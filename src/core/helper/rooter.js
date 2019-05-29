const rooter = require("path-rooter").create(__dirname + "/../../..");

rooter.include = process.env.ENV !== "production" ? rooter.execute : rooter.require;
rooter.findAndInclude = process.env.ENV !== "production" ? rooter.findAndExecute : rooter.findAndRequire;

module.exports = rooter;
