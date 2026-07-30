(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var toggleText = toggle ? toggle.querySelector(".theme-toggle__text") : null;
  var paletteSelect = document.querySelector("[data-palette-select]");
  var colorMeta = document.querySelector('meta[name="theme-color"]');
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var palettes = ["cobalt", "forest", "plum"];
  var themeColors = {
    cobalt: { light: "#f5f7fb", dark: "#111520" },
    forest: { light: "#f5f8f6", dark: "#101a16" },
    plum: { light: "#faf7fb", dark: "#1c131f" }
  };

  if (!toggle) {
    return;
  }

  function readSavedPreference(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // The selected theme still applies for this page view.
    }
  }

  function updateThemeColor() {
    var palette = palettes.indexOf(root.dataset.palette) !== -1 ? root.dataset.palette : "forest";
    var theme = root.dataset.theme === "dark" ? "dark" : "light";
    if (colorMeta) {
      colorMeta.setAttribute("content", themeColors[palette][theme]);
    }
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    if (toggleText) {
      toggleText.textContent = isDark ? "Light" : "Dark";
    }
    updateThemeColor();
  }

  function applyPalette(palette) {
    var selected = palettes.indexOf(palette) !== -1 ? palette : "forest";
    root.dataset.palette = selected;
    if (paletteSelect) {
      paletteSelect.value = selected;
    }
    updateThemeColor();
  }

  toggle.addEventListener("click", function () {
    var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    savePreference("theme", nextTheme);
  });

  if (paletteSelect) {
    paletteSelect.addEventListener("change", function () {
      applyPalette(paletteSelect.value);
      savePreference("palette", paletteSelect.value);
    });
  }

  media.addEventListener("change", function (event) {
    if (readSavedPreference("theme") !== "light" && readSavedPreference("theme") !== "dark") {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  applyPalette(root.dataset.palette);
  applyTheme(root.dataset.theme);
}());
