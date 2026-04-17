/* ============================================================
   YHALI ROBOTICS — main.js
   Modules:
     1. Cursor
     2. Hero Slideshow
     3. Scroll Reveal
   ============================================================ */


/* ── 1. CURSOR ────────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = `${mx - 4}px`;
    cursor.style.top  = `${my - 4}px`;
  });

  (function animateRing() {
    rx += (mx - rx) * 0.42;
    ry += (my - ry) * 0.42;
    ring.style.left = `${rx - 10}px`;
    ring.style.top  = `${ry - 10}px`;
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'a, button, .step, .role-item, .news-card, .slide-dot';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();


/* ── 2. HERO SLIDESHOW ────────────────────────────────────── */
(function initSlideshow() {
  const slides = [
    {
      title: 'Custom<br>Robotics<br><em>Systems</em>',
      sub:   'Automation built around your operation, not the other way around'
    },
    {
      title: 'Engineered<br>to<br><em>Last</em>',
      sub:   'Every system designed, tested, and supported in-house'
    },
    {
      title: 'Local<br>Team<br><em>Real Support</em>',
      sub:   'Based in Las Vegas. On-site when you need us'
    }
  ];

  const titleEl = document.getElementById('heroTitle');
  const subEl   = document.getElementById('heroSub');
  if (!titleEl || !subEl) return;

  let current = 0;

  function goToSlide(i) {
    current = i;
    titleEl.style.opacity = '0';
    subEl.style.opacity   = '0';

    setTimeout(() => {
      titleEl.innerHTML = slides[i].title;
      subEl.innerHTML   = slides[i].sub;
      titleEl.style.opacity = '1';
      subEl.style.opacity   = '1';
    }, 400);
  }

  // Auto-advance
  setInterval(() => goToSlide((current + 1) % slides.length), 5000);
})();


/* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
})();
