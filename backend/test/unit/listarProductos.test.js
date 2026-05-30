//Mock db
const path = require("path");
const listsProducts = [
	{
		id: 1,
		name: "Producto 1",
		description: "Descripción del producto 1",
		price: 10.99,
		stock: 100,
		image_url: "https://example.com/product1.jpg",
	},
	{
		id: 2,
		name: "Producto 2",
		description: "Descripción del producto 2",
		price: 20.99,
		stock: 50,
		image_url: "https://example.com/product2.jpg",
	},
];
const mockDb = {
	all: (query, params, callback) => {
		return callback(null, listsProducts);
	},
};

const db = path.resolve(__dirname, "../../database.js");
require.cache[db] = {
	exports: mockDb,
};

const app = require("../../server.js");
const request = require("supertest");
const chai = require("chai");

describe("GET /api/products", () => {
	it("debería listar todos los productos", async () => {
		const response = await request(app).get("/api/products");
		console.log(response.body);

		chai.expect(response.status).to.equal(200);
		chai.expect(response.body).to.be.an("array");
	});
});
