// Initialize AOS (Animate On Scroll)
AOS.init({
  mirror: true,
  offset: 100,
  duration: 800,
});

// Back to Top Button Logic
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
};

// --- INTEGRACIÓN ANIME.JS (CONTADORES Y PULSO) ---

// 1. Efecto "Contador Fintech"
// Se activa solo cuando la sección es visible
const observerOptions = { threshold: 0.5 };

const financeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".anime-counter");

      counters.forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute("data-target"));

        anime({
          targets: counter,
          innerHTML: [0, targetValue],
          easing: "easeOutExpo",
          round: 1,
          duration: 2500,
          formatter: function (val) {
            return val.toLocaleString("en-US");
          },
        });
      });

      financeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const financeSection = document.querySelector("#finanzas");
if (financeSection) {
  financeObserver.observe(financeSection);
}

// 2. Animación de pulso para el Header
anime({
  targets: "#inicio .animate-pulse",
  scale: [1, 1.1],
  opacity: [0.8, 1],
  easing: "easeInOutQuad",
  direction: "alternate",
  loop: true,
  duration: 1000,
});
