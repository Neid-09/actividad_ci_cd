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