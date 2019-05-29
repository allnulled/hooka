require(__dirname + "/core/helper/env.js");

const rooter = require(process.env.APP_ROOTER);
const logger = rooter.require("/src/core/helper/logger.js");
const hooker = rooter.require("/src/core/helper/hooker.js");
const models = rooter.require("/src/core/helper/models.js");
const db = rooter.require("/src/core/helper/db.js");

module.exports = { rooter, logger, models, db, hooker };