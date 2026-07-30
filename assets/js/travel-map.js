(function () {
  "use strict";

  var mapElement = document.getElementById("travel-map");
  var dataElement = document.getElementById("travel-data");
  var statusElement = document.querySelector("[data-travel-status]");

  if (!mapElement || !dataElement || !window.L || !window.topojson) {
    if (statusElement) {
      statusElement.textContent = "The interactive map could not be loaded.";
    }
    return;
  }

  var travelData;
  try {
    travelData = JSON.parse(dataElement.textContent);
  } catch (error) {
    travelData = { visited_countries: [], cities: [] };
  }

  var visitedCountries = new Set(
    (travelData.visited_countries || []).map(normalizeCountryName)
  );
  var cities = Array.isArray(travelData.cities) ? travelData.cities : [];
  var map = L.map(mapElement, {
    center: [22, 8],
    zoom: 2,
    minZoom: 2,
    maxZoom: 12,
    maxBounds: [[-85, -190], [85, 190]],
    maxBoundsViscosity: 0.8,
    worldCopyJump: true
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
  }).addTo(map);

  var countryLayer;
  var markerBounds = [];

  function normalizeCountryName(value) {
    var normalized = String(value || "")
      .trim()
      .toLocaleLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ");

    var countryAliases = {
      "united states": "united states of america",
      "usa": "united states of america",
      "us": "united states of america"
    };

    return countryAliases[normalized] || normalized;
  }

  function cssColor(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function countryStyle(feature) {
    var isVisited = visitedCountries.has(normalizeCountryName(feature.properties.name));
    return {
      color: isVisited ? cssColor("--accent-strong", "#0c5b44") : cssColor("--line-strong", "#bccac3"),
      weight: isVisited ? 1.4 : 0.55,
      fillColor: isVisited ? cssColor("--accent", "#18745a") : cssColor("--surface", "#ffffff"),
      fillOpacity: isVisited ? 0.42 : 0.06
    };
  }

  function popupForCity(city) {
    var wrapper = document.createElement("div");
    var title = document.createElement("strong");
    var meta = document.createElement("span");

    title.textContent = city.name || "Mapped place";
    meta.textContent = city.type === "home"
      ? "Lived here"
      : (city.kind === "region" ? "Visited region" : "Visited");
    if (city.country) {
      title.textContent += ", " + city.country;
    }

    wrapper.className = "travel-popup";
    wrapper.appendChild(title);
    wrapper.appendChild(meta);

    if (city.note) {
      var note = document.createElement("p");
      note.textContent = city.note;
      wrapper.appendChild(note);
    }

    return wrapper;
  }

  function markerIcon(type) {
    var isHome = type === "home";
    return L.divIcon({
      className: "travel-marker " + (isHome ? "travel-marker--home" : "travel-marker--city"),
      html: isHome ? "<span aria-hidden=\"true\"><b>⌂</b></span>" : "<span aria-hidden=\"true\"></span>",
      iconSize: isHome ? [38, 42] : [20, 20],
      iconAnchor: isHome ? [19, 39] : [10, 10],
      popupAnchor: isHome ? [0, -36] : [0, -12]
    });
  }

  cities.forEach(function (city) {
    var latitude = Number(city.latitude);
    var longitude = Number(city.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }

    var label = (city.type === "home" ? "Lived in " : "Visited ") +
      (city.name || "mapped place") +
      (city.country ? ", " + city.country : "");

    L.marker([latitude, longitude], {
      icon: markerIcon(city.type),
      keyboard: true,
      title: label,
      alt: label,
      zIndexOffset: city.type === "home" ? 1000 : 0
    })
      .bindPopup(popupForCity(city))
      .addTo(map);

    markerBounds.push([latitude, longitude]);
  });

  if (markerBounds.length > 0) {
    map.fitBounds(markerBounds, {
      padding: [42, 42],
      maxZoom: 5
    });
  }

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Country boundaries could not be downloaded.");
      }
      return response.json();
    })
    .then(function (world) {
      var countries = topojson.feature(world, world.objects.countries);
      countryLayer = L.geoJSON(countries, {
        interactive: false,
        style: countryStyle
      }).addTo(map);
      countryLayer.bringToBack();
      statusElement.textContent = "Map ready. Use the arrow keys to pan and the plus or minus controls to zoom.";
    })
    .catch(function () {
      statusElement.textContent = "Place markers are available, but country highlighting could not be loaded.";
    });

  new MutationObserver(function (mutations) {
    var colorsChanged = mutations.some(function (mutation) {
      return mutation.attributeName === "data-theme" || mutation.attributeName === "data-palette";
    });
    if (colorsChanged && countryLayer) {
      countryLayer.setStyle(countryStyle);
    }
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-palette"]
  });

  window.addEventListener("resize", function () {
    map.invalidateSize();
  });
}());
