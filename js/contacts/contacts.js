/**
 * Main initialization function for the Contacts page.
 * Runs after all HTMX partials are loaded.
 */
async function init() {
  // Import burger menu logic (self-executing module)
  await import("../global.header-burger.js");

  // Initialize Leaflet map style
  const mapStyle = await import("./map-style.js");
  mapStyle.initMap();
}

// === HTMX loading tracking ===

// Count how many partials should be loaded
const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;

let loadedPartialsCount = 0;

/**
 * Track HTMX partial loading progress.
 * When all partials are loaded — run init().
 */
document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;

  if (loadedPartialsCount === totalPartials) {
    init();
  }
});
