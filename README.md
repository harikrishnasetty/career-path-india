# Career Path India — After 10th Guide

A free, student-friendly, static website explaining **every career path, stream, exam, skill and sector for Indian students after Class 10** — written so simply that a Class 9 student can understand it.

Live site (edit the URL after you deploy): `https://harikrishnasetty.github.io/career-path-india/`

---

## Why this exists

Most Indian students pick a stream after Class 10 under pressure — from peers, relatives, or a vague fear of "log kya kahenge". Reliable, plain-language information is scattered across coaching ads and confusing government PDFs. This site collects it in one calm place:

- **What changed in 2026** (e.g. CBSE two board exams a year, KVPY discontinued → INSPIRE-SHE, NTSE on hold).
- **Every route after 10th** — Science PCM/PCB/PCMB, Commerce, Arts, Polytechnic Diploma, ITI, vocational/agriculture, defence.
- **The exams**, in the order you'll meet them — in school, after 10th, after 12, and scholarships.
- **50+ careers** across 12 sectors, each with its path, exams, skills and an indicative salary range.
- **Tools** to actually decide: an interactive visual career map, a 12-question Stream Finder quiz, a year-by-year roadmap, and an A–Z glossary.

## Features

- **9 focused pages** — Home, Streams, Exams, Careers, Career Map, Roadmap, Stream Quiz, Glossary, Resources.
- **SEO-first content** — real static HTML text (crawlable), unique `<title>`/meta description/keywords per page, canonical URLs, Open Graph + Twitter cards, and `FAQPage` structured data on the home page.
- **Interactive where it helps** — an interactive SVG **career map** (expand/collapse branches, pan & zoom, click a node for details in a slide-in panel), stream/exam/career filters, glossary search, and the quiz. Everything is vanilla JS, no framework, no build step, and **no external JS libraries** (the map is hand-rolled SVG, no D3/CDN).
- **Light/dark theme** with `localStorage` memory, mobile navigation, smooth scroll and a back-to-top button.
- **Responsive + print styles**, readable on a low-end phone and printable as a handout.
- **Evergreen safety net** — exam dates and rules change yearly, so every card links to its official portal and a disclaimer tells students to verify before applying.

## Project structure

```
career-path-india/
├── index.html          # Home: hero, route grid, "what changed in 2026", sectors, FAQ
├── streams.html        # Science/Commerce/Arts/Diploma/ITI + comparison table + myths
├── exams.html          # Filterable exam explorer (in-school, after10, after12, scholarships)
├── careers.html        # 50+ career cards across 12 sectors, filterable
├── map.html            # Interactive SVG career map (expand/collapse, pan/zoom, detail panel)
├── roadmap.html        # Class 9 → first job timeline + month-by-month exam calendar
├── quiz.html           # Stream Finder quiz (12 questions, 8 routes)
├── glossary.html       # 45+ terms explained simply, searchable A–Z
├── resources.html      # Official portals, free learning, helplines, scam checklist
├── css/
│   └── styles.css      # Full design system (variables, dark theme, components, print)
├── js/
│   ├── app.js          # Shared UI: theme toggle, mobile nav, scroll-top, footer year
│   ├── exams.js        # Exam filters (stage + type + search)
│   ├── careers.js      # Career filters (sector + stream + search)
│   ├── map.js          # Interactive career map engine (SVG tree, pan/zoom, detail panel)
│   ├── glossary.js     # Glossary filter (letter + search)
│   └── quiz.js         # Stream Finder quiz engine + scoring
├── assets/
│   ├── favicon.svg     # Site icon
│   └── banner.svg      # Open Graph / social share image (1200×630)
├── sitemap.xml
├── robots.txt
├── .nojekyll           # Tells GitHub Pages to serve files as-is
├── LICENSE
└── README.md
```

## SEO keywords targeted

Career after 10th · career options after 10th in India · best stream after 10th · what to choose after 10th · science vs commerce vs arts · courses after 10th · entrance exams after 10th · diploma after 10th · ITI courses after 10th · which stream after 10th quiz · career guidance for students India · stream selection after class 10 · exams after 12th · scholarships for students India.

Each page carries its own focused keyword set in `<meta name="keywords">` and a matching description.

## Run locally

No build tools needed. Either:

1. Open `index.html` directly in a browser, or
2. Serve the folder so relative paths and fonts behave exactly like production:

```powershell
# From inside the career-path-india folder, using Python 3
python -m http.server 8000
# then open http://localhost:8000
```

All interactivity is client-side and works offline except the Google Fonts request (which degrades gracefully to the fallback fonts).

## Deploy to GitHub Pages

1. Create a new **public** GitHub repository, e.g. `career-path-india`.
2. From inside this folder:

   ```powershell
   git init
   git add .
   git commit -m "Initial Career Path India site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/career-path-india.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source = "Deploy from a branch"**, Branch = `main`, Folder = `/ (root)`, then **Save**.
4. Wait a minute; the site goes live at `https://<your-username>.github.io/career-path-india/`.
5. **Update the URLs** in `sitemap.xml`, `robots.txt`, and every `<link rel="canonical">`, `og:url`, `og:image` and `twitter:*` tag to match your real GitHub Pages URL (search for `harikrishnasetty.github.io/career-path-india`).
6. Optional: submit the site to Google Search Console and paste the `sitemap.xml` URL so it gets indexed.

## Keeping it accurate

Facts here were checked against official sources for the 2026 cycle, but exam dates, eligibility, fees and scholarship rules change every year. When you update:

- Prefer the official domain over news articles (`.gov.in` / `.nic.in` / `nta.ac.in` etc.).
- Note the change on the relevant card and update the "What changed" section on the home page.
- Never state a hard date without a "confirm on the official portal" note.

## Contributing

This is meant to be shared freely with students, teachers and school counsellors. Fork it, translate it into your state's language, add your state's exam details, or fix anything that has gone out of date, then open a pull request.

## Disclaimer

This is an **independent educational guide**, not affiliated with CBSE, NCERT, NTA, UPSC or any government body. Always confirm details on the official website linked on each page before applying. Salary figures are **indicative 2025–26 Indian ranges** and vary greatly with role, city, institute and skill.

## License

[MIT](LICENSE) — free to use, share and adapt, including for your school or NGO.
