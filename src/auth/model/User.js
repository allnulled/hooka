const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	name: String,
	password: String,
	email: {
		type: String,
		unique: true,
		required: "Email address is required",
		match: [/^[a-zA-Z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i, "Please fill a valid email address"]
	}
});

userSchema.methods.isValidPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

User.getHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = User;
