(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var colorMeta = document.querySelector('meta[name="theme-color"]');
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  if (!toggle) {
    return;
  }

  function readSavedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      // The selected theme still applies for this page view.
    }
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    if (colorMeta) {
      colorMeta.setAttribute("content", isDark ? "#171a18" : "#f4f0e7");
    }
  }

  toggle.addEventListener("click", function () {
    var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  media.addEventListener("change", function (event) {
    if (readSavedTheme() !== "light" && readSavedTheme() !== "dark") {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  applyTheme(root.dataset.theme);
}());
