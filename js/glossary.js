/* Career Path India — glossary filter (letter + search) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("glossaryList");
    if (!list) return;

    var terms = Array.prototype.slice.call(list.querySelectorAll(".gterm"));
    var search = document.getElementById("glossarySearch");
    var letters = document.getElementById("glossaryLetters");
    var count = document.getElementById("glossaryCount");
    var reset = document.getElementById("glossaryReset");
    var empty = document.getElementById("glossaryEmpty");
    var letter = "all";

    function apply() {
      var q = (search.value || "").trim().toLowerCase();
      var visible = 0;
      terms.forEach(function (t) {
        var okLetter = letter === "all" || t.getAttribute("data-letter") === letter;
        var okText = !q || t.textContent.toLowerCase().indexOf(q) !== -1;
        var ok = okLetter && okText;
        t.classList.toggle("hidden", !ok);
        if (ok) visible++;
      });
      if (count) count.textContent = visible + " term" + (visible === 1 ? "" : "s") + " shown";
      if (empty) empty.classList.toggle("show", visible === 0);
    }

    letters.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".filter-btn") : null;
      if (!btn || !btn.dataset.letter) return;
      letter = btn.dataset.letter;
      letters.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("on", b === btn);
      });
      apply();
    });

    search.addEventListener("input", apply);

    reset.addEventListener("click", function () {
      letter = "all";
      search.value = "";
      letters.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("on", b.dataset.letter === "all");
      });
      apply();
    });

    apply();
  });
})();
