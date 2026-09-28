(function () {
  "use strict";
  const { ICONS, esc, thumb } = RM;
  const article = document.getElementById("article");

  const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  async function init() {
    const slug = RM.param("slug");
    let posts, post, md, courses = [];
    try {
      posts = (await RM.getJSON("data/posts.json")).posts.sort((a, b) => b.date.localeCompare(a.date));
      post = posts.find((p) => p.slug === slug);
      if (!post) throw new Error(`No post called “${slug || ""}”.`);
      md = await RM.getText(`posts/${post.slug}.md`);
    } catch (err) {
      article.innerHTML = `<div style="padding:80px 0">${RM.errorBox(err)}<p style="margin-top:24px"><a class="link-arrow" href="blog.html">Back to the blog ${ICONS.arrow}</a></p></div>`;
      return;
    }
    try { courses = (await RM.getJSON("data/courses.json")).courses; } catch { /* optional */ }
    const course = courses.find((c) => c.id === post.course);

    document.title = `${post.title} · Raviteja Mulukuntla`;
    document.querySelector('meta[name="description"]').setAttribute("content", post.summary);

    const html = window.marked ? marked.parse(md) : `<pre>${esc(md)}</pre>`;
    const i = posts.indexOf(post);
    const newer = posts[i - 1];
    const older = posts[i + 1];
    const url = location.href;
    const shareText = encodeURIComponent(post.title);
    const shareUrl = encodeURIComponent(url);

    article.innerHTML = `
      <header class="article-head">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a>${ICONS.chevron}<a href="blog.html">Blog</a></nav>
        <div class="tags" style="margin-top:18px">${(post.tags || []).map((t) => `<a class="tag" style="--c:${RM.colorFor(t)}" href="blog.html?tag=${encodeURIComponent(t)}">${esc(t)}</a>`).join("")}</div>
        <h1>${esc(post.title)}</h1>
        <p class="summary">${esc(post.summary)}</p>
        <div class="byline">
          <img src="assets/img/avatar.jpg" alt="">
          <div><b><a href="https://www.linkedin.com/in/ravitejamulukuntlaofficial/" target="_blank" rel="noopener">Raviteja Mulukuntla</a></b>Senior Software Engineer</div>
          <span class="sep"></span><span>${RM.fmtDate(post.date)}</span>
          <span class="sep"></span><span>${RM.readTime(md)} min read</span>
        </div>
      </header>
      ${post.video ? `
        <div class="article-video">
          <button class="lite-yt" id="lite-yt" aria-label="Play video">
            <img src="${thumb(post.video, "hqdefault")}" alt="">
            <span class="yt-play">${ICONS.play}</span>
          </button>
        </div>` : ""}
      <div class="prose" id="prose">${html}</div>
      <footer class="article-foot">
        <div class="share">Share this article:
          <a class="social" style="--c:#25d366" href="https://wa.me/?text=${shareText}%20${shareUrl}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">${ICONS.whatsapp}</a>
          <a class="social" style="--c:#0a66c2" href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">${ICONS.linkedin}</a>
          <a class="social" style="--c:#111" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener" aria-label="Share on X">${ICONS.twitter}</a>
          <button class="social" style="--c:#7c5cff" id="copy-link" aria-label="Copy link">${ICONS.link}</button>
        </div>
        ${course ? `
          <a class="course-promo" href="course.html?id=${course.id}">
            <img src="${thumb(course.cover)}" alt="">
            <div>
              <span class="eyebrow">Watch the full ${course.type}</span>
              <h4>${esc(course.title)}</h4>
              <span class="link-arrow">${course.lessons.length} ${course.lessons.length > 1 ? "videos" : "video"} · Start watching ${ICONS.arrow}</span>
            </div>
          </a>` : ""}
        <nav class="post-nav">
          ${newer ? `<a class="prev" href="post.html?slug=${encodeURIComponent(newer.slug)}"><small>← Newer</small><b>${esc(newer.title)}</b></a>` : ""}
          ${older ? `<a class="next" href="post.html?slug=${encodeURIComponent(older.slug)}"><small>Older →</small><b>${esc(older.title)}</b></a>` : ""}
        </nav>
      </footer>`;

    enhanceProse(document.getElementById("prose"));

    const lite = document.getElementById("lite-yt");
    if (lite) lite.addEventListener("click", () => {
      lite.parentElement.innerHTML = `<iframe src="${RM.embedUrl(post.video)}" title="${esc(post.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    });
    document.getElementById("copy-link").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(url); RM.toast("Link copied to clipboard"); } catch { RM.toast(url); }
    });
  }

  function enhanceProse(prose) {
    prose.querySelectorAll("h2, h3").forEach((h) => { if (!h.id) h.id = slugify(h.textContent); });
    prose.querySelectorAll("a[href^='http']").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    prose.querySelectorAll("pre > code").forEach((code) => {
      const pre = code.parentElement;
      const lang = (code.className.match(/language-(\w+)/) || [])[1];
      if (window.hljs) {
        try { hljs.highlightElement(code); } catch { /* unknown language */ }
      }
      if (lang) {
        const l = document.createElement("span");
        l.className = "code-lang";
        l.textContent = lang;
        pre.appendChild(l);
      }
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          btn.textContent = "Copied!";
        } catch { btn.textContent = "Press ⌘/Ctrl+C"; }
        setTimeout(() => (btn.textContent = "Copy"), 1600);
      });
      pre.appendChild(btn);
    });
  }

  const bar = document.getElementById("read-progress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = h > 0 ? `${(scrollY / h) * 100}%` : "0";
  }, { passive: true });

  init();
})();
