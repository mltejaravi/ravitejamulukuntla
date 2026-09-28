(function () {
  "use strict";
  const { ICONS, esc, thumb, colorFor } = RM;

  async function init() {
    try {
      const [channel, data] = await Promise.all([RM.getJSON("data/channel.json"), RM.getJSON("data/courses.json")]);
      renderChannel(channel, data);
      renderCourses(data);
      renderVideos(data);
    } catch (err) {
      document.getElementById("course-grid").innerHTML = RM.errorBox(err);
      document.getElementById("course-grid").style.display = "block";
    }
    renderPosts();
  }

  function renderChannel(channel, data) {
    const videos = RM.allVideos(data).length;
    const courses = data.courses.filter((c) => c.type === "course").length;
    document.getElementById("hero-stats").innerHTML = [
      [videos, "Videos"],
      [courses, "Courses"],
      [data.courses.length, "Playlists"],
      [channel.stats.subscribers, "Subscribers"]
    ].map(([v, l]) => `<div class="stat"><b>${esc(v)}</b><span>${l}</span></div>`).join("");

    const chips = channel.tech.map((t) => `<span class="chip" style="--c:${colorFor(t)}"><i></i>${esc(t)}</span>`).join("");
    document.getElementById("marquee").innerHTML = chips + chips; // duplicated for a seamless loop

    const newest = RM.allVideos(data)[0];
    if (newest) {
      const label = newest.course.type === "course" ? `${newest.course.topic} Part ${newest.part}` : newest.course.topic;
      document.getElementById("hero-pill-text").textContent = `New: ${label} · ${newest.title}`;
      document.getElementById("hero-pill").href = `course.html?id=${newest.course.id}&v=${newest.id}`;
      document.getElementById("hero-pill").removeAttribute("target");
    }

    document.getElementById("about-bio").textContent = channel.bio;
    document.getElementById("about-socials").innerHTML = RM.socialLinks(channel.links);
  }

  function renderCourses(data) {
    const grid = document.getElementById("course-grid");
    grid.innerHTML = data.courses.map(RM.courseCard).join("");
    RM.reveal(grid);
  }

  function renderVideos(data) {
    const videos = RM.allVideos(data);
    const filtersEl = document.getElementById("video-filters");
    const grid = document.getElementById("video-grid");
    const search = document.getElementById("video-search");
    const topics = ["All", ...new Set(data.courses.map((c) => c.topic))];
    let active = "All";

    const count = (t) => (t === "All" ? videos.length : videos.filter((v) => v.course.topic === t).length);
    filtersEl.innerHTML = topics
      .map((t) => `<button class="filter ${t === active ? "active" : ""}" data-topic="${esc(t)}" role="tab">${esc(t)}<span class="count">${count(t)}</span></button>`)
      .join("");

    function draw() {
      const q = search.value.trim().toLowerCase();
      const list = videos.filter(
        (v) =>
          (active === "All" || v.course.topic === active) &&
          (!q || v.fullTitle.toLowerCase().includes(q) || v.course.title.toLowerCase().includes(q))
      );
      grid.innerHTML = list.length
        ? list.map((v) => `
            <button class="card video-card reveal" data-id="${v.id}">
              <div class="thumb">
                <img src="${thumb(v.id)}" alt="" loading="lazy">
                <span class="badge br">${v.course.type === "course" ? `Part ${v.part}` : "Video"}</span>
                <span class="play-fab">${ICONS.play}</span>
              </div>
              <div class="body">
                <h3>${esc(v.title)}</h3>
                <div class="row">
                  <span class="tag" style="--c:${v.course.color}">${esc(v.course.topic)}</span>
                  <span>${esc(v.course.type === "course" ? `${v.part} of ${v.course.lessons.length}` : "")}</span>
                </div>
              </div>
            </button>`).join("")
        : `<div class="empty" style="grid-column:1/-1">No videos match “${esc(search.value)}”.</div>`;
      RM.reveal(grid);
    }

    filtersEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      active = b.dataset.topic;
      filtersEl.querySelectorAll(".filter").forEach((x) => x.classList.toggle("active", x === b));
      draw();
    });
    search.addEventListener("input", draw);
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".video-card");
      if (card) RM.openVideo(videos.find((v) => v.id === card.dataset.id));
    });
    draw();
  }

  async function renderPosts() {
    const grid = document.getElementById("post-grid");
    try {
      const { posts } = await RM.getJSON("data/posts.json");
      const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
      grid.innerHTML = latest.map((p) => RM.postCard(p)).join("");
      RM.reveal(grid);
    } catch (err) {
      grid.innerHTML = RM.errorBox(err);
    }
  }

  init();
})();
