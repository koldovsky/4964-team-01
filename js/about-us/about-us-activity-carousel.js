/**
 * Ініціалізація Swiper.
 * Moved to a separate function to be called again after HTMX loading.
 */
function initActivityCarousel() {
  const swiperElement = document.querySelector('.mySwiper');
  
  if (swiperElement) {
    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true, 
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', initActivityCarousel);

document.body.addEventListener('htmx:afterOnLoad', function(evt) {
    if (evt.detail.pathInfo.requestPath.includes('about-us-activity-carousel.html')) {
        initActivityCarousel();
    }
});