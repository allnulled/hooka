const rooter = require(process.env.APP_ROOTER);

rooter.findAndInclude("/src/*/model/*.js");