/* ── ELAN HAUS AGENCY — Main JS ── */

// ── CURSOR ──
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  if (!cursor || !ring) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0,
    started = false;

  function onFirstMove(e) {
    mx = e.clientX;
    my = e.clientY;
    rx = mx;
    ry = my;
    document.body.style.cursor = "none";
    cursor.style.opacity = "1";
    ring.style.opacity = "1";
    started = true;
    document.removeEventListener("mousemove", onFirstMove);
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
    });
  }

  (function animate() {
    if (started) {
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
    }
    requestAnimationFrame(animate);
  })();

  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", function (e) {
    if (!started) return;
    mx = e.clientX;
    my = e.clientY;
    cursor.style.opacity = "1";
    ring.style.opacity = "1";
  });

  document.querySelectorAll("a, button").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "var(--yellow)";
    });
    el.addEventListener("mouseleave", function () {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.borderColor = "var(--blue)";
    });
  });

  document.addEventListener("mousemove", onFirstMove);
})();

// ── HAMBURGER ──
(function initHamburger() {
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  document.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
})();

// ── SCROLL REVEAL ──
(function initReveal() {
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

function renderFooter() {
  fetch("footer.html")
    .then((r) => r.text())
    .then(
      (html) =>
        (document.getElementById("footer-placeholder").innerHTML = html),
    );
}
renderFooter();

const link = document.createElement("link");
link.rel = "icon";
link.href = "src/logos/blue-square-logo.png"; // works with .png directly, no .ico needed
document.head.appendChild(link);
