const fs = require("fs");

module.exports = (req, res) => {
	return res.send(fs.readFileSync(__dirname + "/swagger.json").toString());
};