module.exports = async (req, res, next) => {
	if (!req.body) {
		return res.jsonError(402, {
			description: "Missing request body"
		});
	}
	if (!req.body.email) {
		return res.jsonError(402, {
			description: "Missing <email> in body"
		});
	}
	if (!req.body.password) {
		return res.jsonError(402, {
			description: "Missing <password> in body"
		});
	}
	const User = res.db.model("User");
	let user = undefined;
	try {
		user = await User.findOne({ email: req.body.email });
		console.log(user.name);
		console.log(user.password);
		console.log(user.email);
		if(!user.isValidPassword(req.body.password)) {
			return res.jsonError(403, {
				description: "Invalid password",
				forUser: {
					email: req.body.email,
					password: req.body.password
				},
			});
		}
		await user.deleteOne();
		return res.jsonSuccess(200, {
			description: "User deleted successfully"
		});
	} catch (error) {
		console.log(error);
		return res.jsonError(402, {
			description: "Entity could not be processed adecuately"
		});
	}
};
