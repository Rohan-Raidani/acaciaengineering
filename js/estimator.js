/* estimator.js | "How big a solar plant do you need?" (home page, #estimate)
   All wording and the maths assumptions live in data/content.json -> "estimator".
     ratePerUnit      Rs per kWh
     unitsPerKwMonth  kWh one kW makes per month (about 4.5 x 30)
     sqftPerKw        shadow-free roof needed per kW
   estimatorHtml(e) returns the markup, initEstimator(e) wires the slider. */
function estimatorHtml(e) {
  return `<div class="wrap est-grid">
 <div><p class="eyebrow">${esc(e.eyebrow)}</p><h2>${esc(e.title)}</h2><p class="est-sub">${esc(e.sub)}</p></div>
 <div class="est-box">
  <div class="est-top"><label for="bill">${esc(e.label)}</label><output id="billOut" for="bill"></output></div>
  <input id="bill" type="range" min="${e.min}" max="${e.max}" step="${e.step}" value="${e.value}">
  <div class="est-res"><div><b id="kw"></b><span>${esc(e.sizeLabel)}</span></div><div><b id="area"></b><span>${esc(e.areaLabel)}</span></div></div>
  <p class="est-note">${esc(e.note)}</p>
  <a class="btn gold" href="#contact">${esc(e.button)} ${ic("arrow")}</a>
 </div></div>`;
}

function initEstimator(e) {
  const bill = document.getElementById("bill");
  if (!bill) return;
  const fmt = (n) => n.toLocaleString("en-IN");
  const update = () => {
    const b = +bill.value;
    const kw = Math.max(1, Math.round(b / e.ratePerUnit / e.unitsPerKwMonth));
    document.getElementById("billOut").textContent = "\u20B9 " + fmt(b);
    document.getElementById("kw").textContent = kw + " kW";
    document.getElementById("area").textContent = fmt(kw * e.sqftPerKw) + " sq ft";
  };
  bill.addEventListener("input", update);
  update();
}
