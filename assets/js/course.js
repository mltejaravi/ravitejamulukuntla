(function () {
  "use strict";
  const { ICONS, esc, thumb } = RM;
  const root = document.getElementById("course-root");

  async function init() {
    let data;
    try {
      data = await RM.getJSON("data/courses.json");
    } catch (err) {
      root.innerHTML = RM.errorBox(err);
      return;
    }
    const course = data.courses.find((c) => c.id === RM.param("id")) || data.courses[0];
    const startId = RM.param("v");
    let index = Math.max(0, course.lessons.findIndex((l) => l.id === startId));
    if (!startId) {
      // resume at the first lesson not yet watched
      const done = RM.watched();
      const next = course.lessons.findIndex((l) => !done.has(l.id));
      index = next === -1 ? 0 : next;
    }

    document.title = `${course.title} · Raviteja Mulukuntla`;
    const noun = course.type === "course" ? "Lesson" : "Video";

    root.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>${ICONS.chevron}<a href="index.html#courses">Courses</a>${ICONS.chevron}<span>${esc(course.topic)}</span>
      </nav>
      <div class="page-hero" style="padding:20px 0 28px">
        <div class="tags"><span class="tag" style="--c:${course.color}">${esc(course.topic)}</span><span class="tag" style="--c:#8b93b8">${esc(course.level)}</span><span class="tag" style="--c:#8b93b8">${course.lessons.length} ${noun.toLowerCase()}${course.lessons.length > 1 ? "s" : ""}</span></div>
        <h1>${esc(course.title)}</h1>
      </div>
      <div class="course-layout">
        <div>
          <div class="player" id="player"></div>
          <div class="now-playing">
            <span class="kicker" id="np-kicker"></span>
            <h2 id="np-title"></h2>
            <div class="player-actions">
              <button class="btn btn-ghost btn-sm" id="prev-btn">${ICONS.arrowLeft} Previous</button>
              <button class="btn btn-primary btn-sm" id="next-btn">Next ${noun.toLowerCase()} ${ICONS.arrow}</button>
              <button class="btn btn-ghost btn-sm" id="done-btn"></button>
              <a class="btn btn-ghost btn-sm" id="yt-btn" target="_blank" rel="noopener">${ICONS.youtube} Watch on YouTube</a>
            </div>
          </div>
          <div class="course-about">
            <span class="eyebrow">About this ${course.type}</span>
            <p>${esc(course.description)}</p>
            <div class="player-actions" style="margin-top:18px">
              <a class="btn btn-yt btn-sm" href="${RM.playlistUrl(course.playlistId)}" target="_blank" rel="noopener">${ICONS.list} Full playlist on YouTube</a>
              <button class="btn btn-ghost btn-sm" id="share-btn">${ICONS.link} Share</button>
            </div>
          </div>
        </div>
        <aside class="lesson-panel">
          <header>
            <h3>${noun}s</h3>
            <div class="row"><span id="progress-text"></span><span id="progress-pct"></span></div>
            <div class="progress-mini"><span id="progress-bar" style="width:0"></span></div>
          </header>
          <ol class="lesson-list" id="lesson-list"></ol>
        </aside>
      </div>`;

    const $ = (id) => document.getElementById(id);
    const list = $("lesson-list");

    function renderList() {
      const done = RM.watched();
      list.innerHTML = course.lessons.map((l, i) => `
        <li>
          <button class="lesson ${i === index ? "current" : ""} ${done.has(l.id) ? "watched" : ""}" data-i="${i}" aria-current="${i === index}">
            <span class="num">${done.has(l.id) ? ICONS.check : i + 1}</span>
            <img src="${thumb(l.id, "mqdefault")}" alt="">
            <span class="t"><small>${noun} ${i + 1}</small>${esc(l.title)}</span>
          </button>
        </li>`).join("");
      const count = course.lessons.filter((l) => done.has(l.id)).length;
      const pct = Math.round((count / course.lessons.length) * 100);
      $("progress-text").textContent = `${count} of ${course.lessons.length} watched`;
      $("progress-pct").textContent = `${pct}%`;
      $("progress-bar").style.width = pct + "%";
    }

    function load(i, autoplay) {
      index = i;
      const l = course.lessons[i];
      $("player").innerHTML = `<iframe src="${RM.embedUrl(l.id, autoplay)}" title="${esc(l.fullTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      $("np-kicker").textContent = `${noun} ${i + 1} of ${course.lessons.length}`;
      $("np-title").textContent = l.fullTitle;
      $("yt-btn").href = RM.watchUrl(l.id, course.playlistId);
      $("prev-btn").disabled = i === 0;
      $("prev-btn").style.opacity = i === 0 ? 0.4 : 1;
      $("next-btn").hidden = i === course.lessons.length - 1;
      updateDone();
      renderList();
      history.replaceState(null, "", `course.html?id=${course.id}&v=${l.id}`);
    }

    function updateDone() {
      const isDone = RM.watched().has(course.lessons[index].id);
      const b = $("done-btn");
      b.classList.toggle("done", isDone);
      b.innerHTML = isDone ? `${ICONS.check} Watched` : `${ICONS.check} Mark as watched`;
    }

    list.addEventListener("click", (e) => {
      const b = e.target.closest(".lesson");
      if (!b) return;
      load(+b.dataset.i, true);
      if (window.innerWidth < 1000) $("player").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    $("prev-btn").addEventListener("click", () => index > 0 && load(index - 1, true));
    $("next-btn").addEventListener("click", () => {
      RM.toggleWatched(course.lessons[index].id, true);
      if (index < course.lessons.length - 1) load(index + 1, true);
    });
    $("done-btn").addEventListener("click", () => {
      const id = course.lessons[index].id;
      RM.toggleWatched(id, !RM.watched().has(id));
      updateDone();
      renderList();
    });
    $("share-btn").addEventListener("click", async () => {
      const url = location.href;
      if (navigator.share) {
        try { await navigator.share({ title: course.title, url }); } catch { /* cancelled */ }
      } else {
        try { await navigator.clipboard.writeText(url); RM.toast("Link copied to clipboard"); } catch { RM.toast(url); }
      }
    });

    load(index, false);

    const others = data.courses.filter((c) => c.id !== course.id && c.type === "course").slice(0, 3);
    if (others.length) {
      document.getElementById("more-grid").innerHTML = others.map(RM.courseCard).join("");
      document.getElementById("more-courses").hidden = false;
      RM.reveal(document.getElementById("more-grid"));
    }
  }

  init();
})();
