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
// Animación extra para las cards de proyectos
const proyectoCards = document.querySelectorAll('.proyecto-card');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

proyectoCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
const form = document.getElementById("form-contacto");
const respuesta = document.getElementById("respuesta-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que se recargue la página

  const formData = {
    nombre: form.nombre.value,
    email: form.email.value,
    mensaje: form.mensaje.value
  };

  try {
    const response = await fetch("https://formspree.io/f/mqabyrdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      respuesta.textContent = "¡Mensaje enviado con éxito!";
      respuesta.style.color = "#00ff99";
      form.reset();
    } else {
      respuesta.textContent = "Hubo un error al enviar el mensaje.";
      respuesta.style.color = "#ff5050";
    }
  } catch (err) {
    respuesta.textContent = "Error de conexión.";
    respuesta.style.color = "#ff5050";
  }
});

