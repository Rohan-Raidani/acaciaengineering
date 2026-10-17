  async function send(e) {
    e.preventDefault();
    const f = e.target,
      st = document.getElementById("status"),
      b = f.querySelector("button"),
      bt = document.getElementById("bt");
    st.className = "";
    if (
      !f.name.value.trim() ||
      !f.email.checkValidity() ||
      !f.email.value ||
      !f.message.value.trim()
    ) {
      st.className = "err";
      st.textContent =
        "Please add your name, a valid email and a short message.";
      return;
    }
    const data = Object.fromEntries(new FormData(f));
    data.access_key = WEB3FORMS_KEY;
    data.subject = "New enquiry from acaciaengineering.in";
    b.disabled = true;
    bt.textContent = "Sending";
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (j.success) {
        st.className = "ok";
        st.textContent =
          "Thank you. We have your enquiry and will call you within one working day.";
        f.reset();
      } else {
        st.className = "err";
        st.textContent =
          "The message did not send. Please email us directly.";
      }
    } catch (_) {
      st.className = "err";
      st.textContent =
        "No connection. Please check your internet and try again.";
    }
    b.disabled = false;
    bt.textContent = "Send enquiry";
  }
