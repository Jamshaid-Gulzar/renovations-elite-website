/* ==========================================================================
   Renovations Elite LLC — Layout injection
   Single source of truth for header, nav, footer, and sticky mobile actions.
   Edit the NAV / FOOTER config below and every page updates.
   ========================================================================== */
(function () {
  "use strict";

  var BRAND = {
    name: "RENOVATIONS ELITE",
    nameAccent: " LLC",
    tagline: "Property-Loss Reconstruction Partner",
    phone: "704-674-8783",
    phoneHref: "tel:+17046748783",
    email: "service@renovationselitellc.com",
    area: "Serving Charlotte Metro and surrounding communities."
  };

  var NAV = [
    { label: "Home", href: "/" },
    {
      label: "Partners",
      href: "/reconstruction-partner/",
      sub: [
        { label: "For Mitigation Companies", href: "/reconstruction-partner/" }
      ]
    },
    {
      label: "Reconstruction Services",
      href: "/reconstruction-services/",
      sub: [
        { label: "Reconstruction Services", href: "/reconstruction-services/", note: "Overview" },
        { label: "Water-Loss Reconstruction", href: "/water-loss-reconstruction/", note: "Water" },
        { label: "Fire-Loss Reconstruction", href: "/fire-loss-reconstruction/", note: "Fire" },
        { label: "Post-Remediation Reconstruction", href: "/post-remediation-reconstruction/", note: "Remediation" },
        { label: "Storm Damage Reconstruction", href: "/storm-damage-reconstruction/", note: "Storm" }
      ]
    },
    { label: "Our Process", href: "/our-process/" },
    { label: "Projects", href: "/projects/", hidden: true },
    { label: "About", href: "/about/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Contact", href: "/contact/" }
  ];

  var FOOTER_SERVICES = [
    { label: "Reconstruction Services", href: "/reconstruction-services/" },
    { label: "Water-Loss Reconstruction", href: "/water-loss-reconstruction/" },
    { label: "Fire-Loss Reconstruction", href: "/fire-loss-reconstruction/" },
    { label: "Post-Remediation Reconstruction", href: "/post-remediation-reconstruction/" },
    { label: "Storm Damage Reconstruction", href: "/storm-damage-reconstruction/" }
  ];

  var FOOTER_COMPANY = [
    { label: "Our Process", href: "/our-process/" },
    { label: "About", href: "/about/" },
    { label: "Service Areas", href: "/service-areas/" },
    { label: "FAQ", href: "/faq/" },
    { label: "Projects", href: "/projects/" },
    { label: "Contact", href: "/contact/" }
  ];

  var currentPath = window.location.pathname;

  function isActive(item) {
    if (item.href === "/") return currentPath === "/" || currentPath === "/index.html";
    return currentPath.indexOf(item.href) === 0;
  }

  function svgUse(id) {
    return '<svg aria-hidden="true" focusable="false"><use href="#' + id + '"/></svg>';
  }

  /* --------------------------------------------------------------------- */
  function buildUtility() {
    return (
      '<div class="utility-bar">' +
      '<div class="container">' +
      '<div class="utility-bar__left">Reconstruction-only partner for <strong>property-loss professionals</strong></div>' +
      '<div class="utility-bar__right">' + svgUse("i-phone") +
      '<a href="' + BRAND.phoneHref + '">Call ' + BRAND.phone + '</a>' +
      '</div></div></div>'
    );
  }

  /* --------------------------------------------------------------------- */
  function buildNavList(includeHidden) {
    var html = '<ul class="nav-list">';
    NAV.forEach(function (item) {
      if (item.hidden && !includeHidden) return;
      var hasSub = item.sub && item.sub.length;
      var active = isActive(item);
      var label = item.label;
      if (hasSub) {
        html +=
          '<li class="nav-item has-dropdown' + (active ? " is-active-parent" : "") + '">' +
          '<a class="nav-link' + (active ? " is-active" : "") + '" href="' + item.href + '" aria-haspopup="true">' +
          label + svgUse("i-caret").replace("<svg", '<svg class="nav-caret"') +
          '</a><div class="dropdown">';
        item.sub.forEach(function (s) {
          html +=
            '<a href="' + s.href + '">' + s.label +
            (s.note ? "<small>" + s.note + "</small>" : "") +
            "</a>";
        });
        html += "</div></li>";
      } else {
        html +=
          '<li class="nav-item"><a class="nav-link' + (active ? " is-active" : "") + '" href="' + item.href + '">' +
          label + "</a></li>";
      }
    });
    html += "</ul>";
    return html;
  }

  /* --------------------------------------------------------------------- */
  function buildHeader() {
    return (
      '<div data-layout="header">' +
      buildUtility() +
      '<header class="site-header"><div class="container nav-wrap">' +
      '<a class="logo" href="/" aria-label="' + BRAND.name + ' home">' +
      '<span class="logo__mark"><span>RE</span></span>' +
      '<span class="logo__text">' +
      '<span class="logo__name">' + BRAND.name + "<em>" + BRAND.nameAccent + "</em></span>" +
      '<span class="logo__tag">' + BRAND.tagline + "</span>" +
      "</span></a>" +
      '<nav class="main-nav" aria-label="Primary">' + buildNavList(false) +
      '<div class="nav-cta"><a class="btn btn--primary" data-analytics="refer" href="/refer-a-project/">Refer a Reconstruction Project</a></div>' +
      "</nav>" +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu">' +
      "<span></span><span></span><span></span></button>" +
      "</div>" +
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile">' +
      '<ul class="mobile-nav__list">';
  }

  function buildMobileNav() {
    var html = "";
    NAV.forEach(function (item) {
      if (item.hidden) return;
      var hasSub = item.sub && item.sub.length;
      var active = isActive(item);
      if (hasSub) {
        html +=
          '<li><div class="mobile-nav__parent" aria-expanded="false">' +
          '<a class="' + (active ? "is-active" : "") + '" href="' + item.href + '" style="color:inherit">' +
          item.label + "</a>" +
          svgUse("i-caret").replace("<svg", '<svg class="nav-caret"') +
          "</div><ul class='mobile-nav__sub'>";
        item.sub.forEach(function (s) {
          html += "<li><a href='" + s.href + "'>" + s.label + "</a></li>";
        });
        html += "</ul></li>";
      } else {
        html +=
          "<li><a href='" + item.href + "' style='color:inherit;display:block'>" + item.label + "</a></li>";
      }
    });
    html +=
      '<li class="mobile-nav__cta"><a class="btn btn--primary" data-analytics="refer" href="/refer-a-project/">Refer a Reconstruction Project</a></li>' +
      '<li class="mobile-nav__cta"><a class="btn btn--outline-light" href="/contact/#partnership">Discuss a Partnership</a></li>' +
      '<li class="mobile-nav__cta"><a class="btn btn--secondary" href="' + BRAND.phoneHref + '">Call ' + BRAND.phone + "</a></li>";
    html += "</ul></nav></div>";
    return html;
  }

  /* --------------------------------------------------------------------- */
  function buildFooter() {
    var links = "";
    NAV.forEach(function (item) {
      if (item.hidden) return;
      links += '<li><a href="' + item.href + '">' + item.label + "</a></li>";
    });
    var services = "";
    FOOTER_SERVICES.forEach(function (s) {
      services += '<li><a href="' + s.href + '">' + s.label + "</a></li>";
    });
    var company = "";
    FOOTER_COMPANY.forEach(function (s) {
      company += '<li><a href="' + s.href + '">' + s.label + "</a></li>";
    });
    return (
      '<footer class="site-footer" data-layout="footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<a class="logo" href="/">' +
      '<span class="logo__mark"><span>RE</span></span>' +
      '<span class="logo__text"><span class="logo__name">' + BRAND.name + "<em>" + BRAND.nameAccent + "</em></span>" +
      '<span class="logo__tag">' + BRAND.tagline + "</span></span></a>" +
      "<p>Reconstruction services after mitigation, remediation, board-up, or contents work. We do not perform mitigation, drying, mold remediation, pack-out, storage, contents cleaning, emergency board-up, public adjusting, or insurance coverage negotiation.</p>" +
      "</div>" +
      '<div><h4>Company</h4><ul class="footer-links">' + links + "</ul></div>" +
      '<div><h4>Services</h4><ul class="footer-links">' + services + "</ul></div>" +
      '<div><h4>Contact</h4><ul class="footer-contact">' +
      '<li>' + svgUse("i-phone") + '<a href="' + BRAND.phoneHref + '">' + BRAND.phone + "</a></li>" +
      '<li>' + svgUse("i-mail") + '<a href="mailto:' + BRAND.email + '">' + BRAND.email + "</a></li>" +
      '<li>' + svgUse("i-pin") + "<span>" + BRAND.area + "</span></li>" +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>&copy; <span data-year></span> " + BRAND.name + BRAND.nameAccent + ". All rights reserved.</span>" +
      '<div class="legal-links"><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms</a></div>' +
      "</div></div></footer>" +
      '<div class="sticky-actions">' +
      '<a class="btn btn--outline-light" href="' + BRAND.phoneHref + '">Call</a>' +
      '<a class="btn btn--primary" data-analytics="refer" href="/refer-a-project/">Refer a Project</a>' +
      "</div>"
    );
  }

  /* --------------------------------------------------------------------- */
  function inject() {
    var headerMount = document.querySelector("[data-layout-header]");
    var footerMount = document.querySelector("[data-layout-footer]");
    if (headerMount) {
      headerMount.innerHTML = buildHeader() + buildMobileNav();
    }
    if (footerMount) {
      footerMount.innerHTML = buildFooter();
    }
  }

  inject();
})();
