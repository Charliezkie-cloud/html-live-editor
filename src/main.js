import "./style.css";
import "./contents.js";
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isDark") == "true") {
        document.documentElement.classList.replace("light", "dark");
    } else {
        document.documentElement.classList.replace("dark", "light");
    }
});

window.toggleTheme = () => {
    if (localStorage.getItem("isDark") == "true") {
        localStorage.setItem("isDark", false);
        console.log("The theme has been set to light.");
    } else {
        console.log("The theme has been set to dark.");
        localStorage.setItem("isDark", true);
    }
    
    location.reload();
}

window.resetSave = () => {
    localStorage.removeItem("lastSave");
    location.reload();
}