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
    rx += (mx - rx) * 0.22;
    ry += (my - ry) * 0.22;
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
      title: 'Precision<br><em>Engineered</em><br>Beauty.',
      sub:   'Automation that looks as good as it works.<br>Cutting corners was never the point.'
    },
    {
      title: '<em>Ethical</em><br>Tech.<br>Exquisite Form.',
      sub:   'We know where every part comes from.<br>That matters to us, and it shows in the work.'
    },
    {
      title: 'The Future<br>Is <em>Now.</em><br>By Design.',
      sub:   'High-end robotics built without exploiting anyone<br>to get there. That\'s the whole idea.'
    }
  ];

  const titleEl = document.getElementById('heroTitle');
  const subEl   = document.getElementById('heroSub');
  const dots    = document.querySelectorAll('.slide-dot');
  if (!titleEl || !subEl || !dots.length) return;

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

    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  // Dot click handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(+dot.dataset.slide));
  });

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
