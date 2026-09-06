/**
 * main.js — RENDERING & INTERACTION
 * ------------------------------------------------------------
 * Nothing in this file should need editing to add products,
 * categories or copy — it only reads from config.js, categories.js
 * and products.js and renders the DOM.
 */

(function () {
  "use strict";

  const ICONS = {
    technology:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>',
    home:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/></svg>',
    fitness:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8v8M18 8v8"/><path d="M2 12h4M18 12h4"/><rect x="6" y="6" width="3" height="12" rx="1"/><rect x="15" y="6" width="3" height="12" rx="1"/></svg>',
    accessories:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4.2"/><path d="M12 12.2V21M9 17h6"/></svg>',
    office:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.2"/><path d="M8 20h8M12 16v4"/></svg>',
    travel:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l8-2 6.5-6.5a1.5 1.5 0 1 1 2 2L13 13l-2 8-2.5-5.5L3 13Z"/></svg>',
    beauty:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v4.2a3 3 0 0 1-.7 1.9L8 11.4A5 5 0 0 0 7 14.5V19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4.5a5 5 0 0 0-1-3.1l-1.3-2.3a3 3 0 0 1-.7-1.9V3"/></svg>',
    essentials: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 10h8M8 14h8"/></svg>',
    skincare: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v4.2a3 3 0 0 1-.7 1.9L8 11.4A5 5 0 0 0 7 14.5V19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4.5a5 5 0 0 0-1-3.1l-1.3-2.3a3 3 0 0 1-.7-1.9V3"/></svg>',
    cleansing: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v4.2a3 3 0 0 1-.7 1.9L8 11.4A5 5 0 0 0 7 14.5V19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4.5a5 5 0 0 0-1-3.1l-1.3-2.3a3 3 0 0 1-.7-1.9V3"/><path d="M18 6c1.2 1.5 1.8 2.5 1.8 3.2a1.8 1.8 0 1 1-3.6 0C16.2 8.5 16.8 7.5 18 6Z"/></svg>',
    moisturizing: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3.2 3.8 4.8 6.5 4.8 8.5a4.8 4.8 0 0 1-9.6 0C7.2 9.5 8.8 6.8 12 3Z"/><path d="M8 20h8"/></svg>',
    treatments: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="7"/></svg>',
    "sun-care": '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>',
    masks: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l-1 12a5 5 0 0 1-10 0L6 4Z"/><path d="M9 10h.01M15 10h.01M10 15c1.2.7 2.8.7 4 0"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 4 4-6.5 6.5a3.5 3.5 0 0 0 5 5L15 12l4 4 2-2-4-4 3-3-3-3-3 3-4-4L6 3Z"/></svg>',
    "body-care": '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v4l-2 3v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-9l-2-3V3"/><path d="M8 13h8"/></svg>',
    "hair-scalp": '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21c-1-5 .5-9 4-11.5C14.5 7 17 5.5 17 2c3 4.5 1.6 9.7-2 12.2-2.5 1.8-3 4.4-2 6.8"/><path d="M8 4c1.5 2.6 1.8 4.6.7 6.3"/></svg>',
    "beauty-essentials": '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 12 12M14 3l7 7M3 14l7 7"/><path d="m5 19 7-7 2 2-7 7H5v-2Z"/></svg>',
    star:
      '<svg viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L1.4 7.8l6-.8L10 1.5Z"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    menu:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    arrow:
      '<svg class="btn-arrow" viewBox="0 0 20 20" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12M11 5l5 5-5 5"/></svg>',
    filter:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4"><path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.4 2 4 4.5 4.3"/></svg>',
    pinterest:
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M10 17c1-3 1.6-6 1.6-8a2.4 2.4 0 1 1 4.7.7c-.3 1.7-1.4 3.5-3.3 3.5-.8 0-1.3-.4-1.5-.9"/></svg>',
  };

  const socialIconFor = (key) => (ICONS[key] ? ICONS[key] : ICONS.instagram);

  /* ------------------------------------------------------------------
     FIX: Image error fallback — si el archivo no existe en el servidor
     muestra el placeholder SVG en lugar de una imagen rota/gris.
     Accesible desde atributos onerror en el HTML generado.
     ------------------------------------------------------------------ */
  window.imgFallback = function (el, id) {
    var p = products.find(function (x) { return x.id === +id; });
    if (p) { el.onerror = null; el.src = placeholderImage(p); }
  };

  /* ------------------------------------------------------------------
     Placeholder product art
     ------------------------------------------------------------------ */
  function placeholderImage(product) {
    const cat = categories.find((c) => c.slug === product.category);
    const tint = cat ? cat.tint : "#EDEAE0";
    const glyphPath = extractPaths(cat ? ICONS[cat.icon] : ICONS.technology);
    const initials = product.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="${tint}"/>
        <circle cx="200" cy="168" r="86" fill="rgba(22,21,15,0.05)"/>
        <g transform="translate(160,128)" stroke="#16150F" stroke-opacity="0.55" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round">
          ${glyphPath}
        </g>
        <text x="200" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#16150F" fill-opacity="0.62">${initials}</text>
      </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function extractPaths(svgString) {
    if (!svgString) return "";
    const inner = svgString.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
    return `<g transform="scale(3.3)">${inner}</g>`;
  }

  /* HEADER + NAV */
  function renderHeader() {
    document.getElementById("brand-name").textContent = siteConfig.brandName;
    document.getElementById("brand-initial").textContent = siteConfig.brandInitial;
    const nav = document.getElementById("main-nav");
    const mobileNav = document.getElementById("mobile-nav");
    nav.querySelectorAll("a").forEach((a) => {
      const ma = a.cloneNode(true);
      ma.addEventListener("click", closeMobileNav);
      mobileNav.appendChild(ma);
    });
  }

  function closeMobileNav() {
    document.getElementById("mobile-nav").classList.remove("is-open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  }

  /* HERO */
  function renderHero() {
    document.getElementById("hero-eyebrow").textContent = siteConfig.hero.eyebrow;
    document.getElementById("hero-heading").textContent = siteConfig.hero.heading;
    document.getElementById("hero-sub").textContent = siteConfig.hero.subheading;
    const cta = document.getElementById("hero-cta");
    cta.href = siteConfig.hero.ctaHref;
    cta.querySelector("span").textContent = siteConfig.hero.ctaLabel;
    document.getElementById("hero-count").textContent = products.length;
    // FIX: mostrar solo categorías con productos, no el total de categorías definidas
    const activeCats = categories.filter(function (c) {
      return products.some(function (p) { return p.category === c.slug; });
    });
    document.getElementById("hero-cat-count").textContent = activeCats.length;
  }

  /* CATEGORIES */
  function renderCategories() {
    const wrap = document.getElementById("category-scroller");
    wrap.innerHTML = categories
      .map((cat) => {
        const count = products.filter((p) => p.category === cat.slug).length;
        return `
        <button class="category-card reveal" data-category="${cat.slug}">
          <span class="category-icon">${ICONS[cat.icon]}</span>
          <span class="category-name">${cat.name}</span>
          <span class="category-count">${count} picks</span>
        </button>`;
      })
      .join("");

    wrap.querySelectorAll(".category-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        state.searchTerm = "";
        document.getElementById("search-input").value = "";
        document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
        renderShop();
        syncFilterUI();
      });
    });
  }

  /* PRODUCT CARD */
  function productCard(product) {
    const hasProductImage = Boolean(product.image);
    const img = product.image || placeholderImage(product);
    const cat = categories.find((c) => c.slug === product.category);
    return `
      <article class="product-card reveal" data-id="${product.id}" tabindex="0">
        <div class="product-media">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <span class="curator-note">${product.curatorNote}</span>
          <img src="${img}" alt="${hasProductImage ? `${product.name} product image` : `Illustration for ${product.name}`}" width="400" height="400" loading="lazy" decoding="async" onerror="imgFallback(this,${product.id})">
        </div>
        <div class="product-body">
          <span class="product-category">${cat ? cat.name : ""}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-actions">
            <button class="btn-view" data-open="${product.id}">Details</button>
            ${isValidProductUrl(product.amazonUrl) ? `<a class="btn-amazon" href="${product.amazonUrl}" target="_blank" rel="noopener noreferrer sponsored" data-amazon="${product.id}">View on Amazon</a>` : ""}
          </div>
        </div>
      </article>`;
  }

  function wireProductCards(root) {
    root.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(Number(btn.dataset.open)));
    });
    root.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.target.closest("a,button")) openModal(Number(card.dataset.id));
      });
    });
    // Tocar/clicar la imagen del producto abre el modal, igual que "Details".
    root.querySelectorAll(".product-media").forEach((media) => {
      media.addEventListener("click", () => {
        const card = media.closest(".product-card");
        if (card) openModal(Number(card.dataset.id));
      });
    });
  }

  function isValidProductUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url) && !url.includes("AMAZON_AFFILIATE_LINK_HERE");
  }

  /* FEATURED */
  function renderFeatured() {
    const wrap = document.getElementById("featured-grid");
    const featured = products.filter((p) => p.featured).slice(0, 4);
    wrap.innerHTML = featured.map(productCard).join("");
    wireProductCards(wrap);
    observeReveal(wrap);
  }

  /* SHOP */
  const state = { category: "all", searchTerm: "", featuredOnly: false };

  function filteredProducts() {
    let list = products.slice();
    if (state.category !== "all") list = list.filter((p) => p.category === state.category);
    if (state.featuredOnly) list = list.filter((p) => p.featured);
    if (state.searchTerm.trim()) {
      const q = state.searchTerm.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function renderFilterPanel() {
    const list = document.getElementById("category-filter-list");
    const counts = categories.map((c) => ({
      ...c,
      count: products.filter((p) => p.category === c.slug).length,
    }));
    const allButton = `
      <button class="filter-option ${state.category === "all" ? "is-active" : ""}" data-category="all">
        <span>All products</span><span class="count">${products.length}</span>
      </button>`;
    const rest = counts
      .filter((c) => c.count > 0)
      .map(
        (c) => `
      <button class="filter-option ${state.category === c.slug ? "is-active" : ""}" data-category="${c.slug}">
        <span>${c.name}</span><span class="count">${c.count}</span>
      </button>`
      )
      .join("");
    list.innerHTML = allButton + rest;

    list.querySelectorAll("[data-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        renderShop();
        syncFilterUI();
      });
    });
  }

  function syncFilterUI() {
    document.querySelectorAll("#category-filter-list .filter-option").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.category === state.category);
    });
    document.querySelectorAll(".category-card").forEach((c) => {
      c.classList.toggle("is-active", c.dataset.category === state.category);
    });
  }

  function renderShop() {
    const grid = document.getElementById("shop-grid");
    const results = filteredProducts();
    document.getElementById("result-count").textContent =
      results.length === 1 ? "1 product" : `${results.length} products`;

    if (!results.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <h3>Nothing matches yet</h3>
          <p>Try a different search term or clear the category filter.</p>
        </div>`;
      return;
    }
    grid.innerHTML = results.map(productCard).join("");
    wireProductCards(grid);
    observeReveal(grid);
  }

  function wireShopControls() {
    document.getElementById("search-input").addEventListener("input", (e) => {
      state.searchTerm = e.target.value;
      renderShop();
    });
    const toggle = document.getElementById("featured-toggle");
    toggle.addEventListener("click", () => {
      state.featuredOnly = !state.featuredOnly;
      toggle.classList.toggle("is-on", state.featuredOnly);
      toggle.setAttribute("aria-checked", String(state.featuredOnly));
      renderShop();
    });

    const mobileToggle = document.getElementById("mobile-filter-toggle");
    const panel = document.getElementById("filter-panel");
    const backdrop = document.getElementById("filter-backdrop");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        panel.classList.add("is-open");
        backdrop.classList.add("is-open");
      });
      backdrop.addEventListener("click", () => {
        panel.classList.remove("is-open");
        backdrop.classList.remove("is-open");
      });
    }
  }

  /* ABOUT */
  function renderAbout() {
    document.getElementById("about-eyebrow").textContent = siteConfig.about.eyebrow;
    document.getElementById("about-heading").textContent = siteConfig.about.heading;
    document.getElementById("about-body").textContent = siteConfig.about.body;
    const list = document.getElementById("about-points");
    list.innerHTML = siteConfig.about.points
      .map(
        (pt, i) => `
      <div class="about-point reveal">
        <span class="about-point-label">${String(i + 1).padStart(2, "0")}</span>
        <div><h3>${pt.title}</h3><p>${pt.text}</p></div>
      </div>`
      )
      .join("");
    observeReveal(list);
  }

  /* FOOTER */
  function renderFooter() {
    document.getElementById("footer-brand-name").textContent = siteConfig.brandName;
    document.getElementById("footer-tagline").textContent = siteConfig.tagline;
    document.getElementById("disclosure-text").textContent = siteConfig.affiliateDisclosure;
    document.getElementById("footer-year").textContent = new Date().getFullYear();
    document.getElementById("footer-brand-name-bottom").textContent = siteConfig.brandName;
    // FIX: set footer brand mark dynamically from config
    var footerMark = document.getElementById("footer-brand-mark");
    if (footerMark) footerMark.textContent = siteConfig.brandInitial;

    const socialWrap = document.getElementById("footer-social");
    socialWrap.innerHTML = Object.entries(siteConfig.social)
      .map(
        ([key, url]) =>
          `<a class="icon-btn" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${key}">${socialIconFor(key)}</a>`
      )
      .join("");

    const colsWrap = document.getElementById("footer-cols");
    colsWrap.innerHTML = Object.entries(siteConfig.footerNav)
      .map(
        ([heading, links]) => `
      <div class="footer-col">
        <p class="footer-col-title">${heading}</p>
        ${links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}
      </div>`
      )
      .join("");
  }

  /* HERO SHOWCASE */
  const SHOWCASE_SIZE = 6;
  const SHOWCASE_MS   = 5000;
  const SHOWCASE_T    = 420;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let scItems = [], scIdx = 0, scTimer = null;

  function initShowcase() {
    const root = document.getElementById("hero-showcase");
    if (!root) return;
    scItems = products.slice().sort((a, b) => b.id - a.id).slice(0, SHOWCASE_SIZE);
    if (!scItems.length) return;
    root.innerHTML = `
      <div class="sc-slide" id="sc-slide"></div>
      <div class="sc-dots" id="sc-dots"></div>
      <button class="sc-nav sc-prev" id="sc-prev" aria-label="Previous">
        <svg viewBox="0 0 20 20" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 6 10l6 6"/></svg>
      </button>
      <button class="sc-nav sc-next" id="sc-next" aria-label="Next">
        <svg viewBox="0 0 20 20" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l6 6-6 6"/></svg>
      </button>`;
    root.setAttribute("tabindex","0");
    paintSlide(false);
    document.getElementById("sc-prev").addEventListener("click", e => { e.stopPropagation(); go(-1); restartTimer(); });
    document.getElementById("sc-next").addEventListener("click", e => { e.stopPropagation(); go(1);  restartTimer(); });
    root.addEventListener("click", e => { if (e.target.closest(".sc-nav,.sc-dots")) return; openModal(scItems[scIdx].id); });
    root.addEventListener("keydown", e => { if (e.key === "Enter") openModal(scItems[scIdx].id); });
    root.addEventListener("mouseenter", stopTimer);
    root.addEventListener("mouseleave", startTimer);
    let tx = 0;
    root.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); restartTimer(); }
    });
    startTimer();
  }

  function paintSlide(animate) {
    const slide = document.getElementById("sc-slide");
    if (!slide) return;
    const p = scItems[scIdx];
    const cat = categories.find(c => c.slug === p.category);
    const img = p.image || placeholderImage(p);
    const paint = () => {
      slide.innerHTML = `
        <span class="sc-tag">New arrival</span>
        <div class="sc-img"><img src="${img}" alt="${p.image ? `${p.name} product image` : `Illustration for ${p.name}`}" width="400" height="400" fetchpriority="high" decoding="async" onerror="imgFallback(this,${p.id})"></div>
        <div class="sc-info">
          <span class="sc-cat">${cat ? cat.name : ""}</span>
          <span class="sc-name">${p.name}</span>
          <p class="sc-desc">${p.description}</p>
        </div>`;
      requestAnimationFrame(() => slide.classList.add("is-active"));
    };
    if (animate && !prefersReduced) {
      slide.classList.remove("is-active");
      slide.classList.add("is-out");
      setTimeout(() => { slide.classList.remove("is-out"); paint(); }, SHOWCASE_T);
    } else { paint(); }
    paintDots();
  }

  function paintDots() {
    const dots = document.getElementById("sc-dots");
    if (!dots) return;
    dots.innerHTML = scItems.map((_, i) =>
      `<button class="sc-dot${i === scIdx ? " is-active" : ""}" data-i="${i}" aria-label="Slide ${i+1}"></button>`
    ).join("");
    dots.querySelectorAll("[data-i]").forEach(d => {
      d.addEventListener("click", e => { e.stopPropagation(); scIdx = +d.dataset.i; paintSlide(true); restartTimer(); });
    });
  }

  function go(dir) { scIdx = (scIdx + dir + scItems.length) % scItems.length; paintSlide(true); }
  function startTimer() { if (prefersReduced || scItems.length < 2) return; stopTimer(); scTimer = setInterval(() => go(1), SHOWCASE_MS); }
  function stopTimer() { clearInterval(scTimer); scTimer = null; }
  function restartTimer() { stopTimer(); startTimer(); }

  /* MODAL */
  function openModal(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const cat = categories.find((c) => c.slug === product.category);
    const overlay = document.getElementById("modal-overlay");

    document.getElementById("modal-image").src = product.image || placeholderImage(product);
    document.getElementById("modal-image").alt = product.image ? `${product.name} product image` : `Illustration for ${product.name}`;
    document.getElementById("modal-category").textContent = cat ? cat.name : "";
    document.getElementById("modal-name").textContent = product.name;
    document.getElementById("modal-desc").textContent = product.details;
    document.getElementById("modal-note").textContent = `"${product.curatorNote}"`;
    document.getElementById("modal-features").innerHTML = product.features
      .map((f) => `<li>${f}</li>`)
      .join("");
    const amazonBtn = document.getElementById("modal-amazon");
    amazonBtn.href = product.amazonUrl;
    amazonBtn.hidden = !isValidProductUrl(product.amazonUrl);

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    lastFocused = document.activeElement;
    document.getElementById("modal-close").focus();
  }

  let lastFocused = null;
  function closeModal() {
    document.getElementById("modal-overlay").classList.remove("is-open");
    document.getElementById("modal-overlay").setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  function wireModal() {
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* HEADER SCROLL + MOBILE NAV */
  function wireHeader() {
    const header = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    });

    const navToggle = document.getElementById("nav-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    navToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      navToggle.innerHTML = isOpen ? ICONS.close : ICONS.menu;
    });
  }

  /* SCROLL REVEAL */
  let observer;
  function observeReveal(root) {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
    }
    root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }


  /* ------------------------------------------------------------------
     SEO — Dynamic Product Schema (ItemList + Product)
     Inyecta 30 productos con schema.org para Google rich snippets.
     Google Indexing API puede tardar unos días en procesar esto.
     ------------------------------------------------------------------ */
  var SITE_URL = "https://fernando-max-8.github.io/website/";

  function injectProductSchema() {
    var schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Curated Skincare & Beauty Products — refinedboy",
      "description": "An independently curated selection of skincare, body care, hair care and beauty essentials for everyday routines.",
      "url": SITE_URL,
      "numberOfItems": products.length,
      "itemListElement": products.map(function (p, idx) {
        var cat = categories.find(function (c) { return c.slug === p.category; });
        var entry = {
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "Product",
            "name": p.name,
            "description": p.description,
            "category": cat ? cat.name : ""
          }
        };
        if (p.image) {
          entry.item.image = SITE_URL + p.image;
        }
        if (p.amazonUrl && /^https?:\/\//i.test(p.amazonUrl)) {
          entry.item.offers = {
            "@type": "Offer",
            "url": p.amazonUrl,
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "Amazon" }
          };
        }
        return entry;
      })
    };
    var el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
  }

  /* INIT */
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year-attr").textContent = new Date().getFullYear();
    renderHeader();
    renderHero();
    initShowcase();
    renderCategories();
    renderFeatured();
    renderFilterPanel();
    renderShop();
    renderAbout();
    renderFooter();
    injectProductSchema();
    wireShopControls();
    wireModal();
    wireHeader();
    observeReveal(document);
  });
})();
