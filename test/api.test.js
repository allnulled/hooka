const request = require("request");
const { expect } = require("chai");
const User = require(__dirname + "/../src/model/User.js");
const mongoose = require("mongoose");

require("dotenv").config({ path: __dirname + "/../.env.test" });

describe("AUTH API", function() {
	this.timeout(10 * 1000);

	//*
	before(async () => {
		try {
			await mongoose.connect(process.env.DB_STRING);
			await database.users.deleteMany({});
			await mongoose.connection.close();
		} catch (error) {
			await mongoose.connection.close();
		}
	});
	//*/

	it("can register", function(doneTest) {
		request(
			{
				method: "POST",
				uri: "http://127.0.0.1:" + process.env.NODE_PORT + "/auth/api/v1/register",
				json: true,
				body: {
					name: "administrator",
					email: "someadmin@somedomain.com",
					password: "somepass.1"
				}
			},
			(error, response, body) => {
				if (error) {
					console.log("ERROR:", error);
					throw new Error("[!] Error: Failed registration response.");
				}
				console.log("BODY:", body);
				expect(response.statusCode).to.equal(201);
				expect(body.statusCode).to.equal(201);
				return doneTest();
			}
		);
	});

	it("can login", function(doneTest) {
		// @TODO:
		doneTest();
	});

	it("can logout", function(doneTest) {
		// @TODO:
		doneTest();
	});

	it.skip("can unregister", function(doneTest) {
		// @TODO:
		request(
			{
				method: "POST",
				uri: "http://127.0.0.1:" + process.env.NODE_PORT + "/auth/api/v1/unregister",
				json: true,
				body: {
					email: "someadmin@somedomain.com",
					password: "somepass.1"
				}
			},
			(error, response, body) => {
				if (error) {
					console.log("ERROR:", error);
					throw new Error("[!] Error: Failed registration response.");
				}
				console.log("BODY:", body);
				expect(response.statusCode).to.equal(200);
				expect(body.statusCode).to.equal(200);
				return doneTest();
			}
		);
	});
});

describe("REST API", function() {
	this.timeout(10 * 1000);

	it("can GET /api/v1/product", async function() {});
});
