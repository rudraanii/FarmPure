const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" />
            <h4>${item.name}</h4>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice;

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Function to remove an item from the cart
function removeFromCart(event) {
    const index = event.target.getAttribute('data-index');
    cart.splice(index, 1); // Remove item from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render cart
}

// Render the cart on page load
renderCart();
