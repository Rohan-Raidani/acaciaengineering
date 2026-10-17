/* chrome.js | header navigation + footer, shared by index.html and projects.html.
   renderChrome(d, home): d = content.json, home = true on index.html.
   To add / rename / reorder a nav link, edit NAV below (one place for both pages). */
const NAV = [
  ["about", "About"],
  ["services", "Services"],
  ["expertise", "Expertise"],
  ["estimate", "Estimate"],
  ["process", "Process"],
  ["why", "Why Us"],
  ["industries", "Industries"],
  ["projects", "Projects"],
];

function navHref(id, home) {
  if (id === "projects") return "projects.html"; // its own page
  return (home ? "" : "index.html") + "#" + id; // section on the home page
}

function renderChrome(d, home) {
  const c = d.company,
    f = d.footer,
    soc = f.socials.filter((x) => x.url);
  const link = (id, label) =>
    `<a href="${navHref(id, home)}"${!home && id === "projects" ? ' aria-current="page"' : ""}>${label}</a>`;
  const contact = (home ? "" : "index.html") + "#contact";

  document.getElementById("nav").innerHTML =
    NAV.map(([id, l]) => link(id, l)).join("") +
    `<a class="btn" href="${contact}">Contact us</a>`;

  document.getElementById("foot").innerHTML =
    `<div class="fgrid"><div><img src="assets/img/mark.png" alt="Acacia Engineering mark"><p style="margin:0;max-width:32ch">${esc(f.blurb)}</p>
 ${soc.length ? `<div class="soc">${soc.map((x) => `<a href="${esc(x.url)}" target="_blank" rel="noopener" aria-label="${esc(x.name)}">${ic(x.icon)}</a>`).join("")}</div>` : ""}</div>
 <div><h4>Explore</h4>${NAV.map(([id, l]) => link(id, l)).join("")}<a href="${contact}">Contact</a></div>
 <div><h4>${esc(f.newsTitle)}</h4><form class="nl" id="nl"><input type="email" name="email" placeholder="Your email" aria-label="Email" required><button class="btn" type="submit">Subscribe</button></form><div id="nls" role="status" style="min-height:1.5em;margin-top:8px;font-size:.9rem"></div></div></div>
 <div class="fbot"><span>© ${new Date().getFullYear()} ${esc(c.name)}, ${esc(c.location)}</span><span>${esc(c.tagline)}</span></div>`;
}
