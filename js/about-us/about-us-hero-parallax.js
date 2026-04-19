let raf;

export function initAboutUsHeroParallax() {
  const hero = document.querySelector('.about-us-hero');
  if (!hero) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function onMove(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    const moveX = currentX * 20;
    const moveY = currentY * 20;

    hero.style.setProperty('--hero-parallax-x', `${moveX}px`);
    hero.style.setProperty('--hero-parallax-y', `${moveY}px`);

    raf = requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', onMove);
  animate();
}