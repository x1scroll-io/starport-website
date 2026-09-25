/* Starport — small progressive-enhancement script (no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Placeholder CTAs — no dead links, no broken navigation */
  document.querySelectorAll('[data-placeholder]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var label = el.dataset.placeholder === "chrome-web-store"
        ? "Chrome Web Store listing is coming soon. Thanks for your interest!"
        : "Coming soon!";
      showToast(label);
    });
  });

  /* 2. Tiny toast */
  var toastEl = null;
  var toastTimer = null;
  function showToast(text) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.setAttribute("role", "status");
      toastEl.style.cssText = [
        "position:fixed", "left:50%", "bottom:28px", "transform:translateX(-50%) translateY(12px)",
        "max-width:min(92vw,420px)", "padding:.8rem 1.15rem", "border-radius:12px",
        "background:linear-gradient(160deg,#121A38,#0C1228)", "color:#EAF0FF",
        "border:1px solid rgba(140,158,255,.34)", "font:500 .9rem/1.45 Inter,system-ui,sans-serif",
        "box-shadow:0 18px 50px -20px rgba(0,0,0,.9),0 0 34px -14px rgba(61,90,254,.6)",
        "z-index:99", "opacity:0", "transition:opacity .25s ease,transform .25s ease",
        "text-align:center", "pointer-events:none"
      ].join(";");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = text;
    requestAnimationFrame(function () {
      toastEl.style.opacity = "1";
      toastEl.style.transform = "translateX(-50%) translateY(0)";
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.style.opacity = "0";
      toastEl.style.transform = "translateX(-50%) translateY(12px)";
    }, 2800);
  }

  /* 3. Subtle portal parallax (disabled for reduced motion / touch) */
  var portal = document.querySelector(".hero__portal");
  var isTouch = window.matchMedia("(hover: none)").matches;
  if (portal && !reduceMotion && !isTouch) {
    var raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 26;
      ty = (e.clientY / window.innerHeight - 0.5) * 26;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
      raf = null;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      portal.style.translate = "calc(-50% + " + cx.toFixed(2) + "px) calc(-50% + " + cy.toFixed(2) + "px)";
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick);
      }
    }
  }
})();
