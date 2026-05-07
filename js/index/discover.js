function initDiscoverCarousel() {
  const section = document.querySelector(".discover-partial__activities");

  if (!section) return; // якщо компоненти нема — не падає

  const list = section.querySelector(".discover-partial__activity-list");
  const items = section.querySelectorAll(".discover-partial__activity");
  const nextBtn = section.querySelector("button.slider-btn.next");
  const prevBtn = section.querySelector("button.slider-btn.prev");

  if (!list || !items.length || !nextBtn || !prevBtn) return;

  if (section.dataset.carouselInitialized) return;
  section.dataset.carouselInitialized = true;

  let index = 0;
  const totalItems = items.length;
  const step = 100 / totalItems;

  list.style.display = "flex";
  list.style.flexWrap = "nowrap";
  list.style.width = `${totalItems * 100}%`;
  list.style.margin = "0";
  list.style.padding = "0";
  list.style.listStyle = "none";

  items.forEach((item) => {
    item.style.flex = `0 0 ${step}%`;
    item.style.maxWidth = `${step}%`;
    item.style.boxSizing = "border-box";
  });

  function updateSlider() {
    list.style.transform = `translateX(-${index * step}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % totalItems;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalItems) % totalItems;
    updateSlider();
  });
}

// Ініціалізуємо карусель після будь-якого HTMX завантаження, якщо секція існує
document.body.addEventListener("htmx:afterOnLoad", () => {
  setTimeout(initDiscoverCarousel, 100);
});

// Спостерігаємо за додаванням секції
const observer = new MutationObserver(() => {
  initDiscoverCarousel();
});

observer.observe(document.body, { childList: true, subtree: true });

// Також ініціалізуємо на випадок, якщо вже завантажено
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initDiscoverCarousel, 1000);
});
