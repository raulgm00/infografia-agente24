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

// --- 3. ANIMACIÓN DE FONDO "EQUIPO" + EFECTO MOUSE PARALLAX ---

const teamContainer = document.getElementById("team-particles");
const teamSection = document.getElementById("equipo");

if (teamContainer && teamSection) {
  // 1. Generar 60 partículas dinámicamente
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement("div");
    dot.classList.add("team-particle");
    // Tamaño aleatorio y posición aleatoria
    const size = Math.random() * 5 + 2; // entre 2px y 7px
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    // Opacidad inicial aleatoria para dar profundidad
    dot.style.opacity = Math.random() * 0.5 + 0.1;
    teamContainer.appendChild(dot);
  }

  // 2. Animación Base (Flotación suave)
  const particleAnimation = anime({
    targets: ".team-particle",
    translateY: function () {
      return anime.random(-50, 50);
    },
    translateX: function () {
      return anime.random(-30, 30);
    },
    scale: [
      { value: 0.8, duration: 2000 },
      { value: 1.2, duration: 2000 },
    ],
    delay: anime.stagger(200), // Efecto cascada
    duration: 4000,
    easing: "easeInOutSine",
    loop: true,
    direction: "alternate",
  });

  // 3. NUEVO EFECTO: PARALLAX INTERACTIVO AL MOVER EL MOUSE
  // En lugar de "Speed", movemos las partículas en contra del mouse para dar efecto 3D
  teamSection.addEventListener("mousemove", (e) => {
    // Calculamos la posición del mouse relativa al centro
    const x = (window.innerWidth / 2 - e.clientX) / 20; // Divisor controla la intensidad
    const y = (window.innerHeight / 2 - e.clientY) / 20;

    // Animamos el contenedor entero ligeramente
    anime({
      targets: teamContainer,
      translateX: x,
      translateY: y,
      duration: 100, // Respuesta rápida
      easing: "easeOutQuad",
    });

    // Opcional: Hacer que las partículas individuales se dispersen un poco
    anime({
      targets: ".team-particle",
      translateX: function () {
        return anime.random(-10, 10) + x * 0.5;
      }, // Se mueven un poco extra
      duration: 500,
      easing: "easeOutQuad",
    });
  });

  // Resetear posición al salir
  teamSection.addEventListener("mouseleave", () => {
    anime({
      targets: teamContainer,
      translateX: 0,
      translateY: 0,
      duration: 800,
      easing: "spring(1, 80, 10, 0)",
    });
  });
}