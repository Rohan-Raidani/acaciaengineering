  function loadBg() {
    document.querySelectorAll("[data-bg]").forEach((el) => {
      el.style.backgroundImage = "url('assets/img/fallback.jpg')";
      const im = new Image();
      im.onload = () => {
        el.style.backgroundImage = `url('${el.dataset.bg}')`;
      };
      im.src = el.dataset.bg;
    });
  }
  function parallax() {
    const hero = document.querySelector(".hero-bg");
    if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let tick = false;
    const upd = () => {
      tick = false;
      if (scrollY < innerHeight * 1.2)
        hero.style.transform = `translate3d(0,${scrollY * 0.28}px,0)`;
    };
    addEventListener(
      "scroll",
      () => {
        if (!tick) {
          tick = true;
          requestAnimationFrame(upd);
        }
      },
      { passive: true },
    );
    upd();
  }
  function reveal() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel =
      ".head,.card,.row,.in-c,.pj,.about .ph,.about>div:last-child,.cta-band,.contact>*,.fgrid>div,.stats:not(.hero-stats .stats),.est-grid>*,.pc";
    document.querySelectorAll(sel).forEach((el) => {
      const k = [...el.parentNode.children].indexOf(el);
      el.style.setProperty("--k", Math.min(k, 6));
      el.classList.add("rv");
    });
    const o = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          o.unobserve(e.target);
          e.target.classList.add("on");
          setTimeout(() => {
            e.target.classList.remove("rv", "on");
            e.target.style.removeProperty("--k");
          }, 1500);
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".rv").forEach((el) => o.observe(el));
  }

