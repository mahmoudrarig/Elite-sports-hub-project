const products = [
    {
        name: "Football",
        category: "Ball",
        price: "RM89",
        image: "images/football.jpg",
        description: "A durable football suitable for training and recreational matches."
    },
    {
        name: "Basketball",
        category: "Ball",
        price: "RM99",
        image: "images/basketball.jpg",
        description: "A high-quality basketball designed for indoor and outdoor play."
    },
    {
        name: "Running Shoes",
        category: "Footwear",
        price: "RM299",
        image: "images/running-shoes.jpg",
        description: "Comfortable running shoes designed for everyday training."
    },
    {
        name: "Football Boots",
        category: "Footwear",
        price: "RM359",
        image: "images/football-boots.jpg",
        description: "Football boots designed to provide grip and control on the pitch."
    },
    {
        name: "Training Gloves",
        category: "Accessories",
        price: "RM49",
        image: "images/training-gloves.jpg",
        description: "Training gloves designed for comfort and improved grip."
    },
    {
        name: "Gym Bag",
        category: "Gear",
        price: "RM129",
        image: "images/gym-bag.jpg",
        description: "A spacious gym bag for carrying sports equipment and personal items."
    },
    {
        name: "Yoga Mat",
        category: "Fitness",
        price: "RM79",
        image: "images/yoga-mat.jpg",
        description: "A comfortable yoga mat suitable for stretching and fitness workouts."
    },
    {
        name: "Skipping Rope",
        category: "Fitness",
        price: "RM35",
        image: "images/skipping-rope.jpg",
        description: "A lightweight skipping rope for cardio and fitness training."
    },
    {
        name: "Tennis Racket",
        category: "Tennis",
        price: "RM459",
        image: "images/tennis-racket.jpg",
        description: "A tennis racket suitable for training and competitive play."
    },
    {
        name: "Volleyball",
        category: "Ball",
        price: "RM69",
        image: "images/volleyball.jpg",
        description: "A durable volleyball suitable for indoor and outdoor games."
    },
    {
        name: "Water Bottle",
        category: "Accessories",
        price: "RM39",
        image: "images/water-bottle.jpg",
        description: "A reusable sports water bottle for training and everyday use."
    },
    {
        name: "Sports Cap",
        category: "Accessories",
        price: "RM45",
        image: "images/sports-cap.jpg",
        description: "A lightweight sports cap designed for outdoor activities."
    }
];


/* Get selected product */

const parameters = new URLSearchParams(window.location.search);
const productName = parameters.get("name");

const product = products.find(item => item.name === productName);


/* Display selected product */

if (product) {
    const productImage = document.getElementById("productImage");

    productImage.src = product.image;
    productImage.alt = product.name;

    document.getElementById("productCategory").textContent = product.category;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productDescription").textContent = product.description;
}


/* Buttons and counters */

const addToCartButton = document.getElementById("addToCart");
const buyNowButton = document.getElementById("buyNow");
const saveLaterButton = document.getElementById("saveLater");

const cartCount = document.getElementById("cartCount");
const savedCount = document.getElementById("savedCount");

const quantity = document.getElementById("quantity");
const actionMessage = document.getElementById("actionMessage");


function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}


function getSaved() {
    return JSON.parse(localStorage.getItem("savedItems")) || [];
}


function updateCounts() {
    const cart = getCart();
    const saved = getSaved();

    let totalCartItems = 0;

    cart.forEach(item => {
        totalCartItems += item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = totalCartItems;
    }

    if (savedCount) {
        savedCount.textContent = saved.length;
    }
}


/* Add to cart */

if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
        if (!product) {
            return;
        }

        const cart = getCart();
        const amount = Number(quantity.value);

        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += amount;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: amount
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        actionMessage.textContent =
            `${amount} × ${product.name} added to cart`;

        updateCounts();
    });
}


/* Buy now */

if (buyNowButton) {
    buyNowButton.addEventListener("click", function () {
        if (!product) {
            return;
        }

        const cart = getCart();
        const amount = Number(quantity.value);

        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += amount;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: amount
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "cart.html";
    });
}


