/* Career Path India — shared UI behaviour (theme, nav, scroll-top) */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var stored = null;
  try { stored = localStorage.getItem("cpi-theme"); } catch (e) {}
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  function refreshThemeIcon() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var dark = root.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "\u2600" : "\u263D";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.title = btn.getAttribute("aria-label");
  }

  document.addEventListener("DOMContentLoaded", function () {
    refreshThemeIcon();

    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var dark = root.getAttribute("data-theme") === "dark";
        var next = dark ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("cpi-theme", next); } catch (e) {}
        refreshThemeIcon();
      });
    }

    /* ---------- Mobile nav ---------- */
    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (navToggle && nav) {
      navToggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
        navToggle.textContent = open ? "\u2715" : "\u2630";
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("open");
          navToggle.textContent = "\u2630";
        }
      });
    }

    /* ---------- Scroll to top ---------- */
    var top = document.getElementById("scrollTop");
    if (top) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 600) top.classList.add("show");
        else top.classList.remove("show");
      }, { passive: true });
      top.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ---------- Footer year ---------- */
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
