const data = [
    ["Football", "Ball", "RM89", "images/football.jpg"],
    ["Basketball", "Ball", "RM99", "images/basketball.jpg"],
    ["Running Shoes", "Footwear", "RM299", "images/running-shoes.jpg"],
    ["Football Boots", "Footwear", "RM359", "images/football-boots.jpg"],
    ["Training Gloves", "Accessories", "RM49", "images/training-gloves.jpg"],
    ["Gym Bag", "Gear", "RM129", "images/gym-bag.jpg"],
    ["Yoga Mat", "Fitness", "RM79", "images/yoga-mat.jpg"],
    ["Skipping Rope", "Fitness", "RM35", "images/skipping-rope.jpg"],
    ["Tennis Racket", "Tennis", "RM459", "images/tennis-racket.jpg"],
    ["Volleyball", "Ball", "RM69", "images/volleyball.jpg"],
    ["Water Bottle", "Accessories", "RM39", "images/water-bottle.jpg"],
    ["Sports Cap", "Accessories", "RM45", "images/sports-cap.jpg"]
];

const wrap = document.getElementById("products");
const search = document.getElementById("search");
const filter = document.getElementById("filter");


function render(list) {

    wrap.innerHTML = "";

    list.forEach(product => {

        wrap.innerHTML += `
            <div class="card">

                <img src="${product[3]}" alt="${product[0]}">

                <div class="info">

                    <div class="category">
                        ${product[1]}
                    </div>

                    <h3>
                        ${product[0]}
                    </h3>

                    <div class="price">
                        ${product[2]}
                    </div>

                    <a class="btn" href="../review system/reviewsystem 1.html">
                        View
                    </a>

                </div>

            </div>
        `;

    });

}


function filterProducts() {

    const searchText = search.value.toLowerCase();

    const selectedCategory = filter.value;

    const filteredProducts = data.filter(product => {

        const matchesSearch =
            product[0].toLowerCase().includes(searchText) ||
            product[1].toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product[1] === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    render(filteredProducts);
}


search.addEventListener("input", filterProducts);

filter.addEventListener("change", filterProducts);


render(data);