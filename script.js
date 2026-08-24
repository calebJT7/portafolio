// ==== 1. Animación de Secciones (Scroll Reveal) ====
const secciones = document.querySelectorAll("section");
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

secciones.forEach(sec => observer.observe(sec));


// ==== 2. Lógica del Carrusel de Proyectos ====
const track = document.querySelector('.proyectos-track');
const btnPrev = document.querySelector('.carrusel-btn.prev');
const btnNext = document.querySelector('.carrusel-btn.next');

if (track && btnPrev && btnNext) {
  const scrollAmount = 380; 

  btnNext.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  btnPrev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}


// ==== 3. EFECTO 3D DINÁMICO (TILT MAGNÉTICO) ====
// Seleccionamos las tarjetas que queremos que tengan el efecto 3D
const cards3D = document.querySelectorAll('.proyecto-card, .skill-card');

cards3D.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    // Calculamos la posición del mouse relativa a la tarjeta
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculamos el centro de la tarjeta
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Definimos cuánto va a rotar (máximo 10 grados para que sea sutil)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    // Aplicamos la transformación
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  // Cuando el mouse sale, la tarjeta vuelve suavemente a su lugar
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});


// ==== 4. Manejo del Formulario de Contacto ====
const form = document.getElementById("form-contacto");
const respuesta = document.getElementById("respuesta-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const btnSubmit = form.querySelector('button');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = "Enviando...";
    btnSubmit.disabled = true;

    const formData = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value
    };

    try {
      const response = await fetch("https://formspree.io/f/mqabyrdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        respuesta.textContent = "¡Mensaje enviado con éxito!";
        respuesta.style.color = "var(--verde-claro)";
        respuesta.style.marginTop = "1rem";
        form.reset();
      } else {
        throw new Error('Error en la respuesta');
      }
    } catch (err) {
      respuesta.textContent = "Hubo un error al enviar el mensaje. Intentá de nuevo.";
      respuesta.style.color = "#ef4444";
      respuesta.style.marginTop = "1rem";
    } finally {
      btnSubmit.textContent = textoOriginal;
      btnSubmit.disabled = false;
    }
  });
}