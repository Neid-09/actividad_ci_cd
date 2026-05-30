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
	run: (query, params, callback) => {
		const [name, description, price, stock, image_url] = params;

		const newProduct = {
			id: listsProducts.length + 1,
			name,
			description,
			price,
			stock,
			image_url,
		};

		listsProducts.push(newProduct);

		return callback(null, { lastID: listsProducts.length });
	},

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

const jwtService = require("jsonwebtoken");
jwtService.verify = () => ({ role: "admin" });

const newProduct = {
	name: "Producto de prueba aaaaaa",
	description: "Descripción del producto de prueba",
	price: 19.99,
	stock: 50,
	image_url: "http://example.com/product.jpg",
};

describe("POST /api/products", () => {
	it("debería crear un nuevo producto con datos válidos", async () => {
		const response = await request(app)
			.post("/api/products")
			.set("Authorization", `token_valido`)
			.send(newProduct);

		console.log(response.body);

		chai.expect(response.status).to.equal(201);
		const { name, description, price, stock, image_url } = response.body;
		chai
			.expect({ name, description, price, stock, image_url })
			.to.deep.equal(newProduct);
	});

	it("deberia listar todos los productos", async () => {
		const response = await request(app).get("/api/products");
		console.log(response.body);

		chai.expect(response.status).to.equal(200);
		chai.expect(response.body).to.be.an("array");
	});
});
