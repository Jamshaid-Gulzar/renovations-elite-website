/* ==========================================================================
   Renovations Elite LLC — Forms
   Validation, file uploads, submission routing, success states
   ========================================================================== */
(function () {
  "use strict";

  var FORM_ENDPOINT = "https://formsubmit.co/ajax/service@renovationselitellc.com";

  function track(event, params) {
    try {
      if (typeof dataLayer !== "undefined") dataLayer.push({ event: event, ...(params || {}) });
      if (typeof gtag === "function") gtag("event", event, params || {});
    } catch (e) {}
  }

  /* ------------------------------------------------------------------------
     1. File upload chips (referral form)
     ------------------------------------------------------------------------ */
  function initFileUploads() {
    document.querySelectorAll("[data-file-drop]").forEach(function (drop) {
      var input = drop.querySelector('input[type="file"]');
      var list = document.getElementById(drop.getAttribute("data-file-list"));
      if (!input || !list) return;

      var showFiles = function () {
        list.innerHTML = "";
        Array.prototype.forEach.call(input.files, function (file, i) {
          var chip = document.createElement("div");
          chip.className = "file-chip";
          chip.textContent = file.name;
          var remove = document.createElement("button");
          remove.type = "button";
          remove.setAttribute("aria-label", "Remove " + file.name);
          remove.textContent = "\u00d7";
          remove.addEventListener("click", function () {
            try {
              var dt = new DataTransfer();
              Array.prototype.forEach.call(input.files, function (f, j) {
                if (j !== i) dt.items.add(f);
              });
              input.files = dt.files;
            } catch (e) {
              input.value = "";
            }
            showFiles();
          });
          chip.appendChild(remove);
          list.appendChild(chip);
        });
        if (input.files.length) {
          track("file_upload_used");
        }
      };

      input.addEventListener("change", showFiles);
      ["dragenter", "dragover"].forEach(function (evt) {
        drop.addEventListener(evt, function (e) {
          e.preventDefault();
          drop.classList.add("is-dragover");
        });
      });
      ["dragleave", "drop"].forEach(function (evt) {
        drop.addEventListener(evt, function (e) {
          e.preventDefault();
          drop.classList.remove("is-dragover");
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Validation
     ------------------------------------------------------------------------ */
  function setError(field, message) {
    var wrap = field.closest(".form-field");
    if (!wrap) return false;
    wrap.classList.add("has-error");
    var msg = wrap.querySelector(".form-error");
    if (msg) msg.textContent = message || "";
    return false;
  }

  function clearError(field) {
    var wrap = field.closest(".form-field");
    if (wrap) wrap.classList.remove("has-error");
  }

  function validateForm(form) {
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var valid = true;
      if (field.type === "checkbox" || field.type === "radio") {
        var group = form.querySelectorAll('[name="' + field.name + '"]');
        valid = Array.prototype.some.call(group, function (c) { return c.checked; });
      } else if (field.type === "email") {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      } else if (field.type === "tel") {
        valid = field.value.trim().length >= 7;
      } else if (field.type === "file") {
        valid = field.files.length > 0;
      } else {
        valid = field.value.trim().length > 0;
      }
      if (!valid) {
        setError(field, field.dataset.errormessage || "This field is required.");
        ok = false;
      } else {
        clearError(field);
      }
    });

    if (!ok) {
      var banner = form.querySelector(".form-validation-banner");
      if (!banner) {
        banner = document.createElement("div");
        banner.className = "form-validation-banner";
        banner.setAttribute("role", "alert");
        banner.style.cssText = "background:#fdf3f2;border:2px solid #b0413e;color:#b0413e;padding:14px 18px;border-radius:8px;margin-bottom:18px;font-weight:600;font-size:0.95rem;";
        form.insertBefore(banner, form.firstChild);
      }
      banner.textContent = "Please fill in all required fields before submitting.";
      banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return ok;
  }

  function bindLiveClear(form) {
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () { clearError(field); });
      field.addEventListener("change", function () { clearError(field); });
    });
  }

  /* ------------------------------------------------------------------------
     3. Submission
     ------------------------------------------------------------------------ */
  function showSuccess(form) {
    var card = form.closest(".form-card");
    var success = form.querySelector(".form-success");
    form.style.display = "none";
    if (success) {
      success.classList.add("is-visible");
    } else if (card) {
      var div = document.createElement("div");
      div.className = "form-success is-visible";
      div.innerHTML =
        '<div class="form-success__icon"><svg aria-hidden="true"><use href="#i-check-circle"/></svg></div>' +
        '<h3>Thank You</h3>' +
        '<p>Your submission has been received. A Renovations Elite representative will review it and follow up using the contact details provided.</p>';
      card.appendChild(div);
    }
  }

  function showFormError(form) {
    var banner = form.querySelector(".form-submit-error");
    if (!banner) {
      banner = document.createElement("p");
      banner.className = "form-submit-error";
      banner.style.cssText =
        "color:#b0413e;font-weight:600;font-size:0.92rem;margin-top:14px;";
      var submit = form.querySelector("[type='submit']");
      if (submit && submit.parentNode) submit.parentNode.appendChild(banner);
    }
    banner.textContent =
      "Sorry, there was a problem sending your message. Please try again or call 704-674-8783.";
  }

  function initForms() {
    document.querySelectorAll("form[data-form]").forEach(function (form) {
      var submitBtn = form.querySelector('[type="submit"]');
      var formType = form.getAttribute("data-form");
      var endpoint = form.getAttribute("data-endpoint") || FORM_ENDPOINT;

      bindLiveClear(form);

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        /* Honeypot */
        var hp = form.querySelector('.hp-field input[name="company_website"]');
        if (hp && hp.value) return;

        if (!validateForm(form)) return;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending…";
        }

        var data = {};
        form.querySelectorAll("input, select, textarea").forEach(function (field) {
          if (!field.name || field.type === "file") return;
          if (field.type === "checkbox" || field.type === "radio") {
            if (field.checked) {
              data[field.name] = data[field.name] ? data[field.name] + ", " + field.value : field.value;
            }
          } else {
            data[field.name] = field.value;
          }
        });

        var payload = Object.assign({}, data, { _subject: "Website submission — " + formType, _captcha: "false", _template: "table" });
        var fd = new FormData();
        Object.keys(payload).forEach(function (key) { fd.append(key, payload[key]); });
        Array.prototype.forEach.call(form.querySelectorAll('input[type="file"]'), function (fileInput) {
          Array.prototype.forEach.call(fileInput.files, function (f) { fd.append("attachment", f); });
        });

        fetch(endpoint, { method: "POST", body: fd })
          .then(function (res) {
            if (!res.ok) throw new Error("Request failed: " + res.status);
            return res.json();
          })
          .then(function (json) {
            if (json.success === "false") throw new Error(json.message || "FormSubmit rejected");
            track(formType === "referral" ? "project_referral_submit" : "partnership_form_submit", {
              form: formType
            });
            showSuccess(form);
          })
          .catch(function (err) {
            console.error("Form submit error:", err);
            showFormError(form);
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = submitBtn.dataset.original || "Submit";
            }
          });
      });

      if (submitBtn) submitBtn.dataset.original = submitBtn.textContent;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFileUploads();
    initForms();

    if (window.location.search.indexOf("success=1") !== -1) {
      var forms = document.querySelectorAll(".form-card form");
      forms.forEach(function (form) {
        var card = form.closest(".form-card");
        if (card) {
          form.style.display = "none";
          var existing = card.querySelector(".form-success.is-visible");
          if (!existing) {
            var div = document.createElement("div");
            div.className = "form-success is-visible";
            div.innerHTML =
              '<div class="form-success__icon"><svg aria-hidden="true"><use href="#i-check-circle"/></svg></div>' +
              '<h3>Thank You</h3>' +
              '<p>Your submission has been received. A Renovations Elite representative will review it and follow up using the contact details provided.</p>';
            card.appendChild(div);
          }
        }
      });
      window.history.replaceState({}, "", window.location.pathname);
    }
  });
})();
