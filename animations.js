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

// --- 3. ANIMACIÓN DE FONDO "EQUIPO" CON CONTROL DE VELOCIDAD ---

const teamContainer = document.getElementById("team-particles");
const teamSection = document.getElementById("equipo");

if (teamContainer && teamSection) {
  // 1. Generar 50 partículas dinámicamente
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement("div");
    dot.classList.add("team-particle");
    // Tamaño aleatorio y posición aleatoria
    const size = Math.random() * 6 + 2; // entre 2px y 8px
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    teamContainer.appendChild(dot);
  }

  // 2. Crear la animación con Anime.js
  const particleAnimation = anime({
    targets: ".team-particle",
    translateY: [
      { value: -50, duration: 1000 }, // Sube un poco
      { value: 50, duration: 2000 }, // Baja
      { value: -50, duration: 2000 }, // Vuelve a subir
    ],
    translateX: function () {
      return anime.random(-30, 30); // Movimiento lateral aleatorio
    },
    opacity: [
      { value: 0.2, duration: 1000 },
      { value: 0.8, duration: 1500 },
      { value: 0.2, duration: 1000 },
    ],
    scale: [
      { value: 0.5, duration: 1000 },
      { value: 1.5, duration: 2000 },
      { value: 0.5, duration: 1000 },
    ],
    delay: anime.stagger(100), // Efecto cascada
    duration: 3000,
    easing: "easeInOutQuad",
    loop: true,
    autoplay: true,
  });

  // 3. CONTROL DE VELOCIDAD (SPEED) AL PASAR EL MOUSE
  // Cuando el mouse entra, la velocidad se triplica (speed = 3)
  teamSection.addEventListener("mouseenter", () => {
    // Usamos una pequeña animación para transicionar la velocidad suavemente
    anime({
      targets: particleAnimation,
      speed: 3, // Acelera x3
      duration: 500,
      easing: "linear",
    });
  });

  // Cuando el mouse sale, vuelve a la normalidad (speed = 1)
  teamSection.addEventListener("mouseleave", () => {
    anime({
      targets: particleAnimation,
      speed: 1, // Velocidad normal
      duration: 500,
      easing: "linear",
    });
  });
}
