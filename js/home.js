/* home.js | build(d): turns data/content.json into the home page sections.
   To add or reorder a section, edit the list S below. */
  function build(d) {
    const c = d.company;
    document.title = `${c.name} | ${c.tagline}`;
    const S = [
      {
        id: "hero",
        html: `<div class="hero-bg"><img src="${esc(d.hero.image)}" alt="" fetchpriority="high" onerror="this.onerror=null;this.src='assets/img/fallback.jpg'"></div>
 <div class="wrap hero-in"><span class="pill in" style="--d:0"><i></i>${esc(d.hero.pill)}</span>
 <h1 class="in" style="--d:1">${esc(d.hero.title)}</h1>
 <p class="in" style="--d:2">${esc(d.hero.subtitle)}</p>
 <div class="cta in" style="--d:3"><a class="btn" href="#contact">${esc(d.hero.cta)} ${ic("arrow")}</a><a class="btn ghost lt" href="#services">${esc(d.hero.cta2)}</a></div></div>
 <div class="wrap hero-stats">${statsHtml(d.stats)}</div>`,
      },
      {
        id: "band",
        html: `<div>${[0, 1].map(() => d.services.items.map((i) => `<span>${esc(i.name)}</span>`).join("")).join("")}</div>`,
        cls: "band",
      },
      {
        id: "about",
        html: `<div class="wrap about"><div class="ph">${IM(d.about.image)}</div>
 <div><p class="eyebrow">${esc(d.about.eyebrow)}</p><h2>${esc(d.about.title)}</h2><p style="margin-top:20px">${esc(d.about.text)}</p>
 <ul class="ticks">${d.about.points.map((p) => `<li>${ic("check")}<span>${esc(p)}</span></li>`).join("")}</ul>
 <div class="mini">${d.about.stats.map((x) => `<div><b>${esc(x.v)}</b><span>${esc(x.l)}</span></div>`).join("")}</div></div></div>`,
      },
      {
        id: "services",
        cls: "alt",
        html: `<div class="wrap">${head(d.services)}<div class="rows">${d.services.items.map((i) => `<div class="row"><div class="ico">${ic(i.icon)}</div><div class="tx"><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p></div></div>`).join("")}</div></div>`,
      },
      {
        id: "expertise",
        html: `<div class="wrap">${head(d.expertise)}${cards(d.expertise.items)}</div>`,
      },
      {
        id: "estimate",
        cls: "est",
        html: estimatorHtml(d.estimator),
      },
      {
        id: "process",
        cls: "alt",
        html: `<div class="wrap">${head(d.process)}<div class="steps" id="steps">${d.process.items.map((x, i) => `<div class="step" style="--i:${i}"><div class="dot">${String(i + 1).padStart(2, "0")}</div><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p></div>`).join("")}</div></div>`,
      },
      {
        id: "why",
        html: `<div class="wrap">${head(d.why)}${cards(d.why.items)}
 <div class="cta-band">${IM(d.why.cta.image)}<div><h3>${esc(d.why.cta.title)}</h3><p>${esc(d.why.cta.text)}</p></div><a class="btn gold" href="#contact">${esc(d.why.cta.button)} ${ic("arrow")}</a></div></div>`,
      },
      {
        id: "industries",
        html: `<div class="bgimg" data-bg="${esc(d.industries.bg)}"></div>${WAVES}<div class="wrap">${head(d.industries, 1)}
 <div class="ind">${d.industries.items.map((i, idx) => `<article class="in-c">${IM(i.image, "", idx)}<div><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p></div></article>`).join("")}</div>
 <div class="ind-foot"><a class="btn" href="projects.html">${esc(d.industries.button)} ${ic("arrow")}</a></div>${statsHtml(d.industries.stats)}</div>`,
      },
      {
        id: "projects",
        html: `<div class="wrap"><p class="eyebrow">${esc(d.projects.eyebrow)}</p><h2>${esc(d.projects.title)}</h2><div class="proj">${d.projects.items.map((p, idx) => `<article class="pj">${IM(p.image, "", idx * 2)}<div><b>${esc(p.size)}</b><h3>${esc(p.name)}</h3><span>${esc(p.detail)}</span></div></article>`).join("")}</div>
 <div class="ind-foot"><a class="btn" href="projects.html">${esc(d.projects.button || "View all projects")} ${ic("arrow")}</a></div></div>`,
      },
      {
        id: "contact",
        html: `<div class="wrap contact"><div><p class="eyebrow">${esc(d.contact.eyebrow)}</p><h2>${esc(d.contact.title)}</h2><p style="margin-top:16px;color:var(--muted)">${esc(d.contact.text)}</p>
 <ul class="info"><li><span class="ico">${ic("pin")}</span><span>${esc(c.address)}</span></li>
 <li><span class="ico">${ic("phone")}</span><a href="tel:${esc(c.phone.replace(/\s/g, ""))}">${esc(c.phone)}</a></li>
 <li><span class="ico">${ic("mail")}</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li></ul></div>
 <form id="form" novalidate>
  <div class="two"><div class="f"><input id="n" name="name" placeholder=" " required autocomplete="name"><label for="n">Your name *</label></div>
  <div class="f"><input id="e" name="email" type="email" placeholder=" " required autocomplete="email"><label for="e">Email *</label></div></div>
  <div class="two"><div class="f"><input id="co" name="company" placeholder=" " autocomplete="organization"><label for="co">Company</label></div>
  <div class="f"><input id="p" name="phone" placeholder=" " autocomplete="tel"><label for="p">Phone</label></div></div>
  <div class="f sel"><select id="t" name="project_type"><option value=""></option>${d.contact.types.map((t) => `<option>${esc(t)}</option>`).join("")}</select><label for="t">Project type</label></div>
  <div class="f"><textarea id="m" name="message" placeholder=" " required></textarea><label for="m">What would you like to power? *</label></div>
  <input class="hp" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
  <div><button class="btn" type="submit"><span class="spin"></span><span id="bt">Send enquiry</span></button></div>
  <div id="status" role="status" aria-live="polite"></div></form></div>`,
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
    renderChrome(d, true);   // header nav + footer, see chrome.js
    wire();
    initEstimator(d.estimator);   // see estimator.js
    reveal();
    parallax();
    loadBg();

    // If the page was opened with a hash (e.g., index.html#contact), ensure we scroll
    // to the target after the dynamic sections are built. Small timeout lets layout settle.
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }
