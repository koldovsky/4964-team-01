function init() {
  import("../global.header-burger.js");
  import("./explore-canvas.js");
  import("../habitations/carousel.partial.js");
  import("../components/carousel.js").then(({ initCarousels }) => {
    initCarousels();
  });
}

document.addEventListener("htmx:afterSwap", function (event) {
  if (window.location.hash === "#testimonials") {
    const el = document.querySelector("#testimonials");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
});

const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;

let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;

  if (loadedPartialsCount === totalPartials) {
    init();
  }
});
