/// Animación de habilidades al hacer scroll
const skillsSection = document.querySelector("#skills");
const barras = document.querySelectorAll(".progreso");
let animado = false;

function animarSkills() {
  const seccionTop = skillsSection?.getBoundingClientRect().top;
  const windowAltura = window.innerHeight;
  if (!animado && seccionTop < windowAltura - 100) {
    barras.forEach(barra => {
      const ancho = barra.getAttribute("data-ancho");
      barra.style.width = ancho;
    });
    animado = true;
  }
}

window.addEventListener("scroll", animarSkills);
window.addEventListener("load", animarSkills);

// Mostrar secciones al hacer scroll
const secciones = document.querySelectorAll("section");

function mostrarSecciones() {
  secciones.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", mostrarSecciones);
window.addEventListener("load", mostrarSecciones);
// Carrusel 3D de proyectos estilo Pinterest
const carrusel3D = document.querySelector(".carrusel-proyectos");
const tarjetas = document.querySelectorAll(".carrusel-proyectos .proyecto-card");
const flechaIzq = document.querySelector(".carrusel-btn.izq");
const flechaDer = document.querySelector(".carrusel-btn.der");

let currentIndex = 0;

function mostrarTarjetas() {
  tarjetas.forEach((card, index) => {
    card.style.transform = `translateX(${(index - currentIndex) * 100}%) scale(${index === currentIndex ? 1 : 0.8})`;
    card.style.opacity = index === currentIndex ? 1 : 0.5;
    card.style.zIndex = index === currentIndex ? 10 : 5;
  });
}

flechaDer.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % tarjetas.length;
  mostrarTarjetas();
});

flechaIzq.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + tarjetas.length) % tarjetas.length;
  mostrarTarjetas();
});

window.addEventListener("DOMContentLoaded", mostrarTarjetas);
