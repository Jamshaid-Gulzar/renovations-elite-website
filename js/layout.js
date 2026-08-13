/* ==========================================================================
   Renovations Elite LLC — Nav active states
   Header/footer are now static HTML in every page. This script only
   highlights the current page in the desktop and mobile navigation.
   ========================================================================== */
(function () {
  "use strict";

  var currentPath = window.location.pathname;

  function matches(href) {
    if (!href) return false;
    var base = href.split("#")[0];
    if (base === "/") return currentPath === "/" || currentPath === "/index.html";
    return currentPath.indexOf(base) === 0;
  }

  function markActive() {
    document.querySelectorAll(".nav-link, .mobile-nav__list a, .mobile-nav__sub a").forEach(function (link) {
      if (matches(link.getAttribute("href"))) {
        link.classList.add("is-active");
      }
    });

    document.querySelectorAll(".nav-item").forEach(function (item) {
      var link = item.querySelector(".nav-link");
      if (link && matches(link.getAttribute("href"))) {
        item.classList.add("is-active-parent");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markActive);
  } else {
    markActive();
  }
})();
