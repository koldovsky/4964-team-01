document.body.addEventListener("htmx:afterSwap", () => {
  const title = document.querySelector(
    ".welcome-about__title"
  );

  if (!title) return;

  if (title.dataset.animated) return;

  title.dataset.animated = "true";

  const text = title.textContent;

  title.textContent = "";

  let index = 0;

  function typeText() {
    if (index < text.length) {
      title.textContent += text.charAt(index);

      index += 1;

      setTimeout(typeText, 100);
    }
  }

  typeText();
});