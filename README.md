# Acacia Engineering website

The site loads `data/content.json` with fetch(), so open it through a local server
(double-clicking the HTML file will show a "Could not load" message):

    cd acacia-site
    python3 -m http.server 8000      # then open http://localhost:8000
    (or use the VS Code "Live Server" extension)

## Files
index.html / projects.html   page shells (header, footer, script + CSS order)
data/content.json            ALL wording and project data. Edit text here.
css/base.css                 tokens, reset, header, buttons
css/sections.css             hero, about, services, cards, process, contact, footer (+ their responsive rules)
css/upgrade.css              the "v3 visual upgrade" layer (full-screen hero, glass stats, project cards)
css/industries.css           industries wave edge + parallax, form select label
css/additions.css            estimator section + "view all projects" button (home)
css/projects.css             projects page only
js/config.js                 Web3Forms access key
js/icons.js                  ICON paths, ic(), esc()
js/helpers.js                IM, head, cards, statsHtml, waves
js/chrome.js                 nav links (edit NAV) + footer, shared by both pages
js/estimator.js              "How big a solar plant do you need?" (maths settings are in content.json -> estimator)
js/effects.js                background images, parallax, scroll reveal
js/forms.js                  enquiry form submit
js/wire.js                   header scroll, mobile menu, number count-up, newsletter
js/home.js                   builds the home page sections (edit list S to add/reorder)
js/main.js                   home entry point
js/projects-page.js          projects page entry point
js/intro.js                  "Switch on" intro animation (home page; once per tab, add ?intro to replay)

CSS files load in the order listed in each HTML file; later files override earlier ones.
