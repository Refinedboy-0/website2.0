/**
 * premium.js — REFINEDBOY VISUAL ENHANCEMENTS
 * ─────────────────────────────────────────────────────────────────
 * Archivo 100% aditivo. No modifica ninguna función de main.js.
 * Se carga DESPUÉS de main.js para que todo el DOM esté listo.
 * ─────────────────────────────────────────────────────────────────
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile       = window.matchMedia('(max-width: 768px)').matches;

  /* ── 1. HERO ENTRANCE SEQUENCE ───────────────────────────────────
     Añade body.hero-loaded tras dos rAF para que el navegador
     pinte el estado inicial (opacity:0) antes de animar.         */
  function initHeroEntrance() {
    if (prefersReduced || isMobile) {
      document.body.classList.add('hero-loaded');
      return;
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('hero-loaded');
      });
    });
  }

  /* ── 2. CONTADOR ANIMADO PARA ESTADÍSTICAS DEL HERO ─────────────
     Anima los números (30 productos, 9 categorías) cuando
     el hero entra en viewport.                                    */
  function animateCount(el, target, duration) {
    if (prefersReduced) { el.textContent = target; return; }
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var countEl  = document.getElementById('hero-count');
    var catEl    = document.getElementById('hero-cat-count');
    if (!countEl || !catEl) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var n = parseInt(entry.target.textContent, 10);
        if (!isNaN(n) && n > 0) animateCount(entry.target, n, 1400);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.8 });

    // Delay para que hero-loaded ya haya corrido y los valores estén seteados
    setTimeout(function () {
      io.observe(countEl);
      io.observe(catEl);
    }, 700);
  }

  /* ── 3. PARALLAX MUY SUTIL EN HERO SHOWCASE ─────────────────────
     Desplaza el carousel del hero unos píxeles al hacer scroll
     para dar sensación de profundidad.                            */
  function initParallax() {
    if (prefersReduced || isMobile) return;
    var showcase = document.getElementById('hero-showcase');
    if (!showcase) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var rect = showcase.getBoundingClientRect();
        var viewH = window.innerHeight;
        if (rect.bottom < 0 || rect.top > viewH) { ticking = false; return; }
        // progress: 0 cuando hero está centrado, negativo cuando sube
        var progress = -rect.top / (rect.height + viewH);
        var offset   = progress * 28; // max ~28px de desplazamiento
        showcase.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── 4. SCROLL PROGRESS BAR ──────────────────────────────────────
     Línea de 2px en la parte superior que indica el progreso
     de scroll en la página.                                       */
  function initScrollProgress() {
    if (prefersReduced) return;
    var bar = document.createElement('div');
    bar.className = 'rb-scroll-bar';
    document.body.appendChild(bar);

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docH      = document.documentElement.scrollHeight - window.innerHeight;
        var pct       = docH > 0 ? (scrollTop / docH) * 100 : 0;
        bar.style.width = pct.toFixed(2) + '%';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── 5. RIPPLE EN BOTONES PRIMARIOS Y AMAZON ─────────────────────
     Efecto de onda que parte del punto de click.                  */
  function initRipples() {
    if (prefersReduced) return;

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-primary, .btn-amazon');
      if (!btn) return;

      // Eliminar ripple previo si existe
      var old = btn.querySelector('.rb-ripple');
      if (old) old.remove();

      var d    = Math.max(btn.clientWidth, btn.clientHeight);
      var rect = btn.getBoundingClientRect();
      var rip  = document.createElement('span');
      rip.className = 'rb-ripple';
      Object.assign(rip.style, {
        width:  d + 'px',
        height: d + 'px',
        left:   (e.clientX - rect.left  - d / 2) + 'px',
        top:    (e.clientY - rect.top   - d / 2) + 'px',
        background: btn.classList.contains('btn-primary')
          ? 'rgba(255,255,255,0.16)'
          : 'rgba(255,255,255,0.12)',
      });
      btn.appendChild(rip);
      setTimeout(function () { if (rip.parentNode) rip.remove(); }, 600);
    });
  }

  /* ── 6. STAGGER EXTENDIDO PARA GRIDS GRANDES ─────────────────────
     styles.css define stagger solo para los primeros 6 cards.
     Aquí extendemos para todos los demás (producto 7, 8, 9...).  */
  function applyExtendedStagger(root) {
    var cards = root.querySelectorAll('.product-card.reveal');
    cards.forEach(function (card, i) {
      if (i < 6) return; // CSS ya los maneja
      if (!card.dataset.staggerSet) {
        card.style.transitionDelay = (i * 48 + 'ms');
        card.dataset.staggerSet = '1';
      }
    });
  }

  function initStagger() {
    // Cards iniciales
    var grids = document.querySelectorAll('.product-grid, .featured-grid');
    grids.forEach(applyExtendedStagger);

    // MutationObserver para cards que aparecen dinámicamente (filtros, búsqueda)
    var shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
      new MutationObserver(function () {
        applyExtendedStagger(shopGrid);
      }).observe(shopGrid, { childList: true });
    }
  }

  /* ── 7. CARD TILT 3D (solo desktop) ─────────────────────────────
     Inclinación sutil basada en posición del ratón dentro de la
     card. Sensación premium de profundidad física.               */
  function initCardTilt() {
    if (prefersReduced || isMobile) return;

    function onMove(e) {
      var card = e.currentTarget;
      var rect = card.getBoundingClientRect();
      var x    = (e.clientX - rect.left)  / rect.width  - 0.5; // -0.5 a 0.5
      var y    = (e.clientY - rect.top)   / rect.height - 0.5;
      var rX   = (-y * 5).toFixed(2);
      var rY   = ( x * 8).toFixed(2);
      card.style.transition = 'transform 80ms linear, box-shadow 360ms var(--ease-out-quart), border-color 180ms var(--ease)';
      card.style.transform  = 'translateY(-7px) perspective(900px) rotateX(' + rX + 'deg) rotateY(' + rY + 'deg)';
    }

    function onLeave(e) {
      var card = e.currentTarget;
      card.style.transition = 'transform 500ms var(--ease-out-quart), box-shadow 360ms var(--ease-out-quart), border-color 180ms var(--ease)';
      card.style.transform  = '';
    }

    function attachTilt(card) {
      if (card.dataset.tilt) return;
      card.dataset.tilt = '1';
      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseleave', onLeave);
    }

    // Cards iniciales
    document.querySelectorAll('.product-card').forEach(attachTilt);

    // Cards dinámicas (shop grid se re-renderiza al filtrar)
    var grids = ['shop-grid', 'featured-grid'];
    grids.forEach(function (id) {
      var grid = document.getElementById(id);
      if (!grid) return;
      new MutationObserver(function () {
        grid.querySelectorAll('.product-card').forEach(attachTilt);
      }).observe(grid, { childList: true, subtree: true });
    });
  }

  /* ── 8. SECCIÓN COUNTER — EYEBROW REVEAL ─────────────────────────
     Pequeño efecto de "typing" en los eyebrows de sección cuando
     entran en viewport. Sutil y elegante.                        */
  function initSectionReveal() {
    if (prefersReduced) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('rb-revealed');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-head h2').forEach(function (h2) {
      io.observe(h2);
    });
  }

  /* ── INIT ────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroEntrance();
    initCounters();
    initParallax();
    initScrollProgress();
    initRipples();
    initStagger();
    initCardTilt();
    initSectionReveal();
  });

})();
