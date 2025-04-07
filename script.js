// Datos de tus diseños (ajusta precios, IDs y nombres)
const designs = [
    {
        id: 1,
        name: "Dachshund Pixel Art",
        price: 2499, // Precio en centavos (Stripe)
        image: "assets/designs/dachshund-pixel.jpg",
        description: "Diseño retro 8-bit de perro salchicha."
    },
    {
        id: 2,
        name: "Salchicha Astronauta",
        price: 2499,
        image: "assets/designs/astronaut-dog.jpg",
        description: "¡Explorando el espacio con estilo!"
    }
    // Añade más diseños aquí
];

// Cargar diseños en el DOM
function loadDesigns() {
    const container = document.getElementById('designs-container');
    designs.forEach(design => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${design.image}" alt="${design.name}">
                <h4>${design.name}</h4>
                <p>${design.description}</p>
                <span class="price">$${(design.price / 100).toFixed(2)}</span>
                <button onclick="addToCart(${design.id})">Añadir al carrito</button>
            </div>
        `;
    });
}

// Carrito de compras (simplificado)
let cart = [];
function addToCart(designId) {
    const design = designs.find(item => item.id === designId);
    cart.push(design);
    alert(`${design.name} añadido al carrito!`);
}

// Checkout con Stripe
async function checkout() {
    const stripe = Stripe('TU_CLAVE_PÚBLICA_STRIPE'); // Reemplaza con tu API key
    
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    
    if (result.error) {
        alert(result.error.message);
    }
}

// Inicializar
window.onload = loadDesigns;