/* Save for later */

if (saveLaterButton) {
    saveLaterButton.addEventListener("click", function () {
        if (!product) {
            return;
        }

        const saved = getSaved();

        const alreadySaved = saved.some(
            item => item.name === product.name
        );

        if (!alreadySaved) {
            saved.push({
                name: product.name,
                price: product.price,
                image: product.image
            });

            localStorage.setItem(
                "savedItems",
                JSON.stringify(saved)
            );

            actionMessage.textContent =
                `${product.name} saved for later`;
        } else {
            actionMessage.textContent =
                `${product.name} is already saved`;
        }

        updateCounts();
    });
}


/* Review popup */

const reviewStorageKey = "eliteSportsReviews";

const openReviewModalButton =
    document.getElementById("openReviewModal");

const closeReviewModalButton =
    document.getElementById("closeReviewModal");

const reviewModal =
    document.getElementById("reviewModal");

const productReviewForm =
    document.getElementById("productReviewForm");

const popupRatingInputs =
    document.querySelectorAll('input[name="productRating"]');

const popupRatingMessage =
    document.getElementById("popupRatingMessage");

const reviewSuccessMessage =
    document.getElementById("reviewSuccessMessage");

const productReviewText =
    document.getElementById("productReviewText");


function getStoredReviews() {
    try {
        const reviews = JSON.parse(
            localStorage.getItem(reviewStorageKey)
        );

        return Array.isArray(reviews)
            ? reviews
            : [];
    } catch (error) {
        return [];
    }
}


function openReviewPopup() {
    if (!product) {
        return;
    }

    const reviewProductImage =
        document.getElementById("reviewProductImage");

    const reviewProductName =
        document.getElementById("reviewProductName");

    reviewProductImage.src = product.image;
    reviewProductImage.alt = product.name;

    reviewProductName.textContent = product.name;

    productReviewForm.reset();

    popupRatingMessage.textContent =
        "Select a star rating";

    reviewSuccessMessage.textContent = "";

    reviewModal.classList.add("open");
    document.body.classList.add("review-modal-open");

    closeReviewModalButton.focus();
}


function closeReviewPopup() {
    reviewModal.classList.remove("open");
    document.body.classList.remove("review-modal-open");

    openReviewModalButton.focus();
}


popupRatingInputs.forEach(input => {
    input.addEventListener("change", function () {
        popupRatingMessage.textContent =
            `${input.value} out of 5 stars selected`;

        reviewSuccessMessage.textContent = "";
    });
});


if (openReviewModalButton) {
    openReviewModalButton.addEventListener(
        "click",
        openReviewPopup
    );
}


if (closeReviewModalButton) {
    closeReviewModalButton.addEventListener(
        "click",
        closeReviewPopup
    );
}


if (reviewModal) {
    reviewModal.addEventListener("click", function (event) {
        if (event.target === reviewModal) {
            closeReviewPopup();
        }
    });
}


document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        reviewModal &&
        reviewModal.classList.contains("open")
    ) {
        closeReviewPopup();
    }
});


if (productReviewForm) {
    productReviewForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            if (!product) {
                return;
            }

            const selectedRating =
                document.querySelector(
                    'input[name="productRating"]:checked'
                );

            const reviewText =
                productReviewText.value.trim();

            if (!selectedRating || !reviewText) {
                return;
            }

            const reviews = getStoredReviews();

            reviews.unshift({
                id: Date.now(),
                product: product.name,
                image: `../catalogue/${product.image}`,
                rating: Number(selectedRating.value),
                text: reviewText,
                createdAt: new Date().toISOString()
            });

            localStorage.setItem(
                reviewStorageKey,
                JSON.stringify(reviews)
            );

            productReviewForm.reset();

            popupRatingMessage.textContent =
                "Select a star rating";

            reviewSuccessMessage.textContent =
                "Thank you! Your review has been saved.";
        }
    );
}


/* Load counts when page opens */

updateCounts();