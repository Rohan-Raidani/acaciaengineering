/* Acacia Engineering: "Switch On" intro.
   Loaded from <head> of index.html only: <script src="js/intro.js"></script>
   Flow: OFF switch -> click -> ON + flash -> tagline + power-up loader -> fade to site. */
(() => {
  const CFG = {
    tagline: "Sunlight to Solutions",
    highlight: "Solutions", // word shown in gold
    sub: "Solar engineering · Worldwide projects",
    mark: "assets/img/mark.png",
    oncePerSession: true, // replays once per tab; add ?intro to the URL to force it
    loaderMs: 2800,
  };
  const root = document.documentElement;
  if (
    CFG.oncePerSession &&
    sessionStorage.getItem("acacia-intro") &&
    !/[?&]intro/.test(location.search)
  )
    return;

  /* lock scroll + hold the hero entrance animations until the intro ends */
  root.classList.add("intro-lock");
  const lockCss = document.createElement("style");
  lockCss.textContent =
    "html.intro-lock{overflow:hidden}html.intro-lock .in,html.intro-lock .hero-bg img{animation-play-state:paused!important}";
  document.head.appendChild(lockCss);

  /* Shadow DOM keeps the page's CSS (including its reduced-motion rules) out of the intro */
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;inset:0;z-index:2147483000";
  root.appendChild(host);
  const sh = host.attachShadow({ mode: "open" });

  const words = CFG.tagline.split(" ");
  let li = 0;
  const tagHtml = words
    .map(
      (w) =>
        `<span class="w${w === CFG.highlight ? " g" : ""}">${[...w].map((ch) => `<span style="--i:${li++}">${ch}</span>`).join("")}</span>`,
    )
    .join(" ");

  sh.innerHTML = `
<style>
:host{all:initial}
*{box-sizing:border-box;margin:0;padding:0}
.ov{position:absolute;inset:0;overflow:hidden;color:#fdfcf7;font-family:'Jost',system-ui,sans-serif;
  background:radial-gradient(ellipse at 50% 45%,#10221a 0%,#070f0a 75%);
  transition:opacity .9s ease,transform 1.2s cubic-bezier(.2,.7,.2,1),filter .9s ease}
.ov.out{opacity:0;transform:scale(1.07);filter:blur(8px);pointer-events:none}
.lit{position:absolute;inset:0;opacity:0;transition:opacity 1.2s ease;
  background:radial-gradient(ellipse at 50% 55%,#24523a 0%,#16301f 48%,#0b1a12 100%)}
.ov.on .lit{opacity:1}
.stage{position:absolute;inset:0;display:grid;place-items:center}
.brand{position:absolute;top:7vh;left:0;right:0;text-align:center;font-size:.72rem;letter-spacing:.5em;text-indent:.5em;text-transform:uppercase;opacity:.55;transition:opacity .5s}
.s1.gone .brand,.s1.gone .hint{opacity:0}

/* ---------- switch lock-up ---------- */
.lock{position:relative;width:min(560px,88vw);aspect-ratio:560/330;--ol:rgba(253,252,247,.5);cursor:pointer;
  transition:transform .9s cubic-bezier(.2,.7,.2,1),opacity .6s ease}
.lock.away{opacity:0;transform:scale(1.14)}
.pill{position:absolute;border:3px solid var(--ol);border-radius:999px;transition:border-color .5s,box-shadow .6s}
.p1{left:38%;top:3%;width:60%;height:37%;display:grid;place-items:center;
  font:500 clamp(1.05rem,4.4vw,1.85rem)/1 'Jost',sans-serif;letter-spacing:.34em;text-indent:.34em;transition:color .5s,border-color .5s,box-shadow .6s}
.p2{left:0;top:33%;width:62%;height:40%;background:transparent;color:inherit;font:inherit;cursor:pointer}
.p2:focus-visible{outline:2px solid #d4a21c;outline-offset:8px}
.knob{position:absolute;left:5%;top:14%;height:72%;aspect-ratio:1;border-radius:50%;border:3px solid var(--ol);
  transition:transform .6s cubic-bezier(.5,1.5,.4,1),background .4s,border-color .5s,box-shadow .5s}
.lock:not(.on) .knob::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:2px solid rgba(253,252,247,.55);animation:ping 2.2s ease-out infinite}
.lab{position:absolute;top:50%;transform:translateY(-50%);font:500 clamp(1.05rem,4.2vw,1.75rem)/1 'Jost',sans-serif;letter-spacing:.3em;transition:opacity .4s}
.lab.off{right:9%;text-indent:.3em}.lab.onl{left:11%;opacity:0}
.lock.on{--ol:#e8b630}
.lock.on .pill{box-shadow:0 0 28px rgba(212,162,28,.55),inset 0 0 20px rgba(212,162,28,.22)}
.lock.on .knob{transform:translateX(228%);background:#e8b630;box-shadow:0 0 26px rgba(232,182,48,.9)}
.lock.on .lab.off{opacity:0}.lock.on .lab.onl{opacity:1}
.lock.on .p1{color:#f3d27a}
.hint{position:absolute;bottom:10vh;left:0;right:0;text-align:center;font-size:.78rem;letter-spacing:.34em;text-indent:.34em;text-transform:uppercase;opacity:.7;animation:breathe 2.4s ease-in-out infinite;transition:opacity .4s}
@keyframes ping{0%{transform:scale(1);opacity:.9}100%{transform:scale(1.55);opacity:0}}
@keyframes breathe{50%{opacity:.25}}

/* ---------- flash ---------- */
.flash{position:absolute;left:var(--fx,50%);top:var(--fy,50%);width:20px;height:20px;margin:-10px;border-radius:50%;pointer-events:none;
  background:radial-gradient(circle,#fffaf0 0%,#f7d98a 42%,rgba(212,162,28,0) 70%);transform:scale(0);opacity:0}
.flash.go{animation:fl 1.1s ease-out forwards}
@keyframes fl{0%{transform:scale(0);opacity:1}55%{opacity:.9}100%{transform:scale(300);opacity:0}}

/* ---------- tagline + loader ---------- */
.s2{opacity:0;pointer-events:none;transition:opacity .8s ease}
.s2.show{opacity:1}
.rays{position:absolute;left:50%;top:50%;width:170vmax;height:170vmax;margin:-85vmax 0 0 -85vmax;opacity:0;transition:opacity 1.6s ease;
  background:repeating-conic-gradient(rgba(226,176,44,.17) 0 2.5deg,transparent 2.5deg 11deg);
  -webkit-mask:radial-gradient(circle,#000 0,transparent 46%);mask:radial-gradient(circle,#000 0,transparent 46%);animation:spin 70s linear infinite}
.s2.show .rays{opacity:1}
.col{position:relative;display:grid;justify-items:center;gap:26px;text-align:center;padding:0 6%}
.badge{position:relative;width:124px;height:124px;border-radius:50%;background:#fdfcf7;display:grid;place-items:center;
  box-shadow:0 0 0 7px rgba(212,162,28,.16),0 24px 60px rgba(0,0,0,.45),0 0 90px rgba(226,176,44,.45);transform:scale(.6);opacity:0}
.badge img{width:80%;height:auto;display:block}
.badge::before{content:"";position:absolute;inset:-15px;border-radius:50%;
  background:conic-gradient(from 0deg,transparent 0 55%,#e8b630 100%);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2px));mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 2px));
  animation:spin 1.5s linear infinite}
.s2.show .badge{animation:pop .9s cubic-bezier(.3,1.4,.4,1) .1s forwards}
.tag{font:600 clamp(2.5rem,8.5vw,5.4rem)/1.05 'Cormorant Garamond',Georgia,serif;letter-spacing:.01em}
.tag .w{display:inline-block;white-space:nowrap}.tag .g{color:#eab93a}
.tag .w>span{display:inline-block;opacity:0;transform:translateY(.55em);filter:blur(8px)}
.s2.show .tag .w>span{animation:rise .8s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:calc(.55s + var(--i)*45ms)}
.sub{font-size:.8rem;letter-spacing:.34em;text-indent:.34em;text-transform:uppercase;opacity:0}
.s2.show .sub{animation:fade .8s ease 1.5s forwards}
.meter{display:grid;gap:12px;width:min(430px,80vw);opacity:0}
.s2.show .meter{animation:fade .6s ease 1.5s forwards}
.cells{display:grid;grid-template-columns:repeat(14,1fr);gap:5px}
.cells i{height:13px;border-radius:3px;background:rgba(253,252,247,.14);transition:background .25s,box-shadow .25s}
.cells i.f{background:linear-gradient(#f5cf63,#d4a21c);box-shadow:0 0 14px rgba(232,182,48,.75)}
.pct{display:flex;justify-content:space-between;font-size:.74rem;letter-spacing:.3em;text-transform:uppercase;opacity:.85}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pop{to{transform:scale(1);opacity:1}}
@keyframes rise{to{opacity:1;transform:none;filter:none}}
@keyframes fade{to{opacity:1}}
.skip{position:absolute;right:22px;bottom:20px;background:none;border:0;color:#fdfcf7;opacity:.5;font:500 .75rem 'Jost',sans-serif;letter-spacing:.25em;text-transform:uppercase;cursor:pointer;padding:10px}
.skip:hover{opacity:1}
</style>
<div class="ov" role="dialog" aria-label="Welcome to Acacia Engineering">
  <div class="lit"></div>
  <div class="stage s1">
    <div class="brand">Acacia Engineering</div>
    <div class="lock" id="lock">
      <div class="pill p1">SWITCH</div>
      <button class="pill p2" role="switch" aria-checked="false" aria-label="Switch on">
        <span class="knob"></span><span class="lab off">OFF</span><span class="lab onl">ON</span>
      </button>
    </div>
    <div class="hint">Tap the switch to power up</div>
  </div>
  <div class="flash"></div>
  <div class="stage s2">
    <div class="rays"></div>
    <div class="col">
      <div class="badge"><img src="${CFG.mark}" alt=""></div>
      <h1 class="tag" aria-label="${CFG.tagline}">${tagHtml}</h1>
      <p class="sub">${CFG.sub}</p>
      <div class="meter"><div class="cells">${"<i></i>".repeat(14)}</div><div class="pct"><span class="msg">Powering up</span><span class="num">0%</span></div></div>
    </div>
  </div>
  <button class="skip">Skip</button>
</div>`;

  const $ = (s) => sh.querySelector(s);
  const ov = $(".ov"),
    lock = $("#lock"),
    sw = $(".p2"),
    s1 = $(".s1"),
    s2 = $(".s2"),
    flash = $(".flash");
  const cells = [...sh.querySelectorAll(".cells i")],
    num = $(".num"),
    msg = $(".msg");
  const ready = new Promise((res) => {
    if (document.readyState === "complete") res();
    else {
      addEventListener("load", res, { once: true });
      setTimeout(res, 8000);
    }
  });
  let on = false,
    finished = false;
  const later = (fn, ms) => setTimeout(fn, ms);

  function powerOn() {
    if (on) return;
    on = true;
    sw.setAttribute("aria-checked", "true");
    lock.classList.add("on");
    ov.classList.add("on");
    const pr = sw.getBoundingClientRect();
    flash.style.setProperty(
      "--fx",
      pr.right - pr.width * 0.05 - pr.height * 0.36 + "px",
    );
    flash.style.setProperty("--fy", pr.top + pr.height / 2 + "px");
    later(() => flash.classList.add("go"), 520); // the flash
    later(() => {
      lock.classList.add("away");
      s1.classList.add("gone");
    }, 900);
    later(() => {
      s2.classList.add("show");
      load();
    }, 1350);
  }

  function load() {
    const t0 = performance.now(),
      D = CFG.loaderMs;
    (function tick(t) {
      const p = Math.min((t - t0) / D, 1),
        e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const n = Math.round(e * 100);
      num.textContent = n + "%";
      cells.forEach((c, i) =>
        c.classList.toggle(
          "f",
          i < Math.floor(e * cells.length + (p === 1 ? 1 : 0)),
        ),
      );
      if (p < 1) requestAnimationFrame(tick);
      else {
        msg.textContent = "Ready";
        later(finish, 700);
      }
    })(t0);
  }

  async function finish(fast) {
    if (finished) return;
    finished = true;
    if (fast !== true) await ready;
    ov.classList.add("out");
    try {
      sessionStorage.setItem("acacia-intro", "1");
    } catch (_) {}
    later(
      () => {
        host.remove();
        root.classList.remove("intro-lock");
        lockCss.remove();
        scrollTo(0, 0);
      },
      fast === true ? 700 : 1200,
    );
  }

  lock.addEventListener("click", powerOn);
  $(".skip").addEventListener("click", () => finish(true));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") finish(true);
  });
  later(() => sw.focus({ preventScroll: true }), 300);
})();
