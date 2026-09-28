(function () {
  "use strict";
  const { esc } = RM;
  const listEl = document.getElementById("post-list");
  const filtersEl = document.getElementById("tag-filters");
  const search = document.getElementById("post-search");

  async function init() {
    let posts;
    try {
      posts = (await RM.getJSON("data/posts.json")).posts;
    } catch (err) {
      listEl.innerHTML = RM.errorBox(err);
      listEl.style.display = "block";
      return;
    }
    posts.sort((a, b) => b.date.localeCompare(a.date));

    // Load each post body for read time and full-text search
    await Promise.all(posts.map(async (p) => {
      try {
        p.body = await RM.getText(`posts/${p.slug}.md`);
        p.minutes = RM.readTime(p.body);
      } catch { p.body = ""; }
    }));

    const tags = ["All", ...new Set(posts.flatMap((p) => p.tags || []))];
    let active = RM.param("tag") && tags.includes(RM.param("tag")) ? RM.param("tag") : "All";
    filtersEl.innerHTML = tags.map((t) => `<button class="filter ${t === active ? "active" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`).join("");

    function draw() {
      const q = search.value.trim().toLowerCase();
      const list = posts.filter((p) =>
        (active === "All" || (p.tags || []).includes(active)) &&
        (!q || [p.title, p.summary, p.body, ...(p.tags || [])].join(" ").toLowerCase().includes(q))
      );
      const featureFirst = active === "All" && !q;
      listEl.innerHTML = list.length
        ? list.map((p, i) => RM.postCard(p, featureFirst && i === 0)).join("")
        : `<div class="empty" style="grid-column:1/-1">No articles found.</div>`;
      RM.reveal(listEl);
    }

    filtersEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      active = b.dataset.tag;
      filtersEl.querySelectorAll(".filter").forEach((x) => x.classList.toggle("active", x === b));
      draw();
    });
    search.addEventListener("input", draw);
    draw();
  }

  init();
})();
