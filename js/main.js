/* main.js | home page entry point: load the content, then build the page */
  fetch("data/content.json")
    .then((r) => r.json())
    .then(build)
    .catch((e) => {
      document.getElementById("app").innerHTML =
        '<p class="wrap" style="padding-top:140px">Could not load data/content.json. Open the site through a web server, not by double-clicking the file.</p>';
      console.error(e);
    });

