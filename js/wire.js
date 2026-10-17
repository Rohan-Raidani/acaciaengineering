  function wire() {
    const hdr = document.getElementById("hdr"),
      nav = document.getElementById("nav"),
      menu = document.getElementById("menu");
    const onS = () => hdr.classList.toggle("solid", scrollY > 20);

    // Floating label for Project Type
    const projectType = document.getElementById("t");

    const updateProjectTypeLabel = () => {
      if (projectType) projectType.classList.toggle("has-value", projectType.value !== "");
    };

    if (projectType) {
      projectType.addEventListener("change", updateProjectTypeLabel);
      updateProjectTypeLabel();
    }
    onS();
    addEventListener("scroll", onS, { passive: true });
    menu.onclick = () => {
      const o = nav.classList.toggle("open");
      hdr.classList.toggle("open", o);
      menu.setAttribute("aria-expanded", o);
    };
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) nav.classList.remove("open");
      hdr.classList.remove("open");
    });

    // count-up stats once visible
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          if (en.target.id === "steps") {
            en.target.classList.add("go");
            return;
          }
          const el = en.target,
            to = +el.dataset.to,
            suf = el.dataset.suf;
          if (reduce) {
            el.textContent = to + suf;
            return;
          }
          const t0 = performance.now();
          (function f(t) {
            const p = Math.min((t - t0) / 1400, 1);
            el.textContent =
              Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
            if (p < 1) requestAnimationFrame(f);
          })(t0);
        }),
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-to]").forEach((e) => io.observe(e));
    const steps = document.getElementById("steps");
    if (steps) io.observe(steps);
    const enquiry = document.getElementById("form");
    if (enquiry) enquiry.addEventListener("submit", send);
    document.getElementById("nl").addEventListener("submit", async (e) => {
      e.preventDefault();
      const st = document.getElementById("nls"),
        em = e.target.email;
      if (!em.checkValidity()) {
        st.textContent = "Please enter a valid email.";
        return;
      }
      try {
        const r = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: "Newsletter signup",
            email: em.value,
            botcheck: "",
          }),
        });
        const j = await r.json();
        st.textContent = j.success
          ? "Subscribed. Thank you!"
          : "Could not subscribe. Please try again.";
        if (j.success) e.target.reset();
      } catch (_) {
        st.textContent = "No connection. Please try again.";
      }
    });
  }

