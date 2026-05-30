import { expect } from 'chai';

const BASE_URL = 'http://localhost:5000';

describe('GET /api/products', () => {

    it('debe retornar un array de productos', async () => {
        const response = await fetch(`${BASE_URL}/api/products`);
        const data = await response.json();
        expect(data).to.be.an('array');
    });

});