/* Career Path India — exam explorer filters (stage + type + search) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.getElementById("examFilters");
    if (!bar) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll(".exam-list .item-card"));
    var sections = Array.prototype.slice.call(document.querySelectorAll("section"));
    var count = document.getElementById("examCount");
    var search = document.getElementById("examSearch");
    var reset = document.getElementById("examReset");
    var empty = document.getElementById("examEmpty");
    var state = { stage: "all", type: "all" };

    function matches(card) {
      if (state.stage !== "all" && card.getAttribute("data-stage") !== state.stage) return false;
      if (state.type !== "all" && card.getAttribute("data-type") !== state.type) return false;
      var q = (search.value || "").trim().toLowerCase();
      if (q && card.textContent.toLowerCase().indexOf(q) === -1) return false;
      return true;
    }

    function apply() {
      var visible = 0;
      cards.forEach(function (c) {
        var ok = matches(c);
        c.classList.toggle("hidden", !ok);
        if (ok) visible++;
      });

      /* hide a filterable section entirely if none of its cards survive */
      var filterable = sections.filter(function (s) { return s.querySelector(".exam-list"); });
      filterable.forEach(function (s) {
        var any = s.querySelectorAll(".exam-list .item-card:not(.hidden)").length > 0;
        s.style.display = (any || (state.stage === "all" && state.type === "all" && !(search.value || "").trim())) ? "" : "none";
      });

      count.textContent = visible + " exam" + (visible === 1 ? "" : "s") + " shown";
      if (empty) empty.classList.toggle("show", visible === 0);
    }

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".filter-btn") : null;
      if (!btn || !btn.dataset.group) return;
      var group = btn.dataset.group;
      state[group] = btn.dataset.value;
      bar.querySelectorAll('.filter-btn[data-group="' + group + '"]').forEach(function (b) {
        b.classList.toggle("on", b === btn);
      });
      apply();
    });

    search.addEventListener("input", apply);

    reset.addEventListener("click", function () {
      state.stage = "all";
      state.type = "all";
      search.value = "";
      bar.querySelectorAll('.filter-btn[data-group]').forEach(function (b) {
        b.classList.toggle("on", b.dataset.value === "all");
      });
      apply();
    });

    /* Deep link: exams.html#school / #after10 / #after12 preselect the stage filter */
    var hash = (location.hash || "").replace("#", "");
    var deepStage = ["school", "after10", "after12"].indexOf(hash) !== -1;
    if (deepStage) {
      state.stage = hash;
      bar.querySelectorAll('.filter-btn[data-group="stage"]').forEach(function (b) {
        b.classList.toggle("on", b.dataset.value === hash);
      });
    }

    apply();

    /* keep the deep-link scroll working even though we applied a filter */
    if (hash) {
      var target = document.getElementById(hash);
      if (target) {
        setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
      }
    }
  });
})();
