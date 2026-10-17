/* projects-page.js | projects.html entry point (uses the shared helpers, chrome.js and wire.js).
   Content comes from data/content.json:
     projectsPage         page wording + filter categories
     projects.items       the cards (category, size, name, detail, summary, specs, image)
     industries.stats     numbers in the hero
     services / why       reused for the capability rows and the "stand out" cards */
fetch("data/content.json")
  .then((r) => r.json())
  .then(buildProjectsPage)
  .catch((e) => {
    document.getElementById("app").innerHTML =
      '<p class="wrap" style="padding-top:140px">Could not load data/content.json. Open the site through a web server, not by double-clicking the file.</p>';
    console.error(e);
  });

function pcard(p, cats) {
  const specs = (p.specs || [])
    .map((s) => `<div><dt>${esc(s[0])}</dt><dd>${esc(s[1])}</dd></div>`)
    .join("");
  return `<article class="pc"><div class="pc-img">${IM(p.image)}<span class="pc-size">${esc(p.size)}</span></div>
 <div class="pc-body"><p class="pc-tag">${esc(cats[p.category] || p.category)}</p><h3>${esc(p.name)}</h3>
 <p class="pc-loc">${esc(p.detail)}</p><p class="pc-sum">${esc(p.summary || "")}</p>
 <dl class="pc-specs">${specs}</dl></div></article>`;
}

function buildProjectsPage(d) {
  const c = d.company,
    pp = d.projectsPage,
    items = d.projects.items,
    cats = pp.categories;
  document.title = `Projects | ${c.name}`;

  const pick = (list, names) => names.map((n) => list.find((i) => i.name === n)).filter(Boolean);

  const S = [
    {
      id: "hero",
      cls: "phero",
      html: `<div class="hero-bg"><img src="${esc(d.hero.image)}" alt="" fetchpriority="high" onerror="this.onerror=null;this.src='assets/img/fallback.jpg'"></div>
 <div class="wrap hero-in"><span class="pill in" style="--d:0"><i></i>${esc(pp.pill)}</span>
 <h1 class="in" style="--d:1">${esc(pp.title)}</h1>
 <p class="in" style="--d:2">${esc(pp.sub)}</p>
 <div class="cta in" style="--d:3"><a class="btn" href="#portfolio">${esc(pp.cta)} ${ic("arrow")}</a><a class="btn ghost lt" href="index.html#contact">${esc(pp.cta2)}</a></div></div>
 <div class="wrap hero-stats">${statsHtml(d.industries.stats)}</div>`,
    },
    {
      id: "portfolio",
      cls: "alt",
      html: `<div class="wrap">${head({ eyebrow: d.projects.eyebrow, title: pp.portfolioTitle })}
 <div class="ptools"><div class="chips" id="chips" role="group" aria-label="Filter projects by type"></div><p class="pcount" id="pcount" aria-live="polite"></p></div>
 <div class="pgrid" id="pgrid"></div></div>`,
    },
    {
      id: "capabilities",
      html: `<div class="wrap">${head({ eyebrow: pp.capsEyebrow, title: pp.capsTitle, sub: pp.capsSub })}
 <div class="rows">${pick(d.services.items, pp.capsNames)
   .map((i) => `<div class="row"><div class="ico">${ic(i.icon)}</div><div class="tx"><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p></div></div>`)
   .join("")}</div></div>`,
    },
    {
      id: "stand",
      cls: "alt",
      html: `<div class="wrap">${head({ eyebrow: pp.standEyebrow, title: pp.standTitle, sub: pp.standSub })}${cards(pick(d.why.items, pp.standNames))}
 <div class="cta-band">${IM(d.why.cta.image)}<div><h3>${esc(d.why.cta.title)}</h3><p>${esc(d.why.cta.text)}</p></div><a class="btn gold" href="index.html#contact">${esc(d.why.cta.button)} ${ic("arrow")}</a></div></div>`,
    },
  ];

  const app = document.getElementById("app");
  S.forEach((x) => {
    const el = document.createElement("section");
    el.id = x.id;
    if (x.cls) el.className = x.cls;
    el.innerHTML = x.html;
    app.appendChild(el);
  });

  renderChrome(d, false);

  // filter chips + cards
  const grid = document.getElementById("pgrid"),
    chipBox = document.getElementById("chips"),
    count = document.getElementById("pcount");
  const render = (f) => {
    const list = items.filter((p) => f === "all" || p.category === f);
    grid.innerHTML = list.map((p) => pcard(p, cats)).join("");
    count.textContent = list.length + (list.length === 1 ? " project" : " projects");
  };
  const keys = ["all"].concat(Object.keys(cats).filter((k) => items.some((p) => p.category === k)));
  chipBox.innerHTML = keys
    .map((k, i) => `<button type="button" class="chip" data-f="${k}" aria-pressed="${i === 0}">${k === "all" ? "All" : esc(cats[k])}</button>`)
    .join("");
  chipBox.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    [...chipBox.children].forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    render(b.dataset.f);
  });
  render("all");

  wire();
  reveal();
  parallax();
}
