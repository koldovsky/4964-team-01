export function initAboutUsGallery() {
  const gallery = document.querySelector(".gallery");
  const modal = document.querySelector(".gallery-modal");
  if (!gallery || !modal) return;

  const items = Array.from(gallery.querySelectorAll(".gallery__item"));
  const slides = Array.from(modal.querySelectorAll(".gallery-modal__slide"));
  const prevBtn = modal.querySelector(".gallery-modal__btn--prev");
  const nextBtn = modal.querySelector(".gallery-modal__btn--next");
  const closeBtn = modal.querySelector(".gallery-modal__close");
  const backdrop = modal.querySelector(".gallery-modal__overlay");

  let activeIndex = 0;

  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("gallery-modal__slide--active", slideIndex === index);
    });

    activeIndex = index;
  }

  function openModal(index) {
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showSlide(index);
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      openModal(index);
    });
  });

  prevBtn.addEventListener("click", () => {
    showSlide(activeIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    showSlide(activeIndex + 1);
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "ArrowLeft") {
      showSlide(activeIndex - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      showSlide(activeIndex + 1);
    }
  });
}
