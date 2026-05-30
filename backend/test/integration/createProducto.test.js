const app = require("../../server.js");
const request = require("supertest");
const chai = require("chai");

const jwtService = require("jsonwebtoken");
const SECRET_KEY = "supersecretkey_for_simple_app";

// Generar token de administrador para pruebas
const adminToken = jwtService.sign(
	{ id: 1, username: "admin", role: "admin" },
	SECRET_KEY,
	{ expiresIn: "8h" },
);

const rolNoAdminToken = jwtService.sign(
	{ id: 2, username: "clientuser", role: "client" },
	SECRET_KEY,
	{ expiresIn: "8h" },
);

const newProduct = {
	name: "Producto de prueba",
	description: "Descripción del producto de prueba",
	price: 19.99,
	stock: 50,
	image_url: "http://example.com/product.jpg",
};

describe("POST /api/products", () => {
	it("debería crear un nuevo producto con datos válidos", async () => {
		const response = await request(app)
			.post("/api/products")
			.set("Authorization", `Bearer ${adminToken}`)
			.send(newProduct);

		chai.expect(response.status).to.equal(201);
		const { name, description, price, stock, image_url } = response.body;
		chai
			.expect({ name, description, price, stock, image_url })
			.to.deep.equal(newProduct);
	});

	it("no debería crear un producto sin token de autenticación", async () => {
		const response = await request(app).post("/api/products").send(newProduct);

		chai.expect(response.body.message).to.equal("Acceso denegado");
	});

	it("no debería crear un producto con token de usuario no admin", async () => {
		const response = await request(app)
			.post("/api/products")
			.set("Authorization", `Bearer ${rolNoAdminToken}`)
			.send(newProduct);
		chai
			.expect(response.body.message)
			.to.equal("Requiere permisos de administrador");
	});
});
