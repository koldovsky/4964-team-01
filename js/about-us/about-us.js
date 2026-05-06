/**
 * Main initialization function for the About Us page.
 * Runs after all HTMX partials are loaded.
 */
async function init() {
  // Import burger menu logic (self-executing module)
  await import("../global.header-burger.js");

  // Initialize all carousels on the page (universal component)
  const carouselModule = await import("../components/carousel.js");
  carouselModule.initCarousels();

  // Initialize hero parallax effect
  const heroParallax = await import("./about-us-hero-parallax.js");
  heroParallax.initAboutUsHeroParallax();

  const galleryModule = await import("./about-us-gallery.js");
  galleryModule.initAboutUsGallery();
}

// === HTMX loading tracking ===

// Count how many partials should be loaded
const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;

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
