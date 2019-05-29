module.exports = {
	one: {
		GET: (req, res, next) => {
			return res.json({ message: "okkk" });
		},
		POST: (req, res, next) => {
			next();
		},
		PUT: (req, res, next) => {
			next();
		},
		DELETE: (req, res, next) => {
			next();
		},
	},
	many: {
		GET: (req, res, next) => {
			return res.json({ message: "okkk" });
		},
		POST: (req, res, next) => {
			next();
		},
		PUT: (req, res, next) => {
			next();
		},
		DELETE: (req, res, next) => {
			next();
		},
	}
};