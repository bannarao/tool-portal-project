// Light/dark theme toggle, shared by every page.
// The default is light. The visitor's choice is remembered in the browser.
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function readSaved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null; // storage can be blocked; fall back to the default
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {
      // ignore: the theme just won't be remembered
    }
  }

  // Runs immediately (this script is loaded in <head>) so the page
  // never flashes the wrong theme.
  root.setAttribute("data-theme", readSaved() === "dark" ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    function updateLabel() {
      var isDark = root.getAttribute("data-theme") === "dark";
      button.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
    }

    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      updateLabel();
    });

    updateLabel();
  });
})();
