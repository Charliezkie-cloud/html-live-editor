import Navbar from "./components/navbar";
import HtmlEditor from "./components/html-editor";

const App = document.querySelector("#app");

new Navbar([
    {
        title: "HTML Cheat Sheet",
        href: "https://charliezkie-cloud.github.io/html-cheat-sheet/"
    }
], App.querySelector(".navContainer")).create();

const isDark = localStorage.getItem("isDark");
new HtmlEditor(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML Live Editor by Charles Henry M. Tinoy Jr.</title>
    <style>
        html, body {
            background-color: ${isDark != "true" ? "white" : "oklch(26.8% 0.007 34.298)"};
            color: ${isDark != "true" ? "oklch(26.8% 0.007 34.298)" : "white"};
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    </style>
</head>
<body>
    <h1>Hello world ;D</h1>
    <h3 id="red">Change me to RED</h3>

    <script>
        document.querySelector("#red").style.color = "red";
    </script>
</body>
</html>`, App.querySelector("#editorContainer")).create();