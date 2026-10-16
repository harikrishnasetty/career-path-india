/* Career Path India — career explorer filters (sector + stream + search) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.getElementById("careerFilters");
    if (!bar) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll(".career-list .item-card"));
    var sections = Array.prototype.slice.call(document.querySelectorAll("section"));
    var count = document.getElementById("careerCount");
    var search = document.getElementById("careerSearch");
    var reset = document.getElementById("careerReset");
    var empty = document.getElementById("careerEmpty");
    var state = { sector: "all", stream: "all" };

    function tokens(card, attr) {
      return (" " + (card.getAttribute(attr) || "") + " ").replace(/\s+/g, " ");
    }

    function matches(card) {
      if (state.sector !== "all" && card.getAttribute("data-sector") !== state.sector) return false;
      if (state.stream !== "all") {
        var streams = tokens(card, "data-stream");
        if (streams.indexOf(" " + state.stream + " ") === -1 && streams.indexOf(" any ") === -1) return false;
      }
      var q = (search.value || "").trim().toLowerCase();
      if (q && card.textContent.toLowerCase().indexOf(q) === -1) return false;
      return true;
    }

    function isFiltering() {
      return state.sector !== "all" || state.stream !== "all" || !!(search.value || "").trim();
    }

    function apply() {
      var visible = 0;
      cards.forEach(function (c) {
        var ok = matches(c);
        c.classList.toggle("hidden", !ok);
        if (ok) visible++;
      });

      /* hide a filterable section entirely if none of its cards survive */
      var filterable = sections.filter(function (s) { return s.querySelector(".career-list"); });
      filterable.forEach(function (s) {
        var any = s.querySelectorAll(".career-list .item-card:not(.hidden)").length > 0;
        s.style.display = (any || !isFiltering()) ? "" : "none";
      });

      if (count) count.textContent = visible + " career" + (visible === 1 ? "" : "s") + " shown";
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
      state.sector = "all";
      state.stream = "all";
      search.value = "";
      bar.querySelectorAll('.filter-btn[data-group]').forEach(function (b) {
        b.classList.toggle("on", b.dataset.value === "all");
      });
      apply();
    });

    /* Deep link: careers.html#tech / #finance … preselect the sector filter */
    var hash = (location.hash || "").replace("#", "");
    var known = bar.querySelectorAll('.filter-btn[data-group="sector"]');
    var deepSector = false;
    known.forEach(function (b) { if (b.dataset.value === hash) deepSector = true; });
    if (deepSector) {
      state.sector = hash;
      known.forEach(function (b) { b.classList.toggle("on", b.dataset.value === hash); });
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
