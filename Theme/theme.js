const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}


/* CREATE THEME BUTTON */

const themeButton = document.createElement("button");

themeButton.className = "theme-toggle-btn";


function updateThemeButton() {

    if (document.body.classList.contains("dark-theme")) {
        themeButton.textContent = "☀️ Light";
    } else {
        themeButton.textContent = "🌙 Dark";
    }

}


updateThemeButton();

document.body.appendChild(themeButton);


/* TOGGLE THEME */

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

    updateThemeButton();

});


/* SITE-WIDE CART AND SAVED LINKS */

(function addCommerceLinks() {

    const currentPath = window.location.pathname.toLowerCase();

    /* Keep the portfolio pages focused on the individual portfolios. */
    if (currentPath.includes("/portfolios/")) {
        return;
    }

    const themeScript = document.currentScript;

    if (!themeScript || !themeScript.src) {
        return;
    }

    const cartUrl = new URL("../catalogue/cart.html", themeScript.src);
    const savedUrl = new URL(cartUrl.href);
    savedUrl.hash = "savedItems";

    function getStoredItems(key) {

        try {
            const items = JSON.parse(localStorage.getItem(key));
            return Array.isArray(items) ? items : [];
        } catch (error) {
            return [];
        }

    }

    function getCartCount() {

        return getStoredItems("cart").reduce(function (total, item) {
            const quantity = Number(item.quantity);
            return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 1);
        }, 0);

    }

    function updateCommerceCounts() {

        const cartTotal = getCartCount();
        const savedTotal = getStoredItems("savedItems").length;

        document.querySelectorAll("[data-site-cart-count]").forEach(function (count) {
            count.textContent = cartTotal;
        });

        document.querySelectorAll("[data-site-saved-count]").forEach(function (count) {
            count.textContent = savedTotal;
        });

    }

    function createCommerceLink(type, href, label, icon) {

        const link = document.createElement("a");
        const count = document.createElement("span");

        link.className = "site-commerce-action site-commerce-" + type;
        link.href = href;
        link.setAttribute("aria-label", label);
        link.innerHTML = '<span class="site-commerce-icon" aria-hidden="true">' + icon + '</span>' +
            '<span class="site-commerce-label">' + label + '</span>';

        count.className = "site-commerce-count";
        count.setAttribute("data-site-" + type + "-count", "");
        count.textContent = "0";
        link.appendChild(count);

        return link;

    }

    /* Correct the existing product-page Saved link without changing its HTML. */
    document.querySelectorAll("a.saved-link").forEach(function (link) {
        link.href = savedUrl.href;
    });

    const hasCartLink = Boolean(document.querySelector("a.cart-link"));
    const hasSavedLink = Boolean(document.querySelector("a.saved-link"));

    if (!hasCartLink || !hasSavedLink) {

        const commerceActions = document.createElement("nav");

        commerceActions.className = "site-commerce-actions";
        commerceActions.setAttribute("aria-label", "Shopping shortcuts");

        if (!hasCartLink) {
            commerceActions.appendChild(
                createCommerceLink("cart", cartUrl.href, "Cart", "🛒")
            );
        }

        if (!hasSavedLink) {
            commerceActions.appendChild(
                createCommerceLink("saved", savedUrl.href, "Saved", "🔖")
            );
        }

        document.body.appendChild(commerceActions);

    }

    document.querySelectorAll("#cartCount").forEach(function (count) {
        count.setAttribute("data-site-cart-count", "");
    });

    document.querySelectorAll("#savedCount").forEach(function (count) {
        count.setAttribute("data-site-saved-count", "");
    });

    updateCommerceCounts();

    window.addEventListener("storage", updateCommerceCounts);

    document.addEventListener("click", function (event) {

        if (event.target.closest(
            "#addToCart, #saveLater, .save-item-button, .remove-item-button, .saved-item-actions button"
        )) {
            window.setTimeout(updateCommerceCounts, 0);
        }

    });

})();
