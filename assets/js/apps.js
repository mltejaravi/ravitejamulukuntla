(function () {
  "use strict";
  const { esc } = RM;
  const el = document.getElementById("app-list");
  if (!el) return;

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICON = {
    scan: svg('<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>'),
    folder: svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>'),
    bell: svg('<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
    share: svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>'),
    lock: svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    text: svg('<path d="M4 6h16M4 12h16M4 18h10"/>'),
    upload: svg('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    shield: svg('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/><path d="m9 12 2 2 4-4"/>'),
    check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    prev: svg('<path d="m15 18-6-6 6-6"/>'),
    next: svg('<path d="m9 18 6-6-6-6"/>')
  };
  const PLAY = '<svg viewBox="0 0 24 24"><path fill="#00d7fe" d="M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2l.1.1L13.8 12.2V12L3.7 1.7l-.1.1Z"/><path fill="#ffce00" d="m17.1 15.6-3.3-3.4V12l3.3-3.4h.1l4 2.3c1.1.6 1.1 1.7 0 2.4l-4 2.3h-.1Z"/><path fill="#ff3a44" d="m17.2 15.5-3.4-3.4L3.6 22.2c.4.4 1 .4 1.7.1l11.9-6.8"/><path fill="#00f076" d="M17.2 8.6 5.3 1.8c-.7-.4-1.3-.3-1.7.1l10.2 10.2 3.4-3.5Z"/></svg>';

  function appHTML(a) {
    const shots = a.screenshots || [];
    return `
      <article class="app-card reveal" style="--app:${a.color};--app-2:${a.accent || a.color}">
        <header class="app-top">
          <img class="app-icon" src="${esc(a.icon)}" alt="${esc(a.name)} app icon" width="76" height="76">
          <div class="app-title">
            <h3>${esc(a.name)}</h3>
            <p>${esc(a.tagline)}</p>
            <div class="tags"><span class="tag" style="--c:#3ddc84">${esc(a.platform)}</span><span class="tag" style="--c:#f4c86a">Free</span><span class="tag" style="--c:#22d3ee">Offline</span></div>
          </div>
          <a class="btn btn-play" href="${esc(a.playStore)}" target="_blank" rel="noopener">
            ${PLAY}<span class="lbl"><small>GET IT ON</small><b>Google Play</b></span>
          </a>
        </header>

        <div class="app-body">
          <div class="carousel" data-carousel>
            <div class="car-viewport">
              <div class="car-track" tabindex="0" aria-label="${esc(a.name)} screenshots">
                ${shots.map((s, i) => `
                  <figure class="car-slide" data-i="${i}">
                    <button class="car-phone" data-src="${esc(s.src)}" data-cap="${esc(s.caption)}" aria-label="Enlarge screenshot: ${esc(s.caption)}">
                      <img src="${esc(s.src)}" alt="${esc(s.caption)}" loading="lazy" width="180" height="320">
                    </button>
                    <figcaption>${esc(s.caption)}</figcaption>
                  </figure>`).join("")}
              </div>
            </div>
            <div class="car-controls">
              <button class="car-btn" data-dir="-1" aria-label="Previous screenshot">${ICON.prev}</button>
              <div class="car-dots">${shots.map((_, i) => `<button class="car-dot" data-i="${i}" aria-label="Screenshot ${i + 1}"></button>`).join("")}</div>
              <button class="car-btn" data-dir="1" aria-label="Next screenshot">${ICON.next}</button>
            </div>
          </div>

          <div class="app-info">
          <div class="app-scroll" tabindex="0" aria-label="About ${esc(a.name)}">
            <p class="app-summary">${esc(a.summary)}</p>
            <div class="app-facts">
              ${(a.facts || []).map((f) => `<div><b>${esc(f.value)}</b><span>${esc(f.label)}</span></div>`).join("")}
            </div>
            <h4 class="app-sub">Features</h4>
            <ul class="app-feats">
              ${a.features.map((f) => `
                <li>
                  <span class="fi">${ICON[f.icon] || ICON.check}</span>
                  <div><b>${esc(f.title)}</b><span>${esc(f.text)}</span></div>
                </li>`).join("")}
            </ul>
            ${a.privacy ? `
              <div class="app-privacy">
                <span class="fi">${ICON.shield}</span>
                <div>
                  <b>${esc(a.privacy.title)}</b>
                  <p>${esc(a.privacy.text)}</p>
                  <ul>${a.privacy.points.map((p) => `<li>${ICON.check}${esc(p)}</li>`).join("")}</ul>
                </div>
              </div>` : ""}
          </div>
          <span class="scroll-hint" aria-hidden="true">${ICON.next} Scroll for all features</span>
          </div>
        </div>
      </article>`;
  }

  function initCarousel(root) {
    const track = root.querySelector(".car-track");
    const slides = [...root.querySelectorAll(".car-slide")];
    const dots = [...root.querySelectorAll(".car-dot")];
    if (!slides.length) return;
    let current = 0;
    let timer;

    const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    const maxIndex = () => Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step()));
    const go = (i) => {
      const last = maxIndex();
      current = i > last ? 0 : i < 0 ? last : i;
      track.scrollTo({ left: current * step(), behavior: "smooth" });
    };
    const sync = () => {
      current = Math.round(track.scrollLeft / step());
      const last = maxIndex();
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === current);
        d.hidden = i > last; // no dot for positions that can't be scrolled to
      });
    };

    root.querySelectorAll(".car-btn").forEach((b) => b.addEventListener("click", () => { go(current + +b.dataset.dir); restart(); }));
    dots.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.i); restart(); }));
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
    });
    window.addEventListener("resize", sync);

    // Gentle autoplay, paused while the visitor is interacting or the carousel is off-screen
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false, hovering = false;
    function restart() {
      clearInterval(timer);
      if (reduced) return;
      timer = setInterval(() => { if (visible && !hovering && !document.hidden) go(current + 1); }, 3500);
    }
    root.addEventListener("pointerenter", () => (hovering = true));
    root.addEventListener("pointerleave", () => (hovering = false));
    root.addEventListener("touchstart", () => { hovering = true; setTimeout(() => (hovering = false), 6000); }, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.3 }).observe(root);
    } else visible = true;

    root.addEventListener("click", (e) => {
      const p = e.target.closest(".car-phone");
      if (p) openLightbox(p.dataset.src, p.dataset.cap);
    });

    sync();
    restart();
  }

  let box;
  function openLightbox(src, cap) {
    if (!box) {
      box = document.createElement("div");
      box.className = "modal lightbox";
      box.innerHTML = `<button class="icon-btn modal-close" aria-label="Close">${RM.ICONS.close}</button><figure><img alt=""><figcaption></figcaption></figure>`;
      box.addEventListener("click", (e) => { if (!e.target.closest("img")) close(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
      document.body.appendChild(box);
    }
    function close() { box.classList.remove("open"); document.body.style.overflow = ""; }
    box.querySelector("img").src = src;
    box.querySelector("img").alt = cap;
    box.querySelector("figcaption").textContent = cap;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  RM.getJSON("data/apps.json")
    .then(({ apps }) => {
      el.innerHTML = apps.map(appHTML).join("");
      el.querySelectorAll("[data-carousel]").forEach(initCarousel);
      el.querySelectorAll(".app-info").forEach((info) => {
        const sc = info.querySelector(".app-scroll");
        const update = () => info.classList.toggle("at-end", sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 8);
        sc.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
      });
      RM.reveal(el);
    })
    .catch((err) => { el.innerHTML = RM.errorBox(err); });
})();
