/* Career Path India — Stream Finder quiz engine
   12 questions, weighted scoring across 8 routes after Class 10.
   Runs entirely in the browser; nothing is stored or sent anywhere. */
(function () {
  "use strict";

  /* ---------- The 8 routes scored by the quiz ---------- */
  var ROUTES = {
    pcm: {
      name: "Science — PCM",
      tag: "Physics, Chemistry, Maths",
      link: "streams.html#science",
      desc: "Best if you enjoy maths, logic and building things. Opens engineering, architecture, defence, data science, aviation and pure science."
    },
    pcb: {
      name: "Science — PCB",
      tag: "Physics, Chemistry, Biology",
      link: "streams.html#science",
      desc: "Best if you are fascinated by the human body, health and living things. Opens medicine, dentistry, nursing, pharmacy, biotech and allied health."
    },
    commerce: {
      name: "Commerce",
      tag: "Accounts, Business, Economics",
      link: "streams.html#commerce",
      desc: "Best if you like money, markets, numbers and business. Opens CA, CS, CMA, banking, finance, management and entrepreneurship."
    },
    arts: {
      name: "Arts / Humanities",
      tag: "Languages, Social Science, Psychology",
      link: "streams.html#arts",
      desc: "Best if you love reading, writing, debating, people and ideas. Opens law, civil services, journalism, design, psychology, teaching and policy."
    },
    diploma: {
      name: "Polytechnic Diploma",
      tag: "3-year applied engineering after 10th",
      link: "streams.html#diploma",
      desc: "Best if you want hands-on technical skills and to start earning sooner. Leads to junior engineer roles with lateral entry into B.Tech later."
    },
    iti: {
      name: "ITI / Skilled Trade",
      tag: "1–2 year certificate trades",
      link: "streams.html#iti",
      desc: "Best if you prefer learning by doing with tools and machines. Opens electrician, mechanic, welder, fitter and technician roles with fast employment."
    },
    defence: {
      name: "Defence & Uniformed Services",
      tag: "Army, Navy, Air Force, Police",
      link: "careers.html#govt",
      desc: "Best if you want discipline, fitness, adventure and service to the country. Enter via NDA, Sainik School, Military School or direct recruitment."
    },
    vocational: {
      name: "Vocational & Agriculture",
      tag: "Agriculture, hospitality, media, sports",
      link: "streams.html#other",
      desc: "Best if you want practical, job-ready skills in farming, food, travel, sports or creative work — often with government support schemes."
    }
  };

  /* ---------- Questions ----------
     Every option carries weights: { routeKey: points }. */
  var QUESTIONS = [
    {
      q: "When you get free time, what do you reach for first?",
      hint: "Be honest — there is no wrong answer.",
      opts: [
        { t: "A puzzle, maths problem or coding challenge", i: "01", w: { pcm: 3, diploma: 1 } },
        { t: "A book, article or debate video", i: "02", w: { arts: 3, commerce: 1 } },
        { t: "Something to draw, design or edit", i: "03", w: { arts: 2, vocational: 2 } },
        { t: "Something to open, fix or build with my hands", i: "04", w: { iti: 3, diploma: 2 } }
      ]
    },
    {
      q: "Which school subject do you look forward to the most?",
      hint: "Think about the one that makes time pass quickly.",
      opts: [
        { t: "Maths", i: "01", w: { pcm: 3, commerce: 1 } },
        { t: "Biology / life sciences", i: "02", w: { pcb: 3 } },
        { t: "Social science, history or languages", i: "03", w: { arts: 3 } },
        { t: "Economics, business or accounts-type topics", i: "04", w: { commerce: 3 } }
      ]
    },
    {
      q: "How do you most like to learn something new?",
      hint: "",
      opts: [
        { t: "By understanding the theory and how it works", i: "01", w: { pcm: 2, pcb: 2, commerce: 1 } },
        { t: "By doing it with my own hands", i: "02", w: { iti: 3, diploma: 2, vocational: 1 } },
        { t: "By discussing, reading and writing about it", i: "03", w: { arts: 3 } },
        { t: "By practicing and performing until I get it right", i: "04", w: { defence: 2, vocational: 2 } }
      ]
    },
    {
      q: "Imagine you are 25. Where would you feel proud to work?",
      hint: "",
      opts: [
        { t: "A tech company or a research lab", i: "01", w: { pcm: 3 } },
        { t: "A hospital, clinic or health centre", i: "02", w: { pcb: 3 } },
        { t: "A bank, a company's finance team, or my own business", i: "03", w: { commerce: 3 } },
        { t: "A court, a newsroom, a design studio or a classroom", i: "04", w: { arts: 3 } }
      ]
    },
    {
      q: "Which of these sounds most like you?",
      hint: "",
      opts: [
        { t: "I like numbers and spotting patterns", i: "01", w: { pcm: 2, commerce: 2 } },
        { t: "I like caring for people who are unwell or in need", i: "02", w: { pcb: 3 } },
        { t: "I like convincing people and selling my ideas", i: "03", w: { commerce: 2, arts: 1 } },
        { t: "I like order, rules and working as a team", i: "04", w: { defence: 3 } }
      ]
    },
    {
      q: "An experiment fails and you don't know why. What do you do?",
      hint: "",
      opts: [
        { t: "Break it down, test each step and find the logic", i: "01", w: { pcm: 3, diploma: 1 } },
        { t: "Look closely at the living thing / sample involved", i: "02", w: { pcb: 3 } },
        { t: "Ask around, read up and rethink the idea", i: "03", w: { arts: 2, commerce: 1 } },
        { t: "Take it apart and rebuild it until it works", i: "04", w: { iti: 3, diploma: 2 } }
      ]
    },
    {
      q: "Which job headline excites you most?",
      hint: "",
      opts: [
        { t: "\u201CBuild a bridge / a robot / an app\u201D", i: "01", w: { pcm: 2, diploma: 2 } },
        { t: "\u201CCure a disease / save a life\u201D", i: "02", w: { pcb: 3 } },
        { t: "\u201CGrow a business worth crores\u201D", i: "03", w: { commerce: 3 } },
        { t: "\u201CWin the case / file the story / design the poster\u201D", i: "04", w: { arts: 3 } }
      ]
    },
    {
      q: "How important is it to you to start earning sooner rather than later?",
      hint: "There is no correct answer — it changes the best route for you.",
      opts: [
        { t: "Very important — I want to work within 1–3 years", i: "01", w: { iti: 3, diploma: 2, vocational: 2 } },
        { t: "Somewhat — but a good degree matters too", i: "02", w: { diploma: 2, commerce: 1 } },
        { t: "Not critical — I am happy to study 5–7 more years", i: "03", w: { pcb: 2, pcm: 1, arts: 1 } }
      ]
    },
    {
      q: "In a group project, which role do you naturally take?",
      hint: "",
      opts: [
        { t: "The one who solves the technical/hard part", i: "01", w: { pcm: 3, diploma: 1 } },
        { t: "The one who plans the money, time and resources", i: "02", w: { commerce: 3 } },
        { t: "The one who presents, writes or designs it", i: "03", w: { arts: 3 } },
        { t: "The one who organises everyone and keeps order", i: "04", w: { defence: 3 } }
      ]
    },
    {
      q: "Which outdoor / physical activity appeals most?",
      hint: "",
      opts: [
        { t: "Trekking, running or team sports", i: "01", w: { defence: 3, vocational: 1 } },
        { t: "Working on a farm, in a workshop or on a site", i: "02", w: { vocational: 3, iti: 2 } },
        { t: "Not really into physical work — I prefer desk/creative work", i: "03", w: { pcm: 1, arts: 1, commerce: 1, pcb: 1 } }
      ]
    },
    {
      q: "What kind of impact matters most to you?",
      hint: "",
      opts: [
        { t: "Inventing or building something new", i: "01", w: { pcm: 3, diploma: 1 } },
        { t: "Helping people live healthier lives", i: "02", w: { pcb: 3 } },
        { t: "Creating jobs, wealth or a strong economy", i: "03", w: { commerce: 3 } },
        { t: "Changing minds, society and culture", i: "04", w: { arts: 3 } }
      ]
    },
    {
      q: "Last one. What does success look like to you?",
      hint: "",
      opts: [
        { t: "Solving tough problems others cannot", i: "01", w: { pcm: 3, pcb: 1 } },
        { t: "Being respected as a skilled, hands-on expert", i: "02", w: { iti: 3, diploma: 2 } },
        { t: "Financial security and the freedom to build ventures", i: "03", w: { commerce: 3 } },
        { t: "Fame, recognition or serving the country with honour", i: "04", w: { arts: 1, defence: 3 } }
      ]
    }
  ];

  function $(id) { return document.getElementById(id); }

  function scrollTo(el, block) {
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: block || "start" });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var card = $("questionCard");
    if (!card) return;

    var qText = $("qText"), qHint = $("qHint"), qOpts = $("qOpts");
    var bar = $("quizBar"), status = $("quizStatus");
    var back = $("qBack"), restart = $("qRestart");
    var resultCard = $("resultCard");
    var resultPicks = $("resultPicks"), resultIntro = $("resultIntro"), resultTitle = $("resultTitle");
    var again = $("qAgain");

    var answers = [];   /* index of chosen option per question */
    var step = 0;       /* current question index */

    function render() {
      var q = QUESTIONS[step];
      qText.textContent = q.q;
      qHint.textContent = q.hint || "Pick the option that feels most like you.";
      qOpts.innerHTML = "";
      q.opts.forEach(function (o, idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "q-opt";
        if (answers[step] === idx) btn.style.borderColor = "var(--brand)";
        btn.innerHTML = '<span class="q-ico">' + o.i + '</span><span>' + o.t + '</span>';
        btn.addEventListener("click", function () { choose(idx); });
        qOpts.appendChild(btn);
      });
      status.textContent = "Question " + (step + 1) + " of " + QUESTIONS.length;
      bar.style.width = Math.round(((step) / QUESTIONS.length) * 100) + "%";
      back.style.visibility = step === 0 ? "hidden" : "visible";
    }

    function choose(idx) {
      answers[step] = idx;
      if (step < QUESTIONS.length - 1) {
        step++;
        render();
      } else {
        finish();
      }
    }

    function finish() {
      bar.style.width = "100%";
      status.textContent = "Done!";

      var scores = {};
      for (var k in ROUTES) scores[k] = 0;
      answers.forEach(function (a, qi) {
        var w = QUESTIONS[qi].opts[a].w;
        for (var key in w) scores[key] += w[key];
      });

      /* Rank routes by score (descending) */
      var ranked = Object.keys(scores).map(function (k) {
        return { key: k, score: scores[k] };
      }).sort(function (x, y) { return y.score - x.score; });

      var topScore = ranked[0].score || 1;
      var shown = ranked.filter(function (r) { return r.score > 0; }).slice(0, 3);
      if (shown.length === 0) shown = ranked.slice(0, 3);

      resultPicks.innerHTML = "";
      shown.forEach(function (r, i) {
        var meta = ROUTES[r.key];
        var pct = Math.max(12, Math.round((r.score / topScore) * 100));
        var div = document.createElement("div");
        div.className = "qr-pick" + (i === 0 ? " top" : "");
        div.innerHTML =
          '<span class="qr-rank">' + (i === 0 ? "Best fit" : "Match " + (i + 1)) + '</span>' +
          '<h4>' + meta.name + '</h4>' +
          '<p><strong>' + meta.tag + '.</strong> ' + meta.desc + '</p>' +
          '<div class="qr-meter"><span style="width:' + pct + '%"></span></div>' +
          '<p style="margin-top:12px;"><a href="' + meta.link + '">Read more about ' + meta.name + ' &#8594;</a></p>';
        resultPicks.appendChild(div);
      });

      var firstName = ROUTES[shown[0].key].name;
      resultTitle.textContent = "Your strongest match: " + firstName;
      resultIntro.textContent = "Based on the 12 answers you gave, these routes fit you best. The bars compare how strongly each one matched your interests.";

      card.hidden = true;
      resultCard.hidden = false;
      scrollTo(resultCard, "start");
    }

    function reset() {
      answers = [];
      step = 0;
      resultCard.hidden = true;
      card.hidden = false;
      render();
      scrollTo(card, "center");
    }

    back.addEventListener("click", function () {
      if (step > 0) { step--; render(); }
    });
    restart.addEventListener("click", reset);
    if (again) again.addEventListener("click", reset);

    render();
  });
})();
