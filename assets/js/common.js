/* Shared helpers used by every page. Exposed as window.RM */
(function () {
  "use strict";

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.9-6.86a1 1 0 0 0 0-1.7L9.52 4.3A1 1 0 0 0 8 5.14Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.71.97 1-3.62-.24-.37a9.8 9.8 0 1 1 8.32 4.6Zm8.34-18.14A11.72 11.72 0 0 0 12.05.2 11.8 11.8 0 0 0 1.83 17.87L.16 23.97l6.25-1.64a11.79 11.79 0 0 0 5.63 1.43h.01A11.8 11.8 0 0 0 20.39 3.66Z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    googlePlay: '<svg viewBox="0 0 24 24"><path fill="#00d7fe" d="M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2l.1.1L13.8 12.2V12L3.7 1.7l-.1.1Z"/><path fill="#ffce00" d="m17.1 15.6-3.3-3.4V12l3.3-3.4h.1l4 2.3c1.1.6 1.1 1.7 0 2.4l-4 2.3h-.1Z"/><path fill="#ff3a44" d="m17.2 15.5-3.4-3.4L3.6 22.2c.4.4 1 .4 1.7.1l11.9-6.8"/><path fill="#00f076" d="M17.2 8.6 5.3 1.8c-.7-.4-1.3-.3-1.7.1l10.2 10.2 3.4-3.5Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    lessons: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-6.8 9.85V16c0 1.66 3.04 4 6.8 4s6.8-2.34 6.8-4v-3.15L12 16.5l-6.8-3.65Z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h11M4 12h11M4 18h7M17 15v6l5-3-5-3Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>'
  };

  const TOPIC_COLORS = {
    React: "#61dafb", "C#": "#a179ff", ".NET": "#7c5cff", ".NET Core": "#8b5cf6", Python: "#ffd43b",
    Tesseract: "#22d3ee", OCR: "#22d3ee", TypeScript: "#3178c6", JavaScript: "#f7df1e", Git: "#f05032",
    GitHub: "#a3a3ff", Interview: "#10b981", MSSQL: "#ef4444", "Web API": "#f59e0b", "REST API": "#10b981"
  };
  const colorFor = (name) => TOPIC_COLORS[name] || "#22d3ee";

  /* ---------- Centre-screen loader: shown while page data is being fetched ---------- */
  const progress = (() => {
    const LABELS = { home: "Loading courses & videos", courses: "Loading playlist", blog: "Loading articles" };
    let el, bar, pct, value = 0, pending = 0, trickle, showTimer, hideTimer, shownAt = 0;
    function ensure() {
      if (el) return;
      const page = document.body.dataset.page;
      const label = location.pathname.endsWith("post.html") ? "Loading article" : LABELS[page] || "Loading";
      el = document.createElement("div");
      el.className = "page-loader";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.innerHTML = `
        <div class="pl-card">
          <div class="pl-ring"><img src="assets/img/icon-192.png" alt=""></div>
          <p class="pl-text">${label}<span class="pl-dots"><i>.</i><i>.</i><i>.</i></span></p>
          <div class="pl-bar"><span></span></div>
          <b class="pl-pct">0%</b>
        </div>`;
      document.body.appendChild(el);
      bar = el.querySelector(".pl-bar span");
      pct = el.querySelector(".pl-pct");
    }
    const set = (v) => {
      value = v;
      bar.style.width = (v * 100).toFixed(1) + "%";
      pct.textContent = Math.round(v * 100) + "%";
    };
    function start() {
      ensure();
      pending++;
      if (pending > 1) return;
      clearTimeout(hideTimer);
      if (value >= 1) set(0);
      if (!el.classList.contains("show")) {
        // only appear if loading takes long enough to notice, so fast loads don't flash
        clearTimeout(showTimer);
        showTimer = setTimeout(() => { el.classList.add("show"); shownAt = Date.now(); }, 120);
      }
      set(Math.max(value, 0.12));
      clearInterval(trickle);
      trickle = setInterval(() => set(value + (0.9 - value) * 0.12), 200);
    }
    function done() {
      pending = Math.max(0, pending - 1);
      if (pending) { set(Math.min(0.95, value + 0.15)); return; }
      clearInterval(trickle);
      clearTimeout(showTimer);
      set(1);
      if (!el.classList.contains("show")) return;
      // keep it on screen briefly so it never just flickers
      const wait = Math.max(250, 500 - (Date.now() - shownAt));
      hideTimer = setTimeout(() => el.classList.remove("show"), wait);
    }
    return { start, done };
  })();
  const tracked = (promise) => { progress.start(); return promise.finally(progress.done); };

  const cache = {};
  function getJSON(path) {
    if (!cache[path]) {
      cache[path] = tracked(fetch(path, { cache: "no-cache" }).then((r) => {
        if (!r.ok) throw new Error(`Could not load ${path} (HTTP ${r.status})`);
        return r.json();
      }));
    }
    return cache[path];
  }
  function getText(path) {
    return tracked(fetch(path, { cache: "no-cache" }).then((r) => {
      if (!r.ok) throw new Error(`Could not load ${path} (HTTP ${r.status})`);
      return r.text();
    }));
  }

  /* ---------- Video player with a loading screen until YouTube is ready ---------- */
  function mountPlayer(box, id, title, autoplay = true) {
    box.innerHTML = `
      <div class="vloader" style="--vbg:url('${thumb(id)}')">
        <div class="vl-inner">
          <span class="vl-spin"></span>
          <span class="vl-text">Loading video…</span>
          <span class="vl-bar"><i></i></span>
        </div>
      </div>
      <iframe src="${embedUrl(id, autoplay)}" title="${esc(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    const loader = box.querySelector(".vloader");
    requestAnimationFrame(() => requestAnimationFrame(() => loader.classList.add("run")));
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      loader.classList.add("done");
      setTimeout(() => loader.remove(), 500);
    };
    box.querySelector("iframe").addEventListener("load", finish, { once: true });
    setTimeout(finish, 15000); // never leave the loader stuck on a slow network
  }

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const thumb = (id, q = "hqdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
  const watchUrl = (id, list) => `https://www.youtube.com/watch?v=${id}${list ? `&list=${list}` : ""}`;
  const playlistUrl = (list) => `https://www.youtube.com/playlist?list=${list}`;
  const embedUrl = (id, autoplay = true) =>
    `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;
  const fmtDate = (iso) =>
    new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const readTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
  const param = (name) => new URLSearchParams(location.search).get(name);

  /* Per-viewer progress: remembers which lessons were watched in this browser */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
    }
  };
  const watched = () => new Set(store.get("rm-watched", []));
  function toggleWatched(id, on) {
    const set = watched();
    on ? set.add(id) : set.delete(id);
    store.set("rm-watched", [...set]);
  }

  /* Flatten courses into a single video list (each video belongs to one course) */
  function allVideos(data) {
    const byId = {};
    data.courses.forEach((c) =>
      c.lessons.forEach((l, i) => {
        byId[l.id] = { ...l, part: i + 1, course: c };
      })
    );
    const order = data.latest || Object.keys(byId);
    return order.filter((id) => byId[id]).map((id) => byId[id]);
  }

  /* ---------- Header / footer ---------- */
  const NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "index.html#courses", label: "Courses", key: "courses" },
    { href: "index.html#videos", label: "Videos", key: "videos" },
    { href: "blog.html", label: "Blog", key: "blog" },
    { href: "index.html#apps", label: "Mobile Apps", key: "apps" },
    { href: "index.html#about", label: "About", key: "about" }
  ];

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    const page = document.body.dataset.page;
    el.className = "site-header";
    el.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="Home">
          <img src="assets/img/avatar.jpg" alt="" width="40" height="40">
          <span class="brand-name">Raviteja Mulukuntla<small>CODE · LEARN · BUILD</small></span>
        </a>
        <ul class="nav-links" id="nav-links">
          ${NAV.map((n) => `<li><a href="${n.href}" data-key="${n.key}" class="${n.key === page ? "active" : ""}">${n.label}</a></li>`).join("")}
          <li class="mobile-only"><a href="https://www.youtube.com/@ravitejamulukuntla9655?sub_confirmation=1" target="_blank" rel="noopener">Subscribe on YouTube</a></li>
        </ul>
        <div class="nav-actions">
          <button class="icon-btn theme-btn" id="theme-btn" aria-label="Toggle light and dark theme">${ICONS.moon}${ICONS.sun}</button>
          <a class="btn btn-yt btn-sm nav-subscribe" href="https://www.youtube.com/@ravitejamulukuntla9655?sub_confirmation=1" target="_blank" rel="noopener">${ICONS.youtube} Subscribe</a>
          <button class="icon-btn menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false">${ICONS.menu}</button>
        </div>
      </div>`;

    const links = el.querySelector("#nav-links");
    const menuBtn = el.querySelector("#menu-btn");
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.innerHTML = open ? ICONS.close : ICONS.menu;
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        menuBtn.innerHTML = ICONS.menu;
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });

    el.querySelector("#theme-btn").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("rm-theme", next); } catch { /* ignore */ }
    });

    const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function socialLinks(links) {
    const items = [
      ["youtube", "YouTube", "#ff0033"],
      ["facebook", "Facebook", "#1877f2"],
      ["instagram", "Instagram", "#e1306c"],
      ["twitter", "X (Twitter)", "#111111"],
      ["linkedin", "LinkedIn", "#0a66c2"]
    ];
    return items
      .filter(([k]) => links[k])
      .map(([k, label, c]) => `<a class="social" style="--c:${c}" href="${esc(links[k])}" target="_blank" rel="noopener" aria-label="${label}" title="${label}">${ICONS[k]}</a>`)
      .join("");
  }

  async function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.className = "site-footer";
    let channel = { links: {} };
    try { channel = await getJSON("data/channel.json"); } catch { /* footer still renders */ }
    let courses = [];
    try { courses = (await getJSON("data/courses.json")).courses; } catch { /* ignore */ }
    el.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html"><img src="assets/img/avatar.jpg" alt="" width="40" height="40"><span class="brand-name">Raviteja Mulukuntla<small>CODE · LEARN · BUILD</small></span></a>
            <p>Free, beginner-friendly tutorials on C#, .NET, React, TypeScript, Python and more.</p>
            <div class="socials">${socialLinks(channel.links || {})}</div>
          </div>
          <div>
            <h4>Courses</h4>
            <ul>${courses.map((c) => `<li><a href="course.html?id=${c.id}">${esc(c.topic === "Interview" ? "Interview Prep" : c.topic)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html#videos">All videos</a></li>
              <li><a href="blog.html">Blog &amp; text tutorials</a></li>
              <li><a href="index.html#apps">Mobile apps</a></li>
              <li><a href="index.html#about">About me</a></li>
              <li><a href="${esc(channel.links?.youtube || "#")}" target="_blank" rel="noopener">YouTube channel</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Raviteja Mulukuntla. All rights reserved.</span>
          <span>Made with ♥ for learners everywhere</span>
        </div>
      </div>`;
  }

  /* ---------- Video modal ---------- */
  let modal;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <button class="icon-btn modal-close" aria-label="Close video">${ICONS.close}</button>
      <div class="modal-box">
        <div class="modal-frame"></div>
        <div class="modal-bar">
          <h3></h3>
          <div class="actions"></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => {
      modal.classList.remove("open");
      modal.querySelector(".modal-frame").innerHTML = "";
      document.body.style.overflow = "";
    };
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest(".modal-close")) close();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });
    return modal;
  }
  function openVideo(video) {
    const m = ensureModal();
    mountPlayer(m.querySelector(".modal-frame"), video.id, video.fullTitle || video.title);
    m.querySelector("h3").textContent = video.fullTitle || video.title;
    m.querySelector(".actions").innerHTML = `
      ${video.course ? `<a class="btn btn-ghost btn-sm" href="course.html?id=${video.course.id}&v=${video.id}">${ICONS.lessons} Open in course</a>` : ""}
      <a class="btn btn-yt btn-sm" href="${watchUrl(video.id)}" target="_blank" rel="noopener">${ICONS.youtube} YouTube</a>`;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ---------- Reveal on scroll ---------- */
  let io;
  function reveal(root = document) {
    const els = root.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  function errorBox(err) {
    const local = location.protocol === "file:";
    return `<div class="error-box"><b>Couldn't load content.</b> ${esc(err.message)}${
      local ? `<br><br>You opened the file directly. Run <code>python3 -m http.server</code> in the site folder and open <code>http://localhost:8000</code> instead.` : ""
    }</div>`;
  }

  /* ---------- Shared card templates ---------- */
  function courseCard(c) {
    const done = watched();
    const doneCount = c.lessons.filter((l) => done.has(l.id)).length;
    const pct = Math.round((doneCount / c.lessons.length) * 100);
    const n = c.lessons.length;
    return `
      <a class="card course-card reveal" href="course.html?id=${c.id}" style="--c:${c.color}">
        <span class="accent-bar"></span>
        <div class="thumb">
          <img src="${thumb(c.cover)}" alt="" loading="lazy">
          <span class="badge br">${c.type === "course" ? ICONS.lessons : ICONS.list} ${n} ${c.type === "course" ? (n === 1 ? "lesson" : "lessons") : n === 1 ? "video" : "videos"}</span>
          <span class="play-fab">${ICONS.play}</span>
        </div>
        <div class="body">
          <div class="tags"><span class="tag" style="--c:${c.color}">${esc(c.topic)}</span><span class="tag" style="--c:${c.type === "course" ? "#8b5cf6" : "#8b93b8"}">${c.type === "course" ? "Course" : "Playlist"}</span><span class="tag" style="--c:#8b93b8">${esc(c.level)}</span></div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.description)}</p>
          <div class="meta">
            <span>${doneCount ? `${doneCount}/${n} watched` : c.type === "course" ? "Start course" : "Watch now"}</span>
            <span class="link-arrow">${ICONS.arrow}</span>
          </div>
          ${doneCount ? `<div class="progress-mini"><span style="width:${pct}%"></span></div>` : ""}
        </div>
      </a>`;
  }

  function postCard(p, featured = false) {
    return `
      <a class="card post-card reveal ${featured ? "featured" : ""}" href="post.html?slug=${encodeURIComponent(p.slug)}">
        <div class="thumb">
          <img src="${p.cover ? esc(p.cover) : p.video ? thumb(p.video) : "assets/img/avatar.jpg"}" alt="" loading="lazy">
          ${featured ? `<span class="badge tl type-course">LATEST</span>` : ""}
        </div>
        <div class="body">
          <div class="tags">${(p.tags || []).map((t) => `<span class="tag" style="--c:${colorFor(t)}">${esc(t)}</span>`).join("")}</div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          <div class="meta">
            <span>${ICONS.calendar} ${fmtDate(p.date)}</span>
            ${p.minutes ? `<span>${ICONS.clock} ${p.minutes} min read</span>` : ""}
          </div>
        </div>
      </a>`;
  }

  window.RM = {
    ICONS, colorFor, getJSON, getText, progress, mountPlayer, esc, thumb, watchUrl, playlistUrl, embedUrl, fmtDate, readTime, param,
    store, watched, toggleWatched, allVideos, openVideo, reveal, toast, errorBox, courseCard, postCard, socialLinks
  };

  renderHeader();
  renderFooter();
  document.addEventListener("DOMContentLoaded", () => reveal());
})();
