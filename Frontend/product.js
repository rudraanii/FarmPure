// Get all 'Add to cart' buttons
const addToCartButtons = document.querySelectorAll('.add-btn');

// Function to add an item to the cart
function addToCart(event) {
    const productCard = event.target.parentElement;
    const productName = productCard.querySelector('h4').innerText;
    const productPrice = productCard.querySelector('.price').innerText.split(" ")[0];
    const productImgSrc = productCard.querySelector('img').src;
    const productQuantity = productCard.querySelector('select').value;

    // Create product object
    const product = {
        name: productName,
        price: productPrice,
        img: productImgSrc,
        quantity: productQuantity,
    };

    // Get existing cart data
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + parseInt(product.quantity);
    } else {
        cart.push(product);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
}

// Attach click event listeners to buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
