let cart = [];
let totalPrice = 0;

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the current cart items display
    cartItemsContainer.innerHTML = '';

    // Update cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to add items to the cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    totalPrice += product.price;
    updateCart();
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        addToCart({ id: productId, name: productName, price: productPrice });
    });
});

// Event listener for the Checkout button
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
        // Reset cart after checkout
        cart = [];
        totalPrice = 0;
        updateCart();
    }
});