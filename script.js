document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // Hamburger Menu Toggle
  // -------------------------
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("open");
  });

  // -------------------------
  // Scroll Reveal Animation
  // -------------------------
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", reveal);
  reveal(); // initial check

  // -------------------------
  // Certificate Slider
  // -------------------------
  let currentIndex = 0;
  const certGrid = document.querySelector(".cert-grid");
  const totalCertificates = document.querySelectorAll(".cert-grid img").length;

  function getItemsPerPage() {
    if (window.innerWidth <= 480) return 1;   // mobile
    if (window.innerWidth <= 992) return 2;   // tablet
    return 3;                                 // desktop
  }

  window.moveSlide = function(step) {
    const itemsPerPage = getItemsPerPage();
    const maxIndex = Math.ceil(totalCertificates / itemsPerPage) - 1;

    currentIndex += step;
    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;

    const offset = -(currentIndex * (100 / itemsPerPage));
    certGrid.style.transform = `translateX(${offset}%)`;
  }

  window.addEventListener("resize", () => {
    const itemsPerPage = getItemsPerPage();
    const maxIndex = Math.ceil(totalCertificates / itemsPerPage) - 1;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const offset = -(currentIndex * (100 / itemsPerPage));
    certGrid.style.transform = `translateX(${offset}%)`;
  });

  // -------------------------
  // Particle Background Animation
  // -------------------------
  const canvas = document.createElement('canvas');
  canvas.id = 'bgCanvas';
  document.body.prepend(canvas); // make sure it's behind content
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = 'rgba(0, 255, 191, 0.7)';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

});
