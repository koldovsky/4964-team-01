document.body.addEventListener("htmx:afterSwap", () => {
  const carousel = document.querySelector(".habitations-carousel");

  if (!carousel || carousel.dataset.initialized === "true") {
    return;
  }

  carousel.dataset.initialized = "true";

  const track = carousel.querySelector(".habitations-carousel__track");
  const prevBtn = carousel.querySelector(".habitations-carousel__button--prev");
  const nextBtn = carousel.querySelector(".habitations-carousel__button--next");

  if (!track || !prevBtn || !nextBtn) {
    return;
  }

  let slides = Array.from(carousel.querySelectorAll(".habitations-carousel__slide"));
  let index = 0;
  let isTransitioning = false;
  let resizeTimer = null;

  function getVisibleSlides() {
    if (window.innerWidth >= 1024) {
      return 3;
    }

    if (window.innerWidth >= 768) {
      return 2;
    }

    return 1;
  }

  function getSlideMetrics() {
    const slide = track.querySelector(".habitations-carousel__slide");
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    return {
      width: slide ? slide.getBoundingClientRect().width : 0,
      gap,
    };
  }

  function update() {
    const { width, gap } = getSlideMetrics();
    const offset = index * (width + gap);

    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function jumpWithoutAnimation() {
    const { width, gap } = getSlideMetrics();
    const offset = index * (width + gap);

    track.style.transition = "none";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function cloneSlides() {
    const visible = getVisibleSlides();
    const clones = track.querySelectorAll("[data-clone]");
    clones.forEach((el) => el.remove());

    slides = Array.from(carousel.querySelectorAll(".habitations-carousel__slide:not([data-clone])"));

    if (slides.length <= visible) {
      index = 0;
      jumpWithoutAnimation();
      return;
    }

    const firstClones = slides.slice(0, visible);
    const lastClones = slides.slice(-visible);

    firstClones.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = "true";
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    lastClones
      .slice()
      .reverse()
      .forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.dataset.clone = "true";
        clone.setAttribute("aria-hidden", "true");
        track.prepend(clone);
      });

    slides = Array.from(track.children);
    index = visible;
    jumpWithoutAnimation();
  }

  function next() {
    if (isTransitioning) {
      return;
    }

    isTransitioning = true;
    index += 1;
    update();
  }

  function prev() {
    if (isTransitioning) {
      return;
    }

    isTransitioning = true;
    index -= 1;
    update();
  }

  track.addEventListener("transitionend", () => {
    const visible = getVisibleSlides();

    if (index >= slides.length - visible) {
      index = visible;
      jumpWithoutAnimation();
    }

    if (index < visible) {
      index += slides.length - visible * 2;
      jumpWithoutAnimation();
    }

    isTransitioning = false;
  });

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cloneSlides();
    }, 150);
  });

  cloneSlides();
});
