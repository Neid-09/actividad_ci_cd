

const credenciales = {
	username: "admin",
	password: "admin123",
};

const credencialesInvalidas = {
	username: "",
	password: "",
};

describe("POST /api/login", () => {
	it("Debería iniciar sesión con credenciales válidas", async () => {
		const response = await request(app)
			.post("/api/auth/login")
			.send(credenciales);

		chai.expect(response.status).to.equal(200);
		chai.expect(response.body).to.have.property("token");
	});

	it("No debería iniciar sesión sin credenciales", async () => {
		const response = await request(app)
			.post("/api/auth/login")
			.send(credencialesInvalidas);

		chai.expect(response.status).to.equal(400);
		chai.expect(response.body.message).to.equal("Faltan credenciales");
	});

	it("No debería iniciar sesión con contraseña incorrecta", async () => {
		const response = await request(app)
			.post("/api/auth/login")
			.send({ username: "admin", password: "wrongpassword" });

		chai.expect(response.status).to.equal(400);
		chai.expect(response.body.message).to.equal("Contraseña incorrecta");
	});

	it("No debería iniciar sesión con usuario no existente", async () => {
		const response = await request(app)
			.post("/api/auth/login")
			.send({ username: "nonexistent", password: "somepassword" });

		chai.expect(response.status).to.equal(400);
		chai.expect(response.body.message).to.equal("Usuario no encontrado");
	});
});
