// Universal Carousel (infinite loop with clones)

export function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((root) => {
    initCarousel(root);
  });
}

function initCarousel(root) {
  // === DOM ===
  const track = root.querySelector(".carousel__track");
  const prevBtn = root.querySelector(".carousel__btn--prev");
  const nextBtn = root.querySelector(".carousel__btn--next");

  // Якщо чогось немає — не ініціалізуємо
  if (!track || !prevBtn || !nextBtn) return;

  // === STATE ===
  let slides = Array.from(root.querySelectorAll(".carousel__slide"));
  let index = 0;
  let isTransitioning = false;

  // === HELPERS ===

  function getVisibleSlides() {
    const value = getComputedStyle(root).getPropertyValue(
      "--carousel-visible-slides"
    );
    return parseInt(value) || 1;
  }

  function getSlideMetrics() {
    const slide = track.querySelector(".carousel__slide");
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    return {
      width: slide.getBoundingClientRect().width,
      gap: gap,
    };
  }

  function update() {
    const metrics = getSlideMetrics();
    const offset = index * (metrics.width + metrics.gap);

    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function jumpWithoutAnimation() {
    const metrics = getSlideMetrics();
    const offset = index * (metrics.width + metrics.gap);

    track.style.transition = "none";
    track.style.transform = `translateX(-${offset}px)`;
  }

  // === CLONING ===

  function cloneSlides() {
    const visible = getVisibleSlides();

    // Видаляємо старі клони
    const clones = track.querySelectorAll("[data-clone]");
    clones.forEach((el) => el.remove());

    // Беремо тільки реальні слайди
    slides = Array.from(
      root.querySelectorAll(".carousel__slide:not([data-clone])")
    );

    // Якщо слайдів мало — не робимо infinite
    if (slides.length <= visible) {
      index = 0;
      jumpWithoutAnimation();
      return;
    }

    const firstClones = slides.slice(0, visible);
    const lastClones = slides.slice(-visible);

    // Додаємо клони в кінець
    firstClones.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = "true";
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    // Додаємо клони на початок
    lastClones
      .slice()
      .reverse()
      .forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.dataset.clone = "true";
        clone.setAttribute("aria-hidden", "true");
        track.prepend(clone);
      });

    // Оновлюємо список
    slides = Array.from(track.children);

    // Ставимо на перший реальний слайд
    index = visible;
    jumpWithoutAnimation();
  }

  // === NAVIGATION ===

  function next() {
    if (isTransitioning) return;

    isTransitioning = true;
    index++;
    update();
  }

  function prev() {
    if (isTransitioning) return;

    isTransitioning = true;
    index--;
    update();
  }

  // === EVENTS ===

  track.addEventListener("transitionend", () => {
    const visible = getVisibleSlides();

    // Перехід через праві клони → назад на початок
    if (index >= slides.length - visible) {
      index = visible;
      jumpWithoutAnimation();
    }

    // Перехід через ліві клони → в кінець (з урахуванням позиції)
    if (index < visible) {
      index += slides.length - visible * 2;
      jumpWithoutAnimation();
    }

    isTransitioning = false;
  });

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Keyboard support
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  });

  // Resize (debounce)
  let resizeTimer = null;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      cloneSlides();
    }, 150);
  });

  // === INIT ===
  cloneSlides();
}