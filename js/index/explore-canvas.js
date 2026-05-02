const modal = document.querySelector(".explore-canvas-modal");
const modalOpenButtons = document.querySelectorAll(".explore-canvas__btn");

function openExploreCanvasModal() {
  if (!modal) return;
  modal.classList.add("explore-canvas-modal--open");
  modal.removeAttribute("aria-hidden");
  const firstInput = modal.querySelector("input");
  firstInput?.focus();
}

function closeExploreCanvasModal() {
  if (!modal) return;
  modal.classList.remove("explore-canvas-modal--open");
  modal.setAttribute("aria-hidden", "true");
}

document.body.addEventListener("click", (event) => {
  const target = event.target;

  if (target instanceof Element && target.closest(".explore-canvas__btn")) {
    event.preventDefault();
    openExploreCanvasModal();
    return;
  }

  if (target instanceof Element && target.closest("[data-explore-canvas-close]")) {
    closeExploreCanvasModal();
    return;
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("explore-canvas-modal--open")) {
    closeExploreCanvasModal();
  }
});