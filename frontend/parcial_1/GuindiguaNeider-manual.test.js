const BASE_URL = 'http://localhost:5000';

async function testDebeRetornarTodosLosProductos() {
    console.log('Prueba 1: debe retornar todos los productos');

    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();

    console.log(data);
    
    console.log('  ✓ PASÓ\n');
}

await testDebeRetornarTodosLosProductos();

