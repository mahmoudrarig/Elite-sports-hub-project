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