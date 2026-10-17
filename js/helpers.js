  const rays = [
    [300, 140, 330, 70],
    [360, 120, 390, 40],
    [430, 125, 470, 50],
    [490, 160, 540, 100],
    [510, 215, 575, 185],
  ];
  const art = `<svg class="art" viewBox="0 0 600 560" role="img" aria-label="Sun rising over a hill with acacia blossoms">
 <circle class="glow" cx="360" cy="330" r="150" fill="#d4a21c" opacity=".12"/>
 <g class="sun"><circle cx="360" cy="330" r="96" fill="#d4a21c"/><circle cx="360" cy="330" r="96" fill="none" stroke="#b98a14" stroke-width="1.5" transform="scale(1.18)" transform-origin="360 330" opacity=".6"/></g>
 ${rays.map((r, i) => `<line class="ray" style="--r:${i}" x1="${r[0]}" y1="${r[1] + 60}" x2="${r[2]}" y2="${r[3] + 60}" stroke="#b98a14" stroke-width="2" stroke-linecap="round"/>`).join("")}
 <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c3326"/><stop offset=".55" stop-color="#1c3326" stop-opacity=".55"/><stop offset="1" stop-color="#1c3326" stop-opacity="0"/></linearGradient></defs>
 <path d="M0 480C130 410 270 370 420 405c70 17 120 40 180 75V560H0z" fill="url(#hg)"/>
 <path d="M0 480C130 410 270 370 420 405c70 17 120 40 180 75" fill="none" stroke="#d4a21c" stroke-width="2.5" stroke-linecap="round"/>
 <path class="stem" d="M110 470C112 400 130 340 175 280M135 380c20-30 50-50 85-70M155 330c-10-30-5-60 10-90" fill="none" stroke="#1c3326" stroke-width="3" stroke-linecap="round"/>
 ${[
   [175, 274, 20],
   [220, 306, 15],
   [165, 238, 17],
   [128, 372, 13],
   [205, 262, 11],
 ]
   .map(
 (b, i) =>
   `<circle class="bud" style="--b:${i}" cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="#d4a21c"/>`,
   )
   .join("")}
</svg>`;

  const IM = (u, x = "", n = 0) =>
    `<img ${x} src="${esc(u)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='assets/img/fallback.jpg'" style="object-position:${n * 25}% 50%">`;
  const head = (o, c) =>
    `<div class="head${c ? " center" : ""}"><div><p class="eyebrow">${esc(o.eyebrow)}</p><h2>${esc(o.title)}</h2></div>${o.sub ? `<p class="sub">${esc(o.sub)}</p>` : ""}</div>`;
  const cards = (items) =>
    `<div class="cards">${items.map((i) => `<div class="card"><div class="ico">${ic(i.icon)}</div><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p></div>`).join("")}</div>`;
  const statsHtml = (a) =>
    `<div class="stats">${a.map((s) => `<div class="stat"><b data-to="${s.value}" data-suf="${esc(s.suffix)}">0${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`).join("")}</div>`;

  const wp = (a, o, ph) => {
    let p = `M${-720 - ph} ${70 + o}`;
    for (let i = 0; i < 10; i++) {
      const x = i * 720 - 720 - ph;
      p += ` C${x + 120} ${70 + o - a},${x + 240} ${70 + o - a},${x + 360} ${70 + o} S${x + 600} ${70 + o + a},${x + 720} ${70 + o}`;
    }
    return p + ` V0 H-720Z`;
  };
  const layer = (a, o, ph, f) =>
    `<svg viewBox="0 0 2880 150" preserveAspectRatio="none"><path d="${wp(a, o, ph)}" fill="${f}"/></svg>`;
  const waves = (cls, c) =>
    `<div class="wave ${cls}" aria-hidden="true">${layer(34, 26, 0, c + ".22)")}${layer(28, 16, 240, c + ".38)")}${layer(24, 8, 480, c + ".6)")}${layer(18, 0, 120, c + "1)")}</div>`;
  const WAVES =
    waves("", "rgba(253,252,247,") + waves("bot", "rgba(28,51,38,");
