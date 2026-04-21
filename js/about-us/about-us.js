/**
 * Main initialization function for the About Us page.
 * Triggered only after all HTMX partials are loaded.
 */
async function init() {
  // Import burger menu logic (self-executing script)
  await import("../global.header-burger.js");

  // Import carousel module and call its initialization function
  const carouselModule = await import("./about-us-activity-carousel.js");
  carouselModule.initActivityCarousel();
  const heroParallax = await import("./about-us-hero-parallax.js");
heroParallax.initAboutUsHeroParallax();
}

// Calculate the total number of partials to be loaded via HTMX
const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;

let loadedPartialsCount = 0;

/**
 * Event listener that tracks HTMX loading progress.
 */
document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;

  // Once all partials are in the DOM, initialize page scripts
  if (loadedPartialsCount === totalPartials) {
    init();
  }
});
