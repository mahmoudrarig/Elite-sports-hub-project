function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function getSaved() {
    return JSON.parse(localStorage.getItem("savedItems")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveSaved(saved) {
    localStorage.setItem("savedItems", JSON.stringify(saved));
}


const cartItemsContainer = document.getElementById("cartItems");
const savedItemsContainer = document.getElementById("savedItems");

const cartItemCount = document.getElementById("cartItemCount");
const savedItemCount = document.getElementById("savedItemCount");

const cartCount = document.getElementById("cartCount");

const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");

const emptyCart = document.getElementById("emptyCart");
const emptySaved = document.getElementById("emptySaved");

const checkoutButton = document.getElementById("checkoutButton");


function getPriceNumber(price) {
    return Number(price.replace("RM", ""));
}


function updateCounts() {

    const cart = getCart();
    const saved = getSaved();

    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    cartCount.textContent = totalQuantity;

    cartItemCount.textContent =
        totalQuantity === 1
            ? "1 item"
            : `${totalQuantity} items`;

    savedItemCount.textContent =
        saved.length === 1
            ? "1 item"
            : `${saved.length} items`;
}


function updateTotal() {

    const cart = getCart();

    let subtotal = 0;

    cart.forEach(item => {

        const price = getPriceNumber(item.price);

        subtotal += price * item.quantity;

    });

    subtotalElement.textContent = `RM${subtotal}`;

    totalElement.textContent = `RM${subtotal}`;
}


function renderCart() {

    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";

    } else {

        emptyCart.style.display = "none";

        cart.forEach((item, index) => {

            cartItemsContainer.innerHTML += `
                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="cart-item-image"
                    >

                    <div class="cart-item-info">

                        <h3>${item.name}</h3>

                        <p class="cart-item-price">
                            ${item.price}
                        </p>

                        <p>
                            Quantity: ${item.quantity}
                        </p>

                        <div class="cart-item-actions">

                            <button
                                class="save-item-button"
                                onclick="moveToSaved(${index})"
                            >
                                Save for Later
                            </button>

                            <button
                                class="remove-item-button"
                                onclick="removeFromCart(${index})"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>
            `;

        });

    }

    updateCounts();
    updateTotal();
}


function renderSaved() {

    const saved = getSaved();

    savedItemsContainer.innerHTML = "";

    if (saved.length === 0) {

        emptySaved.style.display = "block";

    } else {

        emptySaved.style.display = "none";

        saved.forEach((item, index) => {

            savedItemsContainer.innerHTML += `
                <div class="saved-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="saved-item-image"
                    >

                    <div class="saved-item-info">

                        <h3>${item.name}</h3>

                        <p>
                            ${item.price}
                        </p>

                        <div class="saved-item-actions">

                            <button
                                onclick="moveSavedToCart(${index})"
                            >
                                Move to Cart
                            </button>

                            <button
                                onclick="removeSavedItem(${index})"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>
            `;

        });

    }

    updateCounts();
}


function removeFromCart(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    renderCart();
}


function moveToSaved(index) {

    const cart = getCart();
    const saved = getSaved();

    const item = cart[index];

    const alreadySaved = saved.some(
        savedItem => savedItem.name === item.name
    );

    if (!alreadySaved) {

        saved.push({
            name: item.name,
            price: item.price,
            image: item.image
        });

    }

    cart.splice(index, 1);

    saveCart(cart);
    saveSaved(saved);

    renderCart();
    renderSaved();
}


function moveSavedToCart(index) {

    const saved = getSaved();
    const cart = getCart();

    const item = saved[index];

    const existingItem = cart.find(
        cartItem => cartItem.name === item.name
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });

    }

    saved.splice(index, 1);

    saveCart(cart);
    saveSaved(saved);

    renderCart();
    renderSaved();
}


function removeSavedItem(index) {

    const saved = getSaved();

    saved.splice(index, 1);

    saveSaved(saved);

    renderSaved();
}


checkoutButton.addEventListener("click", function () {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert("Checkout simulation complete.");

});


renderCart();
renderSaved();