"use strict";

module.exports = {
	up: async function up() {
		const db = require("mongoose");
		const User = db.model("User");
		const admin = new User({
			name: "admin",
			email: "administrator@domain.com"
		});
		admin.password = User.getHash("unpasswordcualquiera.1");
		await admin.save();
		console.log("Migrated!");
		return true;
	},
	down: async function down(done) {
		const User = this("user");
		await User.deleteMany({});
		done();
	}
};
