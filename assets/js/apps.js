(function () {
  "use strict";
  const { ICONS, esc } = RM;
  const el = document.getElementById("app-list");
  if (!el) return;

  RM.getJSON("data/apps.json")
    .then(({ apps }) => {
      el.innerHTML = apps.map((a) => {
        // first screenshot sits in the middle, the next two fan out behind it
        const [main, left, right] = a.screenshots || [];
        const shots = [left, main, right].filter(Boolean);
        return `
          <article class="app-showcase reveal" style="--c:${a.color}">
            <div>
              <div class="app-head">
                <img class="app-icon" src="${esc(a.icon)}" alt="${esc(a.name)} app icon" width="88" height="88">
                <div>
                  <h3>${esc(a.name)}</h3>
                  <div class="tags"><span class="tag" style="--c:#3ddc84">${esc(a.platform)}</span><span class="tag" style="--c:#8b93b8">Free</span><span class="tag" style="--c:#22d3ee">Offline</span></div>
                </div>
              </div>
              <p class="app-tagline">${esc(a.tagline)}</p>
              <p class="app-desc">${esc(a.description)}</p>
              <div class="app-features">
                ${a.features.map((f) => `<div class="app-feature"><span class="fi" aria-hidden="true">${f.icon}</span><div><b>${esc(f.title)}</b><span>${esc(f.text)}</span></div></div>`).join("")}
              </div>
              <a class="btn btn-play" href="${esc(a.playStore)}" target="_blank" rel="noopener">
                ${ICONS.googlePlay}<span class="lbl"><small>GET IT ON</small><b>Google Play</b></span>
              </a>
            </div>
            <div class="phones" aria-hidden="true">
              ${shots.map((s, i) => `<div class="phone p${i + 1}"><img src="${esc(s)}" alt="" loading="lazy"></div>`).join("")}
            </div>
          </article>`;
      }).join("");
      RM.reveal(el);
    })
    .catch((err) => { el.innerHTML = RM.errorBox(err); });
})();
