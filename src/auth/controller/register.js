module.exports = async (req, res, next) => {
	if(!req.body) {
		return res.jsonError(402, {
			description: "Missing request body"
		});
	}
	if(!req.body.name) {
		return res.jsonError(402, {
			description: "Missing <name> in body"
		});	
	}
	if(!req.body.password) {
		return res.jsonError(402, {
			description: "Missing <password> in body"
		});	
	}
	if(!req.body.email) {
		return res.jsonError(402, {
			description: "Missing <email> in body"
		});	
	}
	if(req.body.password.length < 8) {
		return res.jsonError(402, {
			description: "Field <password> in body must take at least 8 characters"
		});	
	}
	const User = res.db.model("User");
	try {
		const user = new User({
			name: req.body.name,
			password: User.getHash(req.body.password),
			email: req.body.email
		});
		await user.save();
		return res.jsonSuccess(201, {
			description: "User was registered successfully",
			data: {
				user: {
					name: req.body.name,
					password: req.body.password.split("").map(c => "*").join(""),
					email: req.body.email
				}
			}
		});
	} catch(error) {
		console.log(error);
		return res.jsonError(402, {
			description: "User could not be registered"
		});
	}
};