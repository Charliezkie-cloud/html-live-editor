import "./style.css";
import "./contents.js";
import Alpine from "alpinejs";
import { myEditor, defaultHtmlCode } from "./contents.js";

window.Alpine = Alpine;
Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
    const setToDark = () => {
        localStorage.setItem("isDark", true);
        document.documentElement.classList.replace("light", "dark");
        myEditor.setTheme("vs-dark");
        console.log("The theme has been set to dark.");
    }
    const setToLight = () => {
        localStorage.setItem("isDark", false);
            document.documentElement.classList.replace("dark", "light");
            myEditor.setTheme("vs");
            console.log("The theme has been set to light.");
    }

    if (localStorage.getItem("isDark") == "true") {
        setToDark();
    }

    window.toggleTheme = () => {
        if (document.documentElement.classList.contains("light")) {
            setToDark();
        } else {
            setToLight();
        }
    }

    window.resetSave = () => {
        localStorage.removeItem("lastSave");
        myEditor.setValue(defaultHtmlCode);
        console.log("Your current progress has been cleared.");
    }
});