/* Career Path India — Interactive Career Map
   A dependency-free, D3-style SVG flow chart: pan, zoom, collapsible
   branches and a slide-in detail panel. No external libraries. */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var NODE_W = 212;
  var NODE_H = 60;
  var COL = 264;   /* horizontal distance between levels */
  var ROW = 84;    /* vertical distance between sibling rows */
  var MINW = 660;  /* never zoom in closer than this */
  var MINH = 430;

  /* ----------------------------------------------------------
     DATA — the whole after-10th tree
     ---------------------------------------------------------- */
  var ROUTES = [
    {
      id: "pcm", title: "Science — PCM", tag: "Physics \u00B7 Chemistry \u00B7 Maths", accent: "brand",
      desc: "The maths-heavy science stream. Best if you enjoy logic, numbers and building things. Opens engineering, technology, architecture, technical defence, data and pure-science careers.",
      exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CETs", "NATA"],
      links: [
        { label: "Science stream details", href: "streams.html#science" },
        { label: "Engineering careers", href: "careers.html#engineering" },
        { label: "Exams after 12", href: "exams.html#after12" }
      ],
      children: [
        { id: "pcm-eng", title: "Engineering (B.Tech)", tag: "4-yr degree \u00B7 JEE", desc: "The classic engineer's route — computer, mechanical, civil, electrical, electronics and more, through JEE Main/Advanced, BITSAT or a state CET.", exams: ["JEE Main", "JEE Advanced", "BITSAT"], links: [{ label: "Engineering careers", href: "careers.html#engineering" }] },
        { id: "pcm-arch", title: "Architecture (B.Arch)", tag: "5-yr degree \u00B7 NATA", desc: "Design buildings and spaces. Admission is via NATA or JEE Main Paper 2; PCM in Class 11–12 is required.", links: [{ label: "Architecture exams", href: "exams.html#after12" }] },
        { id: "pcm-data", title: "Data & Computing", tag: "B.Tech CSE / BCA / B.Sc CS", desc: "Software development, data science and AI. Skill and projects matter more than the exact degree name.", links: [{ label: "Tech & IT careers", href: "careers.html#tech" }] },
        { id: "pcm-def", title: "Defence (Technical)", tag: "NDA \u00B7 Navy & AF need PCM", desc: "Join the armed forces through NDA. The Navy and Air Force need PCM; the Army accepts any stream.", links: [{ label: "Govt & defence", href: "careers.html#govt" }] },
        { id: "pcm-sci", title: "Pure Science & Research", tag: "B.Sc \u2192 M.Sc \u00B7 INSPIRE", desc: "Physics, chemistry, maths and research careers — supported by scholarships such as INSPIRE.", links: [{ label: "Science careers", href: "careers.html#science" }] }
      ]
    },
    {
      id: "pcb", title: "Science — PCB", tag: "Physics \u00B7 Chemistry \u00B7 Biology", accent: "teal",
      desc: "The biology and health stream. Best if you are fascinated by the human body, health and living things. Opens medicine, dentistry, nursing, pharmacy, biotech and agriculture.",
      exams: ["NEET UG", "ICAR", "State medical tests", "CUET"],
      links: [
        { label: "Science stream details", href: "streams.html#science" },
        { label: "Healthcare careers", href: "careers.html#healthcare" },
        { label: "Exams after 12", href: "exams.html#after12" }
      ],
      children: [
        { id: "pcb-mbbs", title: "Medicine (MBBS)", tag: "5.5-yr \u00B7 NEET UG", desc: "Become a doctor. The single national entrance is NEET UG, taken after Class 12 with Biology.", exams: ["NEET UG"], links: [{ label: "Healthcare careers", href: "careers.html#healthcare" }] },
        { id: "pcb-bds", title: "Dentistry (BDS)", tag: "5-yr \u00B7 NEET UG", desc: "Become a dentist through NEET UG; a strong alternative to MBBS with its own scope.", exams: ["NEET UG"], links: [{ label: "Healthcare careers", href: "careers.html#healthcare" }] },
        { id: "pcb-nurse", title: "Nursing & Allied Health", tag: "NEET / state entrances", desc: "Nursing, physiotherapy, radiology, lab technology, optometry and more — high demand, entered via NEET or state tests.", links: [{ label: "Healthcare careers", href: "careers.html#healthcare" }] },
        { id: "pcb-pharm", title: "Pharmacy (B.Pharm)", tag: "State / NEET based", desc: "Medicines, drug research and the pharma industry. Enter through NEET or state pharmacy entrances.", links: [{ label: "Healthcare careers", href: "careers.html#healthcare" }] },
        { id: "pcb-bio", title: "Biotechnology & Life Sciences", tag: "B.Sc / B.Tech Biotech", desc: "Genetics, microbiology, biotech and research careers, usually via CUET or university tests.", links: [{ label: "Science careers", href: "careers.html#science" }] },
        { id: "pcb-agri", title: "Agriculture & Veterinary", tag: "ICAR \u00B7 B.Sc Agri / B.V.Sc", desc: "Farming science, food technology and animal care through ICAR and state agriculture universities.", links: [{ label: "Agriculture careers", href: "careers.html#agri" }] }
      ]
    },
    {
      id: "pcmb", title: "Science — PCMB", tag: "Both Maths & Biology", accent: "violet",
      desc: "Keep both the engineering and medical doors open. The heaviest Class 11–12 workload, but the widest choice when you reach Class 12.",
      exams: ["JEE Main", "NEET UG", "CUET"],
      links: [{ label: "Science stream details", href: "streams.html#science" }],
      children: [
        { id: "pcmb-eng", title: "Engineering route", tag: "JEE Main / Advanced", desc: "You keep the full engineering option open because Maths is included.", links: [{ label: "Engineering careers", href: "careers.html#engineering" }] },
        { id: "pcmb-med", title: "Medical route", tag: "NEET UG", desc: "You keep the full medical option open because Biology is included.", links: [{ label: "Healthcare careers", href: "careers.html#healthcare" }] },
        { id: "pcmb-sci", title: "Interdisciplinary science", tag: "Research \u00B7 biotech \u00B7 data", desc: "Ideal for fields mixing the two — biostatistics, bioinformatics, biomedical and research careers.", links: [{ label: "Science careers", href: "careers.html#science" }] }
      ]
    },
    {
      id: "commerce", title: "Commerce", tag: "Accounts \u00B7 Business \u00B7 Economics", accent: "amber",
      desc: "The stream of money, markets and business. Leads to CA, CS, CMA, banking, finance, management and entrepreneurship.",
      exams: ["CA Foundation", "CSEET", "CMA Foundation", "CUET", "IPMAT"],
      links: [
        { label: "Commerce stream details", href: "streams.html#commerce" },
        { label: "Finance & business careers", href: "careers.html#finance" }
      ],
      children: [
        { id: "com-ca", title: "Chartered Accountant (CA)", tag: "Foundation \u2192 Inter \u2192 Final", desc: "India's best-known finance qualification. Start CA Foundation right after Class 12 (any stream, Commerce helps).", exams: ["CA Foundation"], links: [{ label: "Finance careers", href: "careers.html#finance" }] },
        { id: "com-cs", title: "Company Secretary / CMA", tag: "CSEET \u00B7 CMA Foundation", desc: "Corporate law and cost accounting careers — entered through CSEET and the CMA Foundation exams.", exams: ["CSEET", "CMA Foundation"], links: [{ label: "Finance careers", href: "careers.html#finance" }] },
        { id: "com-bba", title: "B.Com / BBA / Management", tag: "CUET & university tests", desc: "Business degrees that lead into management, marketing, HR and an eventual MBA (CAT).", exams: ["CUET", "IPMAT"], links: [{ label: "Finance careers", href: "careers.html#finance" }] },
        { id: "com-bank", title: "Banking & Finance", tag: "CUET \u00B7 IBPS/SBI later", desc: "Banking, insurance and financial services — degrees via CUET, then IBPS/SBI exams for jobs.", links: [{ label: "Finance careers", href: "careers.html#finance" }] },
        { id: "com-ent", title: "Entrepreneurship", tag: "Build a business", desc: "Start a venture early; commerce gives you the pricing, accounts and business basics.", links: [{ label: "Finance careers", href: "careers.html#finance" }] }
      ]
    },
    {
      id: "arts", title: "Arts / Humanities", tag: "Languages \u00B7 Social Science \u00B7 Psychology", accent: "rose",
      desc: "The widest variety of careers of any stream. Leads to law, civil services, journalism, design, psychology, teaching and policy.",
      exams: ["CLAT", "AILET", "CUET", "NIFT", "NID", "UCEED"],
      links: [
        { label: "Arts stream details", href: "streams.html#arts" },
        { label: "Law careers", href: "careers.html#law" },
        { label: "Design & media careers", href: "careers.html#creative" }
      ],
      children: [
        { id: "arts-law", title: "Law (BA LLB)", tag: "5-yr \u00B7 CLAT / AILET", desc: "Become a lawyer through a 5-year integrated law degree; open to every stream.", exams: ["CLAT", "AILET"], links: [{ label: "Law careers", href: "careers.html#law" }] },
        { id: "arts-upsc", title: "Civil Services (UPSC)", tag: "After graduation", desc: "IAS/IPS and other central services — you attempt the exam after your degree, from any stream.", links: [{ label: "Govt careers", href: "careers.html#govt" }] },
        { id: "arts-media", title: "Journalism & Media", tag: "CUET / university tests", desc: "Reporting, editing, digital media, PR and content — a fast-moving, people-facing field.", links: [{ label: "Design & media", href: "careers.html#creative" }] },
        { id: "arts-design", title: "Design (B.Des)", tag: "NIFT \u00B7 NID \u00B7 UCEED", desc: "Fashion, product, UX and communication design, entered through NIFT, NID or UCEED. Any stream can apply.", exams: ["NIFT", "NID", "UCEED"], links: [{ label: "Design careers", href: "careers.html#creative" }] },
        { id: "arts-psy", title: "Psychology & Social Work", tag: "CUET based", desc: "Understanding people and helping them — clinical, counselling, organisational psychology and social work.", links: [{ label: "Education & social", href: "careers.html#education" }] },
        { id: "arts-teach", title: "Teaching & Education", tag: "B.El.Ed \u00B7 ITEP \u00B7 B.Ed", desc: "Become a teacher through integrated teacher-education programmes and later B.Ed.", links: [{ label: "Education careers", href: "careers.html#education" }] }
      ]
    },
    {
      id: "diploma", title: "Polytechnic Diploma", tag: "3-year engineering after 10th", accent: "sky",
      desc: "A practical, job-ready engineering route you can join straight after Class 10 — and later use to enter B.Tech in the second year.",
      exams: ["JEECUP", "State POLYCET", "Institute merit"],
      links: [
        { label: "Diploma route details", href: "streams.html#diploma" },
        { label: "Engineering careers", href: "careers.html#engineering" }
      ],
      children: [
        { id: "dip-core", title: "Engineering Diploma", tag: "Civil \u00B7 Mech \u00B7 Electrical \u00B7 CS", desc: "A 3-year hands-on diploma in an engineering branch — you start working sooner than a degree holder.", links: [{ label: "Diploma details", href: "streams.html#diploma" }] },
        { id: "dip-je", title: "Junior Engineer jobs", tag: "Railways \u00B7 PSU \u00B7 state", desc: "Diploma holders are eligible for many junior engineer and technician government posts.", links: [{ label: "Govt careers", href: "careers.html#govt" }] },
        { id: "dip-lateral", title: "Lateral entry to B.Tech", tag: "Join B.Tech in year 2", desc: "After the diploma you can enter the second year of B.Tech and still become a full engineer.", links: [{ label: "Engineering careers", href: "careers.html#engineering" }] }
      ]
    },
    {
      id: "iti", title: "ITI Trade", tag: "1\u20132 year skill certificate", accent: "green",
      desc: "Learn a trade by doing it, then start earning quickly. ITI courses feed industry, PSUs, railways and defence with skilled hands.",
      exams: ["State ITI admission", "Trade merit"],
      links: [
        { label: "ITI route details", href: "streams.html#iti" },
        { label: "Skilled trades careers", href: "careers.html#trades" }
      ],
      children: [
        { id: "iti-trades", title: "Electrician \u00B7 Fitter \u00B7 Welder", tag: "NCVT / SCVT certificate", desc: "Classic trades with steady demand in factories, construction and maintenance.", links: [{ label: "Skilled trades", href: "careers.html#trades" }] },
        { id: "iti-copa", title: "Computer Operator (COPA)", tag: "Office & IT support", desc: "A popular trade for office software, data entry and basic IT support work.", links: [{ label: "Tech & IT careers", href: "careers.html#tech" }] },
        { id: "iti-appr", title: "Apprenticeship \u2192 job", tag: "PSU & private industry", desc: "Apprenticeships convert into jobs across railways, PSUs and private factories.", links: [{ label: "Skilled trades", href: "careers.html#trades" }] },
        { id: "iti-adv", title: "Advanced modules / lateral", tag: "Grow into technician roles", desc: "Add advanced training or a diploma later to move up into technician and supervisor roles.", links: [{ label: "Diploma details", href: "streams.html#diploma" }] }
      ]
    },
    {
      id: "vocational", title: "Vocational / Agriculture", tag: "Practical, job-ready skills", accent: "brand",
      desc: "Hands-on, employment-focused courses in farming, food, travel, sports and creative work — often with government support.",
      exams: ["State vocational admission", "University tests"],
      links: [
        { label: "Other routes details", href: "streams.html#other" },
        { label: "Agriculture careers", href: "careers.html#agri" },
        { label: "Hospitality careers", href: "careers.html#hospitality" }
      ],
      children: [
        { id: "voc-agri", title: "Agriculture & Food Processing", tag: "Farming \u2192 food industry", desc: "From modern farming to food processing and agri-business, with many government schemes.", links: [{ label: "Agriculture careers", href: "careers.html#agri" }] },
        { id: "voc-hosp", title: "Hospitality & Tourism", tag: "Hotels \u00B7 travel \u00B7 NCHM JEE", desc: "Hotel management, travel, tourism and culinary careers through NCHM JEE and institute tests.", exams: ["NCHM JEE"], links: [{ label: "Hospitality careers", href: "careers.html#hospitality" }] },
        { id: "voc-sport", title: "Sports & Physical Education", tag: "BPEd \u00B7 sports science", desc: "Turn a love of sport into coaching, physiotherapy, fitness and sports-science careers.", links: [{ label: "Education & social", href: "careers.html#education" }] },
        { id: "voc-creative", title: "Creative & Media short courses", tag: "Design, video, animation", desc: "Short, practical courses in graphics, video editing, animation and social media.", links: [{ label: "Design & media", href: "careers.html#creative" }] },
        { id: "voc-nios", title: "NIOS second-chance route", tag: "Open schooling flexibility", desc: "Finish Class 10/12 through NIOS or change subjects if you want a fresh start.", links: [{ label: "Other routes", href: "streams.html#other" }] }
      ]
    }
  ];

  var ROOT = {
    id: "root", title: "After Class 10", tag: "Your starting point", accent: "brand",
    desc: "Every student in India stands here after the Class 10 board exam. Eight broad routes lead out — each one opens a different set of subjects, exams and careers. Click a branch to expand it and read its details.",
    leads: ["Science PCM", "Science PCB", "Science PCMB", "Commerce", "Arts / Humanities", "Polytechnic Diploma", "ITI Trade", "Vocational / Agriculture"],
    links: [
      { label: "Compare all streams", href: "streams.html" },
      { label: "Take the Stream Quiz", href: "quiz.html" },
      { label: "Year-by-year roadmap", href: "roadmap.html" }
    ],
    children: ROUTES
  };

  /* ----------------------------------------------------------
     Helpers
     ---------------------------------------------------------- */
  function mk(tag) { return document.createElementNS(NS, tag); }
  function hasKids(n) { return !!(n.children && n.children.length); }
  function clip(s, n) { s = s == null ? "" : String(s); return s.length > n ? s.slice(0, n - 1) + "\u2026" : s; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  var nodeById = {};
  (function index(n) { nodeById[n.id] = n; (n.children || []).forEach(index); })(ROOT);

  /* ----------------------------------------------------------
     Engine (built after DOM is ready)
     ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var svg = document.getElementById("mapSvg");
    var canvas = document.getElementById("mapCanvas");
    if (!svg || !canvas) return;

    var layerLinks = document.getElementById("mapLinks");
    var layerNodes = document.getElementById("mapNodes");
    var panel = document.getElementById("mapPanel");
    var panelBody = document.getElementById("mapPanelBody");
    var panelKicker = document.getElementById("mapPanelKicker");

    var expanded = {};            /* id -> true when a branch is open */
    expanded[ROOT.id] = true;
    var selectedId = null;
    var nodeEls = {};
    var linkEls = {};
    var lastPos = {};

    /* ---------- layout ---------- */
    function computeLayout() {
      var pos = {}, cursor = 0;
      (function walk(node, depth, accent) {
        var kids = hasKids(node) ? node.children : [];
        pos[node.id] = { id: node.id, node: node, depth: depth, accent: accent || node.accent || "brand", x: 0, y: 0 };
        if (!expanded[node.id] || kids.length === 0) {
          pos[node.id].y = cursor;
          cursor += ROW;
        } else {
          kids.forEach(function (k) { walk(k, depth + 1, node.accent); });
          pos[node.id].y = (pos[kids[0].id].y + pos[kids[kids.length - 1].id].y) / 2;
        }
      })(ROOT, 0, "brand");

      Object.keys(pos).forEach(function (id) { pos[id].x = pos[id].depth * COL; });

      var links = [];
      Object.keys(pos).forEach(function (id) {
        var node = pos[id].node;
        if (expanded[id] && hasKids(node)) {
          node.children.forEach(function (k) { links.push({ parent: node, child: k }); });
        }
      });
      return { pos: pos, links: links };
    }

    /* ---------- node construction ---------- */
    function buildNodeEl(node) {
      var g = mk("g");
      g.setAttribute("class", "map-node " + (node.id === "root" ? "root" : (hasKids(node) ? "route" : "leaf")));
      g.setAttribute("data-id", node.id);
      g.setAttribute("role", "button");
      g.setAttribute("tabindex", "0");

      var inner = mk("g"); inner.setAttribute("class", "mn-inner");
      var bg = mk("rect"); bg.setAttribute("class", "mn-bg"); bg.setAttribute("rx", "14");
      bg.setAttribute("width", NODE_W); bg.setAttribute("height", NODE_H);
      var bar = mk("rect"); bar.setAttribute("class", "mn-bar");
      bar.setAttribute("x", "9"); bar.setAttribute("y", "13"); bar.setAttribute("width", "4.5");
      bar.setAttribute("height", NODE_H - 26); bar.setAttribute("rx", "2.25");
      var t1 = mk("text"); t1.setAttribute("class", "mn-title"); t1.setAttribute("x", "22"); t1.setAttribute("y", "25");
      t1.textContent = clip(node.title, 23);
      var t2 = mk("text"); t2.setAttribute("class", "mn-tag"); t2.setAttribute("x", "22"); t2.setAttribute("y", "44");
      t2.textContent = clip(node.tag || "", 28);

      var cb = mk("g"); cb.setAttribute("class", "mn-caret-btn");
      cb.setAttribute("transform", "translate(" + (NODE_W - 16) + "," + (NODE_H / 2) + ")");
      var ring = mk("circle"); ring.setAttribute("r", "11");
      var ct = mk("text"); ct.setAttribute("class", "mn-caret"); ct.setAttribute("y", "4");
      ct.textContent = "+";
      cb.appendChild(ring); cb.appendChild(ct);

      inner.appendChild(bg); inner.appendChild(bar); inner.appendChild(t1); inner.appendChild(t2); inner.appendChild(cb);
      g.appendChild(inner);
      return g;
    }

    function syncNodes(pos) {
      var seen = {};
      Object.keys(pos).forEach(function (id) {
        seen[id] = true;
        var p = pos[id];
        var g = nodeEls[id];
        if (!g) {
          g = buildNodeEl(p.node);
          nodeEls[id] = g;
          layerNodes.appendChild(g);
          g.style.opacity = "0";
          g.style.transform = "translate(" + p.x + "px," + p.y + "px)";
          requestAnimationFrame(function () { g.style.opacity = "1"; });
        } else {
          g.style.transform = "translate(" + p.x + "px," + p.y + "px)";
        }
        g.style.setProperty("--accent", "var(--" + p.accent + ")");
        g.classList.toggle("sel", id === selectedId);
        var caretBtn = g.querySelector(".mn-caret-btn");
        var caretTxt = g.querySelector(".mn-caret");
        if (hasKids(p.node)) {
          caretBtn.style.display = "";
          caretTxt.textContent = expanded[id] ? "\u2212" : "+";
        } else {
          caretBtn.style.display = "none";
        }
        g.setAttribute("aria-expanded", hasKids(p.node) && expanded[id] ? "true" : "false");
        g.setAttribute("aria-label", p.node.title + (p.node.tag ? " \u2014 " + p.node.tag : ""));
      });
      Object.keys(nodeEls).forEach(function (id) {
        if (!seen[id]) { nodeEls[id].remove(); delete nodeEls[id]; }
      });
    }

    function syncLinks(links) {
      var seen = {};
      links.forEach(function (l) {
        var id = l.child.id;
        seen[id] = true;
        var a = lastPos[l.parent.id], b = lastPos[l.child.id];
        if (!a || !b) return;
        var x1 = a.x + NODE_W, y1 = a.y + NODE_H / 2, x2 = b.x, y2 = b.y + NODE_H / 2, mx = x1 + (x2 - x1) / 2;
        var d = "M" + x1 + "," + y1 + " C" + mx + "," + y1 + " " + mx + "," + y2 + " " + x2 + "," + y2;
        var path = linkEls[id];
        if (!path) { path = mk("path"); path.setAttribute("class", "map-link"); linkEls[id] = path; layerLinks.appendChild(path); }
        path.setAttribute("d", d);
        path.classList.toggle("active", l.parent.id === selectedId || l.child.id === selectedId);
      });
      Object.keys(linkEls).forEach(function (id) {
        if (!seen[id]) { linkEls[id].remove(); delete linkEls[id]; }
      });
    }

    function render() {
      var L = computeLayout();
      lastPos = L.pos;
      syncNodes(L.pos);
      syncLinks(L.links);
    }

    /* ---------- viewBox pan / zoom ---------- */
    var vb = { x: 0, y: 0, w: 1000, h: 600 };
    var tweenId = 0;
    function applyVB() { svg.setAttribute("viewBox", vb.x + " " + vb.y + " " + vb.w + " " + vb.h); }
    function setVB(x, y, w, h, animate) {
      tweenId++;
      var my = tweenId;
      if (!animate) { vb.x = x; vb.y = y; vb.w = w; vb.h = h; applyVB(); return; }
      var from = { x: vb.x, y: vb.y, w: vb.w, h: vb.h }, to = { x: x, y: y, w: w, h: h };
      var t0 = (window.performance && performance.now) ? performance.now() : Date.now();
      (function step() {
        if (my !== tweenId) return;
        var now = (window.performance && performance.now) ? performance.now() : Date.now();
        var k = Math.min(1, (now - t0) / 340);
        var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        vb.x = from.x + (to.x - from.x) * e;
        vb.y = from.y + (to.y - from.y) * e;
        vb.w = from.w + (to.w - from.w) * e;
        vb.h = from.h + (to.h - from.h) * e;
        applyVB();
        if (k < 1) requestAnimationFrame(step);
      })();
    }

    function boundsOf(ids) {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      ids.forEach(function (id) {
        var p = lastPos[id]; if (!p) return;
        minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x + NODE_W); maxY = Math.max(maxY, p.y + NODE_H);
      });
      if (minX === Infinity) return null;
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    }

    function fitTo(ids, animate) {
      var b = boundsOf(ids); if (!b) return;
      var pad = 56;
      var w = (b.maxX - b.minX) + pad * 2;
      var h = (b.maxY - b.minY) + pad * 2;
      w = Math.max(w, MINW); h = Math.max(h, MINH);
      var cw = canvas.clientWidth || 1000, ch = canvas.clientHeight || 600, ar = cw / ch;
      if (w / h < ar) w = h * ar; else h = w / ar;
      var x = (b.minX + b.maxX) / 2 - w / 2;
      var y = (b.minY + b.maxY) / 2 - h / 2;
      setVB(x, y, w, h, animate);
    }

    function zoomBy(factor) {
      var cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2;
      setVB(cx - vb.w * factor / 2, cy - vb.h * factor / 2, vb.w * factor, vb.h * factor, true);
    }

    function subtreeIds(node) {
      var ids = [node.id];
      if (expanded[node.id] && hasKids(node)) {
        node.children.forEach(function (c) { ids = ids.concat(subtreeIds(c)); });
      }
      return ids;
    }

    /* ---------- detail panel ---------- */
    function openPanel(node) {
      panelKicker.textContent = node.id === "root" ? "Starting point" : (hasKids(node) ? "Route" : "Path");
      panel.style.setProperty("--accent", "var(--" + (node.accent || "brand") + ")");
      var accent = node.accent || "brand";
      panelBody.innerHTML = "";

      panelBody.appendChild(el("h2", "", node.title));
      if (node.tag) panelBody.appendChild(el("p", "map-panel-tag", node.tag));
      var desc = el("p", "", node.desc || "");
      desc.style.marginTop = "2px";
      panelBody.appendChild(desc);

      if (node.exams && node.exams.length) {
        panelBody.appendChild(el("h4", "", "Key exams"));
        var chips = el("div", "map-chips");
        node.exams.forEach(function (x) { chips.appendChild(el("span", "chip " + accent, x)); });
        panelBody.appendChild(chips);
      }

      if (node.leads && node.leads.length) {
        panelBody.appendChild(el("h4", "", "The eight routes"));
        var lc = el("div", "map-chips");
        node.leads.forEach(function (x) { lc.appendChild(el("span", "chip " + accent, x)); });
        panelBody.appendChild(lc);
      }

      if (hasKids(node)) {
        panelBody.appendChild(el("h4", "", "Branches \u2014 click to explore"));
        var list = el("div", "map-branch-list");
        node.children.forEach(function (c) {
          var b = el("button", "map-branch");
          b.setAttribute("type", "button");
          b.appendChild(el("span", "", c.title));
          b.appendChild(el("span", "arw", "\u2192"));
          b.addEventListener("click", function () { select(c); });
          list.appendChild(b);
        });
        panelBody.appendChild(list);
      }

      if (node.links && node.links.length) {
        panelBody.appendChild(el("h4", "", "Read more"));
        var wrap = el("div", "map-links");
        node.links.forEach(function (l) {
          var a = el("a", "map-btn", l.label);
          a.setAttribute("href", l.href);
          wrap.appendChild(a);
        });
        panelBody.appendChild(wrap);
      }

      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
    }

    function closePanel() {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      if (selectedId) { selectedId = null; render(); }
    }

    /* ---------- selection ---------- */
    function select(node) {
      selectedId = node.id;
      if (hasKids(node)) expanded[node.id] = true;
      render();
      openPanel(node);
      fitTo(subtreeIds(node), true);
    }

    function toggleBranch(id) {
      if (expanded[id]) delete expanded[id]; else expanded[id] = true;
      render();
    }

    /* ---------- events ---------- */
    svg.addEventListener("click", function (e) {
      var t = e.target;
      var nodeG = t.closest ? t.closest(".map-node") : null;
      if (!nodeG) return;
      var id = nodeG.getAttribute("data-id");
      var node = nodeById[id];
      if (!node) return;
      if (t.closest(".mn-caret-btn")) { toggleBranch(id); return; }
      select(node);
    });

    svg.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      var nodeG = e.target.closest ? e.target.closest(".map-node") : null;
      if (!nodeG) return;
      e.preventDefault();
      select(nodeById[nodeG.getAttribute("data-id")]);
    });

    /* pan */
    var dragging = false, lastX = 0, lastY = 0, pid = null;
    canvas.addEventListener("pointerdown", function (e) {
      if (e.target.closest && e.target.closest(".map-node")) return;
      dragging = true; lastX = e.clientX; lastY = e.clientY; pid = e.pointerId;
      canvas.classList.add("grabbing");
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    });
    canvas.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var kx = vb.w / (canvas.clientWidth || 1), ky = vb.h / (canvas.clientHeight || 1);
      var dx = (e.clientX - lastX) * kx, dy = (e.clientY - lastY) * ky;
      lastX = e.clientX; lastY = e.clientY;
      setVB(vb.x - dx, vb.y - dy, vb.w, vb.h, false);
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      canvas.classList.remove("grabbing");
      try { if (pid != null) canvas.releasePointerCapture(pid); } catch (err) {}
    }
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", endDrag);

    /* wheel zoom around pointer */
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      var fx = mx / (canvas.clientWidth || 1), fy = my / (canvas.clientHeight || 1);
      var sx = vb.x + fx * vb.w, sy = vb.y + fy * vb.h;
      var factor = e.deltaY < 0 ? 0.86 : 1.16;
      var nw = vb.w * factor, nh = vb.h * factor;
      setVB(sx - (sx - vb.x) * factor, sy - (sy - vb.y) * factor, nw, nh, false);
    }, { passive: false });

    /* toolbar */
    var expandAll = document.getElementById("mapExpandAll");
    var collapseAll = document.getElementById("mapCollapseAll");
    var zoomIn = document.getElementById("mapZoomIn");
    var zoomOut = document.getElementById("mapZoomOut");
    var fitBtn = document.getElementById("mapFit");
    var closeBtn = document.getElementById("mapPanelClose");

    if (expandAll) expandAll.addEventListener("click", function () {
      Object.keys(nodeById).forEach(function (id) { if (hasKids(nodeById[id])) expanded[id] = true; });
      render(); fitTo(Object.keys(lastPos), true);
    });
    if (collapseAll) collapseAll.addEventListener("click", function () {
      Object.keys(expanded).forEach(function (id) { delete expanded[id]; });
      expanded[ROOT.id] = true;
      if (selectedId) { selectedId = null; closePanel(); }
      render(); fitTo(Object.keys(lastPos), true);
    });
    if (zoomIn) zoomIn.addEventListener("click", function () { zoomBy(0.8); });
    if (zoomOut) zoomOut.addEventListener("click", function () { zoomBy(1.25); });
    if (fitBtn) fitBtn.addEventListener("click", function () { fitTo(Object.keys(lastPos), true); });
    if (closeBtn) closeBtn.addEventListener("click", closePanel);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
    });

    /* ---------- start ---------- */
    render();
    fitTo(Object.keys(lastPos), false);
  });
})();
