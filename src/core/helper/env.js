require("dotenv").config({
	path: `${__dirname}/../../../.env.${require("fs")
		.readFileSync(`${__dirname}/../../../.env`)
		.toString()}`
});
