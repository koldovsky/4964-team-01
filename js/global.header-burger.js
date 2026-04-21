
// Функция переключения меню
function toggleMenu() {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  // Проверяем, что оба элемента существуют на странице в момент клика
  if (burger && nav) {
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll");
  }
}

// Функция закрытия меню (для ссылок)
function closeMenu() {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  if (burger && nav) {
    burger.classList.remove("is-active");
    nav.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }
}

// 1. Вешаем клик на бургер (он обычно есть в HTML сразу)
const burgerBtn = document.querySelector(".header__burger");
if (burgerBtn) {
  burgerBtn.addEventListener("click", toggleMenu);
}

// 2. Делегирование событий для ссылок (Самый надежный метод для HTMX)
// Мы вешаем событие на весь документ, но срабатывает оно только при клике на .header__link
document.addEventListener("click", (event) => {
  if (event.target.closest(".header__link")) {
    closeMenu();
  }
});