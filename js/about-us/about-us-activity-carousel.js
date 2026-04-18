/**
 * Swiper initialization function.
 * Exported to be called by the main page controller.
 */
export function initActivityCarousel() {
  const swiperElement = document.querySelector(".mySwiper");

  if (swiperElement) {
    // If a Swiper instance already exists, destroy it before re-initializing (useful for HTMX)
    if (swiperElement.swiper) {
      swiperElement.swiper.destroy(true, true);
    }

    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // When window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        // When window width is >= 1024px
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}
