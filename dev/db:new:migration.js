const args = require("yargs").argv;

if(args._.length === 0) {
	console.log("[!] Error: db:new:migration needs a <name>.");
	return;
}

const migrateMongoose = require("migrate-mongoose");
const migrationName = args._[0];
const migrator = new migrateMongoose({
  migrationsPath:  migrationsDir,
  templatePath: templatePath,
  dbConnectionUri: ,
  es6Templates: true,
  collectionName:  collectionName,
  autosync: autosync
});