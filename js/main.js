/* ==========================================================================
   Renovations Elite LLC — Main JS
   Icons, mobile nav, dropdowns, scroll reveal, FAQ, analytics events
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. SVG icon sprite (injected once so pages can use <use href="#i-...">)
     ------------------------------------------------------------------------ */
  var ICONS = {
    "i-phone":
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "i-mail":
      '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    "i-pin":
      '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "i-check":
      '<path d="M20 6 9 17l-5-5"/>',
    "i-arrow":
      '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "i-arrow-right":
      '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "i-caret":
      '<path d="m6 9 6 6 6-6"/>',
    "i-plus":
      '<path d="M12 5v14M5 12h14"/>',
    "i-frame":
      '<path d="M3 3h18v18H3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    "i-shield":
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    "i-message":
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/><path d="m9 10 6 0M9 6l6 0"/>',
    "i-clipboard":
      '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    "i-blueprint":
      '<path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/><circle cx="9" cy="9" r="2.2"/><path d="m5 5 8 8"/>',
    "i-docs":
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    "i-upload":
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    "i-check-circle":
      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    "i-handoff":
      '<path d="M12 3a3 3 0 0 0-3 3v4H7a2 2 0 0 0-2 2v2a6 6 0 0 0 6 6h3a3 3 0 0 0 3-3"/>',
    "i-info":
      '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    "i-home":
      '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    "i-door":
      '<path d="M13 4h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"/><circle cx="12" cy="11" r="1.2"/>',
    "i-hammer":
      '<path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9"/><path d="M17.6 4.4 15 7l2 2 2.6-2.6a2 2 0 0 0-2-4Z"/><path d="m12 9 3 3"/>',
    "i-flame":
      '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    "i-drop":
      '<path d="M12 2.7 6.2 8.5a7 7 0 1 0 11.6 0Z"/>',
    "i-wind":
      '<path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5M3 12h13a2.5 2.5 0 1 1-2.5 2.5M3 16h6a2.5 2.5 0 1 1-2.5 2.5"/>'
  };

  function injectIcons() {
    if (document.getElementById("re-icon-sprite")) return;
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.id = "re-icon-sprite";
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    var defs = document.createElementNS(svgNS, "defs");
    Object.keys(ICONS).forEach(function (name) {
      var symbol = document.createElementNS(svgNS, "symbol");
      symbol.id = name;
      symbol.setAttribute("viewBox", "0 0 24 24");
      symbol.setAttribute("fill", "none");
      symbol.setAttribute("stroke", "currentColor");
      symbol.setAttribute("stroke-width", "2");
      symbol.setAttribute("stroke-linecap", "round");
      symbol.setAttribute("stroke-linejoin", "round");
      symbol.innerHTML = ICONS[name];
      defs.appendChild(symbol);
    });
    svg.appendChild(defs);
    document.body.insertBefore(svg, document.body.firstChild);
  }

  /* ------------------------------------------------------------------------
     2. Header scroll state
     ------------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     3. Mobile navigation
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.querySelector(".mobile-nav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });

    panel.querySelectorAll(".mobile-nav__parent").forEach(function (parent) {
      parent.addEventListener("click", function () {
        parent.classList.toggle("is-expanded");
        parent.setAttribute("aria-expanded", String(parent.classList.contains("is-expanded")));
      });
    });

    panel.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(function () {
      /* leave as-is; tel/mailto links close menu on tap naturally */
    });

    panel.querySelectorAll("a").forEach(function (link) {
      if (link.getAttribute("href") && link.getAttribute("href").charAt(0) !== "#") {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          panel.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      }
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        toggle.setAttribute("aria-expanded", "false");
        panel.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Desktop dropdown keyboard support
     ------------------------------------------------------------------------ */
  function initDropdowns() {
    document.querySelectorAll(".nav-item").forEach(function (item) {
      var link = item.querySelector(".nav-link");
      var panel = item.querySelector(".dropdown");
      if (!panel) return;
      link.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          var opensDropdown = item.classList.contains("has-dropdown");
          if (opensDropdown && !e.shiftKey) {
            e.preventDefault();
            item.classList.toggle("has-open");
            panel.querySelectorAll("a")[0] && panel.querySelectorAll("a")[0].focus();
          }
        }
      });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          item.classList.remove("has-open");
          link.focus();
        }
      });
      panel.addEventListener("mouseleave", function () {
        item.classList.remove("has-open");
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. Scroll reveal
     ------------------------------------------------------------------------ */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------------
     6. FAQ accordion
     ------------------------------------------------------------------------ */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      a.style.maxHeight = "0px";
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        item.classList.toggle("is-open", !isOpen);
        q.setAttribute("aria-expanded", String(!isOpen));
        a.style.maxHeight = isOpen ? "0px" : a.scrollHeight + "px";
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. Analytics events (lightweight, ready for GA4)
     ------------------------------------------------------------------------ */
  function track(event, params) {
    try {
      if (typeof dataLayer !== "undefined") {
        dataLayer.push({ event: event, ...(params || {}) });
      }
      if (typeof gtag === "function") {
        gtag("event", event, params || {});
      }
    } catch (e) {
      /* analytics optional */
    }
  }

  function initAnalytics() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener("click", function () { track("click_phone"); });
    });

    document.querySelectorAll("[data-analytics='refer']").forEach(function (el) {
      el.addEventListener("click", function () { track("refer_project_click"); });
    });

    document.querySelectorAll("[data-analytics='partnership']").forEach(function (el) {
      el.addEventListener("click", function () { track("partnership_click"); });
    });
  }

  /* ------------------------------------------------------------------------
     8. Footer year
     ------------------------------------------------------------------------ */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    injectIcons();
    initHeader();
    initMobileNav();
    initDropdowns();
    initReveal();
    initFaq();
    initAnalytics();
    initYear();
  });
})();
