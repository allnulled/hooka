const migrationOptions = require(`${__dirname}/../.mongoose-migration.js`);
const migrateMongoose = require("migrate-mongoose");
const migrator = new migrateMongoose({...migrationOptions, cli: true});
require(`${__dirname}/../src/models.js`);
migrator.run("up");