const app = require("../../server.js");
const request = require("supertest");
const chai = require("chai");

describe("GET /api/products", () => {
	it("debe devolver todos los productos", async () => {
		const response = await request(app).get("/api/products");
		chai.expect(response.body).to.be.an("array");
	});
});
