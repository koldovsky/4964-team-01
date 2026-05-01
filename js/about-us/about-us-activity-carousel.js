export function initActivityCarousel() {
  const root = document.querySelector(".activity-carousel");
  if (!root) return;

  const track = root.querySelector(".activity-carousel__track");
  const prevBtn = root.querySelector(".activity-carousel__btn--prev");
  const nextBtn = root.querySelector(".activity-carousel__btn--next");

  let slides = Array.from(root.querySelectorAll(".activity-carousel__slide"));

  let index = 0;
  let isTransitioning = false;

  function getVisibleSlides() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue("--carousel-visible-slides"));
  }

  function cloneSlides() {
    const visible = getVisibleSlides();

    // очищаємо старі клони (важливо при resize / HTMX)
    track.querySelectorAll("[data-clone]").forEach((el) => el.remove());

    slides = Array.from(root.querySelectorAll(".activity-carousel__slide:not([data-clone])"));

    const firstClones = slides.slice(0, visible);
    const lastClones = slides.slice(-visible);

    // додаємо клон в кінець
    firstClones.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = "true";
      track.appendChild(clone);
    });

    // додаємо клон на початок
    lastClones.reverse().forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = "true";
      track.prepend(clone);
    });

    slides = Array.from(track.children);

    index = visible;
    jumpWithoutAnimation();
  }

  function getSlideMetrics() {
    const slide = track.querySelector(".activity-carousel__slide");
    const gap = parseInt(getComputedStyle(track).gap) || 0;

    return {
      width: slide.offsetWidth,
      gap,
    };
  }

  function update() {
    const { width, gap } = getSlideMetrics();

    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${index * (width + gap)}px)`;
  }

  function jumpWithoutAnimation() {
    const { width, gap } = getSlideMetrics();

    track.style.transition = "none";
    track.style.transform = `translateX(-${index * (width + gap)}px)`;
  }

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

  track.addEventListener("transitionend", () => {
    const visible = getVisibleSlides();

    // якщо дійшли до кінцевих клонів → телепорт без анімації
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
    cloneSlides();
  });

  // init
  cloneSlides();
}
